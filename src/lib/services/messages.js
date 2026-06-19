import { createClient } from '../supabase/client';

const supabase = createClient();

/**
 * Récupère les messages avec filtres optionnels
 */
export async function getMessages({ categoryId, serieId, search, limit = 20, offset = 0 } = {}) {
    let query = supabase
        .from('messages')
        .select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre)
        `)
        .order('date_publication', { ascending: false })
        .range(offset, offset + limit - 1);

    if (categoryId) {
        query = query.eq('categorie_id', categoryId);
    }
    if (serieId) {
        query = query.eq('serie_id', serieId);
    }
    if (search) {
        query = query.or(`titre.ilike.%${search}%,orateur.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

/**
 * Récupère un message par son ID
 */
export async function getMessageById(id) {
    const { data, error } = await supabase
        .from('messages')
        .select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre, description)
        `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Récupère les messages d'une série, ordonnés
 */
export async function getMessagesBySerie(serieId) {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('serie_id', serieId)
        .order('ordre_dans_la_serie', { ascending: true });

    if (error) throw error;
    return data || [];
}

/**
 * Récupère toutes les catégories
 */
export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('nom');

    if (error) throw error;
    return data || [];
}

/**
 * Récupère toutes les séries
 */
export async function getSeries() {
    const { data, error } = await supabase
        .from('series')
        .select(`
            *,
            messages:messages(count)
        `)
        .order('titre');

    if (error) throw error;
    return data || [];
}
