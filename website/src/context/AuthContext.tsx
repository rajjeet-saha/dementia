import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile } from '../types/database.types';
import { getCurrentProfile } from '../services/caregiverService';

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  role: string | null;
  loading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInDemo: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Initialize with demo caregiver credentials
      setUser({ id: 'demo-caregiver-user-id', email: 'caregiver.demo@ner-health.org' });
      getCurrentProfile().then(p => {
        setProfile(p);
        setLoading(false);
      });
      return;
    }

    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        getCurrentProfile().then(p => setProfile(p));
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const p = await getCurrentProfile();
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured || isDemoMode) {
      // Demo authentication simulation
      setUser({ id: 'demo-caregiver-user-id', email });
      const p = await getCurrentProfile();
      setProfile(p);
      setIsDemoMode(true);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error: error.message };

      if (data.user) {
        const p = await getCurrentProfile();
        if (p && p.role !== 'caregiver' && p.role !== 'healthcare_worker') {
          await supabase.auth.signOut();
          return { error: 'Access denied. Account is not registered as a caregiver or healthcare worker.' };
        }
        setProfile(p);
      }

      return {};
    } catch (err: any) {
      return { error: err.message || 'Failed to sign in' };
    }
  };

  const signInDemo = async () => {
    setIsDemoMode(true);
    setUser({ id: 'demo-caregiver-user-id', email: 'caregiver.demo@ner-health.org' });
    const p = await getCurrentProfile();
    setProfile(p);
  };

  const signOut = async () => {
    if (isSupabaseConfigured && !isDemoMode) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    setIsDemoMode(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role: profile?.role || (user ? 'caregiver' : null),
        loading,
        isDemoMode,
        signIn,
        signInDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
