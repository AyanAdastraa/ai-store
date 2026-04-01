"use client";
import { Sparkles, Send, Loader2, Camera, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useStore } from '@/context/StoreContext';

export default function CommandBar() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Failsafe extraction in case store isn't fully mounted
  const { setDiscount } = useStore();

  const handleAsk = async () => {
    if (!input && !image) return;
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("message", input || "Analyze this image and recommend a product.");
      if (image) formData.append("image", image);

      const res = await fetch('/api/chat', {
        method: 'POST',
        body: formData, 
      });
      
      const data = await res.json();
      setAiResponse(data.text);

      // Apply negotiated discounts safely
      if (setDiscount) {
        if (data.text.includes("10%")) setDiscount(10);
        if (data.text.includes("15%")) setDiscount(15);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setAiResponse("System Error: Unable to reach the AI agent. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
      setImage(null);
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
      {aiResponse && (
        <div className="mb-4 p-5 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-4 text-foreground">
           <span className="font-bold text-primary block mb-1 underline decoration-primary/20 uppercase text-[10px] tracking-widest">AI Agent</span>
          {aiResponse}
        </div>
      )}

      <div className="bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-2 flex items-center gap-2 group transition-all duration-300">
        
        {/* 📸 Image Upload Logic */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-xl transition-colors ${image ? 'bg-green-500/20 text-green-500' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
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
          placeholder={image ? `Image "${image.name}" attached...` : "Negotiate a deal..."} 
          className="flex-1 bg-transparent outline-none text-sm p-2 text-foreground placeholder:text-muted-foreground"
        />

        {image && (
          <button onClick={() => setImage(null)} className="p-1 hover:bg-muted rounded-full">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        <button 
          onClick={handleAsk}
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ask"}
        </button>
      </div>
    </div>
  );
}