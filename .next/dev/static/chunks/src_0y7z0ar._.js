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
"[project]/src/contexts/AuthContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    // Fetch user profile from utilisateurs table
    const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[fetchProfile]": async (userId)=>{
            try {
                const { data, error } = await supabase.from('utilisateurs').select('*').eq('id', userId).single();
                if (error) {
                    console.error('Error fetching profile:', error);
                    return null;
                }
                return data;
            } catch (err) {
                console.error('Profile fetch failed:', err);
                return null;
            }
        }
    }["AuthProvider.useCallback[fetchProfile]"], [
        supabase
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Get initial session
            const initAuth = {
                "AuthProvider.useEffect.initAuth": async ()=>{
                    try {
                        const { data: { session: currentSession } } = await supabase.auth.getSession();
                        if (currentSession) {
                            setSession(currentSession);
                            setUser(currentSession.user);
                            const prof = await fetchProfile(currentSession.user.id);
                            setProfile(prof);
                        }
                    } catch (err) {
                        console.error('Auth init failed:', err);
                    } finally{
                        setLoading(false);
                    }
                }
            }["AuthProvider.useEffect.initAuth"];
            initAuth();
            // Listen for auth state changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "AuthProvider.useEffect": async (event, newSession)=>{
                    setSession(newSession);
                    setUser(newSession?.user ?? null);
                    if (newSession?.user) {
                        const prof = await fetchProfile(newSession.user.id);
                        setProfile(prof);
                    } else {
                        setProfile(null);
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    subscription?.unsubscribe();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        supabase,
        fetchProfile
    ]);
    const signUp = async (email, password, nomComplet)=>{
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nom_complet: nomComplet
                }
            }
        });
        if (error) throw error;
        return data;
    };
    const signIn = async (email, password)=>{
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    };
    const signOut = async ()=>{
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setProfile(null);
        setSession(null);
    };
    const value = {
        user,
        profile,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        isAuthenticated: !!user,
        isAdmin: profile?.profil === 'admin'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.jsx",
        lineNumber: 125,
        columnNumber: 9
    }, this);
}
_s(AuthProvider, "7mArHhmwy2uWVX4Amg9aAZw1VjY=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AudioContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioProvider",
    ()=>AudioProvider,
    "useAudio",
    ()=>useAudio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const AudioContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AudioProvider({ children }) {
    _s();
    const [currentTrack, setCurrentTrack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isNotesPanelOpen, setIsNotesPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [playbackSpeed, setPlaybackSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // State to persist
    const [playbackHistory, setPlaybackHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [trackNotes, setTrackNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentTrackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const syncIntervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Keep currentTrackRef in sync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioProvider.useEffect": ()=>{
            currentTrackRef.current = currentTrack;
        }
    }["AudioProvider.useEffect"], [
        currentTrack
    ]);
    // Initialize state from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioProvider.useEffect": ()=>{
            const savedHistory = localStorage.getItem('charis_playback_history');
            if (savedHistory) {
                try {
                    setPlaybackHistory(JSON.parse(savedHistory));
                } catch  {}
            }
            const savedNotes = localStorage.getItem('charis_notes');
            if (savedNotes) {
                try {
                    setTrackNotes(JSON.parse(savedNotes));
                } catch  {}
            }
            // Setup global audio element if not exists
            if (!audioRef.current) {
                audioRef.current = new Audio();
                audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.addEventListener('ended', handleEnded);
                audioRef.current.addEventListener('pause', handlePause);
            }
            // Check URL for timestamp (e.g. ?t=120)
            const urlParams = new URLSearchParams(window.location.search);
            const tParam = urlParams.get('t');
            if (tParam && !isNaN(tParam)) {
                window._initialSeekTime = parseFloat(tParam);
            }
            // Visibility change handler — sync on tab hide/close
            const handleVisibilityChange = {
                "AudioProvider.useEffect.handleVisibilityChange": ()=>{
                    if (document.visibilityState === 'hidden') {
                        syncProgressToSupabase();
                    }
                }
            }["AudioProvider.useEffect.handleVisibilityChange"];
            document.addEventListener('visibilitychange', handleVisibilityChange);
            return ({
                "AudioProvider.useEffect": ()=>{
                    if (audioRef.current) {
                        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                        audioRef.current.removeEventListener('ended', handleEnded);
                        audioRef.current.removeEventListener('pause', handlePause);
                    }
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                    if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
                }
            })["AudioProvider.useEffect"];
        }
    }["AudioProvider.useEffect"], []);
    // Save to localStorage when history or notes change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioProvider.useEffect": ()=>{
            localStorage.setItem('charis_playback_history', JSON.stringify(playbackHistory));
        }
    }["AudioProvider.useEffect"], [
        playbackHistory
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioProvider.useEffect": ()=>{
            localStorage.setItem('charis_notes', JSON.stringify(trackNotes));
        }
    }["AudioProvider.useEffect"], [
        trackNotes
    ]);
    // Setup sync interval (every 30 seconds of playback)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioProvider.useEffect": ()=>{
            if (isPlaying) {
                syncIntervalRef.current = setInterval({
                    "AudioProvider.useEffect": ()=>{
                        syncProgressToSupabase();
                    }
                }["AudioProvider.useEffect"], 30000);
            } else {
                if (syncIntervalRef.current) {
                    clearInterval(syncIntervalRef.current);
                    syncIntervalRef.current = null;
                }
            }
            return ({
                "AudioProvider.useEffect": ()=>{
                    if (syncIntervalRef.current) {
                        clearInterval(syncIntervalRef.current);
                    }
                }
            })["AudioProvider.useEffect"];
        }
    }["AudioProvider.useEffect"], [
        isPlaying
    ]);
    // Sync progress to Supabase (called on pause, every 30s, and visibilitychange)
    const syncProgressToSupabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AudioProvider.useCallback[syncProgressToSupabase]": async ()=>{
            const track = currentTrackRef.current;
            if (!track || !audioRef.current || !userIdRef.current) return;
            const time = audioRef.current.currentTime;
            const totalDuration = audioRef.current.duration;
            if (!totalDuration || isNaN(totalDuration)) return;
            const isCompleted = totalDuration > 0 && time / totalDuration >= 0.95;
            try {
                const { upsertProgress } = await __turbopack_context__.A("[project]/src/lib/services/user.js [app-client] (ecmascript, async loader)");
                await upsertProgress(userIdRef.current, track.id, time, isCompleted);
            } catch (err) {
                // Silently fail — localStorage is the fallback
                console.debug('Supabase sync skipped:', err.message);
            }
        }
    }["AudioProvider.useCallback[syncProgressToSupabase]"], []);
    const handleTimeUpdate = ()=>{
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        setCurrentTime(current);
        // Update local history
        const track = currentTrackRef.current;
        if (track) {
            updatePlaybackHistory(track.id, current, audioRef.current.duration);
        }
    };
    const handleLoadedMetadata = ()=>{
        if (!audioRef.current) return;
        setDuration(audioRef.current.duration);
        // Apply initial seek if any
        if (window._initialSeekTime) {
            audioRef.current.currentTime = window._initialSeekTime;
            window._initialSeekTime = null;
        } else {
            const track = currentTrackRef.current;
            const history = JSON.parse(localStorage.getItem('charis_playback_history') || '{}');
            if (track && history[track.id]) {
                // Auto resume logic (-3 seconds for comfort)
                const savedTime = history[track.id].currentTime || 0;
                const savedDuration = history[track.id].duration || 0;
                // Only resume if not completed (completed means > 95%)
                const isCompleted = savedDuration > 0 && savedTime / savedDuration > 0.95;
                if (!isCompleted && savedTime > 5) {
                    audioRef.current.currentTime = savedTime - 3; // Rewind 3-5 seconds for context
                }
            }
        }
    };
    const handleEnded = ()=>{
        setIsPlaying(false);
        const track = currentTrackRef.current;
        if (track && audioRef.current) {
            updatePlaybackHistory(track.id, audioRef.current.duration, audioRef.current.duration);
            syncProgressToSupabase();
        }
    };
    const handlePause = ()=>{
        // Sync to Supabase on pause
        syncProgressToSupabase();
    };
    const updatePlaybackHistory = (trackId, time, totalDuration)=>{
        const track = currentTrackRef.current;
        if (!track) return;
        setPlaybackHistory((prev)=>{
            const isCompleted = totalDuration > 0 && time / totalDuration >= 0.95;
            return {
                ...prev,
                [trackId]: {
                    id: track.id,
                    title: track.title,
                    subtitle: track.subtitle,
                    imageUrl: track.imageUrl,
                    audioUrl: track.audioUrl,
                    currentTime: time,
                    duration: totalDuration || 0,
                    isCompleted: isCompleted,
                    lastPlayedAt: new Date().toISOString()
                }
            };
        });
    };
    const playTrack = (track)=>{
        if (currentTrack?.id === track.id) {
            // Just toggle play
            togglePlay();
            return;
        }
        setCurrentTrack(track);
        currentTrackRef.current = track;
        const audioUrl = track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.playbackRate = playbackSpeed;
            audioRef.current.play().then(()=>{
                setIsPlaying(true);
            }).catch((e)=>console.error("Audio play failed:", e));
        }
    };
    const togglePlay = ()=>{
        if (!audioRef.current || !audioRef.current.src) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e)=>console.error("Playback failed", e));
        }
        setIsPlaying(!isPlaying);
    };
    const skip = (seconds)=>{
        if (!audioRef.current) return;
        const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, audioRef.current.duration));
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };
    const seek = (time)=>{
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
        // Ensure playing when seeking
        if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };
    const changeSpeed = ()=>{
        const speeds = [
            1,
            1.25,
            1.5,
            1.75,
            2
        ];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
        setPlaybackSpeed(nextSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = nextSpeed;
        }
    };
    // Set user ID for Supabase sync (called from ClientAppWrapper when auth loads)
    const setUserId = (userId)=>{
        userIdRef.current = userId;
    };
    const addNote = (trackId, text, timeStamp)=>{
        const newNote = {
            id: Date.now().toString(),
            text,
            timestamp: timeStamp,
            date: new Date().toISOString()
        };
        setTrackNotes((prev)=>{
            const trackSpecificNotes = prev[trackId] || [];
            return {
                ...prev,
                [trackId]: [
                    ...trackSpecificNotes,
                    newNote
                ]
            };
        });
        // Also sync to Supabase if authenticated
        if (userIdRef.current) {
            __turbopack_context__.A("[project]/src/lib/services/user.js [app-client] (ecmascript, async loader)").then(({ addUserNote })=>{
                addUserNote(userIdRef.current, trackId, text, timeStamp).catch(()=>{});
            });
        }
    };
    const deleteNote = (trackId, noteId)=>{
        setTrackNotes((prev)=>{
            if (!prev[trackId]) return prev;
            return {
                ...prev,
                [trackId]: prev[trackId].filter((n)=>n.id !== noteId)
            };
        });
        // Also delete from Supabase
        if (userIdRef.current) {
            __turbopack_context__.A("[project]/src/lib/services/user.js [app-client] (ecmascript, async loader)").then(({ deleteUserNote })=>{
                deleteUserNote(noteId).catch(()=>{});
            });
        }
    };
    // Helper for UI to get progress
    const getInProgressTracks = ()=>{
        return Object.values(playbackHistory).filter((t)=>!t.isCompleted && t.currentTime > 0).sort((a, b)=>new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt));
    };
    const getCompletedTracks = ()=>{
        return Object.values(playbackHistory).filter((t)=>t.isCompleted).sort((a, b)=>new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt));
    };
    const initDefaultTrack = (track)=>{
        if (!currentTrack && !isPlaying) {
            setCurrentTrack(track);
            currentTrackRef.current = track;
            if (audioRef.current) {
                audioRef.current.src = track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AudioContext.Provider, {
        value: {
            currentTrack,
            isPlaying,
            currentTime,
            duration,
            playTrack,
            togglePlay,
            skip,
            seek,
            playbackHistory,
            getInProgressTracks,
            getCompletedTracks,
            trackNotes,
            addNote,
            deleteNote,
            isNotesPanelOpen,
            setIsNotesPanelOpen,
            initDefaultTrack,
            playbackSpeed,
            changeSpeed,
            setUserId
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AudioContext.jsx",
        lineNumber: 327,
        columnNumber: 9
    }, this);
}
_s(AudioProvider, "iaLMiFIkLe5k1+H7i6/SuKZFJAE=");
_c = AudioProvider;
function useAudio() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AudioContext);
}
_s1(useAudio, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "AudioProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AudioPlayer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AudioPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AudioContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AudioPlayer() {
    _s();
    const { currentTrack, isPlaying, togglePlay, skip, seek, currentTime, duration, setIsNotesPanelOpen, isNotesPanelOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"])();
    if (!currentTrack) return null;
    const formatTime = (time)=>{
        if (isNaN(time)) return "0:00";
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };
    const progressPercent = duration > 0 ? currentTime / duration * 100 : 0;
    const handleProgressClick = (e)=>{
        const bounds = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - bounds.left) / bounds.width;
        seek(percent * duration);
    };
    const handleShare = ()=>{
        const url = new URL(window.location.href);
        url.searchParams.set('t', Math.floor(currentTime));
        navigator.clipboard.writeText(url.toString());
        alert("Lien copié avec le temps exact !");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "audio-player-floating",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "player-track-info-pill",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: currentTrack.imageUrl || '/images/preacher_man.png',
                        alt: currentTrack.title,
                        className: "player-artwork-pill"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "player-text-pill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "player-title-pill",
                                children: currentTrack.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayer.jsx",
                                lineNumber: 53,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "player-subtitle-pill",
                                children: currentTrack.subtitle || "Daily News"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayer.jsx",
                                lineNumber: 54,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 52,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayer.jsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "player-controls-pill",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "player-icon-btn",
                        onClick: ()=>skip(-15),
                        "aria-label": "Reculer de 15s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M3 2v6h6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M3 13a9 9 0 1 0 3-7.7L3 8"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 63,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "12",
                                    y: "16",
                                    fontSize: "7",
                                    fontWeight: "bold",
                                    fontFamily: "sans-serif",
                                    textAnchor: "middle",
                                    fill: "currentColor",
                                    stroke: "none",
                                    children: "15"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 64,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AudioPlayer.jsx",
                            lineNumber: 61,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "player-play-btn-pill",
                        onClick: togglePlay,
                        "aria-label": isPlaying ? 'Pause' : 'Lecture',
                        children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "6",
                                    y: "4",
                                    width: "4",
                                    height: "16"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 71,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "14",
                                    y: "4",
                                    width: "4",
                                    height: "16"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 72,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AudioPlayer.jsx",
                            lineNumber: 70,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            style: {
                                marginLeft: '2px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M8 5v14l11-7z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioPlayer.jsx",
                                lineNumber: 76,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AudioPlayer.jsx",
                            lineNumber: 75,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "player-icon-btn",
                        onClick: ()=>skip(15),
                        "aria-label": "Avancer de 15s",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M21 2v6h-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 83,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M21 13a9 9 0 1 1-3-7.7L21 8"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 84,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "12",
                                    y: "16",
                                    fontSize: "7",
                                    fontWeight: "bold",
                                    fontFamily: "sans-serif",
                                    textAnchor: "middle",
                                    fill: "currentColor",
                                    stroke: "none",
                                    children: "15"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 85,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AudioPlayer.jsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayer.jsx",
                lineNumber: 59,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "player-progress-inline",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "player-time",
                        children: formatTime(currentTime)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "player-progress-container-inline",
                        onClick: handleProgressClick,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "player-progress-bar-inline",
                            style: {
                                width: `${progressPercent}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/AudioPlayer.jsx",
                            lineNumber: 94,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "player-time",
                        children: formatTime(duration)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayer.jsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "player-tools-pill",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "player-icon-btn",
                        onClick: ()=>setIsNotesPanelOpen(!isNotesPanelOpen),
                        "aria-label": "Notes",
                        style: {
                            color: isNotesPanelOpen ? 'var(--brand-yellow)' : 'inherit'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 20h9"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 109,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AudioPlayer.jsx",
                            lineNumber: 107,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "player-icon-btn",
                        onClick: handleShare,
                        "aria-label": "Partager à ce moment",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "18",
                                    cy: "5",
                                    r: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 114,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "6",
                                    cy: "12",
                                    r: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 115,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "18",
                                    cy: "19",
                                    r: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 116,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "8.59",
                                    y1: "13.51",
                                    x2: "15.42",
                                    y2: "17.49"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "15.41",
                                    y1: "6.51",
                                    x2: "8.59",
                                    y2: "10.49"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AudioPlayer.jsx",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AudioPlayer.jsx",
                            lineNumber: 113,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AudioPlayer.jsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AudioPlayer.jsx",
                lineNumber: 100,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AudioPlayer.jsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
_s(AudioPlayer, "lXJY10TTcF79tYMwTAYlqHNpRko=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"]
    ];
});
_c = AudioPlayer;
var _c;
__turbopack_context__.k.register(_c, "AudioPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/NotesPanel.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotesPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AudioContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function NotesPanel() {
    _s();
    const { isNotesPanelOpen, setIsNotesPanelOpen, currentTrack, trackNotes, addNote, seek, currentTime } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"])();
    const [noteText, setNoteText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    if (!isNotesPanelOpen) return null;
    const currentNotes = currentTrack ? trackNotes[currentTrack.id] || [] : [];
    const handleAddNote = (e)=>{
        e.preventDefault();
        if (!noteText.trim() || !currentTrack) return;
        addNote(currentTrack.id, noteText, currentTime);
        setNoteText('');
    };
    const formatTime = (time)=>{
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "notes-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "notes-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Notes & Lyrics"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NotesPanel.jsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "close-btn",
                        onClick: ()=>setIsNotesPanelOpen(false),
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NotesPanel.jsx",
                        lineNumber: 32,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NotesPanel.jsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "notes-content",
                children: !currentTrack ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "empty-state",
                    children: "Lancez un message pour prendre des notes."
                }, void 0, false, {
                    fileName: "[project]/src/components/NotesPanel.jsx",
                    lineNumber: 37,
                    columnNumber: 21
                }, this) : currentNotes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "empty-state",
                    children: "Aucune note pour ce message. Soyez le premier à noter une révélation !"
                }, void 0, false, {
                    fileName: "[project]/src/components/NotesPanel.jsx",
                    lineNumber: 39,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "notes-list",
                    children: currentNotes.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "note-item",
                            onClick: ()=>seek(note.timestamp),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "note-time",
                                    children: formatTime(note.timestamp)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NotesPanel.jsx",
                                    lineNumber: 44,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "note-text",
                                    children: note.text
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NotesPanel.jsx",
                                    lineNumber: 45,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, note.id, true, {
                            fileName: "[project]/src/components/NotesPanel.jsx",
                            lineNumber: 43,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/NotesPanel.jsx",
                    lineNumber: 41,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/NotesPanel.jsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            currentTrack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "notes-input-form",
                onSubmit: handleAddNote,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: noteText,
                        onChange: (e)=>setNoteText(e.target.value),
                        placeholder: "Prendre une note synchronisée...",
                        className: "note-input"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NotesPanel.jsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "note-submit-btn",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NotesPanel.jsx",
                                lineNumber: 63,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/NotesPanel.jsx",
                            lineNumber: 62,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/NotesPanel.jsx",
                        lineNumber: 61,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NotesPanel.jsx",
                lineNumber: 53,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NotesPanel.jsx",
        lineNumber: 29,
        columnNumber: 9
    }, this);
}
_s(NotesPanel, "QJMpvQ1Nkc8BXwyCL3YkpbEErJA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"]
    ];
});
_c = NotesPanel;
var _c;
__turbopack_context__.k.register(_c, "NotesPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ClientAppWrapper.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientAppWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AudioContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioPlayer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NotesPanel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NotesPanel.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AudioSyncBridge() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { setUserId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AudioSyncBridge.useEffect": ()=>{
            if (user?.id) {
                setUserId(user.id);
            } else {
                setUserId(null);
            }
        }
    }["AudioSyncBridge.useEffect"], [
        user?.id,
        setUserId
    ]);
    return null;
}
_s(AudioSyncBridge, "dWAhqM49WTlMk1ZMoeEgzvWo59c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"]
    ];
});
_c = AudioSyncBridge;
function AppLayout({ children }) {
    _s1();
    const { isNotesPanelOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `app-layout ${isNotesPanelOpen ? 'notes-open' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-content",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ClientAppWrapper.jsx",
                lineNumber: 29,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NotesPanel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/ClientAppWrapper.jsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioPlayer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/ClientAppWrapper.jsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AudioSyncBridge, {}, void 0, false, {
                fileName: "[project]/src/components/ClientAppWrapper.jsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ClientAppWrapper.jsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s1(AppLayout, "HPRQwcPe54VzofhvA1Jqf0/vqc8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"]
    ];
});
_c1 = AppLayout;
function ClientAppWrapper({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AudioContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AudioProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppLayout, {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ClientAppWrapper.jsx",
                lineNumber: 43,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ClientAppWrapper.jsx",
            lineNumber: 42,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ClientAppWrapper.jsx",
        lineNumber: 41,
        columnNumber: 9
    }, this);
}
_c2 = ClientAppWrapper;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "AudioSyncBridge");
__turbopack_context__.k.register(_c1, "AppLayout");
__turbopack_context__.k.register(_c2, "ClientAppWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0y7z0ar._.js.map