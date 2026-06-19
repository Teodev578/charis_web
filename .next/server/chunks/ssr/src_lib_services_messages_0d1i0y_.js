module.exports=[76788,a=>{"use strict";let b=(0,a.i(47683).createClient)();async function c({categoryId:a,serieId:d,search:e,limit:f=20,offset:g=0}={}){let h=b.from("messages").select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre)
        `).order("date_publication",{ascending:!1}).range(g,g+f-1);a&&(h=h.eq("categorie_id",a)),d&&(h=h.eq("serie_id",d)),e&&(h=h.or(`titre.ilike.%${e}%,orateur.ilike.%${e}%`));let{data:i,error:j}=await h;if(j)throw j;return i||[]}async function d(a){let{data:c,error:d}=await b.from("messages").select(`
            *,
            categories:categorie_id (id, nom, slug),
            series:serie_id (id, titre, description)
        `).eq("id",a).single();if(d)throw d;return c}async function e(a){let{data:c,error:d}=await b.from("messages").select("*").eq("serie_id",a).order("ordre_dans_la_serie",{ascending:!0});if(d)throw d;return c||[]}async function f(){let{data:a,error:c}=await b.from("categories").select("*").order("nom");if(c)throw c;return a||[]}async function g(){let{data:a,error:c}=await b.from("series").select(`
            *,
            messages:messages(count)
        `).order("titre");if(c)throw c;return a||[]}a.s(["getCategories",0,f,"getMessageById",0,d,"getMessages",0,c,"getMessagesBySerie",0,e,"getSeries",0,g])}];

//# sourceMappingURL=src_lib_services_messages_0d1i0y_.js.map