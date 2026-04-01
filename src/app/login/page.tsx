"use client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full border-2 border-border p-10 bg-card shadow-[20px_20px_0px_rgba(0,0,0,0.1)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.02)]"
      >
        <div className="mb-10">
          <ShieldCheck className="w-12 h-12 mb-6 text-primary" />
          <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Access_Denied</h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Identity Verification Required</p>
        </div>

        {/* 🟢 Triggers real Google Auth and redirects to the cart/checkout upon success */}
        <button 
          onClick={() => signIn("google", { callbackUrl: "/checkout/success" })}
          className="group w-full h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:invert transition-all"
        >
          Initialize Google Auth <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </button>

        <p className="mt-8 text-[8px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
          Secure Session via OAuth 2.0 <br /> 
          Unauthorized access attempts are logged.
        </p>
      </motion.div>
    </main>
  );
}