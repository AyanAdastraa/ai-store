"use client";
import { motion } from "framer-motion";
import { ShieldAlert, truck, RefreshCcw, Lock } from "lucide-react";

export default function LegalPage() {
  const sections = [
    {
      title: "01 / Shipping Protocol",
      icon: <truck className="w-5 h-5" />,
      content: "All physical assets are dispatched via encrypted courier within 48 hours of neural verification. Global transit typically completes within 5-7 business days. Tracking coordinates will be sent to your registered uplink."
    },
    {
      title: "02 / Returns & Reset",
      icon: <RefreshCcw className="w-5 h-5" />,
      content: "Due to the unique nature of negotiated assets, returns are only accepted if the physical item does not match the digital manifest. You have 14 days from delivery to initiate a return sequence."
    },
    {
      title: "03 / Data Sovereignty",
      icon: <Lock className="w-5 h-5" />,
      content: "We do not store your neural patterns or private images. AI analysis is performed in real-time and purged upon session termination. Your transaction history is secured via distributed ledger."
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-4">Terms_Of_Service</h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.4em]">Revision: 2026.04.01 // ARCHIVE_CORE</p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="border-t border-border pt-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-muted text-primary">{section.icon}</div>
                <h2 className="text-xl font-black uppercase tracking-tight italic">{section.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium max-w-2xl">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* The "Agreement" Box */}
        <div className="mt-20 p-8 border-2 border-dashed border-border bg-muted/30">
          <div className="flex gap-4 items-start text-muted-foreground">
            <ShieldAlert className="w-6 h-6 flex-shrink-0" />
            <p className="text-[10px] uppercase font-bold leading-relaxed tracking-widest">
              By finalizing a checkout protocol on ARCHIVE (AI.STORE), you acknowledge that you have read and agreed to the operational standards listed above. All negotiations handled by 'THE AGENT' are final once the transaction is verified on the ledger.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}