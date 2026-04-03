"use client";

import { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service securely
    console.error("Global Catch:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-destructive/10 p-6 rounded-full mb-8 relative group">
        <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
        <AlertOctagon className="w-16 h-16 text-destructive relative z-10" />
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Critical Subsystem Failure</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        We encountered a fatal anomaly within the neural connection. Please reset the interface module to resume operations safely.
      </p>
      
      <button
        onClick={() => reset()}
        className="flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-primary transition-all active:scale-95 group"
      >
        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        Re-Initialize Link
      </button>
    </div>
  );
}
