"use client";
import { Sparkles, Loader2, Camera, X, ArrowRight } from 'lucide-react'; 
import { useState, useRef } from 'react';
import { useStore } from '@/context/StoreContext';

export default function CommandBar() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 🟢 Connect to our new global state
  const { setDiscount, isAgentOpen, setIsAgentOpen } = useStore(); 

  const handleAsk = async () => {
    if (!input && !image) return;
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("message", input || "Analyze this image and recommend a product.");
      if (image) formData.append("image", image);

      const res = await fetch('/api/chat', { method: 'POST', body: formData });
      const data = await res.json();
      setAiResponse(data.text);

      if (setDiscount) {
        if (data.text.includes("10%")) setDiscount(10);
        if (data.text.includes("15%")) setDiscount(15);
      }
    } catch (error) {
      setAiResponse("System Error: Unable to reach the AI agent.");
    } finally {
      setLoading(false);
      setInput("");
      setImage(null);
    }
  };

  // If closed, render nothing
  if (!isAgentOpen) return null;

  return (
    <>
      {/* 🟢 Backdrop Blur Overlay */}
      <div 
        className="fixed inset-0 bg-background/20 backdrop-blur-sm z-[150] animate-in fade-in duration-300"
        onClick={() => setIsAgentOpen(false)}
      />

      {/* 🟢 The Glass Sidebar Terminal */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] z-[200] bg-background/40 backdrop-blur-3xl border-l border-white/10 dark:border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col animate-in slide-in-from-right-full duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30 bg-background/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-[0.2em] uppercase leading-none">Neural Agent</h2>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-1">Ready to negotiate</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAgentOpen(false)} 
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Chat / Viewport Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-end relative">
          
          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
             <Sparkles className="w-64 h-64" />
          </div>

          {aiResponse ? (
            <div className="text-sm leading-relaxed text-foreground bg-background/60 backdrop-blur-md p-6 rounded-xl border border-border shadow-xl animate-in slide-in-from-bottom-4 relative z-10">
              <span className="font-bold text-primary block mb-3 underline decoration-primary/20 uppercase text-[10px] tracking-[0.2em]">Agent Response</span>
              {aiResponse}
            </div>
          ) : (
             <div className="text-xs text-muted-foreground text-center mb-10 uppercase tracking-widest flex flex-col items-center gap-4 animate-in fade-in duration-1000">
               Upload an image of an item to find a match, <br/> or type to negotiate pricing.
             </div>
          )}
        </div>

        {/* Input Terminal Footer */}
        <div className="p-6 border-t border-border/30 bg-background/40 backdrop-blur-xl">
          
          {/* Attached Image Preview */}
          {image && (
            <div className="flex items-center justify-between bg-primary/10 border border-primary/20 p-3 rounded-lg text-xs mb-4">
              <span className="truncate max-w-[250px] text-primary font-medium">Attached: {image.name}</span>
              <button onClick={() => setImage(null)} className="p-1 hover:bg-background rounded-full">
                <X className="w-3 h-3 text-primary" />
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-2 bg-background/60 border border-border rounded-xl p-2 focus-within:border-primary/50 transition-colors shadow-inner">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className={`p-3 rounded-lg transition-colors ${image ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <Camera className="w-5 h-5" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Initialize command..." 
              className="flex-1 bg-transparent outline-none text-sm p-2 text-foreground placeholder:text-muted-foreground/50 font-medium"
            />

            <button 
              onClick={handleAsk}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center shadow-lg"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}