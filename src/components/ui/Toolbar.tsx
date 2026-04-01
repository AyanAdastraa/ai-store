"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Grid, FileText, Sun, Moon, LogOut, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Toolbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Extract cart state
  const { theme, toggleTheme, user, cart, setIsCartOpen } = useStore();

  if (pathname === "/login") return null;

  const handleLogout = () => {
    localStorage.removeItem("archive_user");
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 p-1.5 rounded-full border border-border bg-background/80 backdrop-blur-xl shadow-2xl transition-all">
      
      <Link href="/" className="px-4 py-2 hover:bg-muted rounded-full transition-colors flex items-center gap-2 group">
        <Home className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Home</span>
      </Link>

      <Link href="/shop" className="px-4 py-2 hover:bg-muted rounded-full transition-colors flex items-center gap-2 group">
        <Grid className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Shop</span>
      </Link>

      <Link href="/about" className="px-4 py-2 hover:bg-muted rounded-full transition-colors flex items-center gap-2 group">
        <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Manifesto</span>
      </Link>

      <div className="w-[1px] h-6 bg-border mx-2" />

      {/* NEW: Cart Toggle Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="relative p-3 hover:bg-muted rounded-full transition-colors flex items-center justify-center group"
      >
        <ShoppingBag className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
        {/* Pulsing Dot if items exist */}
        {cart?.length > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
        )}
      </button>

      <button 
        onClick={toggleTheme}
        className="p-3 hover:bg-muted rounded-full transition-colors flex items-center justify-center"
      >
        {theme === "dark" ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
      </button>

      {user && (
        <button 
          onClick={handleLogout}
          className="p-3 hover:bg-destructive/10 text-destructive rounded-full transition-colors flex items-center justify-center ml-1"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
}