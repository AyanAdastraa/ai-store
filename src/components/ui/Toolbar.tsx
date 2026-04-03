"use client";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, User, LogOut, Sun, Moon, Sparkles, Menu, X } from "lucide-react"; 
import Link from "next/link";

export default function Toolbar() {
  const { cart, setIsCartOpen, theme, toggleTheme, setIsAgentOpen, isLoaded } = useStore(); 
  const { data: session } = useSession(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent hydration errors by not rendering UI until state is loaded
  if (!isLoaded) return <div className="fixed top-0 left-0 w-full h-20 bg-background/80 backdrop-blur-md z-[100]" />;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 z-[100] bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 md:px-8">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-black uppercase italic tracking-tighter relative z-[110]">
          ARCHIVE<span className="text-primary">.STORE</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          {session && (
            <Link href="/admin" className="text-destructive hover:text-red-400 transition-colors">Admin</Link>
          )}
          <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">Legal</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 md:gap-6 relative z-[110]">
          <button onClick={() => setIsAgentOpen(true)} className="flex items-center gap-2 hover:text-primary transition-colors">
            <Sparkles className="w-5 h-5" />
            <span className="hidden lg:block text-[10px] font-bold tracking-[0.2em] uppercase">Agent</span>
          </button>

          <button onClick={toggleTheme} className="hidden sm:block hover:text-primary transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 border border-border hover:border-primary transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[8px] font-black flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button className="block md:hidden p-2 -mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4 border-l border-border pl-6">
            {session ? (
              <>
                <img src={session.user?.image || ""} alt="User" className="w-8 h-8 grayscale border border-border" />
                <button onClick={() => signOut()} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link href="/login" className="p-2 border border-border hover:bg-primary hover:text-primary-foreground transition-all">
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] h-[100dvh] w-full bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 md:hidden pt-20 animate-in fade-in duration-300">
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-5xl font-black uppercase italic tracking-tighter">Shop</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-5xl font-black uppercase italic tracking-tighter">About</Link>
          {session && (
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-5xl font-black uppercase italic tracking-tighter text-destructive">Admin</Link>
          )}
          <Link href="/legal" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-muted-foreground font-black uppercase italic tracking-tighter">Legal</Link>

          <div className="mt-8 flex flex-col items-center gap-6 border-t border-border/50 pt-8 w-full max-w-xs">
             <button onClick={() => { setIsMobileMenuOpen(false); toggleTheme(); }} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
               {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} Toggle Theme
             </button>

            {session ? (
              <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-destructive">
                <LogOut className="w-5 h-5" /> Disconnect
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary">
                <User className="w-5 h-5" /> Initialize Auth
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}