import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
      </div>
      <p className="text-sm uppercase tracking-widest font-mono text-muted-foreground animate-pulse">
        Initializing Neural Link...
      </p>
    </div>
  );
}
