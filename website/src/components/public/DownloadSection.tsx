import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  WifiOff, 
  Terminal, 
  ExternalLink
} from 'lucide-react';
import { 
  GITHUB_REPO_URL, 
  APP_CONFIG, 
  handleAppDownload 
} from '../../config/appConfig';
import { useAccessibility } from '../../context/AccessibilityContext';
import { GithubIcon } from '../icons/GithubIcon';

export const DownloadSection: React.FC = () => {
  const { speakText } = useAccessibility();
  const [showConfigModal, setShowConfigModal] = useState(false);

  return (
    <section 
      id="download" 
      className="py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] via-[#f5f0e6] to-[#faf8f5] border-b border-stone-200/70 relative overflow-hidden"
      aria-labelledby="download-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#1e293b] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border-2 border-slate-700 shadow-xl text-center max-w-4xl mx-auto relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android Universal APK • {APP_CONFIG.version}</span>
          </div>

          {/* Heading */}
          <h2 
            id="download-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-xl mx-auto leading-tight"
          >
            Get Started with Redler
          </h2>

          {/* Subtext */}
          <p className="mt-3 text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            Download the Android app for your phone or tablet. Works smoothly even when offline.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={handleAppDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] active:bg-[#9a3412] shadow-lg shadow-orange-950/20 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-400/40"
              onMouseEnter={() => speakText("Download App: Download the Redler Android application package")}
            >
              <Download className="w-5 h-5" />
              <span>Download the App</span>
            </button>

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition"
              onMouseEnter={() => speakText("View Releases on GitHub")}
            >
              <GithubIcon className="w-5 h-5" />
              <span>GitHub Releases</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Specifications Row */}
          <div className="mt-8 pt-6 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left text-xs text-slate-300">
            <div className="flex items-center gap-2.5 bg-slate-800/70 p-3 rounded-xl border border-slate-700">
              <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Android 8.0+</strong>
                <span className="text-[10px] text-slate-400">Phones & Tablets</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-slate-800/70 p-3 rounded-xl border border-slate-700">
              <Download className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Direct Install</strong>
                <span className="text-[10px] text-slate-400">Universal APK</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-slate-800/70 p-3 rounded-xl border border-slate-700">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Offline Ready</strong>
                <span className="text-[10px] text-slate-400">Runs without data</span>
              </div>
            </div>
          </div>

          {/* Release Config Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="text-xs text-amber-300 hover:text-amber-200 underline font-mono inline-flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{showConfigModal ? 'Hide Release Link Setup' : 'How to set custom GitHub Release APK link'}</span>
            </button>

            {showConfigModal && (
              <div className="mt-3 p-3.5 bg-slate-950 text-slate-300 rounded-xl border border-slate-800 text-left text-xs font-mono max-w-md mx-auto space-y-1.5">
                <div className="flex items-center justify-between text-amber-400 font-bold text-[11px]">
                  <span>File: src/config/appConfig.ts</span>
                </div>
                <div className="p-2 bg-slate-900 rounded text-emerald-400 overflow-x-auto text-[11px]">
                  export const DOWNLOAD_URL = "https://github.com/dementia-project/dementia-app/releases/download/v1.0.0/redler.apk";
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
