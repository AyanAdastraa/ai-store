"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Globe, CreditCard } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, setCart } = useStore();
  const router = useRouter();

  // Financial Calculations
  const subtotal = cart?.reduce((sum: number, item: any) => sum + (item.price || 0), 0) || 0;
  const finalTotal = cart?.reduce((sum: number, item: any) => sum + (item.finalPrice || item.price || 0), 0) || 0;
  const totalDiscount = subtotal - finalTotal;

  // Checkout Protocol
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
          totalAmount: finalTotal,
          totalSaved: totalDiscount
        })
      });
      if (setCart) setCart([]); // Wipe state for success
      setIsCartOpen(false);
      router.push("/checkout/success");
    } catch (e) {
      console.error("Checkout failed:", e);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/60 z-[200] cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-background border-l border-border z-[201] flex flex-col shadow-2xl selection:bg-primary selection:text-primary-foreground"
          >
            {/* 1. Header */}
            <div className="flex items-center justify-between p-8 border-b border-border bg-card/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                <h2 className="text-xl font-black uppercase tracking-tighter italic">SECURE_CART</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 border border-border hover:bg-primary hover:text-primary-foreground transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
              
              {/* Cart Items List */}
              <div className="p-8 space-y-4">
                {cart?.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center opacity-20">
                    <ShieldCheck className="w-12 h-12 mb-4 stroke-[1px]" />
                    <p className="font-black uppercase tracking-[0.4em] text-[10px]">Awaiting Assets</p>
                  </div>
                ) : (
                  cart.map((item: any, i: number) => (
                    <motion.div layout key={`${item.id}-${i}`} className="flex gap-5 p-5 border border-border bg-card group relative">
                      <div className="w-20 h-20 bg-muted/50 p-2 flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal brightness-90 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-[11px] uppercase tracking-widest leading-tight pr-4">{item.name}</h3>
                          <button onClick={() => removeFromCart(i)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-baseline gap-3">
                          <span className="font-black text-2xl tracking-tighter italic">${item.finalPrice?.toFixed(0) || item.price}</span>
                          {item.price > (item.finalPrice || item.price) && <span className="text-[9px] text-primary font-bold px-1 border border-primary/20 bg-primary/5 uppercase">Negotiated</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* 3. Delivery Protocol (Address Fields) */}
              {cart?.length > 0 && (
                <div className="p-8 border-t border-border bg-muted/5 space-y-6">
                  <div className="flex items-center gap-3 opacity-50">
                    <Globe className="w-4 h-4" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Delivery_Coordinates</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-px bg-border border border-border">
                    <div className="col-span-2 bg-background p-4">
                      <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-1 tracking-widest">Entity Name</label>
                      <input type="text" placeholder="IDENTIFY_YOURSELF" className="w-full bg-transparent outline-none text-xs font-black uppercase placeholder:opacity-10" />
                    </div>
                    <div className="col-span-2 bg-background p-4">
                      <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-1 tracking-widest">Physical Location</label>
                      <input type="text" placeholder="STREET_ADDRESS_01" className="w-full bg-transparent outline-none text-xs font-black uppercase placeholder:opacity-10" />
                    </div>
                    <div className="bg-background p-4 border-r border-border">
                      <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-1 tracking-widest">Node / City</label>
                      <input type="text" placeholder="CITY_ID" className="w-full bg-transparent outline-none text-xs font-black uppercase placeholder:opacity-10" />
                    </div>
                    <div className="bg-background p-4">
                      <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-1 tracking-widest">Postal_Code</label>
                      <input type="text" placeholder="000000" className="w-full bg-transparent outline-none text-xs font-black uppercase placeholder:opacity-10" />
                    </div>
                  </div>

                  {/* Payment Protocol Placeholder */}
                  <div className="p-5 border border-border bg-card flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Neural_Pay / Credit Card</span>
                    </div>
                    <span className="text-[8px] font-bold text-primary animate-pulse tracking-widest">LINKED</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Checkout Footer */}
            {cart?.length > 0 && (
              <div className="p-8 border-t border-border bg-card/80 backdrop-blur-md">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Gross Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 p-2 border border-primary/10">
                      <span>Neural Adjustment</span>
                      <span>-${totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end pt-6 border-t-2 border-border">
                    <div className="flex flex-col">
                      <span className="font-bold uppercase tracking-widest text-[9px] text-muted-foreground mb-1">Total Valuation</span>
                      <span className="font-black text-5xl tracking-tighter italic leading-none">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-4 bg-muted/30 border border-border">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed tracking-[0.2em]">
                    By proceeding, you agree to the <Link href="/info" className="text-foreground underline decoration-primary">ARCHIVE_PROTOCOLS</Link> for neural transfer and shipping.
                  </p>
                </div>

                <button onClick={handleCheckout} className="group w-full h-20 bg-primary text-primary-foreground font-black uppercase tracking-[0.4em] text-xs hover:invert transition-all flex items-center justify-center gap-4">
                  Finalize Protocol
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}