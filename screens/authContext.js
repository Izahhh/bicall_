import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebaseConfig"; // Importe sua configuração Firebase
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Aqui o estado do usuário é atualizado
      setLoading(false); // Quando o estado de autenticação for carregado, o loading é desativado
    });

    return unsubscribe; // Limpeza do listener de autenticação
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

