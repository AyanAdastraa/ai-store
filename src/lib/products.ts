export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aether Ultra Headphones",
    description: "Neural-tuned acoustic architecture with active noise cancellation.",
    price: 350,
    // 🟢 Use the full Unsplash URL
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Vantage Backpack",
    description: "Ballistic-grade nylon with modular internal storage for tech assets.",
    price: 180,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Mono-01 Desk Lamp",
    description: "Architectural lighting with a 2700K warm-spectrum OLED panel.",
    price: 210,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Sector Glassware Set",
    description: "Hand-blown borosilicate glass with custom hexagonal geometry.",
    price: 85,
    image: "https://images.unsplash.com/photo-1516914938032-909772183c5a?q=80&w=1000&auto=format&fit=crop",
  }
];