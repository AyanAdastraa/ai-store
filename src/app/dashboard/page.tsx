import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PackageOpen, CreditCard, PiggyBank, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  // Fetch orders directly from DB for maximum Server Component performance
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalSpent = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
  const totalSaved = orders.reduce((sum: number, order: any) => sum + order.totalSaved, 0);

  return (
    <div className="min-h-screen bg-[var(--background)] py-32 px-6 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Header Section */}
        <header className="space-y-6 pt-10 pb-6 border-b border-white/5">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40">
              Welcome back,<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-blue-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                {session.user.name?.split(' ')[0]}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] font-light max-w-2xl leading-relaxed tracking-wide">
              Command center for your digital archive. Monitor your high-end neural acquisitions and track your investment analytics in real-time.
            </p>
          </div>
        </header>

        {/* Analytics Engine */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500 hover:border-[var(--primary)]/50 hover:bg-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-[var(--primary)]/10 w-12 h-12 rounded-full flex items-center justify-center">
                <PackageOpen className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--muted)] uppercase tracking-wider mb-1 font-medium">Total Orders</p>
                <p className="text-4xl font-semibold text-[var(--foreground)]">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="group relative glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500 hover:border-emerald-500/50 hover:bg-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-emerald-500/10 w-12 h-12 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-[var(--muted)] uppercase tracking-wider mb-1 font-medium">Total Invested</p>
                <p className="text-4xl font-semibold text-[var(--foreground)]">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="group relative glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500 hover:border-purple-500/50 hover:bg-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-[var(--muted)] uppercase tracking-wider mb-1 font-medium">Capital Saved</p>
                <p className="text-4xl font-semibold text-[var(--foreground)]">${totalSaved.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-medium text-[var(--foreground)]">Acquisition History</h2>
            <Link href="/shop" className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors flex items-center gap-2">
              Browse Archive <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="glass-panel rounded-2xl border border-white/5 p-16 text-center flex flex-col items-center justify-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[var(--primary)]/5 flex items-center justify-center mb-2">
                <PackageOpen className="w-10 h-10 text-[var(--primary)]/60" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-xl font-medium text-[var(--foreground)]">No active acquisitions</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  Your archive is currently empty. Begin your collection by browsing our digital catalog of high-end neural assets.
                </p>
              </div>
              <Link 
                href="/shop" 
                className="mt-4 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium transition-all hover:scale-105 hover:bg-[var(--primary)] active:scale-95"
              >
                Access Catalog
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div key={order.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[var(--muted)] bg-white/5 px-2 py-1 rounded">
                          {order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--muted)] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="flex -space-x-4">
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="w-12 h-12 rounded-full border-2 border-[var(--background)] overflow-hidden bg-[var(--card)] relative group/tooltip">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-[var(--muted)] mb-1">Total</p>
                      <p className="text-xl font-medium text-[var(--foreground)]">${order.totalAmount.toFixed(2)}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
