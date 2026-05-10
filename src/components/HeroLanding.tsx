"use client";

import { useEffect, useState } from "react";

export function HeroLanding({ onEnter }: { onEnter: () => void }) {
  const [mounted] = useState(() => typeof window !== 'undefined');

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-brand-bg flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid & Scanline */}
      <div className="absolute inset-0 bg-grid-pattern-glow opacity-50"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-[5px] bg-brand-primary/30 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-scanline pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center animate-float px-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-6 h-6 bg-brand-primary rounded-full animate-pulse-slow shadow-[0_0_30px_rgba(239,68,68,0.8)]"></div>
          <span className="text-status-error font-mono tracking-widest text-sm border border-status-error/30 px-3 py-1 rounded bg-status-error/10">
            SYSTEM CRITICAL
          </span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-2 text-glow">
          LOPSY
        </h1>
        
        <h2 className="text-xl md:text-3xl text-brand-muted font-mono tracking-widest mb-12 max-w-2xl">
          AUTONOMOUS IMPERMANENT LOSS EXTRACTOR
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <button 
            onClick={onEnter}
            className="group relative px-8 py-4 bg-brand-primary/10 text-brand-primary font-mono font-bold text-xl rounded-none border border-brand-primary/50 overflow-hidden transition-all hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] animate-glow"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            INITIALIZE MONITOR
          </button>
        </div>

        {/* Stats Ticker */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono border-t border-brand-border/50 pt-12 w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">421<span className="text-sm text-brand-muted">MS</span></span>
            <span className="text-xs text-brand-muted tracking-widest">AVG ZAP-OUT TIME</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-status-success mb-1">$14.2<span className="text-sm text-brand-muted">M</span></span>
            <span className="text-xs text-brand-muted tracking-widest">CAPITAL PRESERVED</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">99.99<span className="text-sm text-brand-muted">%</span></span>
            <span className="text-xs text-brand-muted tracking-widest">UPTIME</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-status-warning mb-1">ACTIVE</span>
            <span className="text-xs text-brand-muted tracking-widest">THREAT INTEL</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-brand-muted/50 font-mono text-xs text-center w-full">
        SECURE CONNECTION ESTABLISHED // ENCRYPTED TERMINAL
      </div>
    </div>
  );
}
