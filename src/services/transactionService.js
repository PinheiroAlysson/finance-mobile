import { db, auth } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const TRANSACTION_COLLECTION = 'transactions';

export const addTransaction = async (data) => {
  if (!auth.currentUser) throw new Error("Usuário não autenticado.");

  const transactionData = {
    ...data,
    userId: auth.currentUser.uid,
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, TRANSACTION_COLLECTION), transactionData);
    return { id: docRef.id, ...transactionData };
  } catch (error) {
    console.error("Erro ao adicionar transação: ", error);
    throw new Error("Não foi possível salvar a transação.");
  }
};

export const getTransactions = async () => {
  if (!auth.currentUser) return [];

  try {
    const q = query(
      collection(db, TRANSACTION_COLLECTION),
      where("userId", "==", auth.currentUser.uid), 
      orderBy("date", "desc") 
    );

    const querySnapshot = await getDocs(q);
    
    const transactions = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    
    return transactions;

  } catch (error) {
    console.error("Erro ao buscar transações: ", error);
    return [];
  }
};


export const updateTransaction = async (id, data) => {
    if (!auth.currentUser) throw new Error("Usuário não autenticado.");
    const docRef = doc(db, TRANSACTION_COLLECTION, id);
    await updateDoc(docRef, data);
};


export const deleteTransaction = async (id) => {
    if (!auth.currentUser) throw new Error("Usuário não autenticado.");
    const docRef = doc(db, TRANSACTION_COLLECTION, id);
    await deleteDoc(docRef);
};
