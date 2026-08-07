export type HabitCategory =
  | 'Fitness'
  | 'Wake Up Early'
  | 'Study'
  | 'Reading'
  | 'Meditation'
  | 'Gym'
  | 'Walking'
  | 'Coding'
  | 'Writing'
  | 'No Sugar'
  | 'No Smoking'
  | 'No Alcohol'
  | 'Prayer'
  | 'Hydration'
  | 'Custom';

export type ProofMethod =
  | 'Selfie'
  | 'Photo'
  | 'Video'
  | 'GPS'
  | 'QR Scan'
  | 'AI Object Detection'
  | 'Face Verification'
  | 'Motion Detection'
  | 'Math Puzzle';

export type ChallengeDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Extreme';

export type Currency = 'UZS' | 'USD' | 'EUR' | 'GBP' | 'CNY' | 'JPY' | 'KRW' | 'KZT' | 'INR' | 'SOL' | 'BTC' | string;

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  timezone: string;
  country: string;
  currency: Currency;
  streak: number;
  longestStreak: number;
  totalEarnings: number;
  totalLosses: number;
  winRate: number; // e.g. 94.5
  level: number;
  xp: number;
  nextLevelXp: number;
  coins: number;
  walletBalance: number;
  escrowBalance: number;
  completedHabitsCount: number;
  failedHabitsCount: number;
  followersCount: number;
  followingCount: number;
  goals: string[];
}

export interface Participant {
  id: string;
  username: string;
  avatar: string;
  status: 'active' | 'completed_today' | 'failed_today' | 'disqualified';
  streak: number;
}

export interface Challenge {
  id: string;
  title: string;
  category: HabitCategory;
  description: string;
  difficulty?: ChallengeDifficulty;
  repeatSchedule?: string; // e.g. "Daily at 6:00 AM"
  startDate?: string;
  endDate?: string;
  betAmount?: number; // e.g. $50
  stakeAmount?: number;
  isPrivate?: boolean;
  maxPlayers?: number;
  image?: string;
  proofMethod?: ProofMethod;
  alarmEnabled?: boolean;
  penalty?: string;
  reward?: string;
  totalPool: number;
  creatorId?: string;
  status: 'active' | 'completed' | 'failed' | 'rollover';
  todaySubmitted?: boolean;
  participants?: Participant[];
  daysRemaining?: number;
  targetCount?: number;
  currentCount?: number;
  completedDays?: number;
  totalDays?: number;
  currentStreak?: number;
  snoozePenaltyAmount?: number;
  antiCheatStrictness?: string;
  frequency?: string;
  timeOfDay?: string;
  deadlineTime?: string;
  proofType?: string;
  verificationMethod?: string;
  participantsCount?: number;
  currency?: string;
}

export interface ProofSubmission {
  id: string;
  challengeId: string;
  challengeTitle: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  image: string;
  proofType: ProofMethod;
  gpsLocation?: string;
  aiConfidenceScore: number;
  isVerified: boolean;
  antiCheatFlags: string[];
  likes: number;
  commentsCount: number;
  userLiked?: boolean;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'win_payout' | 'bet_deposit' | 'referral_bonus' | 'rollover';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  note: string;
  method?: string;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  streak: number;
  online: boolean;
  totalWon: number;
  isFollowing: boolean;
  recentAchievement?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Streak' | 'Earnings' | 'Special' | 'Mastery';
  unlocked: boolean;
  unlockDate?: string;
  progressPercent: number;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  type: 'text' | 'image' | 'voice' | 'system';
  timestamp: string;
  reactions?: Record<string, number>;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  username: string;
  avatar: string;
  country: string;
  wins: number;
  streak: number;
  earnings: number;
  winRate: number;
  rankChange: 'up' | 'down' | 'same';
}

export interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  habitTitle: string;
  amount?: number;
  timeAgo: string;
  proofImage?: string;
  likes: number;
  comments: number;
  userLiked?: boolean;
}

export interface SmartAlarm {
  id: string;
  time: string; // e.g., "06:00 AM"
  label: string;
  days: string[]; // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  enabled: boolean;
  challengeType: 'math' | 'shake' | 'selfie' | 'walk' | 'qr';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'nudge' | 'proof_verified' | 'win' | 'penalty';
  read: boolean;
}

export interface ProofItem {
  id: string;
  challengeId: string;
  challengeTitle: string;
  username: string;
  avatar: string;
  imageUrl: string;
  timestamp: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  userNote?: string;
  locationName?: string;
  stakeAmount: number;
  aiFraudScore: number;
  gpsStatus: string;
}

export type ViewTab =
  | 'home'
  | 'social'
  | 'leaderboard'
  | 'wallet'
  | 'profile'
  | 'ai_coach'
  | 'admin'
  | 'alarm'
  | 'settings';
