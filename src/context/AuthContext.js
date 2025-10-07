import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, deleteDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore'; 
import { auth, db } from '../config/firebase'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const calculateTotalBalance = (currentTransactions) => {
    let balance = 0;
    currentTransactions.forEach(t => {
      const value = Number(t.value);
      balance += t.type === 'income' ? value : -value;
    });
    setTotalBalance(balance.toFixed(2));
  };
  
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    if (user) {
      const transactionsCol = collection(db, "users", user.uid, "transactions");
      const q = query(transactionsCol, orderBy("date", "desc"));
      
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          value: Number(doc.data().value) 
        }));
        
        setTransactions(list);
        calculateTotalBalance(list);
      });
      
      return () => {
        unsubscribeAuth();
        unsubscribeSnapshot();
      };
    } else {
      setTransactions([]);
      setTotalBalance(0);
      return () => unsubscribeAuth();
    }
  }, [user]);

  const deleteTransaction = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "transactions", id));
    } catch (error) {
      console.error("Erro ao deletar transação: ", error);
    }
  };

  const updateTransaction = async (id, updatedData) => {
    if (!user) return;
    try {
      const transactionRef = doc(db, "users", user.uid, "transactions", id);
      await updateDoc(transactionRef, updatedData);
    } catch (error) {
      console.error("Erro ao atualizar transação: ", error);
    }
  };
  
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const value = { 
    user, 
    loading, 
    login, 
    register, 
    logout, 
    transactions, 
    totalBalance, 
    deleteTransaction, 
    updateTransaction,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);