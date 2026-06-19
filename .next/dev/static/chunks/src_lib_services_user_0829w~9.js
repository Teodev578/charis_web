(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/services/user.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addUserNote",
    ()=>addUserNote,
    "deleteUserNote",
    ()=>deleteUserNote,
    "getUserFavorites",
    ()=>getUserFavorites,
    "getUserNotes",
    ()=>getUserNotes,
    "getUserProgress",
    ()=>getUserProgress,
    "isFavorite",
    ()=>isFavorite,
    "toggleFavorite",
    ()=>toggleFavorite,
    "upsertProgress",
    ()=>upsertProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-client] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
async function getUserProgress(userId) {
    const { data, error } = await supabase.from('progression_lecture').select(`
            *,
            messages:message_id (*)
        `).eq('utilisateur_id', userId).order('mis_a_jour_le', {
        ascending: false
    });
    if (error) throw error;
    return data || [];
}
async function upsertProgress(userId, messageId, tempsSecondes, estTermine = false) {
    const { data, error } = await supabase.from('progression_lecture').upsert({
        utilisateur_id: userId,
        message_id: messageId,
        temps_secondes: tempsSecondes,
        est_termine: estTermine,
        mis_a_jour_le: new Date().toISOString()
    }, {
        onConflict: 'utilisateur_id,message_id'
    });
    if (error) throw error;
    return data;
}
async function getUserFavorites(userId) {
    const { data, error } = await supabase.from('favoris').select(`
            *,
            messages:message_id (*)
        `).eq('utilisateur_id', userId).order('date_ajout', {
        ascending: false
    });
    if (error) throw error;
    return data || [];
}
async function isFavorite(userId, messageId) {
    const { data, error } = await supabase.from('favoris').select('message_id').eq('utilisateur_id', userId).eq('message_id', messageId).maybeSingle();
    if (error) throw error;
    return !!data;
}
async function toggleFavorite(userId, messageId) {
    const exists = await isFavorite(userId, messageId);
    if (exists) {
        const { error } = await supabase.from('favoris').delete().eq('utilisateur_id', userId).eq('message_id', messageId);
        if (error) throw error;
        return false; // removed
    } else {
        const { error } = await supabase.from('favoris').insert({
            utilisateur_id: userId,
            message_id: messageId
        });
        if (error) throw error;
        return true; // added
    }
}
async function getUserNotes(userId, messageId = null) {
    let query = supabase.from('notes').select(`
            *,
            messages:message_id (id, titre)
        `).eq('utilisateur_id', userId).order('cree_le', {
        ascending: false
    });
    if (messageId) {
        query = query.eq('message_id', messageId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}
async function addUserNote(userId, messageId, contenu, positionAudioSecondes) {
    const { data, error } = await supabase.from('notes').insert({
        utilisateur_id: userId,
        message_id: messageId,
        contenu,
        position_audio_secondes: positionAudioSecondes
    }).select().single();
    if (error) throw error;
    return data;
}
async function deleteUserNote(noteId) {
    const { error } = await supabase.from('notes').delete().eq('id', noteId);
    if (error) throw error;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_services_user_0829w~9.js.map