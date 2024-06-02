'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';

const JwtContext = createContext(null); // Set default value to null

const useJWT = () => {
 const jwt = useContext(JwtContext);
 if (jwt === null) {
  throw new Error('useJWT must be used within a JWTProvider');
 }
 return jwt;
}

const JWTProvider = ({ children, jwt: initialJwt }) => {
 const [token, setToken] = useState(initialJwt || null); // Use initialJwt, fallback to null

 useEffect(() => {
  // Update token if initialJwt changes or server-side data is available
  const storedJwt = typeof window !== 'undefined' ? window.localStorage.getItem('jwt') : null;
  setToken(initialJwt || storedJwt);
 }, [initialJwt]);

 useEffect(() => {
  if (typeof window !== 'undefined' && token) {
   window.localStorage.setItem('jwt', token);
  }
 }, [token]);

 return (
  <JwtContext.Provider value={token}>
   {children}
  </JwtContext.Provider>
 );
};

export {JWTProvider, useJWT };
