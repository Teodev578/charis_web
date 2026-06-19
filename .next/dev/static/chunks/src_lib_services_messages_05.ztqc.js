(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/services/messages.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategories",
    ()=>getCategories,
    "getMessageById",
    ()=>getMessageById,
    "getMessages",
    ()=>getMessages,
    "getMessagesBySerie",
    ()=>getMessagesBySerie,
    "getSeries",
    ()=>getSeries
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-client] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
async function getMessages({ categoryId, serieId, search, limit = 20, offset = 0 } = {}) {
    let query = supabase.from('messages').select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre)
        `).order('date_publication', {
        ascending: false
    }).range(offset, offset + limit - 1);
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
async function getMessageById(id) {
    const { data, error } = await supabase.from('messages').select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre, description)
        `).eq('id', id).single();
    if (error) throw error;
    return data;
}
async function getMessagesBySerie(serieId) {
    const { data, error } = await supabase.from('messages').select('*').eq('serie_id', serieId).order('ordre_dans_la_serie', {
        ascending: true
    });
    if (error) throw error;
    return data || [];
}
async function getCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('nom');
    if (error) throw error;
    return data || [];
}
async function getSeries() {
    const { data, error } = await supabase.from('series').select(`
            *,
            messages:messages(count)
        `).order('titre');
    if (error) throw error;
    return data || [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_services_messages_05.ztqc.js.map