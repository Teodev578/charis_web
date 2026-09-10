'use client';

import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Provider } from '@supabase/supabase-js';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { signIn, signInWithOAuth } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            router.push('/');
        } catch (err: any) {
            setError(
                err?.message === 'Invalid login credentials'
                    ? 'Email ou mot de passe incorrect.'
                    : 'Une erreur est survenue. Réessayez.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-pattern" />
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-logo">
                        <span className="auth-logo-cross">✞</span>
                        <span className="auth-logo-text">CHARIS NATION</span>
                    </div>
                    <h1 className="auth-title">Bon retour parmi nous</h1>
                    <p className="auth-subtitle">Connectez-vous pour accéder à vos enseignements</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div className="auth-error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="auth-field">
                        <label htmlFor="email">Adresse email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="auth-spinner" />
                        ) : (
                            'Se connecter'
                        )}
                    </button>
                </form>

                <div className="auth-divider">
                    <div className="auth-divider-line"></div>
                    <span>ou continuer avec</span>
                    <div className="auth-divider-line"></div>
                </div>

                <div className="auth-social-buttons">
                    <button type="button" onClick={() => signInWithOAuth('google' as Provider)} className="auth-social-btn" aria-label="Continuer avec Google">
                        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>
                    <button type="button" onClick={() => signInWithOAuth('facebook' as Provider)} className="auth-social-btn" aria-label="Continuer avec Facebook">
                        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z" fill="#1877F2"/>
                            <path d="M16.19 11.082l.467-3.622h-3.587V5.147c0-1.048.291-1.763 1.795-1.763l1.918-.001V.143c-.332-.044-1.47-.143-2.795-.143-2.766 0-4.659 1.688-4.659 4.788v2.671H6.19v3.622h3.128V24h3.502v-9.294h3.12z" fill="#FFFFFF"/>
                        </svg>
                        Facebook
                    </button>
                    <button type="button" onClick={() => signInWithOAuth('apple' as Provider)} className="auth-social-btn" aria-label="Continuer avec Apple">
                        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.05 15.68c-.02.04-.69 2.37-2.4 4.86-1.66 2.4-3.4 4.8-6.03 4.8-2.6 0-3.46-1.58-6.42-1.58-3 0-4.04 1.54-6.45 1.62-2.5.08-4.48-2.61-6.18-5.07-3.48-5.04-4.45-10.43-2.28-13.62 1.36-2.02 3.67-3.23 6-3.26 2.4-.04 4.67 1.62 6.18 1.62 1.5 0 4.14-1.92 6.94-1.62 1.15.04 4.41.46 6.52 3.55-5.26 3.16-4.36 10.4 4.12 8.7zm-4.71-11.84c1.23-1.48 2.05-3.56 1.83-5.6-1.74.07-3.95 1.16-5.22 2.68-1.12 1.34-2.08 3.48-1.8 5.48 1.95.15 4.02-1.05 5.19-2.56z" fill="#000000"/>
                        </svg>
                        Apple
                    </button>
                </div>

                <p className="auth-switch">
                    Pas encore de compte ?{' '}
                    <Link href="/auth/signup" className="auth-link">
                        Créer un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}
