'use client'
import React, { createContext, useContext, useState } from 'react'

const queryContext = createContext();
export const useQueryContext = () => useContext(queryContext);
export function QueryProvider({ children }) {
 const [query, setQuery] = useState('');

  return (
    <queryContext.Provider value={{ query, setQuery }}>
      {children}
    </queryContext.Provider>
  )
}

