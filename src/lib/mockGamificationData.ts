// Mock data for Gamification System

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'quiz' | 'mastery' | 'social' | 'special';
  requirement: number;
  unlockedAt?: string;
  progress: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'streak' | 'time' | 'score';
  target: number;
  progress: number;
  reward: { coins: number; xp: number };
  expiresAt: string;
  completed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActivityDate: string;
  weeklyActivity: boolean[];
}

export const mockAchievements: Achievement[] = [
  { id: '1', title: 'First Steps', description: 'Complete your first quiz', icon: '🎯', category: 'quiz', requirement: 1, unlockedAt: '2024-11-15', progress: 1 },
  { id: '2', title: 'Quiz Enthusiast', description: 'Complete 10 quizzes', icon: '📝', category: 'quiz', requirement: 10, unlockedAt: '2024-12-01', progress: 10 },
  { id: '3', title: 'Century Maker', description: 'Complete 100 quizzes', icon: '💯', category: 'quiz', requirement: 100, progress: 45 },
  { id: '4', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', category: 'streak', requirement: 7, unlockedAt: '2024-12-10', progress: 7 },
  { id: '5', title: 'Fortnight Fighter', description: 'Maintain a 14-day streak', icon: '⚡', category: 'streak', requirement: 14, progress: 12 },
  { id: '6', title: 'Month Master', description: 'Maintain a 30-day streak', icon: '🏆', category: 'streak', requirement: 30, progress: 12 },
  { id: '7', title: 'Perfect Score', description: 'Score 100% on any quiz', icon: '⭐', category: 'quiz', requirement: 1, unlockedAt: '2024-12-05', progress: 1 },
  { id: '8', title: 'Subject Expert', description: 'Master all topics in a subject', icon: '🎓', category: 'mastery', requirement: 1, progress: 0 },
  { id: '9', title: 'Social Learner', description: 'Join a study group', icon: '👥', category: 'social', requirement: 1, progress: 0 },
  { id: '10', title: 'Challenge Champion', description: 'Complete 10 daily challenges', icon: '🏅', category: 'special', requirement: 10, unlockedAt: '2024-12-20', progress: 10 },
  { id: '11', title: 'Early Bird', description: 'Study before 7 AM', icon: '🌅', category: 'special', requirement: 1, progress: 0 },
  { id: '12', title: 'Night Owl', description: 'Study after 10 PM', icon: '🦉', category: 'special', requirement: 1, unlockedAt: '2024-12-22', progress: 1 },
];

export const mockDailyChallenge: DailyChallenge = {
  id: 'dc_2024_12_24',
  title: 'Quiz Master',
  description: 'Complete 3 quizzes today',
  type: 'quiz',
  target: 3,
  progress: 1,
  reward: { coins: 15, xp: 50 },
  expiresAt: '2024-12-25T00:00:00',
  completed: false,
};

export const mockWeeklyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, id: '1', name: 'Priya Mehta', xp: 2850, streak: 21 },
  { rank: 2, id: '2', name: 'Rahul Singh', xp: 2720, streak: 18 },
  { rank: 3, id: '3', name: 'Ananya Gupta', xp: 2580, streak: 15 },
  { rank: 4, id: '4', name: 'Vikram Reddy', xp: 2450, streak: 14 },
  { rank: 5, id: '5', name: 'Kavya Nair', xp: 2320, streak: 12 },
  { rank: 6, id: 'current', name: 'Arjun Sharma', xp: 2180, streak: 12, isCurrentUser: true },
  { rank: 7, id: '7', name: 'Sneha Kapoor', xp: 2050, streak: 10 },
  { rank: 8, id: '8', name: 'Rohan Joshi', xp: 1920, streak: 9 },
  { rank: 9, id: '9', name: 'Meera Iyer', xp: 1850, streak: 8 },
  { rank: 10, id: '10', name: 'Aditya Patel', xp: 1780, streak: 7 },
];

export const mockMonthlyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, id: '1', name: 'Rahul Singh', xp: 12500, streak: 28 },
  { rank: 2, id: '2', name: 'Priya Mehta', xp: 11800, streak: 25 },
  { rank: 3, id: '3', name: 'Vikram Reddy', xp: 10950, streak: 22 },
  { rank: 4, id: '4', name: 'Ananya Gupta', xp: 10200, streak: 20 },
  { rank: 5, id: 'current', name: 'Arjun Sharma', xp: 9850, streak: 18, isCurrentUser: true },
  { rank: 6, id: '6', name: 'Kavya Nair', xp: 9500, streak: 17 },
  { rank: 7, id: '7', name: 'Sneha Kapoor', xp: 9100, streak: 15 },
  { rank: 8, id: '8', name: 'Rohan Joshi', xp: 8750, streak: 14 },
  { rank: 9, id: '9', name: 'Meera Iyer', xp: 8400, streak: 12 },
  { rank: 10, id: '10', name: 'Aditya Patel', xp: 8100, streak: 11 },
];

export const mockStreakData: StreakData = {
  current: 12,
  longest: 21,
  lastActivityDate: '2024-12-24',
  weeklyActivity: [true, true, true, false, true, true, true], // Mon-Sun
};
