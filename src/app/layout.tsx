import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Toolbar from "@/components/ui/Toolbar"; 
import CartDrawer from "@/components/ui/CartDrawer"; 
import CustomCursor from "@/components/ui/CustomCursor"; // <-- Import it

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
        <StoreProvider>
          <CustomCursor /> {/* <-- Mount it here */}
          <Toolbar />
          <CartDrawer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}