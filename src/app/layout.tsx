import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers"; // 🟢 Import the bridge
import Toolbar from "@/components/ui/Toolbar"; 
import CartDrawer from "@/components/ui/CartDrawer"; 

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
      <body className={`${inter.className} antialiased bg-background text-foreground transition-colors duration-700 overflow-x-hidden`}>
        <Providers>
          <Toolbar />
          <CartDrawer />
          <main className="relative z-10 pt-32 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}