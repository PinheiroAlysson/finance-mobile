import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { router } from 'expo-router';
import styled from 'styled-components/native';
import { COLORS } from '../../src/styles/colors';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: ${COLORS.background};
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${COLORS.primary};
  margin-bottom: 50px;
  align-self: flex-start; 
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background-color: ${COLORS.inputBackground};
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #E0E0E0;
`;

const ButtonPrimary = styled.TouchableOpacity`
  width: 100%;
  background-color: ${COLORS.secondary}; /* Verde de Ação do Figma */
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: ${COLORS.background};
  font-size: 18px;
  font-weight: bold;
`;

const ButtonSecondary = styled.TouchableOpacity`
  padding: 10px;
`;

const SecondaryText = styled.Text`
  color: ${COLORS.primary};
  font-size: 16px;
  text-decoration-line: underline;
`;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (e) {
      Alert.alert('Erro de Acesso', 'E-mail ou senha inválidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Acesso</Title>
      
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <ButtonPrimary 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.background} />
        ) : (
          <ButtonText>ENTRAR</ButtonText>
        )}
      </ButtonPrimary>

      <ButtonSecondary onPress={() => router.push('/(auth)/register')}>
        <SecondaryText>Não tem conta? Crie uma aqui!</SecondaryText>
      </ButtonSecondary>

    </Container>
  );
}