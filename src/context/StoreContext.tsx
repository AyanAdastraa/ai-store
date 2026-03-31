"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

const StoreContext = createContext<any>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [discount, setDiscount] = useState(0); 

  return (
    <StoreContext.Provider value={{ discount, setDiscount }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);