"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import CommandBar from "@/components/ui/CommandBar";
import { useStore } from "@/context/StoreContext";

export default function Home() {
  const { user, isLoaded } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoaded && !user) router.push("/login");
  }, [user, isLoaded, router]);

  if (!mounted || !isLoaded || !user) return null;

  return (
    <main className="relative min-h-screen bg-background text-foreground pb-64 selection:bg-primary selection:text-primary-foreground">
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-16 pt-64">
        
        {/* Massive Overlapping Typography */}
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
          {products.map((p, i) => (
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
          ))}
        </div>
      </div>

      <CommandBar />
    </main>
  );
}