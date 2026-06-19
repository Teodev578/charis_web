-- =============================================================
-- Charis Nation — Schéma initial de base de données
-- Exécuter ce script dans l'éditeur SQL du Dashboard Supabase
-- =============================================================

-- =============================================================
-- 1. TABLE: utilisateurs
-- =============================================================
CREATE TABLE IF NOT EXISTS public.utilisateurs (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nom_complet TEXT,
    profil TEXT NOT NULL DEFAULT 'membre' CHECK (profil IN ('membre', 'admin')),
    mis_a_jour_le TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger : crée automatiquement un profil utilisateur à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.utilisateurs (id, nom_complet, profil)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'nom_complet', NEW.raw_user_meta_data->>'full_name', 'Utilisateur'),
        'membre'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================
-- 2. TABLE: categories
-- =============================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
);

-- Seed quelques catégories par défaut
INSERT INTO public.categories (nom, slug) VALUES
    ('Foi & Croyance', 'foi-croyance'),
    ('Prière', 'priere'),
    ('Vie chrétienne', 'vie-chretienne'),
    ('Prophétie', 'prophetie'),
    ('Louange & Adoration', 'louange-adoration'),
    ('Famille', 'famille')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================
-- 3. TABLE: series
-- =============================================================
CREATE TABLE IF NOT EXISTS public.series (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT NOT NULL,
    description TEXT
);

-- =============================================================
-- 4. TABLE: messages (enseignements audio)
-- =============================================================
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date_publication TIMESTAMPTZ DEFAULT NOW(),
    titre TEXT NOT NULL,
    orateur TEXT NOT NULL DEFAULT 'Rev. Israel Watchman',
    audio_url TEXT NOT NULL,
    image_url TEXT,
    duree_secondes INTEGER NOT NULL DEFAULT 0,
    ordre_dans_la_serie INTEGER,
    categorie_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    serie_id UUID REFERENCES public.series(id) ON DELETE SET NULL,
    utilisateur_id UUID REFERENCES public.utilisateurs(id) ON DELETE SET NULL
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_messages_date ON public.messages(date_publication DESC);
CREATE INDEX IF NOT EXISTS idx_messages_categorie ON public.messages(categorie_id);
CREATE INDEX IF NOT EXISTS idx_messages_serie ON public.messages(serie_id);

-- =============================================================
-- 5. TABLE: favoris
-- =============================================================
CREATE TABLE IF NOT EXISTS public.favoris (
    utilisateur_id UUID REFERENCES public.utilisateurs(id) ON DELETE CASCADE,
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
    date_ajout TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (utilisateur_id, message_id)
);

-- =============================================================
-- 6. TABLE: progression_lecture
-- =============================================================
CREATE TABLE IF NOT EXISTS public.progression_lecture (
    utilisateur_id UUID REFERENCES public.utilisateurs(id) ON DELETE CASCADE,
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
    temps_secondes REAL NOT NULL DEFAULT 0,
    est_termine BOOLEAN NOT NULL DEFAULT FALSE,
    mis_a_jour_le TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (utilisateur_id, message_id)
);

-- =============================================================
-- 7. TABLE: notes
-- =============================================================
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID NOT NULL REFERENCES public.utilisateurs(id) ON DELETE CASCADE,
    message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    contenu TEXT NOT NULL,
    position_audio_secondes REAL NOT NULL DEFAULT 0,
    cree_le TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_user_message ON public.notes(utilisateur_id, message_id);

-- =============================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- =============================================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.utilisateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoris ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progression_lecture ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- --- Catégories : lecture publique ---
CREATE POLICY "categories_select_public" ON public.categories
    FOR SELECT USING (true);

-- --- Séries : lecture publique ---
CREATE POLICY "series_select_public" ON public.series
    FOR SELECT USING (true);

-- --- Messages : lecture publique ---
CREATE POLICY "messages_select_public" ON public.messages
    FOR SELECT USING (true);

-- Messages : insertion/modification admin uniquement
CREATE POLICY "messages_insert_admin" ON public.messages
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.utilisateurs WHERE id = auth.uid() AND profil = 'admin')
    );

CREATE POLICY "messages_update_admin" ON public.messages
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.utilisateurs WHERE id = auth.uid() AND profil = 'admin')
    );

-- --- Utilisateurs ---
CREATE POLICY "utilisateurs_select_own" ON public.utilisateurs
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "utilisateurs_update_own" ON public.utilisateurs
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id
        AND profil = (SELECT profil FROM public.utilisateurs WHERE id = auth.uid())
    );

-- --- Favoris ---
CREATE POLICY "favoris_select_own" ON public.favoris
    FOR SELECT USING (auth.uid() = utilisateur_id);

CREATE POLICY "favoris_insert_own" ON public.favoris
    FOR INSERT WITH CHECK (auth.uid() = utilisateur_id);

CREATE POLICY "favoris_delete_own" ON public.favoris
    FOR DELETE USING (auth.uid() = utilisateur_id);

-- --- Progression lecture ---
CREATE POLICY "progression_select_own" ON public.progression_lecture
    FOR SELECT USING (auth.uid() = utilisateur_id);

CREATE POLICY "progression_insert_own" ON public.progression_lecture
    FOR INSERT WITH CHECK (auth.uid() = utilisateur_id);

CREATE POLICY "progression_update_own" ON public.progression_lecture
    FOR UPDATE USING (auth.uid() = utilisateur_id);

-- --- Notes ---
CREATE POLICY "notes_select_own" ON public.notes
    FOR SELECT USING (auth.uid() = utilisateur_id);

CREATE POLICY "notes_insert_own" ON public.notes
    FOR INSERT WITH CHECK (auth.uid() = utilisateur_id);

CREATE POLICY "notes_delete_own" ON public.notes
    FOR DELETE USING (auth.uid() = utilisateur_id);

CREATE POLICY "notes_update_own" ON public.notes
    FOR UPDATE USING (auth.uid() = utilisateur_id);
