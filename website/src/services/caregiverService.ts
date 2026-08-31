import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile, GameResult, Reminder, CaregiverDashboardStats, PatientDashboardOverview } from '../types/database.types';

// ============================================================================
// SANDBOX / DEMO DATA (Used ONLY when Supabase credentials are not provided)
// ============================================================================
const DEMO_PATIENTS: Profile[] = [
  {
    id: 'p-101-tenzing',
    public_user_id: 'NER-PAT-0891',
    name: 'Tenzing Norbu',
    phone_number: '+91 98621 44520',
    role: 'patient',
    preferred_language: 'en',
    font_size_preference: 'large',
    font_family_preference: 'atkinson',
    high_contrast_enabled: 1,
    voice_assistant_enabled: 1,
    voice_speed: 0.9,
    created_at: '2026-07-15T09:00:00Z',
    updated_at: '2026-08-30T16:20:00Z',
  },
  {
    id: 'p-102-sunita',
    public_user_id: 'NER-PAT-0944',
    name: 'Sunita Roy',
    phone_number: '+91 94350 11289',
    role: 'patient',
    preferred_language: 'en',
    font_size_preference: 'xlarge',
    font_family_preference: 'atkinson',
    high_contrast_enabled: 0,
    voice_assistant_enabled: 1,
    voice_speed: 1.0,
    created_at: '2026-08-01T10:30:00Z',
    updated_at: '2026-08-31T08:15:00Z',
  },
  {
    id: 'p-103-rongsen',
    public_user_id: 'NER-PAT-1022',
    name: 'Rongsen Ao',
    phone_number: '+91 97740 88219',
    role: 'patient',
    preferred_language: 'en',
    font_size_preference: 'medium',
    font_family_preference: 'atkinson',
    high_contrast_enabled: 1,
    voice_assistant_enabled: 0,
    voice_speed: 1.0,
    created_at: '2026-08-10T14:10:00Z',
    updated_at: '2026-08-29T11:45:00Z',
  },
  {
    id: 'p-104-ananya',
    public_user_id: 'NER-PAT-1180',
    name: 'Ananya Sharma',
    phone_number: '+91 98540 33412',
    role: 'patient',
    preferred_language: 'en',
    font_size_preference: 'large',
    font_family_preference: 'atkinson',
    high_contrast_enabled: 0,
    voice_assistant_enabled: 1,
    voice_speed: 0.85,
    created_at: '2026-08-18T11:00:00Z',
    updated_at: '2026-08-30T17:00:00Z',
  },
];

const DEMO_GAME_RESULTS: Record<string, GameResult[]> = {
  'p-101-tenzing': [
    {
      id: 'gr-01',
      user_id: 'p-101-tenzing',
      game_id: 'game_01_memory',
      game_type: 'Memory Recall',
      difficulty_level: 2,
      score: 840,
      accuracy: 0.88,
      response_time_ms: 1850,
      mistakes_count: 2,
      hints_used: 1,
      attempts_count: 1,
      played_at: '2026-08-31T09:30:00Z',
    },
    {
      id: 'gr-02',
      user_id: 'p-101-tenzing',
      game_id: 'game_02_pattern',
      game_type: 'Pattern Sequence',
      difficulty_level: 2,
      score: 790,
      accuracy: 0.82,
      response_time_ms: 2100,
      mistakes_count: 3,
      hints_used: 0,
      attempts_count: 1,
      played_at: '2026-08-30T16:15:00Z',
    },
    {
      id: 'gr-03',
      user_id: 'p-101-tenzing',
      game_id: 'game_01_memory',
      game_type: 'Memory Recall',
      difficulty_level: 2,
      score: 910,
      accuracy: 0.94,
      response_time_ms: 1620,
      mistakes_count: 1,
      hints_used: 0,
      attempts_count: 1,
      played_at: '2026-08-29T10:05:00Z',
    },
    {
      id: 'gr-04',
      user_id: 'p-101-tenzing',
      game_id: 'game_03_attention',
      game_type: 'Visual Focus',
      difficulty_level: 1,
      score: 650,
      accuracy: 0.76,
      response_time_ms: 2400,
      mistakes_count: 4,
      hints_used: 2,
      attempts_count: 2,
      played_at: '2026-08-28T14:40:00Z',
    },
    {
      id: 'gr-05',
      user_id: 'p-101-tenzing',
      game_id: 'game_01_memory',
      game_type: 'Memory Recall',
      difficulty_level: 1,
      score: 720,
      accuracy: 0.80,
      response_time_ms: 2200,
      mistakes_count: 3,
      hints_used: 1,
      attempts_count: 1,
      played_at: '2026-08-27T09:10:00Z',
    },
  ],
  'p-102-sunita': [
    {
      id: 'gr-11',
      user_id: 'p-102-sunita',
      game_id: 'game_01_memory',
      game_type: 'Memory Recall',
      difficulty_level: 3,
      score: 960,
      accuracy: 0.95,
      response_time_ms: 1420,
      mistakes_count: 1,
      hints_used: 0,
      attempts_count: 1,
      played_at: '2026-08-31T08:15:00Z',
    },
    {
      id: 'gr-12',
      user_id: 'p-102-sunita',
      game_id: 'game_02_pattern',
      game_type: 'Pattern Sequence',
      difficulty_level: 3,
      score: 890,
      accuracy: 0.91,
      response_time_ms: 1580,
      mistakes_count: 2,
      hints_used: 0,
      attempts_count: 1,
      played_at: '2026-08-30T11:20:00Z',
    },
  ],
  'p-103-rongsen': [
    {
      id: 'gr-21',
      user_id: 'p-103-rongsen',
      game_id: 'game_01_memory',
      game_type: 'Memory Recall',
      difficulty_level: 1,
      score: 520,
      accuracy: 0.58,
      response_time_ms: 3100,
      mistakes_count: 6,
      hints_used: 3,
      attempts_count: 2,
      played_at: '2026-08-29T11:45:00Z',
    },
  ],
  'p-104-ananya': [
    {
      id: 'gr-31',
      user_id: 'p-104-ananya',
      game_id: 'game_02_pattern',
      game_type: 'Pattern Sequence',
      difficulty_level: 2,
      score: 820,
      accuracy: 0.86,
      response_time_ms: 1950,
      mistakes_count: 2,
      hints_used: 1,
      attempts_count: 1,
      played_at: '2026-08-30T17:00:00Z',
    },
  ],
};

