export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aether Ultra Headphones",
    price: 299,
    description: "Neural-tuned noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Vantage Backpack",
    price: 120,
    description: "Weatherproof urban commute bag.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
  }
];