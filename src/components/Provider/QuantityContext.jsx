'use client'
import React, { createContext, useContext, useState } from 'react';

const QuantityContext = createContext();

export const useQuantityContext = () => useContext(QuantityContext);

export const QuantityProvider = ({ children }) => {
 const [quantity, setQuantity] = useState(1);

 return (
  <QuantityContext.Provider value={{ quantity, setQuantity }}>
   {children}
  </ QuantityContext.Provider>
 );
};