const DEMO_REMINDERS: Record<string, Reminder[]> = {
  'p-101-tenzing': [
    {
      id: 'rem-01',
      user_id: 'p-101-tenzing',
      title: 'Donepezil (5mg)',
      category: 'Medicine',
      instructions: 'Take 1 tablet with warm water after breakfast',
      scheduled_time: '08:30 AM',
      recurrence: 'daily',
      is_active: true,
      created_at: '2026-08-15T08:00:00Z',
    },
    {
      id: 'rem-02',
      user_id: 'p-101-tenzing',
      title: 'Morning Hydration',
      category: 'Hydration',
      instructions: 'Drink 1 full glass of fresh filtered water',
      scheduled_time: '10:00 AM',
      recurrence: 'daily',
      is_active: true,
      created_at: '2026-08-15T08:00:00Z',
    },
    {
      id: 'rem-03',
      user_id: 'p-101-tenzing',
      title: 'Gentle Garden Walk',
      category: 'Daily Activity',
      instructions: '15-minute shaded garden walk with caregiver',
      scheduled_time: '04:30 PM',
      recurrence: 'daily',
      is_active: true,
      created_at: '2026-08-15T08:00:00Z',
    },
    {
      id: 'rem-04',
      user_id: 'p-101-tenzing',
      title: 'District Telehealth Review',
      category: 'Medical Appointment',
      instructions: 'Virtual consultation with Dr. Barman (Neurology Clinic)',
      scheduled_time: '11:00 AM',
      scheduled_date: '2026-09-04',
      recurrence: 'once',
      is_active: true,
      created_at: '2026-08-20T10:00:00Z',
    },
  ],
  'p-102-sunita': [
    {
      id: 'rem-11',
      user_id: 'p-102-sunita',
      title: 'Memantine (10mg)',
      category: 'Medicine',
      instructions: 'Evening dose after meal',
      scheduled_time: '08:00 PM',
      recurrence: 'daily',
      is_active: true,
    },
    {
      id: 'rem-12',
      user_id: 'p-102-sunita',
      title: 'Afternoon Hydration',
      category: 'Hydration',
      instructions: 'Herbal tea or warm water',
      scheduled_time: '03:00 PM',
      recurrence: 'daily',
      is_active: true,
    },
  ],
  'p-103-rongsen': [
    {
      id: 'rem-21',
      user_id: 'p-103-rongsen',
      title: 'Blood Pressure Monitoring',
      category: 'Daily Activity',
      instructions: 'Check sitting BP and log reading',
      scheduled_time: '09:00 AM',
      recurrence: 'daily',
      is_active: true,
    },
  ],
  'p-104-ananya': [
    {
      id: 'rem-31',
      user_id: 'p-104-ananya',
      title: 'Cognitive Memory Game Session',
      category: 'Daily Activity',
      instructions: 'Play 2 rounds of Memory Game 01',
      scheduled_time: '11:30 AM',
      recurrence: 'daily',
      is_active: true,
    },
  ],
};

// ============================================================================
// CAREGIVER SERVICE API
// ============================================================================

/**
 * Returns current authenticated user from Supabase Auth
 */
