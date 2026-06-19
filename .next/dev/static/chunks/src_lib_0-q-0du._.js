(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/supabase/client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
let supabaseClient = null;
function createClient() {
    if (supabaseClient) return supabaseClient;
    supabaseClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://mmlalnhtbtlpeenvmnpl.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_1o2t30Jy_-R7TZlsxIpdWQ_jY2re-Fx"));
    return supabaseClient;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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

//# sourceMappingURL=src_lib_0-q-0du._.js.map