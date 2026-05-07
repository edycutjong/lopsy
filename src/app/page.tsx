"use client";

import { useState } from "react";
import { lopsyService } from "@/lib/lpagent";

// Mock Data
const MOCK_POSITIONS = [
  {
    id: "pos_1",
    pool: "SOL-USDC",
    dex: "Orca",
    status: "active",
    health: "critical",
    valueUsd: 12450.25,
    ilUsd: -2450.50,
    apr: "12.4%",
    duration: "45 days",
  },
  {
    id: "pos_2",
    pool: "JUP-SOL",
    dex: "Meteora",
    status: "active",
    health: "warning",
    valueUsd: 8200.00,
    ilUsd: -420.10,
    apr: "45.2%",
    duration: "12 days",
  },
  {
    id: "pos_3",
    pool: "BONK-USDC",
    dex: "Raydium",
    status: "closed",
    health: "safe",
    valueUsd: 0,
    ilUsd: 120.50,
    apr: "120.5%",
    duration: "4 days",
  }
];

export default function LopsyDashboard() {
  const [zapStatus, setZapStatus] = useState<Record<string, 'idle' | 'zapping' | 'zapped'>>({});

  const handleZapOut = async (id: string, poolName: string) => {
    setZapStatus(prev => ({ ...prev, [id]: 'zapping' }));
    await lopsyService.emergencyZapOut(id, poolName);
    setZapStatus(prev => ({ ...prev, [id]: 'zapped' }));
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center pb-6 border-b border-brand-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]"></div>
            LOPSY
          </h1>
          <p className="text-brand-muted mt-2 font-mono text-sm">EMERGENCY POSITION MONITOR :: V1.0.4</p>
        </div>
        <div className="flex gap-4 text-sm font-mono text-brand-muted">
          <div className="text-right">
            <div>NETWORK: <span className="text-white">MAINNET-BETA</span></div>
            <div>STATUS: <span className="text-status-success">MONITORING</span></div>
          </div>
        </div>
      </header>

      <main className="grid gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-brand-muted uppercase tracking-wider">Active Threat Vectors (Impermanent Loss)</h2>
          <div className="grid gap-4">
            {MOCK_POSITIONS.filter(p => p.status === 'active').map((pos) => {
              const isZapping = zapStatus[pos.id] === 'zapping';
              const isZapped = zapStatus[pos.id] === 'zapped';
              
              return (
                <div 
                  key={pos.id} 
                  className={`glass-panel p-6 rounded-xl transition-all duration-500 ${isZapped ? 'opacity-50 grayscale' : ''} ${pos.health === 'critical' && !isZapped ? 'border-status-error/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : ''}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold">{pos.pool}</span>
                        <span className="px-2 py-1 rounded text-xs font-mono bg-brand-surface text-brand-muted border border-brand-border">
                          {pos.dex}
                        </span>
                        {pos.health === 'critical' && !isZapped && (
                          <span className="px-2 py-1 rounded text-xs font-bold font-mono bg-status-error/20 text-status-error border border-status-error/50 flex items-center gap-2">
                            <span className="w-2 h-2 bg-status-error rounded-full animate-ping"></span>
                            BLEEDING
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-brand-muted font-mono">Duration: {pos.duration}</div>
                    </div>
                    
                    {!isZapped ? (
                      <button 
                        onClick={() => handleZapOut(pos.id, pos.pool)}
                        disabled={isZapping}
                        className={`px-6 py-2 rounded-lg font-mono font-bold transition-all ${
                          isZapping 
                            ? 'bg-status-warning/20 text-status-warning border border-status-warning animate-pulse' 
                            : 'bg-brand-primary text-white hover:bg-brand-primary/80 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                        }`}
                      >
                        {isZapping ? 'ZAPPING OUT...' : 'EMERGENCY ZAP-OUT'}
                      </button>
                    ) : (
                      <div className="px-6 py-2 rounded-lg font-mono font-bold bg-status-success/20 text-status-success border border-status-success">
                        EXTRACTED
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-6 font-mono">
                    <div className="p-4 rounded-lg bg-brand-surface/50 border border-brand-border">
                      <div className="text-xs text-brand-muted mb-1">POSITION VALUE</div>
                      <div className="text-2xl">${pos.valueUsd.toLocaleString()}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-brand-surface/50 border border-brand-border relative overflow-hidden">
                      {pos.health === 'critical' && <div className="absolute inset-0 bg-status-error/5 animate-pulse pointer-events-none"></div>}
                      <div className="text-xs text-brand-muted mb-1">IMPERMANENT LOSS</div>
                      <div className={`text-2xl ${pos.ilUsd < -1000 ? 'text-status-error' : 'text-status-warning'}`}>
                        {pos.ilUsd.toLocaleString()} USD
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-brand-surface/50 border border-brand-border">
                      <div className="text-xs text-brand-muted mb-1">CURRENT APR</div>
                      <div className="text-2xl text-status-success">{pos.apr}</div>
                    </div>
                  </div>
                  
                  {isZapping && (
                    <div className="mt-4 p-3 rounded bg-status-warning/10 border border-status-warning/30 font-mono text-sm text-status-warning flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-status-warning border-t-transparent animate-spin"></div>
                      Executing flash exit... routing liquidity through Jupiter...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
           <h2 className="text-xl font-semibold mb-4 text-brand-muted uppercase tracking-wider">Closed Position Forensics</h2>
           <div className="glass-panel rounded-xl overflow-hidden">
             <table className="w-full text-left font-mono text-sm">
               <thead className="bg-brand-surface border-b border-brand-border">
                 <tr>
                   <th className="p-4 text-brand-muted font-normal">POOL</th>
                   <th className="p-4 text-brand-muted font-normal">DEX</th>
                   <th className="p-4 text-brand-muted font-normal">DURATION</th>
                   <th className="p-4 text-brand-muted font-normal">NET P&L</th>
                   <th className="p-4 text-brand-muted font-normal">STATUS</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-brand-border">
                 {MOCK_POSITIONS.filter(p => p.status === 'closed').map(pos => (
                   <tr key={pos.id} className="hover:bg-brand-surface/30 transition-colors">
                     <td className="p-4 font-bold">{pos.pool}</td>
                     <td className="p-4 text-brand-muted">{pos.dex}</td>
                     <td className="p-4 text-brand-muted">{pos.duration}</td>
                     <td className="p-4 text-status-success">+${pos.ilUsd.toLocaleString()}</td>
                     <td className="p-4">
                       <span className="px-2 py-1 rounded text-xs bg-brand-surface text-brand-muted border border-brand-border">
                         ANALYZED
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </section>
      </main>
    </div>
  );
}
