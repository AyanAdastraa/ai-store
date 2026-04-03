import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers"; 
import Toolbar from "@/components/ui/Toolbar"; 
import CartDrawer from "@/components/ui/CartDrawer"; 
import CustomCursor from "@/components/ui/CustomCursor"; 
import CommandBar from "@/components/ui/CommandBar"; 

import { SmoothScroll } from "@/components/ui/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archive | 2026",
  description: "Neural-negotiated marketplace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground overflow-x-hidden min-h-[100dvh]`}>
        <Providers>
          <SmoothScroll>
          
          {/* Hides the custom cursor on mobile to fix touch bugs */}
          <div className="hidden md:block">
            <CustomCursor /> 
          </div>

          <Toolbar />
          <CartDrawer />
          <CommandBar /> 
          
          {/* Main Content Safe Zone */}
          <main className="relative z-10 pt-24 md:pt-32 min-h-[100dvh]">
            {children}
          </main>

          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}