// Mock data for Friend Challenges and Study Groups

export interface FriendChallenge {
  id: string;
  code: string;
  title: string;
  topic: string;
  subject: string;
  difficulty: string;
  questionCount: number;
  creatorId: string;
  creatorName: string;
  createdAt: string;
  expiresAt: string;
  attempts: ChallengeAttempt[];
}

export interface ChallengeAttempt {
  id: string;
  odanId: string;
  name: string;
  score: number;
  timeTaken: number;
  completedAt: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  creatorId: string;
  creatorName: string;
  memberCount: number;
  members: GroupMember[];
  sharedDecks: SharedDeck[];
  activityFeed: GroupActivity[];
  createdAt: string;
}

export interface GroupMember {
  id: string;
  name: string;
  role: 'admin' | 'member';
  joinedAt: string;
  xp: number;
}

export interface SharedDeck {
  id: string;
  title: string;
  topic: string;
  cardCount: number;
  sharedBy: string;
  sharedAt: string;
}

export interface GroupActivity {
  id: string;
  type: 'join' | 'quiz' | 'deck_share' | 'achievement';
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
}

export const mockChallenges: FriendChallenge[] = [
  {
    id: '1',
    code: 'ABC123',
    title: 'Partnership Accounts Challenge',
    topic: 'Partnership Accounts',
    subject: 'Accountancy',
    difficulty: 'Medium',
    questionCount: 10,
    creatorId: 'current',
    creatorName: 'Arjun Sharma',
    createdAt: '2024-12-20T10:00:00',
    expiresAt: '2025-01-19T10:00:00',
    attempts: [
      { id: '1', odanId: 'current', name: 'Arjun Sharma', score: 85, timeTaken: 420, completedAt: '2024-12-20T10:15:00' },
      { id: '2', odanId: '2', name: 'Priya Patel', score: 92, timeTaken: 380, completedAt: '2024-12-21T14:30:00' },
      { id: '3', odanId: '3', name: 'Rahul Singh', score: 78, timeTaken: 450, completedAt: '2024-12-22T09:20:00' },
    ],
  },
  {
    id: '2',
    code: 'XYZ789',
    title: 'Marketing Mix Showdown',
    topic: 'Marketing Management',
    subject: 'Business Studies',
    difficulty: 'Hard',
    questionCount: 15,
    creatorId: '2',
    creatorName: 'Priya Patel',
    createdAt: '2024-12-22T16:00:00',
    expiresAt: '2025-01-21T16:00:00',
    attempts: [
      { id: '4', odanId: '2', name: 'Priya Patel', score: 88, timeTaken: 520, completedAt: '2024-12-22T16:30:00' },
    ],
  },
];

export const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Commerce Warriors',
    description: 'A group for Class 12 CBSE Commerce students to prepare for boards together.',
    inviteCode: 'COMWAR',
    creatorId: 'current',
    creatorName: 'Arjun Sharma',
    memberCount: 8,
    members: [
      { id: 'current', name: 'Arjun Sharma', role: 'admin', joinedAt: '2024-11-01', xp: 2180 },
      { id: '2', name: 'Priya Patel', role: 'member', joinedAt: '2024-11-05', xp: 1950 },
      { id: '3', name: 'Rahul Singh', role: 'member', joinedAt: '2024-11-08', xp: 1720 },
      { id: '4', name: 'Ananya Gupta', role: 'member', joinedAt: '2024-11-12', xp: 1580 },
    ],
    sharedDecks: [
      { id: '1', title: 'Ratio Analysis Formulas', topic: 'Accountancy', cardCount: 25, sharedBy: 'Arjun Sharma', sharedAt: '2024-12-15' },
      { id: '2', title: 'Marketing Concepts', topic: 'Business Studies', cardCount: 30, sharedBy: 'Priya Patel', sharedAt: '2024-12-18' },
    ],
    activityFeed: [
      { id: '1', type: 'quiz', userId: '2', userName: 'Priya', message: 'scored 92% on Partnership Accounts', timestamp: '2024-12-24T14:30:00' },
      { id: '2', type: 'deck_share', userId: '3', userName: 'Rahul', message: 'shared "Economics Formulas" deck', timestamp: '2024-12-24T10:00:00' },
      { id: '3', type: 'achievement', userId: '4', userName: 'Ananya', message: 'earned "Week Warrior" badge', timestamp: '2024-12-23T18:45:00' },
      { id: '4', type: 'join', userId: '5', userName: 'Vikram', message: 'joined the group', timestamp: '2024-12-22T09:30:00' },
    ],
    createdAt: '2024-11-01',
  },
];

export const favoriteTopics = [
  'Partnership Accounts',
  'Marketing Management',
  'Cash Flow Statement',
  'National Income',
];
