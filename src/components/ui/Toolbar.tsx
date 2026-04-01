"use client";
import { useStore } from "@/context/StoreContext";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, Search, User, LogOut } from "lucide-react";
import Link from "next/link";

export default function Toolbar() {
  const { cart, setIsCartOpen } = useStore();
  const { data: session } = useSession(); // 🟢 GET THE USER SESSION

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-[100] bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8">
      {/* Logo */}
      <Link href="/" className="text-xl font-black uppercase italic tracking-tighter">
        ARCHIVE<span className="text-primary">.STORE</span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="hover:text-primary transition-colors"><Search className="w-5 h-5" /></button>
        
        <button onClick={() => setIsCartOpen(true)} className="relative p-2 border border-border hover:border-primary transition-colors">
          <ShoppingBag className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[8px] font-black flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </button>

        {/* 🟢 AUTH UI SECTION */}
        {session ? (
          <div className="flex items-center gap-4 border-l border-border pl-6">
            <img 
              src={session.user?.image || ""} 
              alt="User" 
              className="w-8 h-8 grayscale hover:grayscale-0 transition-all border border-border" 
            />
            <button 
              onClick={() => signOut()}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              title="Sign Out Protocol"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link href="/api/auth/signin" className="p-2 border border-border hover:bg-primary hover:text-primary-foreground transition-all">
            <User className="w-5 h-5" />
          </Link>
        )}
      </div>
    </nav>
  );
}