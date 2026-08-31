/**
 * DEMENTIA Supabase Database Types
 * 
 * Strict type definitions matching the existing mobile app schema:
 * - profiles
 * - game_results
 * - reminders
 */

export interface Profile {
  id: string; // UUID references auth.users(id)
  public_user_id: string;
  name: string;
  phone_number?: string | null;
  role: 'patient' | 'caregiver' | 'healthcare_worker' | string;
  preferred_language: string;
  created_at?: string;
  updated_at?: string;
  
  // Accessibility preferences configured from mobile app
  font_size_preference?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  font_family_preference?: 'atkinson' | 'system' | 'serif' | string;
  high_contrast_enabled?: number; // 0 or 1
  voice_assistant_enabled?: number; // 0 or 1
  voice_speed?: number; // e.g. 1.0, 0.8, 1.2
}

export interface GameResult {
  id: string;
  user_id: string; // references profiles(id)
  game_id: string; // e.g. "game_01_memory", "game_02_pattern", "game_03_attention"
  game_type: string; // e.g. "Memory Recall", "Pattern Sequence", "Visual Focus"
  difficulty_level: number; // 1, 2, or 3
  score: number;
  accuracy: number; // 0.0 to 1.0 (or percentage 0-100)
  response_time_ms: number;
  mistakes_count: number;
  hints_used: number;
  attempts_count: number;
  played_at: string; // ISO timestamp string
}

export interface Reminder {
  id: string;
  user_id: string; // references profiles(id)
  title: string;
  category: 'Medicine' | 'Hydration' | 'Daily Activity' | 'Medical Appointment' | string;
  instructions?: string | null;
  scheduled_time: string; // e.g. "08:30 AM" or "14:00"
  scheduled_date?: string | null; // e.g. "2026-09-01"
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'once' | string;
  is_active: boolean;
  created_at?: string;
}

export interface PatientDashboardOverview {
  patient: Profile;
  recentGames: GameResult[];
  reminders: Reminder[];
  stats: {
    totalGamesPlayed: number;
    averageAccuracy: number;
    averageResponseTimeMs: number;
    currentDifficultyLevel: number;
    activeRemindersCount: number;
    totalScore: number;
    lastPlayedAt?: string;
  };
}

export interface CaregiverDashboardStats {
  totalLinkedPatients: number;
  totalGamesCompleted: number;
  overallAverageAccuracy: number;
  totalActiveReminders: number;
  recentActivityCount: number;
}
