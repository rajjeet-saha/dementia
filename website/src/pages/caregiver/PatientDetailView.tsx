import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Bell, 
  Eye, 
  Activity, 
  Pill, 
  Droplet, 
  CalendarCheck, 
  Building2, 
  AlertCircle
} from 'lucide-react';
import { CaregiverLayout } from '../../components/caregiver/CaregiverLayout';
import { getPatientOverview } from '../../services/caregiverService';
import type { PatientDashboardOverview } from '../../types/database.types';
import { useAuth } from '../../context/AuthContext';

export const PatientDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<PatientDashboardOverview | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'accuracy' | 'score' | 'reaction' | 'difficulty'>('accuracy');

  const loadPatientData = async () => {
    if (!id) return;
    try {
      const overview = await getPatientOverview(id);
      setData(overview);
    } catch (err) {
      console.error('[PatientDetailView] Error loading overview:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/caregiver/login');
      return;
    }
    loadPatientData();
  }, [id, user, authLoading]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadPatientData();
  };

  if (loading) {
    return (
      <CaregiverLayout title="Loading Patient Telemetry...">
        <div className="py-20 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-teal-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-sm font-mono text-slate-500">Querying Supabase game_results and reminders...</p>
        </div>
      </CaregiverLayout>
    );
  }

  if (!data) {
    return (
      <CaregiverLayout title="Patient Not Found">
        <div className="py-16 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Patient record could not be retrieved</h2>
          <p className="text-xs text-slate-500">The requested profile ID may not exist or is restricted by RLS policy.</p>
          <Link
            to="/caregiver/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold"
          >
            ← Back to Patient Registry
          </Link>
        </div>
      </CaregiverLayout>
    );
  }

  const { patient, recentGames, reminders, stats } = data;

  // Prepare chart series (chronological order)
  const chronologicalGames = [...recentGames].reverse().map((g, index) => ({
    session: `#${index + 1}`,
    date: new Date(g.played_at).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    accuracy: g.accuracy > 1 ? g.accuracy : Math.round(g.accuracy * 100),
    score: g.score,
    responseTime: g.response_time_ms,
    difficulty: g.difficulty_level,
    gameType: g.game_type,
    mistakes: g.mistakes_count,
    hints: g.hints_used,
  }));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Medicine':
        return <Pill className="w-4 h-4 text-rose-600" />;
      case 'Hydration':
        return <Droplet className="w-4 h-4 text-cyan-600" />;
      case 'Daily Activity':
        return <CalendarCheck className="w-4 h-4 text-amber-600" />;
      case 'Medical Appointment':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <CaregiverLayout
      title={`Patient Record: ${patient.name}`}
      subtitle={`Public ID: ${patient.public_user_id} • Primary Language: ${patient.preferred_language.toUpperCase()}`}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    >
      <div className="space-y-8 text-left">
        {/* TOP SUMMARY & ACCESSIBILITY CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Patient Overview */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-bold text-xl">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{patient.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    ID: {patient.public_user_id} • Registered: {patient.created_at ? new Date(patient.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Current Tier: Level {stats.currentDifficultyLevel}
                </span>
              </div>
            </div>

            {/* Metric KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Avg Accuracy</span>
                <span className="text-2xl font-extrabold text-teal-700 font-mono">{stats.averageAccuracy}%</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Avg Reaction</span>
                <span className="text-2xl font-extrabold text-slate-800 font-mono">{stats.averageResponseTimeMs} ms</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Total Sessions</span>
                <span className="text-2xl font-extrabold text-slate-800 font-mono">{stats.totalGamesPlayed}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Total Score</span>
                <span className="text-2xl font-extrabold text-emerald-700 font-mono">{stats.totalScore}</span>
              </div>
            </div>
          </div>

          {/* Client Accessibility Configuration Settings */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-teal-700" />
              <span>Mobile App Accessibility Preferences</span>
            </h4>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span>Font Size Setting</span>
                <strong className="font-mono text-teal-800 capitalize">{patient.font_size_preference || 'medium'}</strong>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span>Font Family</span>
                <strong className="font-mono text-teal-800 capitalize">{patient.font_family_preference || 'atkinson'}</strong>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span>High Contrast Mode</span>
                <strong className={`font-mono ${patient.high_contrast_enabled ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {patient.high_contrast_enabled ? 'Enabled (1)' : 'Disabled (0)'}
                </strong>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span>Voice Assistant Audio</span>
                <strong className={`font-mono ${patient.voice_assistant_enabled ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {patient.voice_assistant_enabled ? `Enabled (${patient.voice_speed || 1.0}x)` : 'Disabled (0)'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* COGNITIVE PERFORMANCE VISUALIZATIONS (RECHARTS) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-700" />
                <span>Cognitive Performance Visualizations</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time telemetry aggregated from Supabase `game_results`
              </p>
            </div>

            {/* Chart Tab Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveChartTab('accuracy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeChartTab === 'accuracy' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Accuracy (%)
              </button>
              <button
                onClick={() => setActiveChartTab('score')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeChartTab === 'score' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Score Trend
              </button>
              <button
                onClick={() => setActiveChartTab('reaction')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeChartTab === 'reaction' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Reaction Time (ms)
              </button>
              <button
                onClick={() => setActiveChartTab('difficulty')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeChartTab === 'difficulty' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Difficulty Levels
              </button>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="h-72 w-full pt-2">
            {chronologicalGames.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {activeChartTab === 'accuracy' ? (
                  <LineChart data={chronologicalGames}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                    <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} unit="%" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="accuracy" name="Accuracy (%)" stroke="#0d9488" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                  </LineChart>
                ) : activeChartTab === 'score' ? (
                  <BarChart data={chronologicalGames}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="score" name="Session Score" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                ) : activeChartTab === 'reaction' ? (
                  <LineChart data={chronologicalGames}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} unit="ms" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="responseTime" name="Response Latency (ms)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                ) : (
                  <LineChart data={chronologicalGames}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                    <YAxis domain={[1, 3]} ticks={[1, 2, 3]} stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="stepAfter" dataKey="difficulty" name="Adaptive Difficulty (Level 1-3)" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400 font-mono">
                No session telemetry available for chart generation.
              </div>
            )}
          </div>
        </section>

        {/* SECTION: RECENT ACTIVITY & REMINDERS TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Recent Game Results Table (ORDER BY played_at DESC) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-700" />
                <span>Session History (`game_results`)</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">ORDER BY played_at DESC</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px]">
                    <th className="pb-2 font-bold">Game Type</th>
                    <th className="pb-2 font-bold">Difficulty</th>
                    <th className="pb-2 font-bold">Score</th>
                    <th className="pb-2 font-bold">Accuracy</th>
                    <th className="pb-2 font-bold">Response</th>
                    <th className="pb-2 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentGames.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 font-semibold text-slate-900">
                        {g.game_type}
                        <span className="text-[10px] text-slate-400 block font-mono font-normal">
                          {g.game_id}
                        </span>
                      </td>
                      <td className="py-3 font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          Level {g.difficulty_level}
                        </span>
                      </td>
                      <td className="py-3 font-bold font-mono text-slate-800">
                        {g.score}
                      </td>
                      <td className="py-3 font-bold font-mono text-teal-700">
                        {g.accuracy > 1 ? g.accuracy : Math.round(g.accuracy * 100)}%
                      </td>
                      <td className="py-3 font-mono text-slate-600">
                        {g.response_time_ms} ms
                      </td>
                      <td className="py-3 text-slate-400 font-mono text-[10px]">
                        {new Date(g.played_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}

                  {recentGames.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400 text-xs">
                        No gameplay sessions logged yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Active Reminders (`reminders`) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" />
                <span>Patient Reminders (`reminders`)</span>
              </h3>
              <span className="text-xs font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {reminders.filter(r => r.is_active).length} Active
              </span>
            </div>

            <div className="space-y-3">
              {reminders.map((rem) => (
                <div 
                  key={rem.id} 
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                        {getCategoryIcon(rem.category)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{rem.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">{rem.category}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-teal-800 block">
                        {rem.scheduled_time}
                      </span>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {rem.recurrence || 'daily'}
                      </span>
                    </div>
                  </div>

                  {rem.instructions && (
                    <p className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 leading-relaxed">
                      "{rem.instructions}"
                    </p>
                  )}

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Scheduled for: {rem.scheduled_date || 'Daily Active'}</span>
                    <span className={`font-bold font-mono ${rem.is_active ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {rem.is_active ? '● Active' : '○ Inactive'}
                    </span>
                  </div>
                </div>
              ))}

              {reminders.length === 0 && (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No active reminders scheduled for this patient.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </CaregiverLayout>
  );
};
