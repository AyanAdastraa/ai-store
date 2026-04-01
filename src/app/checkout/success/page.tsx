"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti"; // Optional: npm install react-confetti

export default function SuccessPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pt-20">
      <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} colors={['#ffffff', '#333333', '#000000']} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full border-2 border-border bg-card p-12 text-center shadow-[20px_20px_0px_rgba(0,0,0,0.1)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.02)]"
      >
        <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-8">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
          Transaction_Secured
        </h1>
        
        <p className="text-muted-foreground font-medium mb-12 uppercase tracking-widest text-xs">
          Order Protocol: #ARC-{Math.floor(Math.random() * 1000000)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="p-6 border border-border text-left">
            <span className="block text-[10px] font-bold text-muted-foreground uppercase mb-2">Status</span>
            <span className="font-black uppercase tracking-tight">Verified</span>
          </div>
          <div className="p-6 border border-border text-left">
            <span className="block text-[10px] font-bold text-muted-foreground uppercase mb-2">Delivery</span>
            <span className="font-black uppercase tracking-tight">Neural Transfer</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href="/shop"
            className="h-16 bg-primary text-primary-foreground font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            Return to Index <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="h-16 border-2 border-border font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-muted transition-colors">
            Download Manifest <Download className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <p className="mt-12 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em] opacity-50">
        / encrypted by archive protocol v1.0
      </p>
    </main>
  );
}