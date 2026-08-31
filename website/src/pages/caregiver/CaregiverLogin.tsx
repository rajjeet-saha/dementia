import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
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
    <div className="min-h-screen bg-[#1e293b] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/30 group-hover:scale-105 transition">
            R
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-white font-sans">
            REDLER
          </span>
        </Link>
        
        <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">
          Caregiver Portal
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Secure access for authorized family caregivers and health workers.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-800/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-700">
          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
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
                  className="block w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
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
                  className="block w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md transition flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In to Redler Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sandbox Access Button */}
          <div className="mt-6 pt-5 border-t border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Demo / Evaluation</span>
              <span className="text-[10px] text-amber-300 font-mono">Preloaded Partners</span>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/60 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Enter Sandbox Mode (Explore Data)</span>
            </button>
          </div>

          {/* Return link */}
          <div className="mt-5 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              PostgreSQL RLS
            </span>
            <Link to="/" className="text-amber-400 hover:underline">
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
