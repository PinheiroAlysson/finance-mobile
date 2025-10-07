// src/config/firebase.js
// Importe as funções necessárias
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; 

// Sua configuração (já corrigida e validada)
const firebaseConfig = {
  apiKey: "AIzaSyAt5CR-bKZgx8ppJ9AbdUbmQTScvSJYlAc",
  authDomain: "financeapp-fiap.firebaseapp.com",
  projectId: "financeapp-fiap",
  storageBucket: "financeapp-fiap.firebasestorage.app",
  messagingSenderId: "889394788555",
  appId: "1:889394788555:web:679fe732112a13a405834e",
  // O Analytics está comentado para evitar o erro de DOM (getElementsByTagName)
  // measurementId: "G-VZGQRY0LZ4" 
};

// 1. Inicialização Segura e Global
// Verifica se o app Firebase já existe. Se não, inicializa.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 2. Exportação Única
// Exporta a instância do Auth. Agora, quando você importa "auth" em outros arquivos,
// você está sempre pegando a mesma instância, evitando a re-declaração.
export const auth = getAuth(app); 

// Você pode remover o "export default app" se não estiver sendo usado.