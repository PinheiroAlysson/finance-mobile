import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';

const CardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: ${COLORS.background};
  border-radius: 10px;
  margin-bottom: 10px;
  elevation: 1; /* Sombra suave para destacar */
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 1.41px;
`;

const IconWrapper = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${COLORS.inputBackground}; /* Fundo cinza claro */
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const DetailsWrapper = styled.View`
  flex: 1;
`;

const DescriptionText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.text};
`;

const CategoryText = styled.Text`
  font-size: 13px;
  color: ${COLORS.textSecondary};
  margin-top: 2px;
`;

const ValueText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  /* Aplica o Verde (income) ou o Vermelho (expense) */
  color: ${({ type }) => (type === 'income' ? COLORS.secondary : COLORS.error)};
  margin-left: 10px;
`;

export default function TransactionCard({ description, category, value, type, date }) {
  const isIncome = type === 'income';
  
  const iconName = category === 'Salário' ? 'wallet-outline' : 
                   category === 'Aluguel' ? 'home-outline' : 
                   'cash-outline';

  const displayValue = `${isIncome ? '+' : '-'} R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;

  return (
    <CardContainer>
      <IconWrapper>
        <Ionicons name={iconName} size={22} color={COLORS.text} />
      </IconWrapper>
      <DetailsWrapper>
        <DescriptionText>{description}</DescriptionText>
        <CategoryText>{category} - {new Date(date).toLocaleDateString('pt-BR')}</CategoryText>
      </DetailsWrapper>
      <ValueText type={type}>{displayValue}</ValueText>
    </CardContainer>
  );
}