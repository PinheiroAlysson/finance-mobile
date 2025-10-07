import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import styled from 'styled-components/native';
import { COLORS } from '../../src/styles/colors';
import { Ionicons } from '@expo/vector-icons'; 
import { router } from 'expo-router'; 
import TransactionCard from '../../src/components/TransactionCard'; 
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

const Header = styled.View`
  background-color: ${COLORS.primary};
  padding: 40px 20px 20px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  elevation: 5;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.Text`
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
`;

const BalanceCard = styled.View`
  background-color: #FFF;
  padding: 20px;
  border-radius: 15px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  margin-top: 10px;
`;

const BalanceTitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.textSecondary};
`;

const BalanceValue = styled.Text`
  font-size: 38px;
  font-weight: bold;
  margin-top: 5px;
`;

const ListHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.text};
  margin: 20px 0 10px 0;
`;

const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 20px;
  background-color: ${COLORS.secondary};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 8;
  z-index: 10;
`;

export default function HomeScreen() {
  const { 
    user, 
    logout, 
    transactions, 
    totalBalance, 
    loading, 
    deleteTransaction 
  } = useAuth();


  const chartData = useMemo(() => {
      const expenses = transactions.filter(t => t.type === 'expense');

      const groupedExpenses = expenses.reduce((acc, t) => {
          const value = parseFloat(t.value || 0);
          const category = t.category || 'Não Classificado';
          acc[category] = (acc[category] || 0) + value;
          return acc;
      }, {});

      const data = Object.keys(groupedExpenses).map((category) => {
          const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
          
          return {
              name: category,
              population: groupedExpenses[category], 
              color: randomColor, 
              legendFontColor: COLORS.text,
              legendFontSize: 14,
          };
      });
      
      return data.length > 0 ? data : null;

  }, [transactions]); 

  const handleAddTransaction = () => {
    router.push('/(app)/new-transaction'); 
  };
  
  const handleDeletePress = (transactionId) => {
      deleteTransaction(transactionId);
  };
  
  const formattedBalance = `R$ ${parseFloat(totalBalance).toFixed(2).replace('.', ',')}`;
  const balanceColor = parseFloat(totalBalance) >= 0 ? COLORS.secondary : COLORS.error;


  const renderTransactionItem = ({ item }) => (
    <TransactionCard 
      id={item.id} 
      description={item.description}
      category={item.category}
      value={item.value}
      type={item.type}
      date={item.createdAt} 
      onDelete={handleDeletePress} 
      onEdit={() => router.push(`/(app)/edit-transaction/${item.id}`)} 
    />
  );


  return (
    <Container>
      <Header>
        <HeaderRow>
          <HeaderTitle>Olá, {user?.email.split('@')[0] || 'Usuário'}</HeaderTitle>
          <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out-outline" size={28} color="#FFF" />
          </TouchableOpacity>
        </HeaderRow>

        <BalanceCard>
          <BalanceTitle>Saldo Atual</BalanceTitle>
          <BalanceValue style={{ color: balanceColor }}>
            {formattedBalance}
          </BalanceValue>
          {chartData ? (
              <View style={{ alignItems: 'center', marginTop: 15 }}>
                  <PieChart
                    data={chartData}
                    width={screenWidth - 80} 
                    height={220}
                    chartConfig={{
                      backgroundColor: "#ffffff",
                      backgroundGradientFrom: "#ffffff",
                      backgroundGradientTo: "#ffffff",
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor={"population"} 
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                    center={[10, 0]} 
                  />
              </View>
            ) : (
              <View style={{ marginTop: 20, paddingVertical: 30, alignItems: 'center' }}>
                <Text style={{ color: COLORS.textSecondary }}>
                  Adicione despesas para ver a distribuição por categoria.
                </Text>
              </View>
            )}
        </BalanceCard>
      </Header>

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <ListHeader>Transações Recentes</ListHeader>
        
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={renderTransactionItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center', marginTop: 20, color: COLORS.textSecondary }}>
                Nenhuma transação registrada. Comece a adicionar!
              </Text>
            )}
          />
        )}
      </View>
      
      <AddButton onPress={handleAddTransaction}>
        <Ionicons name="add" size={30} color="#FFF" />
      </AddButton>

    </Container>
  );
}