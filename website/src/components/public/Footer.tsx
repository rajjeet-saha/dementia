import React from 'react';
import { Link } from 'react-router-dom';
import { 
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
    <footer className="bg-[#1e293b] text-slate-300 border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-6 space-y-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-xs">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Redler
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Technology that supports cognitive well-being. Built to help older adults stay engaged, independent and supported every day.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download App</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-2.5 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#hero" className="hover:text-amber-400 transition">Home</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition">How It Works</a></li>
              <li><a href="#features" className="hover:text-amber-400 transition">Why Redler?</a></li>
              <li><a href="#north-east" className="hover:text-amber-400 transition">North-East Focus</a></li>
              <li><a href="#caregivers" className="hover:text-amber-400 transition">Caregivers</a></li>
              <li><a href="#download" className="hover:text-amber-400 transition">Download App</a></li>
            </ul>
          </div>

          {/* Column 3: Caregiver Portal */}
          <div className="md:col-span-3 space-y-2.5 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Caregiver Access
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link to="/caregiver/login" className="hover:text-amber-400 transition text-amber-300 font-bold">
                  Caregiver Portal Login →
                </Link>
              </li>
              <li>
                <Link to="/caregiver/dashboard" className="hover:text-amber-400 transition text-slate-300">
                  Partner Telemetry Dashboard
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Redler. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-200">
              Made with care in North-East India <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
