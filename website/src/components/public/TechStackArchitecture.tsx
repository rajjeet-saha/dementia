import React from 'react';
import { 
  Cpu, 
  Code2, 
  Bot, 
  Smartphone, 
  Database, 
  Layers, 
  CheckCircle2,
  Plus,
  Equal
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { GithubIcon } from '../icons/GithubIcon';

export const TechStackArchitecture: React.FC = () => {
  const { speakText } = useAccessibility();

  const technologies = [
    {
      name: 'Godot Engine 4.x',
      category: 'Client Game Engine',
      desc: 'High-performance, lightweight 2D engine powering accessible GUI and audio.',
      icon: Cpu,
      badge: 'v4.x Stable',
    },
    {
      name: 'GDScript',
      category: 'Core Logic & UI',
      desc: 'Deterministic event orchestration for fluid card animations and touch handlers.',
      icon: Code2,
      badge: 'Native Scripting',
    },
    {
      name: 'Adaptive AI Engine',
      category: 'Intelligence Layer',
      desc: '3-tier explainable heuristic scoring engine for realtime difficulty adjustments.',
      icon: Bot,
      badge: 'Rule-Based AI',
    },
    {
      name: 'Android Universal APK',
      category: 'Target Mobile Platform',
      desc: 'Optimized touch layouts compatible with Android 8.0+ tablets and smartphones.',
      icon: Smartphone,
      badge: 'Mobile & Tablet',
    },
    {
      name: 'Supabase Database',
      category: 'Cloud Backend & Auth',
      desc: 'PostgreSQL database with Row Level Security, Auth, and telemetry synchronization.',
      icon: Database,
      badge: 'PostgreSQL / RLS',
    },
    {
      name: 'Git & GitHub Releases',
      category: 'Version Control & Distribution',
      desc: 'Transparent version-controlled codebase and direct APK binary distribution.',
      icon: GithubIcon,
      badge: 'Open Repository',
    },
  ];

  return (
    <section 
      id="technology" 
      className="py-20 md:py-28 bg-white border-b border-slate-200/70"
      aria-labelledby="tech-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>

          <h2 
            id="tech-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Technology & Modular Architecture
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Engineered with a clean separation of concerns across the client gameplay engine, rule heuristics, offline cache, and clinical cloud backend.
          </p>
        </div>

        {/* Modular Formula Diagram */}
        <div className="mt-14 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-4 border-slate-800 shadow-xl max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block mb-4">
            System Composition
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold font-mono">
            <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-teal-300">
              Cognitive Games
            </span>
            <Plus className="w-4 h-4 text-slate-500" />
            <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-300">
              Adaptive AI
            </span>
            <Plus className="w-4 h-4 text-slate-500" />
            <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-300">
              Reminders
            </span>
            <Plus className="w-4 h-4 text-slate-500" />
            <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-blue-300">
              Caregiver Monitoring
            </span>
            <Plus className="w-4 h-4 text-slate-500" />
            <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-purple-300">
              Accessibility
            </span>
            <Equal className="w-5 h-5 text-teal-400" />
            <span className="px-4 py-2 rounded-xl bg-teal-700 border border-teal-400 text-white shadow-md">
              Dementia Platform
            </span>
          </div>
        </div>

        {/* Technology Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-md transition text-left flex flex-col justify-between"
                onMouseEnter={() => speakText(`${tech.name}: ${tech.desc}`)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-4">
                    {tech.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700">
                    {tech.category}
                  </p>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
