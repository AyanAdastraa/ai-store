import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers"; 
import Toolbar from "@/components/ui/Toolbar"; 
import CartDrawer from "@/components/ui/CartDrawer"; 
import CustomCursor from "@/components/ui/CustomCursor"; 
// 🟢 1. Import the CommandBar (your new AI Agent) here
import CommandBar from "@/components/ui/CommandBar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archive | 2026",
  description: "Neural-negotiated marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground transition-colors duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-x-hidden cursor-none`}>
        <Providers>
          <CustomCursor /> 
          <Toolbar />
          <CartDrawer />
          {/* 🟢 2. Render the Agent globally so it exists on every page */}
          <CommandBar /> 
          
          <main className="relative z-10 pt-32 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}