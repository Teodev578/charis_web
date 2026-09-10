-- =============================================================
-- FIX: Uniformiser les politiques RLS pour les messages
-- Exécuter ce script dans l'éditeur SQL du Dashboard Supabase
-- =============================================================

DROP POLICY IF EXISTS "messages_insert_admin" ON public.messages;
CREATE POLICY "messages_insert_admin" ON public.messages
    FOR INSERT WITH CHECK ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "messages_update_admin" ON public.messages;
CREATE POLICY "messages_update_admin" ON public.messages
    FOR UPDATE USING ( public.get_user_profil(auth.uid()) = 'admin' );
