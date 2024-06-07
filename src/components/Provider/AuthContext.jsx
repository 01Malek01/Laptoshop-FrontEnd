'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const[loading, setLoading] = useState(true);
  const jwt = typeof window !== 'undefined' && localStorage.getItem('jwt');
  useEffect(() => {
    if (jwt) {
      setLoggedIn(true);
    }
    setLoading(false);
  }, [jwt]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
