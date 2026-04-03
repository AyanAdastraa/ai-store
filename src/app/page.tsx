"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { useStore } from "@/context/StoreContext";
// 🟢 Removed CommandBar import from here

export default function Home() {
  const { isLoaded, products } = useStore(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) return null;

  return (
    <main className="relative min-h-screen bg-background text-foreground pb-64 selection:bg-primary selection:text-primary-foreground overflow-hidden">
      
      {/* 🔴 Ambient Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50 dark:opacity-30 animate-pulse duration-1000" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50 dark:opacity-20" />

      <div className="relative max-w-[1800px] mx-auto px-6 md:px-16 pt-64 z-10">
        
        {/* Massive Overlapping Fluid Typography */}
        <header className="relative mb-64 z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[16vw] font-black tracking-tighter leading-[0.7] uppercase italic select-none"
          >
            Digital <br/> 
            <span className="text-muted-foreground/30 ml-[10vw] mix-blend-multiply dark:mix-blend-screen">
              Archive.
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 bottom-[-80px] max-w-sm text-right hidden lg:block"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground mb-6">/ Volume 26.01</p>
            <p className="text-xl font-medium leading-tight text-muted-foreground italic">
              Neural-negotiated marketplace. <br/> Hardware-accelerated index.
            </p>
          </motion.div>
        </header>

        {/* Heavy Scroll Physics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-48">
          {products && products.length > 0 ? (
            products.map((p: any, i: number) => (
              <motion.div 
              key={p.id} 
              initial={{ y: 150, opacity: 0, filter: "blur(10px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`${
                i % 2 === 0 
                  ? "md:col-span-7 md:pr-20" 
                  : "md:col-span-4 md:mt-[400px]"
              }`}
            >
              <ProductCard product={p} />
            </motion.div>
            ))
          ) : (
            <div className="col-span-12 text-center text-muted-foreground opacity-50 py-24">
              [ NO INVENTORY FOUND IN NEURAL DB ]
            </div>
          )}
        </div>
      </div>
      {/* 🟢 Removed CommandBar render from here */}
    </main>
  );
}