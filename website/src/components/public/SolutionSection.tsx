import React from 'react';
import { 
  Gamepad2, 
  Bot, 
  BellRing, 
  Activity, 
  Eye, 
  WifiOff, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Brain
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const SolutionSection: React.FC = () => {
  const { speakText } = useAccessibility();

  const solutionPillars = [
    {
      title: 'Interactive Cognitive Games',
      desc: 'Targeted memory recall, pattern recognition, and focus exercises with large touch controls.',
      icon: Gamepad2,
      tag: 'Engagement',
    },
    {
      title: 'Explainable Adaptive AI',
      desc: 'Real-time rule engine calibrates difficulty across 3 levels to avoid frustration or boredom.',
      icon: Bot,
      tag: 'Adaptive Engine',
    },
    {
      title: 'Holistic Reminder System',
      desc: 'Timely voice and visual alerts for medicine, hydration, daily activities, and clinic visits.',
      icon: BellRing,
      tag: 'Daily Routine',
    },
    {
      title: 'Caregiver Portal & Tracking',
      desc: 'Secure Supabase-backed dashboard for families & health workers to monitor performance.',
      icon: Activity,
      tag: 'Caregiver Support',
    },
    {
      title: 'Elderly Accessibility First',
      desc: 'High contrast, Atkinson Hyperlegible fonts, voice assistance, and gentle audio cues.',
      icon: Eye,
      tag: 'Universal Design',
    },
    {
      title: 'Offline-First Architecture',
      desc: 'Full functionality in zero-connectivity remote hamlets with automatic background sync.',
      icon: WifiOff,
      tag: 'Low-Connectivity',
    },
  ];

  return (
    <section 
      id="solution" 
      className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/70"
      aria-labelledby="solution-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Solution</span>
          </div>

          <h2 
            id="solution-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            One Unified Platform for <br className="hidden sm:inline" />
            <span className="text-teal-700">Elderly Cognitive Health</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            "One platform for cognitive engagement, daily assistance, and caregiver support." Built specifically for elderly dementia care in remote and resource-limited regions.
          </p>
        </div>

        {/* Central Visual Showcase with Surrounding Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column Pillars */}
          <div className="lg:col-span-4 space-y-5">
            {solutionPillars.slice(0, 3).map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-md transition text-left"
                  onMouseEnter={() => speakText(`${pillar.title}: ${pillar.desc}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded-full border border-teal-200">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Center Hub Graphic */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-teal-950 text-white rounded-3xl shadow-xl border-4 border-teal-800/40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(13,148,136,0.3),transparent)] pointer-events-none" />
            
            <div className="w-20 h-20 rounded-3xl bg-teal-500/20 border-2 border-teal-400/50 flex items-center justify-center text-teal-300 mb-6 shadow-inner">
              <Brain className="w-10 h-10 animate-pulse" />
            </div>

            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest font-mono">
              The Dementia Ecosystem
            </span>

            <h3 className="text-2xl font-bold mt-2 text-white">
              DEMENTIA Core
            </h3>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed max-w-xs">
              Bridging Godot-powered accessible client gameplay on Android with secure Supabase clinical synchronization.
            </p>

            <div className="mt-6 pt-6 border-t border-teal-800/60 w-full space-y-2 text-left text-xs text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Godot 4.x Cross-Platform Client</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Realtime 3-Tier Adaptive Rule Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Autonomous Offline Cache & Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Dedicated Caregiver Portal</span>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-1.5 text-[11px] text-teal-300 font-semibold bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Production Feature Set</span>
            </div>
          </div>

          {/* Right Column Pillars */}
          <div className="lg:col-span-4 space-y-5">
            {solutionPillars.slice(3, 6).map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-md transition text-left"
                  onMouseEnter={() => speakText(`${pillar.title}: ${pillar.desc}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded-full border border-teal-200">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
