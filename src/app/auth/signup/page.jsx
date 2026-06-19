'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [nomComplet, setNomComplet] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères.');
            setLoading(false);
            return;
        }

        try {
            await signUp(email, password, nomComplet);
            setSuccess(true);
        } catch (err) {
            if (err.message.includes('already registered')) {
                setError('Cet email est déjà utilisé. Essayez de vous connecter.');
            } else {
                setError('Une erreur est survenue. Réessayez.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-bg-pattern" />
                <div className="auth-container">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <span className="auth-logo-cross">✞</span>
                            <span className="auth-logo-text">CHARIS NATION</span>
                        </div>
                        <h1 className="auth-title">Vérifiez votre email</h1>
                        <p className="auth-subtitle">
                            Un lien de confirmation a été envoyé à <strong>{email}</strong>.
                            Cliquez sur le lien pour activer votre compte.
                        </p>
                    </div>
                    <Link href="/auth/login" className="auth-submit-btn" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-bg-pattern" />
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-logo">
                        <span className="auth-logo-cross">✞</span>
                        <span className="auth-logo-text">CHARIS NATION</span>
                    </div>
                    <h1 className="auth-title">Rejoignez la communauté</h1>
                    <p className="auth-subtitle">Créez votre compte pour accéder aux enseignements</p>
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
                        <label htmlFor="nom-complet">Nom complet</label>
                        <input
                            id="nom-complet"
                            type="text"
                            value={nomComplet}
                            onChange={(e) => setNomComplet(e.target.value)}
                            placeholder="Ex: Jean Dupont"
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">Adresse email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 6 caractères"
                            required
                            autoComplete="new-password"
                            minLength={6}
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
                            'Créer mon compte'
                        )}
                    </button>
                </form>

                <p className="auth-switch">
                    Déjà un compte ?{' '}
                    <Link href="/auth/login" className="auth-link">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
