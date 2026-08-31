import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  UserCheck, 
  Sparkles,
  WifiOff, 
  Heart, 
  Volume2, 
  Gamepad2
} from 'lucide-react';
import { handleAppDownload } from '../../config/appConfig';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import redlerAppImg from '../../assets/redler-app.png';

export const Hero: React.FC = () => {
  const { speakText } = useAccessibility();
  const { user } = useAuth();

  return (
    <section 
      id="hero" 
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#f5f0e6] to-[#faf8f5] border-b border-stone-200/60"
      aria-label="Introduction Hero"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 ne-pattern-subtle pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Description, CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-300/80 text-[#1e3a8a] text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#ea580c]" />
              <span>Redler Cognitive Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-[#1e293b] leading-[1.18]">
              Technology that supports <br />
              <span className="text-[#1e3a8a]">
                cognitive well-being.
              </span>
            </h1>

            {/* Short Supporting Description */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
              Redler helps older adults stay engaged, independent and supported every day.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={handleAppDownload}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] active:bg-[#9a3412] shadow-lg shadow-orange-950/15 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-300"
                onMouseEnter={() => speakText("Download the App: Get the Redler Android application for mobile and tablet")}
              >
                <Download className="w-5 h-5" />
                <span>Download the App</span>
              </button>

              <Link
                to={user ? "/caregiver/dashboard" : "/caregiver/login"}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-bold text-[#1e3a8a] bg-white hover:bg-stone-50 border-2 border-slate-200 shadow-xs transition hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100"
                onMouseEnter={() => speakText("Open the Caregiver Portal")}
              >
                <UserCheck className="w-5 h-5 text-blue-700" />
                <span>Caregiver Portal</span>
              </Link>
            </div>

            {/* Key Practical Badges */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="p-1.5 rounded-lg bg-orange-100 text-orange-800">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <span>Cognitive Games</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="p-1.5 rounded-lg bg-green-100 text-green-800">
                  <WifiOff className="w-4 h-4" />
                </div>
                <span>Works Offline</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                  <Volume2 className="w-4 h-4" />
                </div>
                <span>Voice Guidance</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800">
                  <Heart className="w-4 h-4" />
                </div>
                <span>Caregiver Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column: Provided Redler Mobile App Screenshot in Realistic Device Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              {/* Phone Outer Shell */}
              <div className="relative rounded-[3rem] bg-[#1e293b] p-3 shadow-2xl shadow-slate-900/30 border-4 border-slate-700 ring-1 ring-slate-900/40">
                {/* Speaker Notch */}
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2" />
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Real Redler App Screenshot */}
                <div className="rounded-[2.2rem] overflow-hidden bg-[#faf8f5] shadow-inner border border-stone-200">
                  <img
                    src={redlerAppImg}
                    alt="Redler mobile application interface showing games, reminders, progress and voice guidance"
                    className="w-full h-auto object-contain block"
                    loading="eager"
                  />
                </div>

                {/* Home Indicator */}
                <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2.5" />
              </div>

              {/* Gentle Floating Feature Tag */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">Simple & Tactile</p>
                  <p className="text-[10px] text-slate-500">Made for easy daily use</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
