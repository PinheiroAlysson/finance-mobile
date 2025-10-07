# 💰 Finance Mobile - Gerenciamento Financeiro Mobile

## 💡 Visão Geral e Objetivo

Este projeto é uma aplicação móvel de gerenciamento financeiro, desenvolvida em **React Native com Expo**, seguindo os requisitos do Tech Challenge da FIAP. O objetivo principal é fornecer ao usuário um controle robusto e em **tempo real** sobre suas finanças, combinando segurança (autenticação) e análise de dados (gráficos e saldo).

A arquitetura do projeto implementa a separação de responsabilidades, utilizando o **Context API** para gerenciar o estado global de forma eficiente.

---

## 🚀 Arquitetura e Tecnologias-Chave

| Categoria | Tecnologia / Conceito | Detalhes no Projeto |
| :--- | :--- | :--- |
| **Framework** | **React Native (Expo)** | Utilizado para desenvolvimento móvel multiplataforma. |
| **Gerenciamento de Estado** | **Context API** | Usado para centralizar o estado global (Autenticação, Transações, Saldo). |
| **Banco de Dados** | **Cloud Firestore** | Persistência de dados de usuários e transações em **tempo real** (`onSnapshot`). |
| **Autenticação** | **Firebase Authentication** | Implementação de Login, Registro e Logout seguros. |
| **Análise de Dados** | **Gráficos e `useMemo`** | Exibição de Gráfico de Pizza (Pie Chart) para análise de despesas. |
| **Estilização** | `styled-components` | Utilizado para organização do CSS-in-JS. |

---

## ✅ Funcionalidades Principais (Requisitos do Desafio)

1.  **CRUD (Create, Read, Update, Delete) Completo:**
    * **Leitura (Read):** Transações buscadas em tempo real (`onSnapshot`) e exibidas em lista.
    * **Criação/Edição/Exclusão:** Implementação das funções **`createTransaction`**, **`updateTransaction`** e **`deleteTransaction`** no Contexto, garantindo a persistência imediata no Firestore.
2.  **Dashboard Financeiro:** Exibição dinâmica do **Saldo Total** e análise da distribuição de despesas por categoria.
3.  **Segurança:** Todas as operações de dados são vinculadas ao **`user.uid`**, garantindo que o usuário só acesse suas próprias transações.

---

## 🛠 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação no seu ambiente:

### 1. Pré-requisitos

* **Node.js** (Versão LTS, `>=20.16.0` recomendado).
* **npm** ou **yarn**.
* Aplicativo **Expo Go** instalado no seu celular.

### 2. Instalação

```bash
# 1. Clone o repositório
git clone [https://www.youtube.com/watch?v=RqfwLeY952s](https://www.youtube.com/watch?v=RqfwLeY952s)
cd [pasta-do-seu-projeto]

# 2. Instale as dependências
npm install
# OU
yarn install

#3. Configuração do Firebase
1. Crie um projeto no console do Firebase e habilite o Authentication (E-mail/Senha) e o Cloud Firestore.

2. Crie o arquivo src/config/firebase.js e insira as suas chaves.

#4. Execução
Inicie o servidor de desenvolvimento:
npx expo start
