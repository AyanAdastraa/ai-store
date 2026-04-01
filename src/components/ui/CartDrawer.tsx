"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useStore();

  // Financial Math
  const subtotal = cart?.reduce((sum: number, item: any) => sum + item.price, 0) || 0;
  const totalDiscount = cart?.reduce((sum: number, item: any) => sum + (item.price - item.finalPrice), 0) || 0;
  const finalTotal = subtotal - totalDiscount;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/40 z-[200] cursor-pointer"
          />

          {/* Sliding Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-background border-l border-border z-[201] flex flex-col shadow-2xl selection:bg-primary selection:text-primary-foreground"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Secure_Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart?.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                  <ShieldCheck className="w-12 h-12 mb-4" />
                  <p className="font-bold uppercase tracking-widest text-xs">Awaiting Assets</p>
                </div>
              ) : (
                cart.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 border border-border bg-card group relative overflow-hidden">
                    <div className="w-20 h-20 bg-muted p-2 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold leading-tight line-clamp-2 pr-4">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(i)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-end gap-3 mt-2">
                        <span className="font-black text-lg">${item.finalPrice.toFixed(0)}</span>
                        {item.price > item.finalPrice && (
                          <span className="text-xs text-muted-foreground line-through decoration-destructive font-bold mb-1">
                            ${item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart?.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/20">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-sm font-bold text-green-500">
                      <span>AI Negotiation</span>
                      <span>-${totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-[1px] w-full bg-border my-2" />
                  <div className="flex justify-between items-end">
                    <span className="font-bold uppercase tracking-widest text-xs">Total Valuation</span>
                    <span className="font-black text-3xl tracking-tighter">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Initiating Secure Checkout Protocol...")}
                  className="w-full h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Finalize Checkout <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}