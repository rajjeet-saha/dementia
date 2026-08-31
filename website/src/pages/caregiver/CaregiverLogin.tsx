import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Brain, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CaregiverLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signInDemo } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const res = await signIn(email, password);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      navigate('/caregiver/dashboard');
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    await signInDemo();
    setIsSubmitting(false);
    navigate('/caregiver/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-600/30 group-hover:scale-105 transition">
            <Brain className="w-7 h-7" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-white font-sans">
            DEMENTIA
          </span>
        </Link>
        
        <h2 className="mt-4 text-2xl font-bold text-white tracking-tight">
          Caregiver & Clinical Portal
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Secure access for authorized family caregivers and healthcare workers.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-800/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-700">
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="caregiver@ner-health.org"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-lg shadow-teal-900/40 transition flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-teal-500/30"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In with Supabase</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Sandbox Access Button */}
          <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Instant Review / Sandbox</span>
              <span className="text-[10px] text-teal-400 font-mono">NER Clinical Profiles</span>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-600/80 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Enter Sandbox Mode (Preloaded Patients)</span>
            </button>
          </div>

          {/* Architecture info */}
          <div className="mt-6 pt-4 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              PostgreSQL RLS Protected
            </span>
            <Link to="/" className="text-teal-400 hover:underline">
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
