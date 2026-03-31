"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/context/StoreContext"

export default function ProductCard({ product }: { product: any }) {
  const { discount } = useStore();
  
  // Logic to calculate the AI-negotiated price
  const savings = product.price * (discount / 100);
  const finalPrice = product.price - savings;

  return (
    <Card className="overflow-hidden border-zinc-200 group hover:shadow-xl transition-all duration-500">
      <div className="aspect-square bg-zinc-100 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-zinc-900 leading-tight">{product.name}</h3>
          <div className="text-right">
            {discount > 0 && (
              <p className="text-[10px] text-zinc-400 line-through decoration-red-400 font-medium">${product.price}</p>
            )}
            <Badge className={discount > 0 ? "bg-green-600 hover:bg-green-600 text-white" : "bg-zinc-100 text-zinc-900 border-none shadow-none"}>
              ${finalPrice.toFixed(0)}
            </Badge>
          </div>
        </div>
        <p className="text-zinc-500 text-sm line-clamp-2 mt-1">{product.description}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}