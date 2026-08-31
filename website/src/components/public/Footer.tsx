import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Download, 
  Heart, 
  ArrowUp
} from 'lucide-react';
import { GITHUB_REPO_URL, handleAppDownload } from '../../config/appConfig';
import { GithubIcon } from '../icons/GithubIcon';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Overview */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                DEMENTIA
              </span>
            </div>

            <p className="text-sm text-teal-400 font-semibold">
              AI-Powered Cognitive Assistance for Elderly Care
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An accessible, offline-ready cognitive gaming and memory assistance platform designed to support elderly patients and caregivers across the North Eastern Region (NER).
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-teal-200 text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download APK</span>
              </button>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#hero" className="hover:text-teal-400 transition">Overview</a></li>
              <li><a href="#problem" className="hover:text-teal-400 transition">The Challenge</a></li>
              <li><a href="#solution" className="hover:text-teal-400 transition">Our Solution</a></li>
              <li><a href="#features" className="hover:text-teal-400 transition">All Features</a></li>
              <li><a href="#adaptive-ai" className="hover:text-teal-400 transition">Adaptive AI Engine</a></li>
              <li><a href="#games" className="hover:text-teal-400 transition">Cognitive Games</a></li>
            </ul>
          </div>

          {/* Column 3: Caregivers & Access */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Caregiver & Clinical Access
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/caregiver/login" className="hover:text-teal-400 transition text-teal-300 font-bold">
                  Caregiver Portal Login →
                </Link>
              </li>
              <li><a href="#caregivers" className="hover:text-teal-400 transition">Caregiver Monitoring</a></li>
              <li><a href="#reminders" className="hover:text-teal-400 transition">Reminder Subsystems</a></li>
              <li><a href="#offline" className="hover:text-teal-400 transition">Offline Architecture</a></li>
              <li><a href="#elderly-design" className="hover:text-teal-400 transition">Accessibility Guidelines</a></li>
              <li><a href="#download" className="hover:text-teal-400 transition">Android APK Download</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DEMENTIA Project. All rights reserved. Open-source healthcare innovation.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with care for NER <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
