import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-32 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-6 pt-10 pb-6 border-b border-white/5 animate-pulse">
          <div className="h-16 w-3/4 bg-white/5 rounded-lg" />
          <div className="h-6 w-1/2 bg-white/5 rounded-lg" />
        </div>

        {/* Analytics Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel h-40 rounded-2xl border border-white/5 bg-white/5 animate-pulse flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
            </div>
          ))}
        </div>

        {/* Orders Skeleton */}
        <div className="space-y-4 pt-8">
          {[1, 2].map((i) => (
            <div key={i} className="glass-panel h-24 rounded-2xl border border-white/5 bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
