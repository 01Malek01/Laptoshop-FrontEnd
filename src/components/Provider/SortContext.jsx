'use client'
import React from 'react'
import { createContext, useState } from 'react';


const SortContext = createContext();
export const useSortContext = () => useContext(SortContext);
function SortProvider({ children }) {
  const [sort, setSort] = useState({});
  return (
      
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  )
}

export default SortProvider
