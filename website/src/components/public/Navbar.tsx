import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  SunMoon, 
  UserCheck, 
  ChevronRight,
  Sparkles
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
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
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
          ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-xs border-b border-stone-200/80' 
          : 'bg-[#faf8f5]/80 backdrop-blur-xs border-b border-stone-100'
      }`}
      role="banner"
    >
      {/* Top Accessibility & Region Bar */}
      <div className="bg-[#1e293b] text-slate-200 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-medium px-2 py-0.5 rounded text-[11px] border border-amber-500/30">
            <Sparkles className="w-3 h-3 text-amber-400" /> North-East Initiative
          </span>
          <span className="hidden sm:inline text-slate-300 text-[11px]">
            Designed for older adults and caregivers in North-East India
          </span>
        </div>

        {/* Accessibility Quick Toggles */}
        <div className="flex items-center gap-3" aria-label="Accessibility Settings">
          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
            <span className="text-[10px] text-slate-400 font-medium mr-1">Text:</span>
            <button 
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${fontSize === 'normal' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Standard font size"
              aria-label="Set standard font size"
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 rounded text-[12px] font-bold transition ${fontSize === 'large' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Large font size for seniors"
              aria-label="Set large font size"
            >
              A+
            </button>
            <button 
              onClick={() => setFontSize('xlarge')}
              className={`px-1.5 py-0.5 rounded text-[13px] font-extrabold transition ${fontSize === 'xlarge' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Extra large font size"
              aria-label="Set extra large font size"
            >
              A++
            </button>
          </div>

          {/* High Contrast */}
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

          {/* Voice Assistant */}
          <button
            onClick={toggleVoiceAssistant}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition ${
              voiceAssistant 
                ? 'bg-emerald-600 text-white border-emerald-500 font-bold' 
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

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none"
            onMouseEnter={() => speakText("Redler: Technology that supports cognitive well-being")}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1e3a8a] via-[#1e40af] to-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-900/15 group-hover:scale-105 transition transform">
              <span className="text-xl font-black tracking-tighter">R</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#1e293b] font-sans">
                  Redler
                </span>
                <span className="bg-amber-100/90 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  Care Platform
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Cognitive Well-Being for Older Adults
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3 text-sm font-semibold text-slate-700" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3.5 py-2 rounded-xl hover:text-[#1e3a8a] hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to={user ? "/caregiver/dashboard" : "/caregiver/login"}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-[#1e3a8a] bg-white hover:bg-blue-50/80 border border-blue-200/80 transition shadow-xs"
              onMouseEnter={() => speakText("Access Caregiver Portal")}
            >
              <UserCheck className="w-4 h-4 text-blue-700" />
              <span>Caregiver Portal</span>
            </Link>

            <button
              onClick={handleAppDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] active:bg-[#9a3412] shadow-md shadow-orange-950/15 transition transform hover:-translate-y-0.5"
              onMouseEnter={() => speakText("Download Redler Android App")}
            >
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-blue-900 hover:bg-stone-100 transition focus:outline-none"
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
        <div className="lg:hidden border-t border-stone-200 bg-[#faf8f5] px-4 pt-3 pb-6 shadow-xl space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-white hover:text-blue-900 flex items-center justify-between transition"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <Link
              to={user ? "/caregiver/dashboard" : "/caregiver/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-[#1e3a8a] bg-white border border-blue-200 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-5 h-5 text-blue-700" />
              <span>Caregiver Portal</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleAppDownload();
              }}
              className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download the App (Android APK)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
