import React from 'react';
import { 
  Pill, 
  Droplet, 
  CalendarCheck, 
  Building2, 
  Clock, 
  Bell,
  CheckCircle2
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ReminderSection: React.FC = () => {
  const { speakText } = useAccessibility();

  const reminderTypes = [
    {
      category: 'Medicine Reminders',
      icon: Pill,
      badge: '💊 Medication',
      color: 'rose',
      exampleTitle: 'Donepezil (5mg)',
      time: '08:30 AM',
      recurrence: 'Daily (Post-Breakfast)',
      instructions: 'Take 1 tablet with warm water. Confirmed by voice audio alert.',
      impact: 'Prevents missed doses and maintains steady therapeutic levels.',
    },
    {
      category: 'Hydration Prompts',
      icon: Droplet,
      badge: '💧 Hydration',
      color: 'cyan',
      exampleTitle: 'Morning Fresh Water Intake',
      time: '10:00 AM & 03:00 PM',
      recurrence: 'Every 2-3 Hours',
      instructions: 'Friendly chime encouraging 1 full glass of water or herbal tea.',
      impact: 'Reduces dehydration risks which exacerbate delirium and confusion.',
    },
    {
      category: 'Daily Activity Routines',
      icon: CalendarCheck,
      badge: '🗓 Routine',
      color: 'amber',
      exampleTitle: 'Gentle Garden Walk & Fresh Air',
      time: '04:30 PM',
      recurrence: 'Daily Evening',
      instructions: '15-minute shaded outdoor walk accompanied by family caregiver.',
      impact: 'Preserves circadian rhythm, motor mobility, and sleep quality.',
    },
    {
      category: 'Medical Appointments',
      icon: Building2,
      badge: '🏥 Clinical',
      color: 'blue',
      exampleTitle: 'District Telehealth Review',
      time: '11:00 AM',
      recurrence: 'Monthly Follow-up',
      instructions: 'Virtual video review with Community Health Center Neurologist.',
      impact: 'Ensures continuous medical oversight without arduous travel.',
    },
  ];

  return (
    <section 
      id="reminders" 
      className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/70"
      aria-labelledby="reminders-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" />
            <span>Structured Daily Living</span>
          </div>

          <h2 
            id="reminders-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Comprehensive Reminder System
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Dementia establishes clear, stress-free daily routines through multi-modal voice and visual prompts that reassure the patient while keeping caregivers updated.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reminderTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-lg transition duration-200 flex flex-col justify-between text-left"
                onMouseEnter={() => speakText(`${item.category}: ${item.exampleTitle} at ${item.time}. ${item.instructions}`)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-5">
                    {item.category}
                  </h3>

                  {/* Sample Reminder Card */}
                  <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{item.exampleTitle}</span>
                      <span className="text-teal-700 font-mono font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {item.recurrence}
                    </p>
                    <p className="text-xs text-slate-600 pt-1 leading-snug">
                      "{item.instructions}"
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{item.impact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
