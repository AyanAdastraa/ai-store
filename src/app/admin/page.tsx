import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Activity, ShieldAlert, DollarSign, Users, Package, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Neural Admin | AI Store",
};

export default async function AdminDashboardPage() {
  const session = await auth();

  // Basic security: Must be logged in. (In production, check session.user.email against an admin list!)
  if (!session?.user) {
    redirect("/");
  }

  // Fetch ALL global platform data
  const allOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalUsersCount = await prisma.user.count();
  
  // Calculate Global Platform Metrics
  const globalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const globalSaved = allOrders.reduce((sum, order) => sum + order.totalSaved, 0);
  const globalAvgDiscount = globalRevenue + globalSaved > 0 
    ? ((globalSaved / (globalRevenue + globalSaved)) * 100).toFixed(1) 
    : 0;

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Admin Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-destructive animate-pulse" />
              <h1 className="text-4xl font-bold tracking-tighter text-foreground">
                SysAdmin Override
              </h1>
            </div>
            <p className="text-muted-foreground">
              Global Neural Network surveillance and platform-wide analytics.
            </p>
          </div>
          <Link href="/dashboard" className="px-6 py-2 bg-muted text-foreground text-sm font-semibold rounded-full hover:bg-muted/80 transition-colors">
            Return to User Mode
          </Link>
        </header>

        {/* Global Telemetry Database */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-2xl border border-destructive/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-24 h-24" />
            </div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2 relative z-10">Total Platform Revenue</p>
            <p className="text-4xl font-black text-foreground relative z-10">${globalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-24 h-24" />
            </div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2 relative z-10">Global AI Savings</p>
            <p className="text-4xl font-black text-emerald-500 relative z-10">${globalSaved.toFixed(2)}</p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Users className="w-24 h-24" />
            </div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2 relative z-10">Registered Users</p>
            <p className="text-4xl font-black text-foreground relative z-10">{totalUsersCount}</p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Package className="w-24 h-24" />
            </div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2 relative z-10">Total Sales Processed</p>
            <p className="text-4xl font-black text-foreground relative z-10">{allOrders.length}</p>
          </div>
        </div>

        {/* Global Live Feed */}
        <section className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold border-b border-border pb-4 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" /> Live Order Stream
          </h2>

          {allOrders.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground border border-border rounded-xl">
              No orders have been recorded on the platform yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-medium tracking-wide">ORDER ID</th>
                    <th className="px-6 py-4 font-medium tracking-wide">USER</th>
                    <th className="px-6 py-4 font-medium tracking-wide">DATE</th>
                    <th className="px-6 py-4 font-medium tracking-wide text-right">REVENUE</th>
                    <th className="px-6 py-4 font-medium tracking-wide text-right">DISCOUNT</th>
                    <th className="px-6 py-4 font-medium tracking-wide">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-mono select-all">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{order.user?.name || 'Anonymous'}</span>
                          <span className="text-xs text-muted-foreground">{order.user?.email || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-bold">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {order.totalSaved > 0 ? (
                          <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded">
                            ${order.totalSaved.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
