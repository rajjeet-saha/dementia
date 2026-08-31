import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  UserCheck, 
  LogOut, 
  ArrowLeft, 
  Sparkles, 
  RefreshCw,
  SunMoon,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { isSupabaseConfigured } from '../../lib/supabase';

interface CaregiverLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const CaregiverLayout: React.FC<CaregiverLayoutProps> = ({
  children,
  title,
  subtitle,
  onRefresh,
  isRefreshing = false,
}) => {
  const { user, profile, signOut, isDemoMode } = useAuth();
  const { highContrast, toggleHighContrast, voiceAssistant, toggleVoiceAssistant } = useAccessibility();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/caregiver/login');
  };

  const isPatientDetail = location.pathname.includes('/caregiver/patient/');

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans text-slate-800">
      {/* Top Header Bar */}
      <header className="bg-[#1e293b] text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Portal Identification */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 text-amber-400 hover:text-amber-300 transition">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
                  R
                </div>
                <div>
                  <span className="font-extrabold tracking-tight text-white font-sans text-base">
                    REDLER
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono block -mt-1">
                    Caregiver Portal
                  </span>
                </div>
              </Link>

              <div className="h-6 w-px bg-slate-700 hidden sm:block mx-1" />

              {/* Status Badge: Supabase Live vs Demo Sandbox */}
              {isSupabaseConfigured && !isDemoMode ? (
                <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-950 text-emerald-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Supabase Live
                </span>
              ) : (
                <span className="hidden md:inline-flex items-center gap-1.5 bg-amber-950 text-amber-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-amber-700">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Sandbox Mode
                </span>
              )}
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5">
              {/* Accessibility Toggles */}
              <button
                onClick={toggleHighContrast}
                className={`p-2 rounded-lg text-xs border transition ${
                  highContrast ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Toggle High Contrast"
                aria-label="Toggle High Contrast"
              >
                <SunMoon className="w-4 h-4" />
              </button>

              <button
                onClick={toggleVoiceAssistant}
                className={`p-2 rounded-lg text-xs border transition ${
                  voiceAssistant ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Toggle Voice Assistant"
                aria-label="Toggle Voice Assistant"
              >
                {voiceAssistant ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Manual Data Refresh Button */}
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                  title="Refresh Partner Telemetry"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                  <span className="hidden sm:inline">Refresh Data</span>
                </button>
              )}

              {/* Caregiver Identity */}
              <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <UserCheck className="w-4 h-4 text-blue-400" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white leading-tight">
                    {profile?.name || user?.email || 'Authorized Caregiver'}
                  </p>
                  <p className="text-[10px] text-slate-300 capitalize font-mono">
                    Role: {profile?.role || 'caregiver'}
                  </p>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-bold border border-rose-800 transition"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb / Sub-header */}
      <div className="bg-white border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {isPatientDetail && (
              <Link
                to="/caregiver/dashboard"
                className="p-2 rounded-xl bg-stone-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-stone-200 transition flex items-center gap-1 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Partners</span>
              </Link>
            )}

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs font-semibold text-[#1e3a8a] hover:text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition"
            >
              ← Public Website
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>REDLER Caregiver Telemetry Subsystem • Supabase PostgreSQL Schema</span>
          <span>Row Level Security (RLS) Compliant Partner Isolation</span>
        </div>
      </footer>
    </div>
  );
};
