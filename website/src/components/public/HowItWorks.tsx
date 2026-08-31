import React from 'react';
import { 
  PlayCircle, 
  Database, 
  Bot, 
  SlidersHorizontal, 
  ActivitySquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const HowItWorks: React.FC = () => {
  const { speakText } = useAccessibility();

  const steps = [
    {
      num: '01',
      title: 'User starts a cognitive activity',
      desc: 'The senior opens the Godot Android app with large, high-contrast buttons and begins an engaging memory or routine recall session.',
      icon: PlayCircle,
    },
    {
      num: '02',
      title: 'The platform records performance',
      desc: 'Response time, accuracy, mistakes, hints, and consecutive streaks are captured locally and reliably on the device.',
      icon: Database,
    },
    {
      num: '03',
      title: 'Adaptive AI analyzes the results',
      desc: 'The explainable rule-based engine calculates an objective performance score without confusing delay.',
      icon: Bot,
    },
    {
      num: '04',
      title: 'Difficulty & assistance respond',
      desc: 'Level calibration adjusts dynamically (increase, maintain, or decrease) to keep tasks stimulating and frustration-free.',
      icon: SlidersHorizontal,
    },
    {
      num: '05',
      title: 'Progress reviewed by caregiver',
      desc: 'Data syncs securely to the Supabase-powered Caregiver Dashboard so family members and health workers stay informed.',
      icon: ActivitySquare,
    },
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/70"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow</span>
          </div>

          <h2 
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            How the Platform Works
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A seamless, dignified 5-step loop connecting the elderly user's daily engagement directly with adaptive difficulty and caregiver oversight.
          </p>
        </div>

        {/* 5-Step Visual Timeline */}
        <div className="mt-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-lg transition duration-200 flex flex-col justify-between text-left"
                  onMouseEnter={() => speakText(`Step ${step.num}: ${step.title}. ${step.desc}`)}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-teal-800 font-mono">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-4 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-teal-700">
                    <span>Phase {step.num}</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
