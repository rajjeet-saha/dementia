import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Activity
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';

export const CaregiverSection: React.FC = () => {
  const { speakText } = useAccessibility();
  const { user } = useAuth();

  return (
    <section 
      id="caregivers" 
      className="py-16 md:py-20 bg-[#faf8f5] border-b border-stone-200/70"
      aria-labelledby="caregiver-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-[#1e3a8a] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Caregiver Support</span>
            </div>

            <h2 
              id="caregiver-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            >
              Support beyond the app.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Caregivers and healthcare workers can stay informed about daily activity, cognitive progress, and routine reminders through a clear, simple web dashboard.
            </p>

            {/* Concise Bullet Points */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>See completed activities and gentle progress trends over time</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>View and manage reminders for medications, water, and visits</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Connected securely to the mobile app</span>
              </div>
            </div>

            {/* Portal Action */}
            <div className="pt-3">
              <Link
                to={user ? "/caregiver/dashboard" : "/caregiver/login"}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-[#1e3a8a] hover:bg-[#172554] shadow-md transition transform hover:-translate-y-0.5"
                onMouseEnter={() => speakText("Open the Caregiver Portal")}
              >
                <span>Open Caregiver Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean, Compact Dashboard Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Partner Activity Overview</h4>
                    <p className="text-[10px] text-slate-500 font-mono">Tenzing N. (NER-PAT-0891)</p>
                  </div>
                </div>
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                  Synced
                </span>
              </div>

              {/* Stat Pills */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#faf8f5] p-3 rounded-xl border border-stone-200 text-center">
                  <span className="text-[10px] text-slate-500 font-medium block">Avg Accuracy</span>
                  <strong className="text-base font-bold text-blue-900 font-mono">88%</strong>
                </div>
                <div className="bg-[#faf8f5] p-3 rounded-xl border border-stone-200 text-center">
                  <span className="text-[10px] text-slate-500 font-medium block">Sessions</span>
                  <strong className="text-base font-bold text-slate-800 font-mono">14</strong>
                </div>
                <div className="bg-[#faf8f5] p-3 rounded-xl border border-stone-200 text-center">
                  <span className="text-[10px] text-slate-500 font-medium block">Reminders</span>
                  <strong className="text-base font-bold text-amber-800 font-mono">4 Active</strong>
                </div>
              </div>

              {/* Sample Activity Line */}
              <div className="p-3 bg-[#faf8f5] rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🧠</span>
                  <div>
                    <p className="font-bold text-slate-900">Memory Activity</p>
                    <p className="text-[10px] text-slate-500">Today, 09:30 AM</p>
                  </div>
                </div>
                <span className="font-bold text-green-700 font-mono">Completed</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
