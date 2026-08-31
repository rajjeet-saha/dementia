import React from 'react';
import { 
  WifiOff, 
  RefreshCw, 
  HardDrive, 
  Cloud, 
  CheckCircle2
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const OfflineSection: React.FC = () => {
  const { speakText } = useAccessibility();

  return (
    <section 
      id="offline" 
      className="py-20 md:py-28 bg-white border-b border-slate-200/70"
      aria-labelledby="offline-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Resilient Architecture</span>
          </div>

          <h2 
            id="offline-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Designed for Low-Connectivity Environments
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Core cognitive engagement, adaptive heuristics, and medication schedules are completely self-contained on the device, ensuring uninterrupted elderly care even in deep rural dead zones.
          </p>
        </div>

        {/* Visual Architecture Diagram: ONLINE <-> SYNC <-> OFFLINE */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border-4 border-slate-800 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center relative">
            {/* Box 1: OFFLINE LOCAL STATE */}
            <div 
              className="bg-slate-800/90 rounded-2xl p-6 border-2 border-teal-500/80 shadow-md space-y-3"
              onMouseEnter={() => speakText("Offline Mode: Full gameplay, voice assistant, and reminders operate locally without network access.")}
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto border border-teal-400/40">
                <HardDrive className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block">
                Local Device
              </span>
              <h3 className="text-lg font-bold text-white">OFFLINE MODE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All 3 games, audio voice lines, adaptive AI scoring, and reminder schedules operate autonomously.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 py-1 rounded-lg border border-emerald-800/60">
                ✓ 100% Functionality
              </div>
            </div>

            {/* Middle: SYNC PIPELINE */}
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-teal-700/50 border-2 border-teal-400 text-teal-300 flex items-center justify-center animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Background Queue
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">AUTOMATIC SYNC</h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                  Opportunistic bidirectional sync when cell signal or Wi-Fi reconnects.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                ONLINE ↕ SYNC ↕ OFFLINE
              </span>
            </div>

            {/* Box 3: ONLINE CAREGIVER CLOUD */}
            <div 
              className="bg-slate-800/90 rounded-2xl p-6 border-2 border-slate-700 shadow-md space-y-3"
              onMouseEnter={() => speakText("Online Cloud: Caregiver portal receives updated session scores and logs.")}
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto border border-teal-400/40">
                <Cloud className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block">
                Supabase Backend
              </span>
              <h3 className="text-lg font-bold text-white">ONLINE CLOUD</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aggregates longitudinal metrics, score history, and active reminders for caregiver review.
              </p>
              <div className="pt-2 text-[11px] font-bold text-teal-300 bg-teal-950/60 py-1 rounded-lg border border-teal-800/60">
                ✓ Caregiver Insights
              </div>
            </div>
          </div>

          {/* Bottom Highlights */}
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Zero data loss during outages</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Lightweight payload sync (&lt; 2KB)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Encrypted local storage on Android</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
