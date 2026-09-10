import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
    if (supabaseClient) return supabaseClient;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
        throw new Error('Missing Supabase public environment variables.');
    }

    supabaseClient = createBrowserClient<Database>(url, anonKey);

    return supabaseClient;
}
