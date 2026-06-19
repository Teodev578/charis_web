module.exports = [
"[project]/src/lib/services/user.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_lib_services_user_0boupm9.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/services/user.js [app-ssr] (ecmascript)");
    });
});
}),
];