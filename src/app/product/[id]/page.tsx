"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { discount, addToCart, products } = useStore();

  // Find the exact product based on the URL parameter
  const product = products.find((p: any) => p.id.toString() === params.id) || products[0];

  if (!product) {
    return <main className="min-h-screen bg-background text-foreground flex items-center justify-center pt-32">Loading Neural DB...</main>;
  }

  // AI Valuation Logic
  const activeDiscount = discount || 0;
  const savings = product.price * (activeDiscount / 100);
  const finalPrice = product.price - savings;

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ ...product, finalPrice });
      alert(`[SYSTEM] ${product.name} added to secure cart.`);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 lg:pt-40 pb-40 px-6 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Back Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Index
        </button>

        {/* Cinematic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT: Massive Product Image */}
          <div className="aspect-square bg-muted relative flex items-center justify-center p-12 lg:p-24 overflow-hidden group">
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors duration-700 pointer-events-none z-10" />
            <img 
              src={product.image} 
              alt={product.name}
              className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-2xl"
            />
            {/* Asset ID watermark */}
            <span className="absolute bottom-6 right-6 text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.5em] select-none">
              ASSET_REF: {product.id}
            </span>
          </div>

          {/* RIGHT: Product Data & Valuation */}
          <div className="flex flex-col justify-center">
            
            <h1 className="text-[12vw] lg:text-[6vw] font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              {product.name}
            </h1>

            <div className="space-y-8 max-w-xl">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                {product.description}
              </p>

              {/* AI Valuation Block */}
              <div className="p-8 border border-border bg-card text-card-foreground flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Current Valuation
                  </span>
                  {activeDiscount > 0 && (
                    <span className="text-[10px] bg-green-500/10 text-green-500 font-bold px-3 py-1 uppercase tracking-widest border border-green-500/20">
                      AI Negotiated (-{activeDiscount}%)
                    </span>
                  )}
                </div>
                
                <div className="flex items-end gap-6 pt-2">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter">
                    ${finalPrice.toFixed(0)}
                  </span>
                  {activeDiscount > 0 && (
                    <span className="text-xl lg:text-2xl text-muted-foreground line-through decoration-destructive font-bold mb-2">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <button 
                onClick={handleAddToCart}
                className="w-full h-20 bg-primary text-primary-foreground text-lg font-black uppercase tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
              >
                <ShoppingCart className="w-6 h-6" />
                Acquire Asset
              </button>

              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mt-4">
                Ships globally. Encrypted logistics protocol active.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}