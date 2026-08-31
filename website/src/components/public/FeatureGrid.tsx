import React from 'react';
import { 
  Brain, 
  Bot, 
  Volume2, 
  Pill, 
  Droplet, 
  CalendarCheck, 
  Building2, 
  TrendingUp, 
  Users, 
  WifiOff, 
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const FeatureGrid: React.FC = () => {
  const { speakText } = useAccessibility();

  const features = [
    {
      id: 'cognitive-games',
      icon: Brain,
      title: 'Interactive Cognitive Games',
      category: 'Brain Health',
      desc: 'Scientifically aligned activities covering memory recall, focus & concentration, pattern and object recognition, and familiar daily routines.',
      color: 'teal',
      bullets: ['Memory improvement', 'Pattern recognition', 'Daily routine recall'],
    },
    {
      id: 'adaptive-ai',
      icon: Bot,
      title: 'Adaptive AI Engine',
      category: 'Intelligent Difficulty',
      desc: 'Dynamically adapts challenge levels using live metrics: Accuracy, Response Time (ms), Score, Best Streak, and multi-day performance history.',
      color: 'emerald',
      bullets: ['3-tier dynamic levels', 'Prevents patient fatigue', 'Explainable rule engine'],
    },
    {
      id: 'voice-multilingual',
      icon: Volume2,
      title: 'Voice & Multilingual Support',
      category: 'Accessibility',
      desc: 'Spoken interactive voice guidance, large visual prompts, and culturally familiar regional motifs tailored specifically for elderly users.',
      color: 'indigo',
      bullets: ['Spoken task instructions', 'Visual audio-cues', 'Accessible pacing'],
    },
    {
      id: 'med-reminders',
      icon: Pill,
      title: 'Medicine Reminders',
      category: 'Daily Care',
      desc: 'High-visibility visual and audio alerts helping seniors take prescribed medications reliably at the correct dosage and time.',
      color: 'rose',
      bullets: ['Scheduled dosages', 'Repeat reminders', 'Caregiver confirmation'],
    },
    {
      id: 'hydration-reminders',
      icon: Droplet,
      title: 'Hydration Reminders',
      category: 'Physical Health',
      desc: 'Gentle prompts throughout the day encouraging regular water intake to prevent dehydration-induced delirium and confusion.',
      color: 'cyan',
      bullets: ['Configurable intervals', 'Friendly visual cues', 'Routine tracking'],
    },
    {
      id: 'activity-reminders',
      icon: CalendarCheck,
      title: 'Daily Activities & Routines',
      category: 'Habit Support',
      desc: 'Structured reminders for daily walks, personal hygiene, meals, and gentle mobility exercises to preserve day-to-day rhythm.',
      color: 'amber',
      bullets: ['Morning/evening routines', 'Gentle mobility cues', 'Simple checkbox log'],
    },
    {
      id: 'appointment-reminders',
      icon: Building2,
      title: 'Medical Appointments',
      category: 'Clinical Follow-up',
      desc: 'Advance alerts for primary health center reviews, telehealth check-ins, and neurologist consultations.',
      color: 'blue',
      bullets: ['Clinic visit alerts', 'Telehealth schedule', 'Caregiver sync'],
    },
    {
      id: 'progress-analytics',
      icon: TrendingUp,
      title: 'Cognitive Progress Analytics',
      category: 'Data Insights',
      desc: 'Granular tracking of response times, accuracy percentages, hints utilized, and mistakes made over time.',
      color: 'violet',
      bullets: ['Accuracy over time', 'Reaction latency trends', 'Session completion logs'],
    },
    {
      id: 'caregiver-monitoring',
      icon: Users,
      title: 'Caregiver & Health-Worker Portal',
      category: 'Care Coordination',
      desc: 'Web-based management dashboard allowing family members and district healthcare workers to review patient engagement.',
      color: 'teal',
      bullets: ['Remote performance review', 'Reminder management', 'Activity timeline'],
    },
    {
      id: 'offline-support',
      icon: WifiOff,
      title: '100% Offline Capability',
      category: 'Low-Connectivity',
      desc: 'Built specifically for rural regions without reliable cellular networks. All games, reminders, and heuristics run offline locally.',
      color: 'amber',
      bullets: ['Autonomous local execution', 'Background cloud sync', 'Zero data-dependency'],
    },
    {
      id: 'secure-data',
      icon: ShieldCheck,
      title: 'Secure Patient Data',
      category: 'Privacy',
      desc: 'Patient records and cognitive scores are managed securely with isolated authorization and Row Level Security architecture.',
      color: 'emerald',
      bullets: ['Role-based access', 'Privacy-first telemetry', 'Local-first security'],
    },
  ];

  return (
    <section 
      id="features" 
      className="py-20 md:py-28 bg-white border-b border-slate-200/70"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Platform Features</span>
          </div>

          <h2 
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Built for Complete <br className="hidden sm:inline" />
            <span className="text-teal-700">Elderly Cognitive Care</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every feature is fully implemented and operational across the mobile client and web portal to deliver holistic, dignified cognitive support.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-50/80 hover:bg-white rounded-3xl p-7 border border-slate-200 hover:border-teal-400/80 shadow-xs hover:shadow-lg transition duration-200 flex flex-col justify-between text-left"
                onMouseEnter={() => speakText(`${item.title}: ${item.desc}`)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 space-y-1.5">
                  {item.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
