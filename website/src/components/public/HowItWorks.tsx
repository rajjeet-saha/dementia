import React from 'react';
import { 
  Gamepad2, 
  Bot, 
  Activity, 
  HeartHandshake, 
  ArrowRight
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const HowItWorks: React.FC = () => {
  const { speakText } = useAccessibility();

  const steps = [
    {
      num: '01',
      title: 'Play',
      desc: 'The user opens Redler and plays short, engaging memory and routine recall activities.',
      icon: Gamepad2,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
    },
    {
      num: '02',
      title: 'Adapt',
      desc: 'The app checks performance and tunes difficulty to stay encouraging without stress.',
      icon: Bot,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      num: '03',
      title: 'Track',
      desc: 'Daily completion, accuracy, and reminders are saved reliably on the device.',
      icon: Activity,
      color: 'text-green-600 bg-green-50 border-green-200',
    },
    {
      num: '04',
      title: 'Support',
      desc: 'Caregivers stay in touch with progress and daily routines through the portal.',
      icon: HeartHandshake,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-16 md:py-20 bg-[#faf8f5] border-b border-stone-200/70"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold text-blue-800 bg-blue-100/80 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
            How It Works
          </span>

          <h2 
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            A Simple, Natural Flow
          </h2>

          <p className="text-base text-slate-600">
            Play → Adapt → Track → Support
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition text-left flex flex-col justify-between"
                onMouseEnter={() => speakText(`Step ${step.num}: ${step.title}. ${step.desc}`)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-4">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center text-[11px] font-bold text-slate-500">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3 h-3 ml-1 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
