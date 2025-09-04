// Local Storage utilities for user preferences and data persistence

export interface UserPreferences {
  theme: 'light' | 'dark' | 'quantum';
  animationsEnabled: boolean;
  soundEnabled: boolean;
  lastLoginTime: number;
  favoriteServices: string[];
}

const PREFERENCES_KEY = 'quantumcloud_preferences';
const RECENT_SEARCHES_KEY = 'quantumcloud_recent_searches';
const USER_STATS_KEY = 'quantumcloud_user_stats';

// User Preferences Management
export const getUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return { ...getDefaultPreferences(), ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Failed to load user preferences:', error);
  }
  return getDefaultPreferences();
};

export const saveUserPreferences = (preferences: Partial<UserPreferences>) => {
  try {
    const current = getUserPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save user preferences:', error);
    return null;
  }
};

const getDefaultPreferences = (): UserPreferences => ({
  theme: 'quantum',
  animationsEnabled: true,
  soundEnabled: true,
  lastLoginTime: Date.now(),
  favoriteServices: []
});

// Recent Searches Management
export const addRecentSearch = (query: string) => {
  try {
    const searches = getRecentSearches();
    const updated = [query, ...searches.filter(s => s !== query)].slice(0, 10);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save recent search:', error);
    return [];
  }
};

export const getRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load recent searches:', error);
    return [];
  }
};

export const clearRecentSearches = () => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error('Failed to clear recent searches:', error);
  }
};

// User Statistics Tracking
export interface UserStats {
  totalLogins: number;
  servicesUsed: number;
  timeSpent: number;
  lastActiveDate: string;
  achievements: string[];
}

export const updateUserStats = (updates: Partial<UserStats>) => {
  try {
    const current = getUserStats();
    const updated = { ...current, ...updates };
    localStorage.setItem(USER_STATS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to update user stats:', error);
    return null;
  }
};

export const getUserStats = (): UserStats => {
  try {
    const stored = localStorage.getItem(USER_STATS_KEY);
    if (stored) {
      return { ...getDefaultStats(), ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Failed to load user stats:', error);
  }
  return getDefaultStats();
};

const getDefaultStats = (): UserStats => ({
  totalLogins: 0,
  servicesUsed: 0,
  timeSpent: 0,
  lastActiveDate: new Date().toISOString(),
  achievements: []
});

// Session Timer
export class SessionTimer {
  private startTime: number;
  private intervalId: number | null = null;

  constructor() {
    this.startTime = Date.now();
  }

  start() {
    this.startTime = Date.now();
    this.intervalId = window.setInterval(() => {
      this.updateTimeSpent();
    }, 30000); // Update every 30 seconds
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.updateTimeSpent();
  }

  private updateTimeSpent() {
    const currentTime = Date.now();
    const sessionTime = currentTime - this.startTime;
    const stats = getUserStats();
    updateUserStats({
      timeSpent: stats.timeSpent + sessionTime,
      lastActiveDate: new Date().toISOString()
    });
    this.startTime = currentTime;
  }
}

// Clean old data utility
export const cleanOldData = (daysOld: number = 30) => {
  try {
    const cutoffDate = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
    const prefs = getUserPreferences();
    
    if (prefs.lastLoginTime < cutoffDate) {
      localStorage.removeItem(PREFERENCES_KEY);
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      localStorage.removeItem(USER_STATS_KEY);
      console.log('Cleaned old user data');
    }
  } catch (error) {
    console.error('Failed to clean old data:', error);
  }
};