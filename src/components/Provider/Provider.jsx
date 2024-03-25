'use client'
import React, { createContext, useState, useEffect } from 'react';

const JwtContext = createContext(null); // Set default value to null

const JWTProvider = ({ children, jwt: initialJwt }) => {
 const [token, setToken] = useState(initialJwt || null); // Use initialJwt, fallback to null

 useEffect(() => {
  // Update token if initialJwt changes or server-side data is available
  setToken(initialJwt || (typeof window !== 'undefined' && window.localStorage.getItem('jwt')));
 }, [initialJwt]);

 return (
  <JwtContext.Provider value={token?.value}>
   {children}
  </JwtContext.Provider>
 );
};

export { JwtContext, JWTProvider };
