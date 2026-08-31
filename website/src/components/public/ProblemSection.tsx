import React from 'react';
import { 
  MapPinOff, 
  BrainCircuit, 
  Users, 
  SmartphoneNfc, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ProblemSection: React.FC = () => {
  const { speakText } = useAccessibility();

  const problemCards = [
    {
      num: '01',
      title: 'Geographical & Infrastructure Barriers',
      category: 'Accessibility',
      icon: MapPinOff,
      description:
        'Remote and rural communities across the North Eastern Region (NER) face severe shortages of specialized neurological clinics and memory-care specialists, making regular travel for clinical cognitive therapy difficult.',
      badge: 'Infrastructure Challenge',
    },
    {
      num: '02',
      title: 'Progressive Cognitive Decline & Confusion',
      category: 'Cognitive Support',
      icon: BrainCircuit,
      description:
        'Elderly individuals experiencing dementia face daily memory decline, disorientation, anxiety, and social isolation without accessible, structured cognitive stimulation exercises to support routine recall.',
      badge: 'Patient Well-being',
    },
    {
      num: '03',
      title: 'Caregiver Strain & Monitoring Gaps',
      category: 'Caregiver Challenges',
      icon: Users,
      description:
        'Family members and rural healthcare workers struggle to consistently track daily engagement, medication adherence, hydration schedules, and behavioral fluctuations without specialized monitoring tools.',
      badge: 'Caregiver Burden',
    },
    {
      num: '04',
      title: 'Lack of Inclusive Digital Tools',
      category: 'Digital Inclusion',
      icon: SmartphoneNfc,
      description:
        'Existing digital wellness apps are often English-only, complex to operate, heavily reliant on continuous high-speed internet, and completely inaccessible to elderly patients with visual or motor limitations.',
      badge: 'Technology Gap',
    },
  ];

  return (
    <section 
      id="problem" 
      className="py-20 md:py-28 bg-white border-b border-slate-200/70"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The Challenge</span>
          </div>

          <h2 
            id="problem-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Addressing Critical Gaps in <br className="hidden sm:inline" />
            <span className="text-rose-700">Elderly Cognitive Care</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The North Eastern Region (NER) is witnessing a gradual rise in age-related cognitive disorders. Geographical barriers and limited neurological facilities leave families and caregivers without accessible daily cognitive support.
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problemCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-200 hover:border-teal-400/80 shadow-xs hover:shadow-lg transition duration-200 text-left"
                onMouseEnter={() => speakText(`${card.category}: ${card.title}. ${card.description}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-teal-50 text-slate-700 group-hover:text-teal-700 border border-slate-200 group-hover:border-teal-200 flex items-center justify-center transition shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-teal-800 tracking-wider uppercase font-mono">
                        {card.num} — {card.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                    {card.badge}
                  </span>
                </div>

                <p className="mt-5 text-slate-600 text-base leading-relaxed">
                  {card.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Impacted: Rural elderly & families</span>
                  <span className="text-teal-700 font-semibold flex items-center gap-1">
                    Targeted by DEMENTIA <Sparkles className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
