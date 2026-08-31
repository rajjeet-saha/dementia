import React from 'react';
import { 
  Mountain, 
  WifiOff, 
  Coins, 
  MapPin, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AccessibilityNER: React.FC = () => {
  const { speakText } = useAccessibility();

  const accessPillars = [
    {
      title: 'Remote & Hilly Geographies',
      desc: 'Engineered for remote villages and hilly terrain across the North Eastern Region where physical journeys to district neurology centers take hours.',
      icon: Mountain,
    },
    {
      title: 'Zero Cellular Dependency',
      desc: 'All cognitive games, daily schedules, and rule-based AI run 100% locally on Android devices without requiring continuous mobile data or Wi-Fi.',
      icon: WifiOff,
    },
    {
      title: 'Affordable Digital Therapy',
      desc: 'Eliminates high software subscription fees, bringing open, dignified cognitive wellness tools directly to low-resource communities.',
      icon: Coins,
    },
    {
      title: 'Culturally Familiar Imagery',
      desc: 'Visual assets and memory games incorporate everyday motifs (tea gardens, domestic utensils, natural flora) that seniors instantly recognize.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section 
      id="accessibility-ner" 
      className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/70"
      aria-labelledby="accessibility-ner-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Impact</span>
          </div>

          <h2 
            id="accessibility-ner-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Built with Accessibility in Mind
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Bridging healthcare equity across the North Eastern Region by delivering robust, offline-capable digital cognitive assistance directly to underserved rural families.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-md transition text-left flex flex-col justify-between"
                onMouseEnter={() => speakText(`${pillar.title}: ${pillar.desc}`)}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 border border-teal-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-teal-800">
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>NER Grassroots Accessibility</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
