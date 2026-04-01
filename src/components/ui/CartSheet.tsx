"use client"
import { useStore } from "@/context/StoreContext"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"

export default function CartSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart } = useStore()
  const total = cart.reduce((acc: number, item: any) => acc + item.finalPrice, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" 
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-black tracking-tighter mb-8">Your Bag.</h2>
            <div className="space-y-6 overflow-y-auto max-h-[60vh]">
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-zinc-100 rounded-xl overflow-hidden">
                      <img src={item.image} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-zinc-400 text-xs">${item.finalPrice.toFixed(0)}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold text-red-500">Remove</button>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-zinc-400 font-medium">Total</span>
                <span className="text-2xl font-black">${total.toFixed(0)}</span>
              </div>
              <Button className="w-full h-14 bg-zinc-900 text-white rounded-2xl font-bold">
                Checkout with Razorpay
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}