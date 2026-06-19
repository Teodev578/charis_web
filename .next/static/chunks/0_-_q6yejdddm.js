(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72238,e=>{"use strict";let t=(0,e.i(9236).createClient)();async function i({categoryId:e,serieId:s,search:r,limit:o=20,offset:a=0}={}){let n=t.from("messages").select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre)
        `).order("date_publication",{ascending:!1}).range(a,a+o-1);e&&(n=n.eq("categorie_id",e)),s&&(n=n.eq("serie_id",s)),r&&(n=n.or(`titre.ilike.%${r}%,orateur.ilike.%${r}%`));let{data:c,error:g}=await n;if(g)throw g;return c||[]}async function s(e){let{data:i,error:s}=await t.from("messages").select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre, description)
        `).eq("id",e).single();if(s)throw s;return i}async function r(e){let{data:i,error:s}=await t.from("messages").select("*").eq("serie_id",e).order("ordre_dans_la_serie",{ascending:!0});if(s)throw s;return i||[]}async function o(){let{data:e,error:i}=await t.from("categories").select("*").order("nom");if(i)throw i;return e||[]}async function a(){let{data:e,error:i}=await t.from("series").select(`
            *,
            messages:messages(count)
        `).order("titre");if(i)throw i;return e||[]}e.s(["getCategories",0,o,"getMessageById",0,s,"getMessages",0,i,"getMessagesBySerie",0,r,"getSeries",0,a])}]);