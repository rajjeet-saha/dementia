import React from 'react';
import { 
  Download, 
  ArrowRight, 
  Brain, 
  Heart, 
  WifiOff, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Bot
} from 'lucide-react';
import { handleAppDownload } from '../../config/appConfig';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Hero: React.FC = () => {
  const { speakText } = useAccessibility();

  const handleExploreClick = () => {
    const element = document.querySelector('#problem');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/60 via-slate-50 to-white border-b border-slate-200/60"
      aria-label="Introduction Hero"
    >
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description, CTAs, Highlights */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-300/80 text-teal-900 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-ping" />
              <span>AI-Powered Cognitive Assistance for Elderly Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Technology that supports <br />
              <span className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
                cognitive well-being.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              An AI-powered cognitive gaming and memory assistance platform designed to make cognitive engagement, daily assistance, and caregiver support more accessible.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 shadow-lg shadow-teal-900/20 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-300"
                onMouseEnter={() => speakText("Download App: Get the Android APK for mobile and tablet")}
              >
                <Download className="w-5 h-5" />
                <span>Download App</span>
                <span className="text-xs bg-teal-800/80 font-medium px-2 py-0.5 rounded-full ml-1 border border-teal-600/40">
                  Android APK
                </span>
              </button>

              <button
                onClick={handleExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-xs transition hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-200"
                onMouseEnter={() => speakText("Explore Platform: Discover features and architecture")}
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Core Trust & Technical Indicators */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Adaptive AI</p>
                  <p className="text-[11px] text-slate-500">Dynamic 3-Tier Rule Engine</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Offline-Ready</p>
                  <p className="text-[11px] text-slate-500">Zero-Connectivity Care</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Elderly-First</p>
                  <p className="text-[11px] text-slate-500">High Contrast & Voice</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Caregiver Portal</p>
                  <p className="text-[11px] text-slate-500">Supabase Connected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Godot App Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative Tablet/Phone Frame */}
              <div className="relative rounded-[2.5rem] bg-slate-900 p-3.5 shadow-2xl shadow-slate-900/30 border-4 border-slate-700/80 ring-1 ring-slate-900/50">
                {/* Speaker Notch */}
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-950/80 mr-2" />
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Inner Device Screen: Godot 4.x Dementia UI Simulation */}
                <div className="bg-slate-50 rounded-[2rem] p-5 overflow-hidden text-slate-800 font-sans border border-slate-200">
                  {/* Godot App Header Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">DEMENTIA</h4>
                        <p className="text-[10px] text-teal-700 font-semibold">Morning Session</p>
                      </div>
                    </div>
                    
                    {/* Live Adaptive AI Badge */}
                    <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>Adaptive: Level 2</span>
                    </div>
                  </div>

                  {/* Patient Greeting & Status */}
                  <div className="mt-4 p-3.5 bg-teal-700 text-white rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-teal-200 font-medium">Daily Engagement</span>
                      <span className="text-[11px] bg-teal-800 px-2 py-0.5 rounded text-teal-100 font-mono">Streak: 5 Days</span>
                    </div>
                    <p className="text-base font-bold mt-1">Hello, Tenzing!</p>
                    <p className="text-xs text-teal-100 mt-0.5">Let's complete your morning memory activity.</p>
                  </div>

                  {/* Active Game Preview: Memory Game 01 */}
                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">Today's Cognitive Activity</span>
                      <span className="text-[11px] text-slate-500">Memory & Routine Recall</span>
                    </div>

                    {/* Interactive Match Cards Preview */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-100 rounded-xl border border-slate-200">
                      <div className="h-16 rounded-lg bg-white border-2 border-teal-600 flex flex-col items-center justify-center shadow-xs">
                        <span className="text-xl">🍵</span>
                        <span className="text-[9px] font-bold text-slate-700">Tea Kettle</span>
                      </div>
                      <div className="h-16 rounded-lg bg-teal-600 text-white flex flex-col items-center justify-center shadow-xs">
                        <Brain className="w-6 h-6 animate-pulse" />
                        <span className="text-[9px] font-bold">Matching</span>
                      </div>
                      <div className="h-16 rounded-lg bg-white border-2 border-teal-600 flex flex-col items-center justify-center shadow-xs">
                        <span className="text-xl">🌿</span>
                        <span className="text-[9px] font-bold text-slate-700">Herbal Plant</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Reminder Pill */}
                  <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">💊</span>
                      <div>
                        <p className="text-xs font-bold text-amber-950">Donepezil (5mg)</p>
                        <p className="text-[10px] text-amber-800">Due at 08:30 AM • Daily</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  {/* Large Elderly Action Button */}
                  <div className="mt-4">
                    <div className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl text-center shadow-sm flex items-center justify-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>Start Activity (Large Touch)</span>
                    </div>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
              </div>

              {/* Floating Technology Feature Pill */}
              <div className="absolute -bottom-5 -left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Offline Capable</p>
                  <p className="text-[11px] text-slate-500">Autonomous local storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
