import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Menu, 
  X, 
  Download, 
  Volume2, 
  VolumeX, 
  SunMoon, 
  UserCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { handleAppDownload } from '../../config/appConfig';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    highContrast, 
    toggleHighContrast, 
    fontSize, 
    setFontSize, 
    voiceAssistant, 
    toggleVoiceAssistant,
    speakText 
  } = useAccessibility();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Problem', href: '#problem' },
    { name: 'Solution', href: '#solution' },
    { name: 'Features', href: '#features' },
    { name: 'Adaptive AI', href: '#adaptive-ai' },
    { name: 'Games', href: '#games' },
    { name: 'Caregivers', href: '#caregivers' },
    { name: 'Download', href: '#download' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80' 
          : 'bg-white/80 backdrop-blur-xs border-b border-slate-100'
      }`}
      role="banner"
    >
      {/* Top Accessibility & Regional Care Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 font-medium px-2 py-0.5 rounded text-[11px] border border-teal-500/30">
            <Sparkles className="w-3 h-3" /> NER Initiative
          </span>
          <span className="hidden sm:inline text-slate-300">
            AI-Powered Cognitive Care for the North Eastern Region
          </span>
        </div>

        {/* Accessibility quick toggles */}
        <div className="flex items-center gap-3" aria-label="Accessibility Settings">
          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
            <span className="text-[10px] text-slate-400 font-medium mr-1">Text:</span>
            <button 
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${fontSize === 'normal' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Standard font size"
              aria-label="Set standard font size"
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 rounded text-[12px] font-bold transition ${fontSize === 'large' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Large font size for seniors"
              aria-label="Set large font size"
            >
              A+
            </button>
            <button 
              onClick={() => setFontSize('xlarge')}
              className={`px-1.5 py-0.5 rounded text-[13px] font-extrabold transition ${fontSize === 'xlarge' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Extra large font size"
              aria-label="Set extra large font size"
            >
              A++
            </button>
          </div>

          {/* High Contrast Mode */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              highContrast 
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle High Contrast for Visual Clarity"
            aria-pressed={highContrast}
          >
            <SunMoon className="w-3 h-3" />
            <span className="hidden md:inline">{highContrast ? 'Contrast ON' : 'High Contrast'}</span>
          </button>

          {/* Voice Assistant Toggle */}
          <button
            onClick={toggleVoiceAssistant}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              voiceAssistant 
                ? 'bg-emerald-500 text-white border-emerald-400 font-bold' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Voice Assistance / Speech"
            aria-pressed={voiceAssistant}
          >
            {voiceAssistant ? <Volume2 className="w-3 h-3 animate-pulse" /> : <VolumeX className="w-3 h-3" />}
            <span className="hidden md:inline">{voiceAssistant ? 'Voice ON' : 'Voice Assistant'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none"
            onMouseEnter={() => speakText("Dementia: AI-Powered Cognitive Assistance for Elderly Care")}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition transform">
              <Brain className="w-7 h-7" strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
                  DEMENTIA
                </span>
                <span className="bg-teal-50 text-teal-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-teal-200">
                  Godot 4.x
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                AI-Powered Cognitive Assistance
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 rounded-lg hover:text-teal-700 hover:bg-teal-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Caregiver Portal Link */}
            <Link
              to={user ? "/caregiver/dashboard" : "/caregiver/login"}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100/90 border border-teal-200/80 transition shadow-xs"
              onMouseEnter={() => speakText("Access secure Caregiver Portal")}
            >
              <UserCheck className="w-4 h-4 text-teal-700" />
              <span>Caregiver Portal</span>
            </Link>

            {/* Direct Download Button */}
            <button
              onClick={handleAppDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 shadow-md shadow-teal-900/15 transition transform hover:-translate-y-0.5"
              onMouseEnter={() => speakText("Download Dementia Android App")}
            >
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-teal-700 hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-3 rounded-lg text-base font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800 flex items-center justify-between transition"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to={user ? "/caregiver/dashboard" : "/caregiver/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center font-semibold text-teal-900 bg-teal-50 border border-teal-200 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-5 h-5 text-teal-700" />
              <span>Caregiver Portal</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleAppDownload();
              }}
              className="w-full py-3.5 px-4 rounded-xl text-center font-semibold text-white bg-teal-700 hover:bg-teal-800 shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Android App (APK)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
