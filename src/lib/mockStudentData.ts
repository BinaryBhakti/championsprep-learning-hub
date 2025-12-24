// Mock data for Student Dashboard

export interface TopicProgress {
  id: string;
  topic: string;
  subject: string;
  mastery: number;
  attempts: number;
  lastAttempted: string;
  status: 'not_started' | 'weak' | 'learning' | 'mastered';
}

export interface RecentActivity {
  id: string;
  type: 'quiz' | 'flashcard' | 'study' | 'mock';
  topic: string;
  subject: string;
  score?: number;
  duration: number;
  timestamp: string;
  coinsSpent: number;
}

export interface SubjectProgress {
  subject: string;
  mastery: number;
  topicsCompleted: number;
  totalTopics: number;
  color: string;
}

export const mockTopicProgress: TopicProgress[] = [
  { id: '1', topic: 'Partnership Accounts', subject: 'Accountancy', mastery: 85, attempts: 12, lastAttempted: '2024-12-24', status: 'mastered' },
  { id: '2', topic: 'Cash Flow Statement', subject: 'Accountancy', mastery: 45, attempts: 5, lastAttempted: '2024-12-23', status: 'weak' },
  { id: '3', topic: 'Financial Markets', subject: 'Business Studies', mastery: 72, attempts: 8, lastAttempted: '2024-12-22', status: 'learning' },
  { id: '4', topic: 'Marketing Management', subject: 'Business Studies', mastery: 88, attempts: 15, lastAttempted: '2024-12-24', status: 'mastered' },
  { id: '5', topic: 'National Income', subject: 'Economics', mastery: 55, attempts: 6, lastAttempted: '2024-12-21', status: 'weak' },
  { id: '6', topic: 'Money and Banking', subject: 'Economics', mastery: 0, attempts: 0, lastAttempted: '', status: 'not_started' },
  { id: '7', topic: 'Accounting Ratios', subject: 'Accountancy', mastery: 92, attempts: 18, lastAttempted: '2024-12-24', status: 'mastered' },
  { id: '8', topic: 'Consumer Protection', subject: 'Business Studies', mastery: 38, attempts: 3, lastAttempted: '2024-12-20', status: 'weak' },
  { id: '9', topic: 'Balance of Payments', subject: 'Economics', mastery: 65, attempts: 7, lastAttempted: '2024-12-23', status: 'learning' },
  { id: '10', topic: 'Share Capital', subject: 'Accountancy', mastery: 78, attempts: 10, lastAttempted: '2024-12-22', status: 'learning' },
];

export const mockRecentActivity: RecentActivity[] = [
  { id: '1', type: 'quiz', topic: 'Partnership Accounts', subject: 'Accountancy', score: 85, duration: 15, timestamp: '2024-12-24T14:30:00', coinsSpent: 3 },
  { id: '2', type: 'flashcard', topic: 'Marketing Management', subject: 'Business Studies', duration: 10, timestamp: '2024-12-24T12:00:00', coinsSpent: 2 },
  { id: '3', type: 'quiz', topic: 'Cash Flow Statement', subject: 'Accountancy', score: 62, duration: 20, timestamp: '2024-12-23T16:45:00', coinsSpent: 5 },
  { id: '4', type: 'study', topic: 'Financial Markets', subject: 'Business Studies', duration: 25, timestamp: '2024-12-23T10:30:00', coinsSpent: 3 },
  { id: '5', type: 'mock', topic: 'Full Accountancy Mock', subject: 'Accountancy', score: 78, duration: 90, timestamp: '2024-12-22T09:00:00', coinsSpent: 25 },
  { id: '6', type: 'quiz', topic: 'National Income', subject: 'Economics', score: 55, duration: 12, timestamp: '2024-12-21T15:20:00', coinsSpent: 3 },
];

export const mockSubjectProgress: SubjectProgress[] = [
  { subject: 'Accountancy', mastery: 75, topicsCompleted: 7, totalTopics: 10, color: 'hsl(var(--primary))' },
  { subject: 'Business Studies', mastery: 68, topicsCompleted: 8, totalTopics: 12, color: 'hsl(var(--gold))' },
  { subject: 'Economics', mastery: 52, topicsCompleted: 3, totalTopics: 5, color: 'hsl(var(--success))' },
];

export const recentTopics = [
  { topic: 'Partnership Accounts', subject: 'Accountancy' },
  { topic: 'Marketing Management', subject: 'Business Studies' },
  { topic: 'Cash Flow Statement', subject: 'Accountancy' },
  { topic: 'National Income', subject: 'Economics' },
];
