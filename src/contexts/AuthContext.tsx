'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createClient } from '../lib/supabase/client';
import type { User, Session, Provider, AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import type { Database } from '../lib/supabase/database.types';

type ProfileRow = Database['public']['Tables']['utilisateurs']['Row'];

export interface AuthContextType {
    user: User | null;
    profile: ProfileRow | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, nomComplet: string) => Promise<AuthResponse['data']>;
    signIn: (email: string, password: string) => Promise<AuthResponse['data']>;
    signInWithOAuth: (provider: Provider) => Promise<OAuthResponse['data']>;
    signOut: () => Promise<void>;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<ProfileRow | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const supabase = createClient();

    // Fetch user profile from utilisateurs table
    const fetchProfile = useCallback(async (userId: string) => {
        console.log('DEBUG: fetchProfile called with userId:', userId);
        try {
            const { data, error } = await supabase
                .from('utilisateurs')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            console.log('DEBUG: fetchProfile result:', { data, error });

            if (error) {
                console.error('Error fetching profile:', {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                    hint: error.hint,
                    fullError: error
                });
                return null;
            }
            return data;
        } catch (err) {
            console.error('Profile fetch failed:', err);
            return null;
        }
    }, [supabase]);

    useEffect(() => {
        // Get initial session
        const initAuth = async () => {
            try {
                const { data: { session: currentSession } } = await supabase.auth.getSession();

                if (currentSession) {
                    setSession(currentSession);
                    setUser(currentSession.user);
                    const prof = await fetchProfile(currentSession.user.id);
                    setProfile(prof);
                }
            } catch (err) {
                console.error('Auth init failed:', err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                setSession(newSession);
                setUser(newSession?.user ?? null);

                if (newSession?.user) {
                    const prof = await fetchProfile(newSession.user.id);
                    setProfile(prof);
                } else {
                    setProfile(null);
                }

                setLoading(false);
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, [supabase, fetchProfile]);

    const signUp = async (email: string, password: string, nomComplet: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nom_complet: nomComplet,
                },
            },
        });

        if (error) throw error;
        return data;
    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    };

    const signInWithOAuth = async (provider: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
            },
        });
        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setProfile(null);
        setSession(null);
    };

    const value: AuthContextType = {
        user,
        profile,
        session,
        loading,
        signUp,
        signIn,
        signInWithOAuth,
        signOut,
        isAuthenticated: !!user,
        isAdmin: profile?.profil === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
