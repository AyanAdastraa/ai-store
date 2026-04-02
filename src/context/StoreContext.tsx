"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const StoreContext = createContext<any>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Defaulting to dark for Archive aesthetic
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false); 

  useEffect(() => {
    // Safely load theme on the client to prevent hydration mismatch
    const savedTheme = localStorage.getItem("archive_theme") as "light" | "dark" | null;
    if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("archive_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const addToCart = (product: any) => setCart((prev) => [...prev, product]);
  const removeFromCart = (index: number) => setCart((prev) => prev.filter((_, i) => i !== index));

  return (
    <StoreContext.Provider value={{ 
      discount, setDiscount, 
      cart, addToCart, removeFromCart,
      isCartOpen, setIsCartOpen,
      isAgentOpen, setIsAgentOpen,
      theme, toggleTheme, 
      isLoaded 
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext) || {};