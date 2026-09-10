-- =============================================================
-- 7. TABLE: annonces
-- =============================================================
CREATE TABLE IF NOT EXISTS public.annonces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('event', 'quote')),
    title TEXT,
    subtitle TEXT,
    date_text TEXT,
    bg_image TEXT,
    accent_color TEXT,
    is_cursive_title BOOLEAN DEFAULT FALSE,
    footer_text TEXT,
    socials BOOLEAN DEFAULT TRUE,
    quote TEXT,
    author TEXT,
    est_actif BOOLEAN DEFAULT TRUE,
    cree_le TIMESTAMPTZ DEFAULT NOW(),
    mis_a_jour_le TIMESTAMPTZ DEFAULT NOW()
);

-- Activation de RLS
ALTER TABLE public.annonces ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
DROP POLICY IF EXISTS "annonces_select_all" ON public.annonces;
CREATE POLICY "annonces_select_all" ON public.annonces
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "annonces_insert_admin" ON public.annonces;
CREATE POLICY "annonces_insert_admin" ON public.annonces
    FOR INSERT WITH CHECK ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "annonces_update_admin" ON public.annonces;
CREATE POLICY "annonces_update_admin" ON public.annonces
    FOR UPDATE USING ( public.get_user_profil(auth.uid()) = 'admin' );

DROP POLICY IF EXISTS "annonces_delete_admin" ON public.annonces;
CREATE POLICY "annonces_delete_admin" ON public.annonces
    FOR DELETE USING ( public.get_user_profil(auth.uid()) = 'admin' );

-- Insertion de données de démonstration (seeds)
INSERT INTO public.annonces (type, title, subtitle, date_text, bg_image, accent_color, is_cursive_title, footer_text, socials)
VALUES 
    (
        'event',
        'Prophétique',
        'AUDITORIUM CHARIS NATION | HOUSE OF EXCELLENCE',
        '18H45 - VEN. 29 MAI',
        '/images/worship_woman.png',
        'var(--brand-yellow)',
        true,
        'CHARIS NATION HOUSE OF EXCELLENCE',
        true
    ),
    (
        'event',
        'Tarrîz Ye',
        'AVEC Rev. ISRAEL WATCHMAN',
        'VEN 22 MAI À 20H GMT',
        '/images/preacher_man.png',
        '#FFFFFF',
        false,
        'CHARIS NATION HOUSE OF EXCELLENCE',
        true
    );

INSERT INTO public.annonces (type, bg_image, accent_color, footer_text, socials, quote, author, subtitle)
VALUES 
    (
        'quote',
        '/images/sunset_faith.png',
        'var(--brand-purple)',
        'CHARIS NATION HOUSE OF EXCELLENCE',
        true,
        'L''amour de Dieu nous donne une seconde chance. Sa miséricorde nous donne une seconde chance.',
        'Rev. Israel Watchman',
        'CHARIS NATION HOUSE OF EXCELLENCE'
    );