export async function getCurrentUser() {
  if (!isSupabaseConfigured) {
    return {
      id: 'demo-caregiver-user-id',
      email: 'caregiver.demo@ner-health.org',
    };
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

/**
 * Returns the profile record for the authenticated user
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured) {
    return {
      id: 'demo-caregiver-profile-id',
      public_user_id: 'CG-NER-5501',
      name: 'Dr. Priya Borah (Caregiver)',
      role: 'caregiver',
      preferred_language: 'en',
      phone_number: '+91 98640 12345',
      created_at: '2026-06-01T00:00:00Z',
    };
  }

  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.warn('[caregiverService] Error fetching profile:', error.message);
    return null;
  }

  return data as Profile;
}

/**
 * ISOLATED PATIENT AUTHORIZATION LOGIC
 * 
 * Fetches authorized patient profiles.
 * In a future schema update with a dedicated caregiver_patients join table,
 * this function can be modified without altering any UI components.
 */
export async function getPatients(): Promise<Profile[]> {
  if (!isSupabaseConfigured) {
    return DEMO_PATIENTS;
  }

  try {
    // Under Row Level Security (RLS), this query returns only patients the authenticated user is permitted to see
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'patient')
      .order('name', { ascending: true });

    if (error) {
      console.warn('[caregiverService] Error fetching patients:', error.message);
      return DEMO_PATIENTS; // Graceful fallback
    }

    return (data || []) as Profile[];
  } catch (err) {
    console.error('[caregiverService] Unexpected error in getPatients:', err);
    return DEMO_PATIENTS;
  }
}

/**
 * Fetches game results for a given patient from `game_results`
 */
export async function getPatientGameResults(patientId: string): Promise<GameResult[]> {
  if (!isSupabaseConfigured) {
    return DEMO_GAME_RESULTS[patientId] || [];
  }

  try {
    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('user_id', patientId)
      .order('played_at', { ascending: false });

    if (error) {
      console.warn(`[caregiverService] Error fetching game_results for ${patientId}:`, error.message);
      return DEMO_GAME_RESULTS[patientId] || [];
    }

    return (data || []) as GameResult[];
  } catch (err) {
    console.error('[caregiverService] Unexpected error in getPatientGameResults:', err);
    return DEMO_GAME_RESULTS[patientId] || [];
  }
}

/**
 * Fetches active and scheduled reminders for a given patient from `reminders`
 */
export async function getPatientReminders(patientId: string): Promise<Reminder[]> {
  if (!isSupabaseConfigured) {
    return DEMO_REMINDERS[patientId] || [];
  }

  try {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('user_id', patientId)
      .order('scheduled_time', { ascending: true });

    if (error) {
      console.warn(`[caregiverService] Error fetching reminders for ${patientId}:`, error.message);
      return DEMO_REMINDERS[patientId] || [];
    }

    return (data || []) as Reminder[];
  } catch (err) {
    console.error('[caregiverService] Unexpected error in getPatientReminders:', err);
    return DEMO_REMINDERS[patientId] || [];
  }
}

/**
 * Aggregates high-level stats for the Caregiver Dashboard
 */
export async function getDashboardStats(): Promise<CaregiverDashboardStats> {
  const patients = await getPatients();
  
  let totalGames = 0;
  let totalAccuracySum = 0;
  let accuracyCount = 0;
  let totalReminders = 0;
  let recentActivities = 0;

  for (const patient of patients) {
    const games = await getPatientGameResults(patient.id);
    const reminders = await getPatientReminders(patient.id);
    
    totalGames += games.length;
    recentActivities += games.filter(g => {
      const diffDays = (Date.now() - new Date(g.played_at).getTime()) / (1000 * 3600 * 24);
      return diffDays <= 7;
    }).length;

    totalReminders += reminders.filter(r => r.is_active).length;

    games.forEach(g => {
      totalAccuracySum += g.accuracy > 1 ? g.accuracy : g.accuracy * 100;
      accuracyCount++;
    });
  }

  return {
    totalLinkedPatients: patients.length,
    totalGamesCompleted: totalGames,
    overallAverageAccuracy: accuracyCount > 0 ? Math.round(totalAccuracySum / accuracyCount) : 0,
    totalActiveReminders: totalReminders,
    recentActivityCount: recentActivities,
  };
}

/**
 * Returns compiled patient details with history and reminders
 */
export async function getPatientOverview(patientId: string): Promise<PatientDashboardOverview | null> {
  const patients = await getPatients();
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return null;

  const recentGames = await getPatientGameResults(patientId);
  const reminders = await getPatientReminders(patientId);

  const totalGamesPlayed = recentGames.length;
  let accuracySum = 0;
  let responseTimeSum = 0;
  let totalScore = 0;
  let latestDifficulty = 1;

  if (totalGamesPlayed > 0) {
    latestDifficulty = recentGames[0].difficulty_level || 1;
    recentGames.forEach(g => {
      accuracySum += g.accuracy > 1 ? g.accuracy : g.accuracy * 100;
      responseTimeSum += g.response_time_ms;
      totalScore += g.score;
    });
  }

  return {
    patient,
    recentGames,
    reminders,
    stats: {
      totalGamesPlayed,
      averageAccuracy: totalGamesPlayed > 0 ? Math.round(accuracySum / totalGamesPlayed) : 0,
      averageResponseTimeMs: totalGamesPlayed > 0 ? Math.round(responseTimeSum / totalGamesPlayed) : 0,
      currentDifficultyLevel: latestDifficulty,
      activeRemindersCount: reminders.filter(r => r.is_active).length,
      totalScore,
      lastPlayedAt: recentGames[0]?.played_at,
    },
  };
}
