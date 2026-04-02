"use client";
import { Sparkles, Loader2, Camera, X, ArrowRight, Activity } from 'lucide-react'; 
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';

export default function CommandBar() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null); 
  
  const [chatLog, setChatLog] = useState<{role: 'user' | 'agent', content: any}[]>([]);

  const [negotiationState, setNegotiationState] = useState({
    userLastOffer: null as string | null,
    aiCounter: null as number | null,
    status: "idle"
  });

  // Pulling in all required actions from the store
  const { setDiscount, addToCart, setIsCartOpen, isAgentOpen, setIsAgentOpen } = useStore(); 

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog, loading]);

  const handleAsk = async () => {
    if (!input && !image) return;
    
    const userMessage = input || "Analyzed Attached Asset";
    setChatLog(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setLoading(true);
    setInput(""); 
    
    try {
      const formData = new FormData();
      if (input) formData.append("message", input);
      if (image) formData.append("image", image);
      formData.append("contextState", JSON.stringify(negotiationState));
      formData.append("history", JSON.stringify(chatLog));

      const res = await fetch('/api/chat', { method: 'POST', body: formData });
      const decision = await res.json();

      setChatLog(prev => [...prev, { role: 'agent', content: decision }]);

      setNegotiationState({
        userLastOffer: userMessage,
        aiCounter: decision.price,
        status: decision.status
      });

      // SYSTEM ACTIONS: Fire Cart & Discounts on Deal
      if (decision.status === "deal") {
        if (decision.discount_percentage > 0 && setDiscount) {
          setDiscount(decision.discount_percentage);
        }

        if (addToCart && decision.price !== null) {
          addToCart({
            id: `asset-${Date.now()}`,
            name: decision.product_name || "Secured Neural Asset",
            price: decision.price, 
            quantity: 1
          });

          // Open cart drawer after short delay for impact
          setTimeout(() => {
            if (setIsCartOpen) setIsCartOpen(true);
          }, 1500);
        }
      }

    } catch (error) {
      setChatLog(prev => [...prev, { role: 'agent', content: { status: "error", reason: "Connection severed." } }]);
    } finally {
      setLoading(false);
      setImage(null);
    }
  };

  if (!isAgentOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/20 backdrop-blur-sm z-[150] animate-in fade-in duration-300" onClick={() => setIsAgentOpen(false)} />

      <div className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[450px] z-[200] bg-background/40 backdrop-blur-3xl border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30 bg-background/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-[0.2em] uppercase leading-none">Decision Engine</h2>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-1">Status: {negotiationState.status}</p>
            </div>
          </div>
          <button onClick={() => setIsAgentOpen(false)} className="p-2 rounded-full hover:bg-muted">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Chat Viewport */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] fixed">
             <Sparkles className="w-64 h-64" />
          </div>

          {chatLog.length === 0 && (
            <div className="text-xs text-muted-foreground text-center my-auto uppercase tracking-widest flex flex-col items-center gap-4 animate-in fade-in">
              System initialized. <br/> Awaiting parameters.
            </div>
          )}

          {chatLog.map((log, index) => (
            <div key={index} className={`flex w-full ${log.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
              
              {log.role === 'user' ? (
                <div className="bg-primary text-primary-foreground text-sm p-4 rounded-2xl rounded-tr-sm max-w-[85%] shadow-md">
                  {log.content}
                </div>
              ) : (
                <div className="flex flex-col gap-3 bg-background/80 backdrop-blur-md p-5 rounded-2xl rounded-tl-sm border border-border shadow-xl w-full max-w-[95%]">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className={`font-black uppercase text-[10px] tracking-[0.2em] ${log.content.status === 'deal' ? 'text-green-500' : 'text-primary'}`}>
                      STATUS: {log.content.status?.replace("_", " ") || "UNKNOWN"}
                    </span>
                  </div>

                  <div className="text-sm text-foreground italic border-l-2 border-primary/30 pl-3">
                    "{log.content.reason}"
                  </div>

                  {log.content.price !== null && log.content.price !== undefined && (
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 flex justify-between items-end mt-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Offer / Counter</span>
                      <span className="text-lg font-black tracking-tighter">${log.content.price}</span>
                    </div>
                  )}

                  {log.content.status === 'deal' && log.content.discount_percentage > 0 && (
                     <div className="bg-green-500/10 text-green-500 border border-green-500/20 p-2 rounded-lg text-center text-[10px] font-black uppercase tracking-[0.2em]">
                       {log.content.product_name ? `${log.content.product_name} Added To Cart` : 'Asset Added To Cart'}
                     </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {loading && (
             <div className="flex w-full justify-start animate-in fade-in">
                <div className="bg-background/80 p-4 rounded-2xl rounded-tl-sm border border-border flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Processing...</span>
                </div>
             </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-6 border-t border-border/30 bg-background/40 backdrop-blur-xl">
          {image && (
            <div className="flex items-center justify-between bg-primary/10 border border-primary/20 p-3 rounded-lg text-xs mb-4">
              <span className="truncate max-w-[250px] text-primary font-medium">Attached: {image.name}</span>
              <button onClick={() => setImage(null)} className="p-1 hover:bg-background rounded-full"><X className="w-3 h-3 text-primary" /></button>
            </div>
          )}
          
          <div className="flex items-center gap-2 bg-background/60 border border-border rounded-xl p-2 focus-within:border-primary/50 transition-colors shadow-inner">
            <button onClick={() => fileInputRef.current?.click()} className={`p-3 rounded-lg transition-colors ${image ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground hover:bg-muted'}`}>
              <Camera className="w-5 h-5" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />

            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder={negotiationState.status === 'deal' ? "Negotiation concluded." : "Transmit offer..."} 
              disabled={negotiationState.status === 'deal' || loading}
              className="flex-1 bg-transparent outline-none text-sm p-2 text-foreground placeholder:text-muted-foreground/50 disabled:opacity-50"
            />

            <button onClick={handleAsk} disabled={loading || negotiationState.status === 'deal'} className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 flex justify-center shadow-lg">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}