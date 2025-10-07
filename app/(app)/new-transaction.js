import React, { useState } from 'react';
import { Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../src/styles/colors';
import { addTransaction } from '../../src/services/transactionService';
import { router } from 'expo-router';
// Você pode precisar instalar e importar Picker para as categorias
// import { Picker } from '@react-native-picker/picker'; 

// --- Styled Components ---

const ScreenContainer = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${COLORS.background};
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.primary};
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  background-color: ${COLORS.inputBackground};
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #E0E0E0;
`;

const TypeToggle = styled.View`
  flex-direction: row;
  margin-bottom: 25px;
  background-color: ${COLORS.inputBackground};
  border-radius: 8px;
  overflow: hidden;
`;

const ToggleButton = styled.TouchableOpacity`
  flex: 1;
  padding: 15px;
  align-items: center;
  background-color: ${({ active, type }) => 
    active ? (type === 'income' ? COLORS.secondary : COLORS.error) : 'transparent'};
`;

const ToggleText = styled.Text`
  color: ${({ active }) => (active ? COLORS.background : COLORS.textSecondary)};
  font-weight: bold;
`;

const ButtonSave = styled.TouchableOpacity`
  width: 100%;
  background-color: ${COLORS.primary}; 
  padding: 18px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: ${COLORS.background};
  font-size: 18px;
  font-weight: bold;
`;

// Lista de categorias (você pode expandir)
const categories = ['Alimentação', 'Salário', 'Aluguel', 'Outros'];

// --- Componente de Tela ---

export default function NewTransactionScreen() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [type, setType] = useState('expense'); // Default para Despesa
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!description || !value) {
      Alert.alert('Erro', 'Preencha a descrição e o valor.');
      return;
    }

    setLoading(true);
    try {
      await addTransaction({
        description,
        value: parseFloat(value.replace(',', '.')), // Converte para float
        category,
        type,
        date: new Date().toISOString(), // Data atual
      });

      Alert.alert('Sucesso', 'Transação salva com sucesso!');
      router.back(); // Volta para a tela Home após salvar

    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a transação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Title>Nova Transação</Title>

        {/* 1. Toggle de Receita/Despesa */}
        <TypeToggle>
          <ToggleButton 
            type="income"
            active={type === 'income'} 
            onPress={() => setType('income')}
          >
            <ToggleText active={type === 'income'}>RECEITA</ToggleText>
          </ToggleButton>
          <ToggleButton 
            type="expense"
            active={type === 'expense'} 
            onPress={() => setType('expense')}
          >
            <ToggleText active={type === 'expense'}>DESPESA</ToggleText>
          </ToggleButton>
        </TypeToggle>
        
        {/* 2. Formulário */}
        <Input
          placeholder="Descrição (Ex: Pizza com amigos)"
          value={description}
          onChangeText={setDescription}
        />
        <Input
          placeholder="Valor (Ex: 50.00)"
          value={value}
          onChangeText={(text) => setValue(text.replace(/[^0-9,]/g, ''))} // Permite apenas números e vírgula
          keyboardType="numeric"
        />

        {/* 3. Picker de Categoria (Usando um Input como placeholder simples) */}
        <Input 
            placeholder={`Categoria: ${category}`}
            value={category}
            onChangeText={setCategory}
        />
        {/* TODO: Substituir por um Picker (dropdown) para categorias */}

        {/* 4. Botão de Salvar */}
        <ButtonSave 
          onPress={handleSave} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <ButtonText>SALVAR TRANSAÇÃO</ButtonText>
          )}
        </ButtonSave>

      </ScrollView>
    </ScreenContainer>
  );
}