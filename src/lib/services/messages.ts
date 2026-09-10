import { createClient } from '../supabase/client';
import type { Database } from '../supabase/database.types';

const supabase = createClient();

type MessageRow = Database['public']['Tables']['messages']['Row'];
type CategoryRow = Database['public']['Tables']['categories']['Row'];
type SerieRow = Database['public']['Tables']['series']['Row'];

export interface MessageWithDetails extends MessageRow {
    categories: Pick<CategoryRow, 'id' | 'nom' | 'slug'> | null;
    series: Pick<SerieRow, 'id' | 'titre'> | null;
}

export interface MessageWithFullDetails extends MessageRow {
    categories: Pick<CategoryRow, 'id' | 'nom' | 'slug'> | null;
    series: Pick<SerieRow, 'id' | 'titre' | 'description'> | null;
}

export interface GetMessagesOptions {
    categoryId?: string;
    serieId?: string;
    search?: string;
    limit?: number;
    offset?: number;
}

export interface SerieWithCount extends SerieRow {
    messages: { count: number }[] | null;
}

/**
 * Récupère les messages avec filtres optionnels
 */
export async function getMessages({ categoryId, serieId, search, limit = 20, offset = 0 }: GetMessagesOptions = {}): Promise<MessageWithDetails[]> {
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
    return (data as unknown as MessageWithDetails[]) || [];
}

/**
 * Récupère un message par son ID
 */
export async function getMessageById(id: string): Promise<MessageWithFullDetails | null> {
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
    return data as unknown as MessageWithFullDetails;
}

/**
 * Récupère les messages d'une série, ordonnés
 */
export async function getMessagesBySerie(serieId: string): Promise<MessageRow[]> {
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
export async function getCategories(): Promise<CategoryRow[]> {
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
export async function getSeries(): Promise<SerieWithCount[]> {
    const { data, error } = await supabase
        .from('series')
        .select(`
            *,
            messages:messages(count)
        `)
        .order('titre');

    if (error) throw error;
    return (data as unknown as SerieWithCount[]) || [];
}
