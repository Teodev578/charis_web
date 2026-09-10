-- =============================================================
-- SCRIPT DE RÉPARATION : CORRECTION DE LA RÉCURSION INFINIE (42P17)
-- Exécuter ce script dans l'éditeur SQL du Dashboard Supabase
-- =============================================================

-- 0. Création de la fonction de sécurité (Bypass RLS)
CREATE OR REPLACE FUNCTION public.get_user_profil(user_id uuid)
RETURNS text AS $$
BEGIN
  RETURN (SELECT profil FROM public.utilisateurs WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Suppression forcée de TOUTES les anciennes politiques potentiellement buggées
DROP POLICY IF EXISTS "utilisateurs_select_admin" ON public.utilisateurs;
DROP POLICY IF EXISTS "utilisateurs_update_admin" ON public.utilisateurs;
DROP POLICY IF EXISTS "utilisateurs_delete_admin" ON public.utilisateurs;

-- 2. Recréation des politiques propres et sécurisées (sans récursion)
CREATE POLICY "utilisateurs_select_admin" ON public.utilisateurs
    FOR SELECT USING ( public.get_user_profil(auth.uid()) = 'admin' );

CREATE POLICY "utilisateurs_update_admin" ON public.utilisateurs
    FOR UPDATE USING ( public.get_user_profil(auth.uid()) = 'admin' );

CREATE POLICY "utilisateurs_delete_admin" ON public.utilisateurs
    FOR DELETE USING ( public.get_user_profil(auth.uid()) = 'admin' );
