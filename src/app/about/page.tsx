export default function AboutPage() {
  return (
    // We added pt-56 md:pt-64 here to push everything down below the toolbar
    <main className="min-h-screen bg-background text-foreground pt-56 md:pt-64 pb-64 px-6 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Massive Editorial Header */}
        <header className="mb-32 border-b border-border pb-16">
          <h1 className="text-[14vw] md:text-[10vw] font-black tracking-tighter uppercase italic leading-[0.8]">
            The <br />
            <span className="text-muted-foreground/40">Manifesto.</span>
          </h1>
          <p className="mt-12 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em]">
            / Protocol Document v1.0
          </p>
        </header>

        {/* Manifesto Content */}
        <article className="max-w-3xl grid gap-12 text-lg md:text-xl leading-relaxed font-medium text-muted-foreground">
          
          <p className="text-3xl md:text-4xl text-foreground font-black tracking-tight leading-tight italic uppercase">
            Commerce is broken. It is static, rigid, and devoid of negotiation.
          </p>

          <p>
            In 2026, we introduce the <strong>Archive</strong>. A neural-negotiated marketplace where the price is not a decree, but a conversation. We believe that artificial intelligence should not just recommend products, but actively broker the exchange of value.
          </p>

          <p>
            This is not a traditional storefront. This is a dynamic valuation engine. When you interact with the Command Bar, you aren't just searching—you are negotiating directly with the core AI to determine the true market value of the asset.
          </p>

          {/* Core Tenets */}
          <div className="pl-8 border-l-4 border-primary mt-12 py-4">
            <h3 className="text-foreground font-black uppercase tracking-widest text-sm mb-8">
              System Tenets
            </h3>
            <ul className="space-y-8 text-base">
              <li className="flex flex-col gap-1">
                <strong className="text-foreground uppercase tracking-widest text-xs">I. Dynamic Valuation</strong> 
                Prices reflect real-time context, demand, and user negotiation.
              </li>
              <li className="flex flex-col gap-1">
                <strong className="text-foreground uppercase tracking-widest text-xs">II. Agentic Intermediaries</strong> 
                The AI acts as both your personal stylist and the house broker.
              </li>
              <li className="flex flex-col gap-1">
                <strong className="text-foreground uppercase tracking-widest text-xs">III. Uncompromised Aesthetic</strong> 
                Raw utility hidden seamlessly behind a brutalist, luxury interface.
              </li>
            </ul>
          </div>

        </article>
      </div>
    </main>
  );
}