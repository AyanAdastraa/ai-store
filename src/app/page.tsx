import { products } from "@/lib/products"
import ProductCard from "@/components/ui/ProductCard"
import CommandBar from "@/components/ui/CommandBar"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50/50 pb-40">
      <nav className="p-6 bg-white border-b border-zinc-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tighter">AI.STORE</h1>
          <div className="flex gap-2 items-center text-sm font-medium text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            AI Sales Agent Online
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Featured Gear</h2>
          <p className="text-zinc-500">Try haggling with the AI assistant for a better price.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <CommandBar />
    </main>
  )
}