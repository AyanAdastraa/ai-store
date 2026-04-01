"use client";

import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "@/context/StoreContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreProvider>
        {children}
      </StoreProvider>
    </SessionProvider>
  );
}