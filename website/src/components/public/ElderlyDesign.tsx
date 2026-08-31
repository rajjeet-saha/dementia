import React from 'react';
import { 
  Eye, 
  Volume2, 
  Maximize, 
  Smile, 
  Check, 
  Sparkles,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ElderlyDesign: React.FC = () => {
  const { speakText } = useAccessibility();

  const principles = [
    {
      title: 'Large Controls & Touch Targets',
      desc: 'All interactive buttons have generous 56px+ tap targets, forgiving touch tolerances, and distinct pressed states for tremor-safe tapping.',
      icon: Maximize,
    },
    {
      title: 'High-Contrast & Legible Typography',
      desc: 'Built using Atkinson Hyperlegible typefaces with bold contrast ratios exceeding WCAG AAA standards for low-vision seniors.',
      icon: Eye,
    },
    {
      title: 'Integrated Voice Assistance',
      desc: 'Spoken auditory feedback for instructions, reminders, and encouraging prompts with calm, elderly-adapted cadence.',
      icon: Volume2,
    },
    {
      title: 'Zero Cognitive Clutter',
      desc: 'No confusing multi-level menus, aggressive animations, or tiny time-limit counters that induce anxiety or disorientation.',
      icon: Smile,
    },
  ];

  return (
    <section 
      id="elderly-design" 
      className="py-20 md:py-28 bg-white border-b border-slate-200/70"
      aria-labelledby="elderly-design-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Design Philosophy & Checklist */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Universal Accessibility</span>
            </div>

            <h2 
              id="elderly-design-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
            >
              Designed for <br className="hidden sm:inline" />
              <span className="text-teal-700">Elderly Users</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Cognitive accessibility is at the heart of DEMENTIA. Every screen, font weight, color hue, and touch target has been carefully tuned for elderly seniors and individuals with early-stage cognitive impairment.
            </p>

            {/* Principles List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {principles.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition"
                    onMouseEnter={() => speakText(`${item.title}: ${item.desc}`)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Elderly Interface Demonstration Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl border-4 border-slate-700">
              <div className="bg-white rounded-3xl p-6 text-left space-y-5">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-teal-700" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Elderly Interface Preview
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    High Contrast
                  </span>
                </div>

                {/* Big Visual Card */}
                <div className="p-4 bg-teal-50 rounded-2xl border-2 border-teal-200 text-center space-y-2">
                  <span className="text-4xl block">👵 ☀️</span>
                  <h4 className="text-lg font-bold text-slate-900">Good Morning!</h4>
                  <p className="text-xs text-slate-600">
                    "Today is Monday. Would you like to do your morning memory exercise?"
                  </p>
                </div>

                {/* Big Action Buttons (48px+ Touch Targets) */}
                <div className="space-y-3">
                  <button className="w-full py-4 px-6 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-bold text-base shadow-md flex items-center justify-center gap-3 transition">
                    <Check className="w-6 h-6 stroke-[3]" />
                    <span>YES, START GAME</span>
                  </button>

                  <button className="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-semibold text-sm border-2 border-slate-300 flex items-center justify-center gap-2 transition">
                    <Volume2 className="w-5 h-5 text-teal-700" />
                    <span>READ SCREEN ALOUD</span>
                  </button>
                </div>

                {/* Bottom Accessibility Indicators */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Font: Atkinson 18pt</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Touch Area: 58px</span>
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
