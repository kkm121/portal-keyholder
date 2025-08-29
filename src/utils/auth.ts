// Auth utilities for robust sign-in/out handling and local history storage
// - Prevents limbo states by aggressively clearing stale tokens
// - Records successful sign-ins to help identify previously signed-in accounts

export type SignInProvider = 'password' | 'google' | 'github';

export interface SignInRecord {
  userId: string;
  email?: string | null;
  provider: SignInProvider;
  sessionId?: string | null;
  at: number; // epoch ms
}

const HISTORY_KEY = 'qc.signin.history';
const LAST_USER_ID_KEY = 'qc.lastUserId';
const LAST_EMAIL_KEY = 'qc.lastEmail';
const LAST_PROVIDER_KEY = 'qc.lastProvider';
const LAST_LOGIN_AT_KEY = 'qc.lastLoginAt';

export const cleanupAuthState = () => {
  try {
    // Remove standard and project-specific keys
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.startsWith('supabase')) {
        localStorage.removeItem(key);
      }
    });
    try {
      Object.keys(sessionStorage || {}).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.startsWith('supabase')) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (_) {
      // ignore sessionStorage errors (e.g. disabled)
    }
  } catch (_) {
    // ignore
  }
};

export const recordSuccessfulSignIn = (record: SignInRecord) => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const arr: SignInRecord[] = raw ? JSON.parse(raw) : [];
    const next = [record, ...arr].slice(0, 20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));

    localStorage.setItem(LAST_USER_ID_KEY, record.userId);
    if (record.email) localStorage.setItem(LAST_EMAIL_KEY, record.email);
    localStorage.setItem(LAST_PROVIDER_KEY, record.provider);
    localStorage.setItem(LAST_LOGIN_AT_KEY, String(record.at));
  } catch (_) {
    // ignore storage errors
  }
};

export const getLastSignIn = (): SignInRecord | null => {
  try {
    const userId = localStorage.getItem(LAST_USER_ID_KEY);
    if (!userId) return null;
    return {
      userId,
      email: localStorage.getItem(LAST_EMAIL_KEY),
      provider: (localStorage.getItem(LAST_PROVIDER_KEY) as SignInProvider) || 'password',
      sessionId: null,
      at: Number(localStorage.getItem(LAST_LOGIN_AT_KEY) || Date.now()),
    };
  } catch (_) {
    return null;
  }
};

export const getSignInHistory = (): SignInRecord[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as SignInRecord[]) : [];
  } catch (_) {
    return [];
  }
};
