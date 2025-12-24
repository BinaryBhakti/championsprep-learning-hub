// Mock data for Admin Dashboard

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  subscriptionStatus: 'free' | 'pro';
  coinBalance: number;
  grade: '11' | '12';
  educationBoard: 'CBSE' | 'ICSE' | 'State';
  createdAt: string;
  lastActive: string;
}

export const mockUsers: MockUser[] = [
  { id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', role: 'user', subscriptionStatus: 'pro', coinBalance: 245, grade: '12', educationBoard: 'CBSE', createdAt: '2024-11-15', lastActive: '2024-12-24' },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@yahoo.com', role: 'user', subscriptionStatus: 'free', coinBalance: 32, grade: '11', educationBoard: 'CBSE', createdAt: '2024-12-01', lastActive: '2024-12-23' },
  { id: '3', name: 'Rohan Gupta', email: 'rohan.g@outlook.com', role: 'moderator', subscriptionStatus: 'pro', coinBalance: 500, grade: '12', educationBoard: 'ICSE', createdAt: '2024-10-20', lastActive: '2024-12-24' },
  { id: '4', name: 'Ananya Singh', email: 'ananya.singh@gmail.com', role: 'user', subscriptionStatus: 'free', coinBalance: 15, grade: '11', educationBoard: 'CBSE', createdAt: '2024-12-18', lastActive: '2024-12-22' },
  { id: '5', name: 'Vikram Reddy', email: 'vikram.r@gmail.com', role: 'user', subscriptionStatus: 'pro', coinBalance: 180, grade: '12', educationBoard: 'State', createdAt: '2024-11-28', lastActive: '2024-12-24' },
  { id: '6', name: 'Kavya Nair', email: 'kavya.nair@hotmail.com', role: 'user', subscriptionStatus: 'free', coinBalance: 48, grade: '11', educationBoard: 'CBSE', createdAt: '2024-12-10', lastActive: '2024-12-21' },
  { id: '7', name: 'Arjun Mehta', email: 'arjun.mehta@gmail.com', role: 'admin', subscriptionStatus: 'pro', coinBalance: 999, grade: '12', educationBoard: 'CBSE', createdAt: '2024-09-01', lastActive: '2024-12-24' },
  { id: '8', name: 'Sneha Kapoor', email: 'sneha.k@yahoo.com', role: 'user', subscriptionStatus: 'pro', coinBalance: 320, grade: '12', educationBoard: 'CBSE', createdAt: '2024-11-05', lastActive: '2024-12-20' },
  { id: '9', name: 'Rahul Joshi', email: 'rahul.joshi@gmail.com', role: 'user', subscriptionStatus: 'free', coinBalance: 5, grade: '11', educationBoard: 'ICSE', createdAt: '2024-12-20', lastActive: '2024-12-24' },
  { id: '10', name: 'Meera Iyer', email: 'meera.iyer@outlook.com', role: 'user', subscriptionStatus: 'pro', coinBalance: 150, grade: '12', educationBoard: 'CBSE', createdAt: '2024-11-12', lastActive: '2024-12-19' },
];

export const mockAnalytics = {
  totalUsers: 18542,
  newSignups7Days: 847,
  dailyActiveUsers: 3256,
  totalGenerations: 125890,
};

export const signupTrendData = [
  { date: 'Nov 24', signups: 45 },
  { date: 'Nov 25', signups: 52 },
  { date: 'Nov 26', signups: 38 },
  { date: 'Nov 27', signups: 61 },
  { date: 'Nov 28', signups: 55 },
  { date: 'Nov 29', signups: 48 },
  { date: 'Nov 30', signups: 72 },
  { date: 'Dec 01', signups: 65 },
  { date: 'Dec 02', signups: 43 },
  { date: 'Dec 03', signups: 58 },
  { date: 'Dec 04', signups: 67 },
  { date: 'Dec 05', signups: 54 },
  { date: 'Dec 06', signups: 78 },
  { date: 'Dec 07', signups: 82 },
  { date: 'Dec 08', signups: 69 },
  { date: 'Dec 09', signups: 56 },
  { date: 'Dec 10', signups: 74 },
  { date: 'Dec 11', signups: 88 },
  { date: 'Dec 12', signups: 95 },
  { date: 'Dec 13', signups: 79 },
  { date: 'Dec 14', signups: 103 },
  { date: 'Dec 15', signups: 112 },
  { date: 'Dec 16', signups: 98 },
  { date: 'Dec 17', signups: 87 },
  { date: 'Dec 18', signups: 91 },
  { date: 'Dec 19', signups: 105 },
  { date: 'Dec 20', signups: 118 },
  { date: 'Dec 21', signups: 124 },
  { date: 'Dec 22', signups: 135 },
  { date: 'Dec 23', signups: 142 },
];

export const popularTopicsData = [
  { topic: 'Partnership Accounts', count: 4520 },
  { topic: 'Financial Statements', count: 3890 },
  { topic: 'Macro Economics', count: 3450 },
  { topic: 'Marketing Management', count: 3120 },
  { topic: 'Cash Flow Statement', count: 2890 },
  { topic: 'Company Accounts', count: 2650 },
  { topic: 'Business Environment', count: 2340 },
  { topic: 'Indian Economic Development', count: 2180 },
];

export const learningModeData = [
  { mode: 'MCQ Practice', value: 45, fill: 'hsl(var(--primary))' },
  { mode: 'Adaptive Quiz', value: 25, fill: 'hsl(var(--secondary))' },
  { mode: 'Full Mock', value: 15, fill: 'hsl(var(--gold))' },
  { mode: 'Flashcards', value: 15, fill: 'hsl(var(--success))' },
];

export interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

export const mockEvents: ContentItem[] = [
  { id: '1', title: 'Board Exam Countdown', type: 'Seasonal', status: 'active', createdAt: '2024-12-01' },
  { id: '2', title: 'New Year Study Challenge', type: 'Promotional', status: 'draft', createdAt: '2024-12-15' },
  { id: '3', title: 'Diwali Coin Bonus', type: 'Seasonal', status: 'archived', createdAt: '2024-10-20' },
];

export const mockVideos: ContentItem[] = [
  { id: '1', title: 'Partnership Fundamentals', type: 'Accountancy', status: 'active', createdAt: '2024-11-10' },
  { id: '2', title: 'Marketing Mix Explained', type: 'Business Studies', status: 'active', createdAt: '2024-11-15' },
  { id: '3', title: 'GDP & National Income', type: 'Economics', status: 'draft', createdAt: '2024-12-05' },
];

export const mockPapers: ContentItem[] = [
  { id: '1', title: 'CBSE 2024 Accountancy', type: 'Previous Year', status: 'active', createdAt: '2024-04-15' },
  { id: '2', title: 'CBSE 2024 Business Studies', type: 'Previous Year', status: 'active', createdAt: '2024-04-15' },
  { id: '3', title: 'CBSE 2023 Economics', type: 'Previous Year', status: 'active', createdAt: '2023-05-01' },
];

export const mockFormulas: ContentItem[] = [
  { id: '1', title: 'Ratio Analysis Formulas', type: 'Accountancy', status: 'active', createdAt: '2024-10-01' },
  { id: '2', title: 'Elasticity Formulas', type: 'Economics', status: 'active', createdAt: '2024-10-15' },
  { id: '3', title: 'Break-even Analysis', type: 'Business Studies', status: 'draft', createdAt: '2024-11-20' },
];
