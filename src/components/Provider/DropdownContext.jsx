'use client'
import React, { createContext, useContext, useState } from 'react';

const DropdownContext = createContext();

export const useDropdownContext = () => useContext(DropdownContext);

export const DropdownProvider = ({ children }) => {
 const [selectedValue, setSelectedValue] = useState('All Categories');

 return (
  <DropdownContext.Provider value={{ selectedValue, setSelectedValue }}>
   {children}
  </DropdownContext.Provider>
 );
};
