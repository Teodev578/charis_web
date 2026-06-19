import { createClient } from '../supabase/client';

const supabase = createClient();

// ─── PROGRESSION ────────────────────────────────────────

/**
 * Récupère toutes les progressions d'un utilisateur
 */
export async function getUserProgress(userId) {
    const { data, error } = await supabase
        .from('progression_lecture')
        .select(`
            *,
            messages:message_id (*)
        `)
        .eq('utilisateur_id', userId)
        .order('mis_a_jour_le', { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Upsert de progression (sync optimisée — appelée toutes les 30s, pause, ou visibilitychange)
 */
export async function upsertProgress(userId, messageId, tempsSecondes, estTermine = false) {
    const { data, error } = await supabase
        .from('progression_lecture')
        .upsert({
            utilisateur_id: userId,
            message_id: messageId,
            temps_secondes: tempsSecondes,
            est_termine: estTermine,
            mis_a_jour_le: new Date().toISOString(),
        }, {
            onConflict: 'utilisateur_id,message_id',
        });

    if (error) throw error;
    return data;
}

// ─── FAVORIS ────────────────────────────────────────────

/**
 * Récupère les favoris d'un utilisateur
 */
export async function getUserFavorites(userId) {
    const { data, error } = await supabase
        .from('favoris')
        .select(`
            *,
            messages:message_id (*)
        `)
        .eq('utilisateur_id', userId)
        .order('date_ajout', { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Vérifie si un message est en favori
 */
export async function isFavorite(userId, messageId) {
    const { data, error } = await supabase
        .from('favoris')
        .select('message_id')
        .eq('utilisateur_id', userId)
        .eq('message_id', messageId)
        .maybeSingle();

    if (error) throw error;
    return !!data;
}

/**
 * Toggle favori (ajoute ou retire)
 */
export async function toggleFavorite(userId, messageId) {
    const exists = await isFavorite(userId, messageId);

    if (exists) {
        const { error } = await supabase
            .from('favoris')
            .delete()
            .eq('utilisateur_id', userId)
            .eq('message_id', messageId);
        if (error) throw error;
        return false; // removed
    } else {
        const { error } = await supabase
            .from('favoris')
            .insert({ utilisateur_id: userId, message_id: messageId });
        if (error) throw error;
        return true; // added
    }
}

// ─── NOTES ──────────────────────────────────────────────

/**
 * Récupère les notes d'un utilisateur, optionnellement filtrées par message
 */
export async function getUserNotes(userId, messageId = null) {
    let query = supabase
        .from('notes')
        .select(`
            *,
            messages:message_id (id, titre)
        `)
        .eq('utilisateur_id', userId)
        .order('cree_le', { ascending: false });

    if (messageId) {
        query = query.eq('message_id', messageId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

/**
 * Ajoute une note synchronisée
 */
export async function addUserNote(userId, messageId, contenu, positionAudioSecondes) {
    const { data, error } = await supabase
        .from('notes')
        .insert({
            utilisateur_id: userId,
            message_id: messageId,
            contenu,
            position_audio_secondes: positionAudioSecondes,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Supprime une note
 */
export async function deleteUserNote(noteId) {
    const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

    if (error) throw error;
}
