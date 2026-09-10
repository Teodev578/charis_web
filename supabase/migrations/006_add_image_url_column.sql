-- =============================================================
-- FIX: Ajouter la colonne image_url manquante
-- Exécuter ce script dans l'éditeur SQL du Dashboard Supabase
-- =============================================================

-- Ajoute la colonne image_url à la table messages si elle n'existe pas
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Forcer le rafraîchissement du cache de schéma de PostgREST
NOTIFY pgrst, 'reload schema';
