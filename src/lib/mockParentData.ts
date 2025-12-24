// Mock data for Parent Dashboard

export interface LinkedChild {
  id: string;
  name: string;
  email: string;
  grade: '11' | '12';
  avatar?: string;
}

export interface ChildStats {
  coinBalance: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
  totalSessions: number;
}

export interface SubjectMastery {
  subject: string;
  mastery: number;
  color: string;
}

export interface WeeklyActivity {
  day: string;
  sessions: number;
  minutes: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
  icon: string;
}

export interface TopicReview {
  id: string;
  topic: string;
  subject: string;
  lastScore: number;
  attempts: number;
}

export const mockLinkedChild: LinkedChild = {
  id: '1',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@gmail.com',
  grade: '12',
};

export const mockChildStats: ChildStats = {
  coinBalance: 245,
  currentStreak: 12,
  longestStreak: 28,
  averageScore: 78,
  totalSessions: 156,
};

export const mockSubjectMastery: SubjectMastery[] = [
  { subject: 'Accountancy', mastery: 82, color: 'hsl(var(--primary))' },
  { subject: 'Business Studies', mastery: 75, color: 'hsl(var(--gold))' },
  { subject: 'Economics', mastery: 68, color: 'hsl(var(--success))' },
];

export const mockWeeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', sessions: 3, minutes: 45 },
  { day: 'Tue', sessions: 2, minutes: 30 },
  { day: 'Wed', sessions: 4, minutes: 60 },
  { day: 'Thu', sessions: 1, minutes: 15 },
  { day: 'Fri', sessions: 5, minutes: 75 },
  { day: 'Sat', sessions: 6, minutes: 90 },
  { day: 'Sun', sessions: 2, minutes: 30 },
];

export const mockAchievements: Achievement[] = [
  { id: '1', title: 'First Steps', description: 'Completed first quiz', earnedAt: '2024-11-15', icon: '🎯' },
  { id: '2', title: 'Week Warrior', description: '7-day study streak', earnedAt: '2024-12-01', icon: '🔥' },
  { id: '3', title: 'Perfect Score', description: '100% on a quiz', earnedAt: '2024-12-10', icon: '⭐' },
  { id: '4', title: 'Knowledge Seeker', description: 'Completed 50 sessions', earnedAt: '2024-12-15', icon: '📚' },
  { id: '5', title: 'Consistency King', description: '14-day streak achieved', earnedAt: '2024-12-20', icon: '👑' },
];

export const mockTopicsToReview: TopicReview[] = [
  { id: '1', topic: 'Cash Flow Statement', subject: 'Accountancy', lastScore: 45, attempts: 3 },
  { id: '2', topic: 'Elasticity of Demand', subject: 'Economics', lastScore: 52, attempts: 2 },
  { id: '3', topic: 'Financial Markets', subject: 'Business Studies', lastScore: 58, attempts: 4 },
  { id: '4', topic: 'Ratio Analysis', subject: 'Accountancy', lastScore: 48, attempts: 2 },
];

export const coinPackages = [
  { id: '1', coins: 100, price: 99, label: 'Starter Pack' },
  { id: '2', coins: 220, price: 199, label: 'Best Value', popular: true },
  { id: '3', coins: 350, price: 299, label: 'Maximum Savings' },
];
