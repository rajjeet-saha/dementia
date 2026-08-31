import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Clock, 
  Bell, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Volume2, 
  Gamepad2
} from 'lucide-react';
import { CaregiverLayout } from '../../components/caregiver/CaregiverLayout';
import { 
  getPatients, 
  getDashboardStats, 
  getPatientGameResults,
  getPatientReminders 
} from '../../services/caregiverService';
import type { Profile, CaregiverDashboardStats, GameResult } from '../../types/database.types';
import { useAuth } from '../../context/AuthContext';

interface PartnerSummaryWithActivity {
  patient: Profile;
  lastPlayedAt?: string;
  totalGames: number;
  avgAccuracy: number;
  activeDifficulty: number;
  activeReminders: number;
}

export const CaregiverDashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<CaregiverDashboardStats | null>(null);
  const [partnerSummaries, setPartnerSummaries] = useState<PartnerSummaryWithActivity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentGlobalGames, setRecentGlobalGames] = useState<{ game: GameResult; partnerName: string }[]>([]);

  const loadData = async () => {
    try {
      const dashboardStats = await getDashboardStats();
      setStats(dashboardStats);

      const patientList = await getPatients();
      const summaries: PartnerSummaryWithActivity[] = [];
      const allGames: { game: GameResult; partnerName: string }[] = [];

      for (const p of patientList) {
        const games = await getPatientGameResults(p.id);
        const reminders = await getPatientReminders(p.id);

        let accSum = 0;
        games.forEach(g => {
          accSum += g.accuracy > 1 ? g.accuracy : g.accuracy * 100;
          allGames.push({ game: g, partnerName: p.name });
        });

        const avgAcc = games.length > 0 ? Math.round(accSum / games.length) : 0;
        const currentDiff = games.length > 0 ? games[0].difficulty_level : 1;

        summaries.push({
          patient: p,
          lastPlayedAt: games[0]?.played_at,
          totalGames: games.length,
          avgAccuracy: avgAcc,
          activeDifficulty: currentDiff,
          activeReminders: reminders.filter(r => r.is_active).length,
        });
      }

      // Sort recent games globally
      allGames.sort((a, b) => new Date(b.game.played_at).getTime() - new Date(a.game.played_at).getTime());
      setRecentGlobalGames(allGames.slice(0, 5));
      setPartnerSummaries(summaries);
    } catch (err) {
      console.error('[CaregiverDashboard] Error loading data:', err);
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
    loadData();
  }, [user, authLoading]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  const filteredPartners = partnerSummaries.filter(item => 
    item.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.patient.public_user_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CaregiverLayout
      title="Caregiver Overview Dashboard"
      subtitle="Monitoring cognitive performance, daily adherence, and active reminders for authorized partners"
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    >
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">Querying partner records from Supabase...</p>
        </div>
      ) : (
        <div className="space-y-8 text-left">
          {/* SECTION 1: OVERVIEW METRIC CARDS */}
          <section aria-labelledby="overview-stats-heading">
            <h2 id="overview-stats-heading" className="sr-only">Platform Overview Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Linked Partners */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Linked Partners
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    {stats?.totalLinkedPatients || 0}
                  </span>
                  <span className="text-xs text-slate-500 ml-2 font-medium">Under Care</span>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-blue-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>RLS Authorized Profiles</span>
                </div>
              </div>

              {/* Stat 2: Activities Completed */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Activities Completed
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center border border-orange-100">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    {stats?.totalGamesCompleted || 0}
                  </span>
                  <span className="text-xs text-slate-500 ml-2 font-medium">Sessions</span>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-orange-800 font-semibold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{stats?.recentActivityCount || 0} active this week</span>
                </div>
              </div>

              {/* Stat 3: Average Accuracy */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Average Accuracy
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center border border-green-100">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    {stats?.overallAverageAccuracy || 0}%
                  </span>
                  <span className="text-xs text-slate-500 ml-2 font-medium">Overall Score</span>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-green-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-green-600" />
                  <span>Steady Engagement</span>
                </div>
              </div>

              {/* Stat 4: Active Reminders */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Active Reminders
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    {stats?.totalActiveReminders || 0}
                  </span>
                  <span className="text-xs text-slate-500 ml-2 font-medium">Schedules</span>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-amber-800 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Medication, Water & Clinic</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: AUTHORIZED PARTNER REGISTRY */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-700" />
                  <span>Authorized Partner Registry</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select a partner profile to inspect progress trends, session history, and reminder schedules.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Filter by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-9 pr-4 py-2 bg-[#faf8f5] border border-stone-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Partner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPartners.map(({ patient, lastPlayedAt, totalGames, avgAccuracy, activeDifficulty, activeReminders }) => (
                <div
                  key={patient.id}
                  className="p-5 rounded-xl bg-[#faf8f5] hover:bg-blue-50/40 border border-stone-200 hover:border-blue-300 transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200">
                          {patient.public_user_id}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                          {patient.name}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono">
                          Lang: {patient.preferred_language.toUpperCase()} • {patient.phone_number || 'No phone'}
                        </p>
                      </div>

                      {/* Difficulty Level Pill */}
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                        Tier {activeDifficulty}
                      </span>
                    </div>

                    {/* Accessibility Preferences */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
                      {patient.high_contrast_enabled === 1 && (
                        <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-stone-200">
                          <Eye className="w-3 h-3 text-slate-700" /> High Contrast
                        </span>
                      )}
                      {patient.voice_assistant_enabled === 1 && (
                        <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-stone-200">
                          <Volume2 className="w-3 h-3 text-emerald-700" /> Voice Assist
                        </span>
                      )}
                      <span className="bg-white px-2 py-0.5 rounded border border-stone-200 capitalize font-mono text-[10px]">
                        Font: {patient.font_size_preference || 'medium'}
                      </span>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-3.5 pt-3 border-t border-stone-200/70 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2 rounded-lg border border-stone-200">
                        <span className="text-[10px] text-slate-400 block">Accuracy</span>
                        <strong className="text-blue-900 font-mono text-sm">{avgAccuracy}%</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-stone-200">
                        <span className="text-[10px] text-slate-400 block">Activities</span>
                        <strong className="text-slate-800 font-mono text-sm">{totalGames}</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-stone-200">
                        <span className="text-[10px] text-slate-400 block">Reminders</span>
                        <strong className="text-amber-800 font-mono text-sm">{activeReminders} Active</strong>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Button */}
                  <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {lastPlayedAt 
                        ? `Last Activity: ${new Date(lastPlayedAt).toLocaleDateString()}` 
                        : 'No session logs yet'}
                    </span>
                    <Link
                      to={`/caregiver/patient/${patient.id}`}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#1e3a8a] hover:bg-[#172554] transition shadow-xs"
                    >
                      <span>View Partner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredPartners.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-xs">
                No matching partners found for "{searchQuery}".
              </div>
            )}
          </section>

          {/* SECTION 3: RECENT GLOBAL ACTIVITY FEED */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-700" />
                  <span>Recent Partner Activity Feed</span>
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Real-time telemetry ordered by played_at DESC
                </p>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {recentGlobalGames.map(({ game, partnerName }) => (
                <div key={game.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0">
                      🧠
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">{partnerName}</span>
                      <span className="text-slate-400 mx-1.5">•</span>
                      <span className="font-medium text-blue-900">{game.game_type}</span>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Response: {game.response_time_ms} ms • Mistakes: {game.mistakes_count} • Hints: {game.hints_used}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:text-right font-mono">
                    <div>
                      <span className="text-emerald-700 font-bold">
                        {game.accuracy > 1 ? game.accuracy : Math.round(game.accuracy * 100)}% Acc
                      </span>
                      <span className="text-[10px] text-slate-400 block">Score: {game.score}</span>
                    </div>
                    <span className="text-[10px] bg-stone-100 text-slate-600 px-2 py-0.5 rounded border border-stone-200">
                      Level {game.difficulty_level}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden md:inline">
                      {new Date(game.played_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {recentGlobalGames.length === 0 && (
                <p className="text-xs text-slate-400 py-3">No recent sessions recorded.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </CaregiverLayout>
  );
};
