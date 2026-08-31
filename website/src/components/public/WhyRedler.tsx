import React from 'react';
import { 
  Brain, 
  Bot, 
  BellRing, 
  Volume2, 
  Users
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const WhyRedler: React.FC = () => {
  const { speakText } = useAccessibility();

  const features = [
    {
      id: 'games',
      title: 'Cognitive Games',
      desc: 'Enjoyable activities designed for memory, pattern recognition, and focus.',
      icon: Brain,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      tag: 'Engagement',
    },
    {
      id: 'adaptive',
      title: 'Adaptive Difficulty',
      desc: 'Difficulty automatically adjusts so activities remain comfortable and encouraging.',
      icon: Bot,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      tag: 'Adaptive Engine',
    },
    {
      id: 'reminders',
      title: 'Daily Reminders',
      desc: 'Gentle visual and voice reminders for medications, water, and daily routines.',
      icon: BellRing,
      color: 'bg-green-50 text-green-700 border-green-200',
      tag: 'Routine',
    },
    {
      id: 'voice',
      title: 'Voice Assistance',
      desc: 'Spoken prompts and large text designed specifically for older adults.',
      icon: Volume2,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      tag: 'Accessibility',
    },
    {
      id: 'caregiver',
      title: 'Caregiver Support',
      desc: 'Family members and health workers can stay informed on progress and routines.',
      icon: Users,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      tag: 'Care Coordination',
    },
  ];

  return (
    <section 
      id="features" 
      className="py-16 md:py-20 bg-white border-b border-stone-200/70"
      aria-labelledby="why-redler-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
            Why Redler?
          </span>

          <h2 
            id="why-redler-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Built for Everyday Comfort
          </h2>

          <p className="text-base text-slate-600">
            A simple, dependable companion for older adults and their families.
          </p>
        </div>

        {/* 5 Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#faf8f5] hover:bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-400/80 shadow-xs hover:shadow-md transition text-left flex flex-col justify-between"
                onMouseEnter={() => speakText(`${item.title}: ${item.desc}`)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-4">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
