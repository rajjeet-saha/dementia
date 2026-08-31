import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Brain, 
  Clock, 
  Users, 
  ShieldCheck, 
  Globe
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ImpactSection: React.FC = () => {
  const { speakText } = useAccessibility();

  const impacts = [
    {
      title: 'Supports Early Cognitive Engagement',
      desc: 'Aims to stimulate neuroplasticity and preserve daily recall through consistent, structured mental exercises tailored to individual comfort levels.',
      icon: Brain,
    },
    {
      title: 'Helps Structure Daily Living Routines',
      desc: 'Designed to reinforce daily habit loops around meals, medications, hydration, and gentle activity to minimize patient disorientation.',
      icon: Clock,
    },
    {
      title: 'Reduces Caregiver Strain',
      desc: 'Assists families and community healthcare workers by providing transparent oversight, reducing the burden of manual scheduling and constant guessing.',
      icon: Users,
    },
    {
      title: 'Advances Digital Healthcare Inclusion',
      desc: 'Brings accessible, culturally respectful, and offline-ready digital health tools to underserved rural communities across the North Eastern Region.',
      icon: Globe,
    },
  ];

  return (
    <section 
      id="impact" 
      className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/70"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community & Health Goals</span>
          </div>

          <h2 
            id="impact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Targeted Impact & Objectives
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Designed with clinical humility and ethical healthcare principles to support elderly individuals and their families throughout the cognitive wellness journey.
          </p>
        </div>

        {/* 4 Impact Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-lg transition duration-200 flex flex-col justify-between text-left"
                onMouseEnter={() => speakText(`${item.title}: ${item.desc}`)}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 border border-teal-100 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-teal-800">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Dementia Project Objective</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Healthcare Statement Box */}
        <div className="mt-12 p-6 bg-teal-50/80 rounded-3xl border border-teal-200 text-left max-w-4xl mx-auto flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-teal-700 shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-teal-950">Ethical Healthcare Disclaimer</h4>
            <p className="text-xs text-teal-900 leading-relaxed">
              DEMENTIA is a digital cognitive assistance and memory engagement companion platform. It is designed to assist elderly cognitive stimulation and caregiver monitoring, and does not claim to diagnose, treat, cure, or prevent neurodegenerative diseases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
