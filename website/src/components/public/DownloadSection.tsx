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
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-teal-50/40 to-white border-b border-slate-200/70 relative overflow-hidden"
      aria-labelledby="download-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 text-white rounded-[3rem] p-8 sm:p-12 lg:p-16 border-4 border-teal-800/50 shadow-2xl text-center max-w-5xl mx-auto relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-800/80 border border-teal-500/50 text-teal-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android Universal Release • {APP_CONFIG.version}</span>
          </div>

          {/* Heading */}
          <h2 
            id="download-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight"
          >
            Take Dementia With You
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Download the application and experience the cognitive assistance platform. Designed for seamless elderly operation on tablets and smartphones.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleAppDownload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 active:bg-teal-200 shadow-xl shadow-teal-500/20 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-400/50"
              onMouseEnter={() => speakText("Download App: Download the Dementia Android application package")}
            >
              <Download className="w-5 h-5" />
              <span>Download App (APK)</span>
            </button>

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-white bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition"
              onMouseEnter={() => speakText("View Source Code & Releases on GitHub")}
            >
              <GithubIcon className="w-5 h-5" />
              <span>GitHub Releases</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Secondary Specifications */}
          <div className="mt-10 pt-8 border-t border-teal-800/60 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left text-xs text-slate-300">
            <div className="flex items-center gap-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
              <Smartphone className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Android 8.0+</strong>
                <span className="text-[11px] text-slate-400">Mobile & Tablet Optimized</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
              <Download className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Universal APK</strong>
                <span className="text-[11px] text-slate-400">Direct Sideloadable Build</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
              <WifiOff className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">Offline Support</strong>
                <span className="text-[11px] text-slate-400">Zero Internet Required</span>
              </div>
            </div>
          </div>

          {/* Developer Release Configuration Note */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="text-xs text-teal-300 hover:text-teal-200 underline font-mono inline-flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{showConfigModal ? 'Hide Release Link Setup' : 'How to configure custom GitHub Release APK URL'}</span>
            </button>

            {showConfigModal && (
              <div className="mt-4 p-4 bg-slate-950 text-slate-300 rounded-2xl border border-slate-800 text-left text-xs font-mono max-w-xl mx-auto space-y-2">
                <div className="flex items-center justify-between text-teal-400 font-bold">
                  <span>Configuration File:</span>
                  <span>src/config/appConfig.ts</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Replace the placeholder with your tagged GitHub release binary:
                </p>
                <div className="p-2.5 bg-slate-900 rounded-lg text-emerald-400 overflow-x-auto text-[11px]">
                  export const DOWNLOAD_URL = "https://github.com/dementia-project/dementia-app/releases/download/v1.0.0/dementia.apk";
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
