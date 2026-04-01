"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"default" | "low" | "high">("default");

  // Dynamically filter and sort the products array based on user input
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Apply Search Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query)
      );
    }

    // 2. Apply Sorting
    if (sortOrder === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, sortOrder, products]);

  return (
    <main className="min-h-screen bg-background text-foreground pt-40 md:pt-48 pb-64 px-6 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Shop Header */}
        <header className="mb-16">
          <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase italic leading-none">
            The <br />
            <span className="text-muted-foreground/40">Index.</span>
          </h1>
          <p className="mt-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">
            / All Available Assets ({filteredAndSortedProducts.length})
          </p>
        </header>

        {/* 🎛️ The Filter & Sort Control Bar */}
        <div className="sticky top-24 z-40 bg-background/90 backdrop-blur-xl border-y border-border py-4 mb-16 flex flex-col md:flex-row gap-4 justify-between items-center transition-all">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH_ASSETS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-muted/50 border border-transparent focus:border-primary focus:bg-background outline-none text-sm font-bold uppercase tracking-widest transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex items-center gap-2 px-4 border-r border-border mr-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Sort</span>
            </div>
            
            <button 
              onClick={() => setSortOrder("default")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${sortOrder === "default" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              Default
            </button>
            <button 
              onClick={() => setSortOrder("low")}
              className={`px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${sortOrder === "low" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              Price <ArrowDownAZ className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setSortOrder("high")}
              className={`px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${sortOrder === "high" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              Price <ArrowUpZA className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty State Handler */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="py-32 text-center border border-border bg-muted/20">
            <p className="text-xl font-black uppercase tracking-widest text-muted-foreground mb-2">No Assets Found</p>
            <p className="text-sm font-medium text-muted-foreground/60">Try adjusting your search parameters.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary underline underline-offset-4"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Dense Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </main>
  );
}