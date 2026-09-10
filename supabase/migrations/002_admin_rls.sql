-- =============================================================
-- Charis Nation — Mise à jour des permissions Admin (RLS)
-- Exécuter ce script dans l'éditeur SQL du Dashboard Supabase
-- =============================================================

-- =============================================================
-- Charis Nation — Mise à jour des permissions Admin (RLS)
-- Exécuter ce script dans l'éditeur SQL du Dashboard Supabase
-- =============================================================

-- ==========================================
-- 0. FONCTION DE SÉCURITÉ POUR ÉVITER LA RÉCURSION INFINIE
-- ==========================================
-- Cette fonction permet de lire le profil d'un utilisateur sans déclencher les politiques RLS,
-- ce qui empêche l'erreur "infinite recursion detected" lors de la vérification des droits admin.
CREATE OR REPLACE FUNCTION public.get_user_profil(user_id uuid)
RETURNS text AS $$
BEGIN
  RETURN (SELECT profil FROM public.utilisateurs WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- 1. PERMISSIONS ADMIN POUR LES UTILISATEURS
-- ==========================================

-- Suppression des anciennes politiques si elles existent pour éviter les doublons
DROP POLICY IF EXISTS "utilisateurs_select_admin" ON public.utilisateurs;
DROP POLICY IF EXISTS "utilisateurs_update_admin" ON public.utilisateurs;
DROP POLICY IF EXISTS "utilisateurs_delete_admin" ON public.utilisateurs;

-- Autoriser les admins à VOIR tous les utilisateurs
CREATE POLICY "utilisateurs_select_admin" ON public.utilisateurs
    FOR SELECT USING ( public.get_user_profil(auth.uid()) = 'admin' );

-- Autoriser les admins à MODIFIER n'importe quel profil (ex: donner le rôle admin)
CREATE POLICY "utilisateurs_update_admin" ON public.utilisateurs
    FOR UPDATE USING ( public.get_user_profil(auth.uid()) = 'admin' );

-- Autoriser les admins à SUPPRIMER un profil utilisateur
CREATE POLICY "utilisateurs_delete_admin" ON public.utilisateurs
    FOR DELETE USING ( public.get_user_profil(auth.uid()) = 'admin' );

-- ==========================================
-- 2. PERMISSIONS ADMIN MANQUANTES (Catégories, Séries, Messages)
-- ==========================================

DROP POLICY IF EXISTS "messages_delete_admin" ON public.messages;
CREATE POLICY "messages_delete_admin" ON public.messages
    FOR DELETE USING ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "categories_insert_admin" ON public.categories;
CREATE POLICY "categories_insert_admin" ON public.categories
    FOR INSERT WITH CHECK ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "categories_update_admin" ON public.categories;
CREATE POLICY "categories_update_admin" ON public.categories
    FOR UPDATE USING ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "categories_delete_admin" ON public.categories;
CREATE POLICY "categories_delete_admin" ON public.categories
    FOR DELETE USING ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "series_insert_admin" ON public.series;
CREATE POLICY "series_insert_admin" ON public.series
    FOR INSERT WITH CHECK ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "series_update_admin" ON public.series;
CREATE POLICY "series_update_admin" ON public.series
    FOR UPDATE USING ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "series_delete_admin" ON public.series;
CREATE POLICY "series_delete_admin" ON public.series
    FOR DELETE USING ( public.get_user_profil(auth.uid()) = 'admin' );
