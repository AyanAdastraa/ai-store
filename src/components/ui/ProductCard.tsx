"use client"
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/context/StoreContext"

export default function ProductCard({ product }: { product: any }) {
  const { discount } = useStore();
  
  const activeDiscount = discount || 0;
  const savings = product.price * (activeDiscount / 100);
  const finalPrice = product.price - savings;

  return (
    <Link href={`/product/${product.id}`} className="block group">
      {/* Physical Card Container with Hard Brutalist Shadow */}
      <Card className="rounded-none border-2 border-border bg-card p-3 md:p-4 hover:shadow-[8px_8px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[8px_8px_0px_rgba(255,255,255,0.05)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-500 cursor-pointer">
        
        {/* Front: The Photo Area */}
        <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center p-8 border border-border/50">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          
          {/* Physical "Postage Stamp" for Valuation */}
          <div className="absolute top-4 right-4 bg-background border-2 border-border p-2 min-w-[50px] flex flex-col items-center justify-center shadow-sm rotate-3 group-hover:rotate-6 transition-transform duration-500">
             <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5 border-b border-border/50 w-full text-center pb-0.5">Val</span>
             <span className="font-black text-sm tracking-tighter">${finalPrice.toFixed(0)}</span>
          </div>

          {/* Red "Ink Stamp" for Discounts */}
          {activeDiscount > 0 && (
            <div className="absolute bottom-4 left-4 border-2 border-destructive text-destructive px-2 py-1 -rotate-12 opacity-80 backdrop-blur-sm">
              <span className="text-[10px] font-black uppercase tracking-widest">Marked Down</span>
            </div>
          )}
        </div>

        {/* Back: The Postcard Details (Split Layout) */}
        <CardContent className="px-0 py-4 pb-0 flex gap-4">
          
          {/* Left Side: Message / Description */}
          <div className="flex-1 pr-4">
            <h3 className="font-black text-xl leading-none uppercase tracking-tighter group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-xs line-clamp-2 mt-3 font-medium italic">
              "{product.description}"
            </p>
          </div>

          {/* Right Side: Address / Barcode ID */}
          <div className="border-l-2 border-border flex items-center justify-center w-8 overflow-hidden relative">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] -rotate-90 whitespace-nowrap absolute">
              REF-00{product.id}
            </span>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}