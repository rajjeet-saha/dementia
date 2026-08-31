import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  TrendingUp
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';

export const CaregiverSection: React.FC = () => {
  const { speakText } = useAccessibility();
  const { user } = useAuth();

  return (
    <section 
      id="caregivers" 
      className="py-20 md:py-28 bg-white border-b border-slate-200/70"
      aria-labelledby="caregiver-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information & Portal Entry */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Caregiver & Clinical Support</span>
            </div>

            <h2 
              id="caregiver-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
            >
              Support for <br className="hidden sm:inline" />
              <span className="text-teal-700">Caregivers & Health Workers</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Dementia empowers families, personal caregivers, and district health workers with objective cognitive telemetry, medication adherence verification, and early warning signs of cognitive decline.
            </p>

            {/* Core Caregiver Capabilities */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-teal-100 text-teal-800 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Longitudinal Cognitive Trends</h4>
                  <p className="text-xs text-slate-500">Track 30-day response latency, accuracy shifts, and difficulty level transitions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-teal-100 text-teal-800 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Holistic Care Reminders</h4>
                  <p className="text-xs text-slate-500">Configure and confirm scheduled medicine, hydration, and telehealth appointments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-teal-100 text-teal-800 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Secure Supabase Database Integration</h4>
                  <p className="text-xs text-slate-500">Directly synchronized with the patient's Godot client using strict schema tables.</p>
                </div>
              </div>
            </div>

            {/* Portal CTA */}
            <div className="pt-4">
              <Link
                to={user ? "/caregiver/dashboard" : "/caregiver/login"}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 shadow-md transition transform hover:-translate-y-0.5"
                onMouseEnter={() => speakText("Launch the Caregiver Portal to view authorized patient metrics")}
              >
                <span>Launch Caregiver Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Dashboard UI Preview Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-slate-800 text-left">
              {/* Dashboard Preview Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Caregiver Portal Preview</h4>
                    <p className="text-[11px] text-slate-400">Patient: Tenzing Norbu (NER-PAT-0891)</p>
                  </div>
                </div>

                <span className="text-[11px] bg-teal-900 text-teal-300 px-2.5 py-1 rounded-full font-mono flex items-center gap-1 border border-teal-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Supabase Live
                </span>
              </div>

              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
                <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Avg Accuracy</span>
                  <p className="text-lg font-extrabold text-teal-400 font-mono mt-0.5">88.4%</p>
                  <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" /> +4.2% this week
                  </span>
                </div>

                <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Games Done</span>
                  <p className="text-lg font-extrabold text-white font-mono mt-0.5">14</p>
                  <span className="text-[9px] text-slate-400">Total sessions</span>
                </div>

                <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Adaptive Tier</span>
                  <p className="text-lg font-extrabold text-amber-400 font-mono mt-0.5">Level 2</p>
                  <span className="text-[9px] text-slate-400">Optimal stimulus</span>
                </div>

                <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Reminders</span>
                  <p className="text-lg font-extrabold text-emerald-400 font-mono mt-0.5">4 Active</p>
                  <span className="text-[9px] text-slate-400">Next: 04:30 PM</span>
                </div>
              </div>

              {/* Recent Activity List Mockup */}
              <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Recent Patient Sessions</span>
                  <span className="text-[10px] text-teal-400">ORDER BY played_at DESC</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🧠</span>
                      <div>
                        <p className="font-bold text-white">Memory Game 01 (Recall)</p>
                        <p className="text-[10px] text-slate-400">Today, 09:30 AM • Response: 1,850ms</p>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-emerald-400 font-bold">88% Acc</span>
                      <span className="text-[10px] text-slate-400 block">Score: 840</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🧩</span>
                      <div>
                        <p className="font-bold text-white">Memory Game 02 (Pattern)</p>
                        <p className="text-[10px] text-slate-400">Yesterday, 04:15 PM • Response: 2,100ms</p>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-emerald-400 font-bold">82% Acc</span>
                      <span className="text-[10px] text-slate-400 block">Score: 790</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
