-- =============================================================
-- Configuration Automatique du Stockage (Storage) Supabase
-- Exécuter ce script dans l'éditeur SQL du Dashboard Supabase
-- =============================================================

-- 0. S'assurer que la fonction d'aide existe (pour éviter l'erreur "does not exist")
CREATE OR REPLACE FUNCTION public.get_user_profil(user_id uuid)
RETURNS text AS $$
BEGIN
  RETURN (SELECT profil FROM public.utilisateurs WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Création automatique des Buckets (dossiers) s'ils n'existent pas
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('messages_audio', 'messages_audio', true),
  ('messages_images', 'messages_images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Suppression des anciennes politiques sur ces buckets pour éviter les conflits
DROP POLICY IF EXISTS "Admins can manage messages_audio" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage messages_images" ON storage.objects;

-- 3. Autoriser les Administrateurs à Uploader, Modifier et Supprimer des fichiers
CREATE POLICY "Admins can manage messages_audio" ON storage.objects
  FOR ALL USING (
    bucket_id = 'messages_audio' AND public.get_user_profil(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can manage messages_images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'messages_images' AND public.get_user_profil(auth.uid()) = 'admin'
  );
