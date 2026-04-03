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
        <header className="space-y-6 pt-10 pb-6 border-b border-border">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-muted-foreground">
              Welcome back,<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                {session.user.name?.split(' ')[0]}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed tracking-wide">
              Command center for your digital archive. Monitor your high-end neural acquisitions and track your investment analytics in real-time.
            </p>
          </div>
        </header>

        {/* Analytics Engine */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative bg-card p-6 rounded-2xl border border-border shadow-sm transition-all duration-500 hover:border-primary/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                <PackageOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">Total Orders</p>
                <p className="text-3xl font-semibold text-foreground">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-card p-6 rounded-2xl border border-border shadow-sm transition-all duration-500 hover:border-blue-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">Total Invested</p>
                <p className="text-3xl font-semibold text-foreground">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-card p-6 rounded-2xl border border-border shadow-sm transition-all duration-500 hover:border-emerald-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-emerald-500/10 w-10 h-10 rounded-full flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-emerald-500 uppercase tracking-wider mb-1 font-medium">Capital Saved</p>
                <p className="text-3xl font-semibold text-foreground">${totalSaved.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-card p-6 rounded-2xl border border-border shadow-sm transition-all duration-500 hover:border-purple-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="bg-purple-500/10 w-10 h-10 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">Avg AI Discount</p>
                <p className="text-3xl font-semibold text-foreground">
                  {totalSpent + totalSaved > 0 ? ((totalSaved / (totalSpent + totalSaved)) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium text-foreground">Acquisition History</h2>
            <Link href="/shop" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
              Browse Archive <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-12 text-center flex flex-col items-center justify-center gap-6 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                <PiggyBank className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="space-y-2 max-w-lg">
                <h3 className="text-xl font-medium text-foreground">Did you know?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our autonomous **AI Engine** has saved users over 24% on asset procurements this week through real-time localized negotiation. 
                  <br className="hidden md:block"/> Connect to the neural link to begin your collection.
                </p>
              </div>
              <Link 
                href="/shop" 
                className="mt-6 px-8 py-3 bg-primary text-primary-foreground text-sm rounded-full font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Access Catalog
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any) => (
                <div key={order.id} className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-sm group space-y-6">
                  
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/50">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-foreground bg-muted border border-border px-3 py-1.5 rounded tracking-widest shadow-inner">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded tracking-wider shadow-sm">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                        <Calendar className="w-4 h-4 opacity-70" />
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total Valuation</p>
                      <p className="text-3xl font-bold text-foreground tracking-tighter">${order.totalAmount.toFixed(2)}</p>
                      {order.totalSaved > 0 && (
                        <p className="text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded inline-block mt-2 shadow-sm animate-pulse">
                           Saved ${order.totalSaved.toFixed(0)} ({((order.totalSaved / (order.totalAmount + order.totalSaved)) * 100).toFixed(0)}%)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items.map((item: any, i: number) => {
                       const itemOriginal = item.product.price;
                       const itemFinal = item.price;
                       const difference = itemOriginal - itemFinal;
                       return (
                      <div key={i} className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg border border-border">
                        <div className="w-16 h-16 rounded overflow-hidden bg-background flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-xs font-bold uppercase tracking-wider mb-1 line-clamp-1">{item.product.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-muted-foreground line-through decoration-destructive decoration-2">
                              ${itemOriginal.toFixed(2)}
                            </span>
                            <span className="text-sm font-bold text-emerald-500">
                              ${itemFinal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )})}
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
