"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const StoreContext = createContext<any>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);
  
  // NEW: Cart UI State
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("archive_theme") as "light" | "dark" | null;
    const savedUser = localStorage.getItem("archive_user");

    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("archive_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem("archive_user", JSON.stringify(userData));
  };

  const addToCart = (product: any) => setCart((prev) => [...prev, product]);
  
  // NEW: Remove from cart function
  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <StoreContext.Provider value={{ 
      discount, setDiscount, 
      cart, addToCart, removeFromCart,
      isCartOpen, setIsCartOpen,
      user, login, 
      theme, toggleTheme, 
      isLoaded 
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) return {}; 
  return context;
};