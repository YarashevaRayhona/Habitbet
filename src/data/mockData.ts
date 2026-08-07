import { User, Challenge, ProofSubmission, Transaction, Friend, Badge, LeaderboardUser, ActivityItem, SmartAlarm, ChatMessage } from '../types';
import { PANDA_AVATARS } from './pandaAvatars';

export const INITIAL_USER: User = {
  id: 'usr_me',
  username: 'alex_apex',
  email: 'alex@habitbet.app',
  avatar: PANDA_AVATARS[0].svgDataUri, // Silk Road UZS Emperor Panda
  bio: '⚡ Asian High-Stakes Habit Master. $50M mind. 18-day unbroken streak in UZS.',
  timezone: 'GMT+5 (Tashkent / Asia)',
  country: 'Uzbekistan 🇺🇿',
  currency: 'UZS',
  streak: 18,
  longestStreak: 42,
  totalEarnings: 2450,
  totalLosses: 80,
  winRate: 94.8,
  level: 14,
  xp: 3850,
  nextLevelXp: 5000,
  coins: 1420,
  walletBalance: 840.50,
  escrowBalance: 250.00,
  completedHabitsCount: 142,
  failedHabitsCount: 8,
  followersCount: 1280,
  followingCount: 340,
  goals: ['Early Morning Routine', 'High Intensity Fitness', 'Master TypeScript', 'Daily Mindfulness']
};

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    title: '5:00 AM Miracle Club',
    category: 'Wake Up Early',
    description: 'Wake up before 5:00 AM every single morning. Submit selfie + live time proof within 10 minutes.',
    difficulty: 'Extreme',
    repeatSchedule: 'Daily at 05:00 AM',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    betAmount: 50,
    isPrivate: false,
    maxPlayers: 10,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    proofMethod: 'Selfie',
    alarmEnabled: true,
    penalty: 'Forfeit $50 pot contribution to top consistent survivors.',
    reward: 'Equal share of loser pool + 250 HabitCoins.',
    totalPool: 450,
    creatorId: 'usr_me',
    status: 'active',
    todaySubmitted: false,
    participants: [
      { id: 'usr_me', username: 'alex_apex', avatar: PANDA_AVATARS[0].svgDataUri, status: 'active', streak: 18 },
      { id: 'usr_2', username: 'sarah_fits', avatar: PANDA_AVATARS[4].svgDataUri, status: 'completed_today', streak: 14 },
      { id: 'usr_3', username: 'marcus_dev', avatar: PANDA_AVATARS[1].svgDataUri, status: 'active', streak: 21 },
      { id: 'usr_4', username: 'elena_crypto', avatar: PANDA_AVATARS[5].svgDataUri, status: 'failed_today', streak: 0 }
    ],
    daysRemaining: 12,
    targetCount: 30,
    currentCount: 18
  },
  {
    id: 'ch_2',
    title: '10,000 Steps Daily Grind',
    category: 'Walking',
    description: 'Walk 10k steps daily verified with Apple Health / GPS Motion verification.',
    difficulty: 'Medium',
    repeatSchedule: 'Daily by 10:00 PM',
    startDate: '2026-08-01',
    endDate: '2026-08-14',
    betAmount: 25,
    isPrivate: false,
    maxPlayers: 20,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80',
    proofMethod: 'GPS',
    alarmEnabled: false,
    penalty: '$25 deducted to winner pool',
    reward: 'Pool share + 100 HabitCoins',
    totalPool: 300,
    creatorId: 'usr_3',
    status: 'active',
    todaySubmitted: true,
    participants: [
      { id: 'usr_me', username: 'alex_apex', avatar: PANDA_AVATARS[0].svgDataUri, status: 'completed_today', streak: 18 },
      { id: 'usr_3', username: 'marcus_dev', avatar: PANDA_AVATARS[1].svgDataUri, status: 'completed_today', streak: 9 }
    ],
    daysRemaining: 5,
    targetCount: 14,
    currentCount: 9
  },
  {
    id: 'ch_3',
    title: '2 Hours Deep Coding',
    category: 'Coding',
    description: '2 uninterrupted hours of deep coding or GitHub commits verified by IDE AI Screenshot / Log.',
    difficulty: 'Hard',
    repeatSchedule: 'Mon - Fri',
    startDate: '2026-08-01',
    endDate: '2026-08-28',
    betAmount: 100,
    isPrivate: true,
    maxPlayers: 5,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    proofMethod: 'AI Object Detection',
    alarmEnabled: false,
    penalty: '$100 pot loss',
    reward: '$100 + Loser Share',
    totalPool: 500,
    creatorId: 'usr_me',
    status: 'active',
    todaySubmitted: false,
    participants: [
      { id: 'usr_me', username: 'alex_apex', avatar: PANDA_AVATARS[0].svgDataUri, status: 'active', streak: 12 },
      { id: 'usr_3', username: 'marcus_dev', avatar: PANDA_AVATARS[1].svgDataUri, status: 'active', streak: 15 }
    ],
    daysRemaining: 18,
    targetCount: 20,
    currentCount: 8
  }
];

export const INITIAL_PROOFS: ProofSubmission[] = [
  {
    id: 'pr_1',
    challengeId: 'ch_1',
    challengeTitle: '5:00 AM Miracle Club',
    userId: 'usr_2',
    userName: 'Sarah Jenkins',
    userAvatar: PANDA_AVATARS[4].svgDataUri,
    timestamp: '04:58 AM',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    proofType: 'Selfie',
    gpsLocation: 'Miami, Beach Fitness Hub (25.7617° N, 80.1918° W)',
    aiConfidenceScore: 99,
    isVerified: true,
    antiCheatFlags: [],
    likes: 24,
    commentsCount: 6,
    userLiked: true
  },
  {
    id: 'pr_2',
    challengeId: 'ch_2',
    challengeTitle: '10,000 Steps Daily Grind',
    userId: 'usr_3',
    userName: 'Marcus Vance',
    userAvatar: PANDA_AVATARS[1].svgDataUri,
    timestamp: '08:15 AM',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&auto=format&fit=crop&q=80',
    proofType: 'GPS',
    gpsLocation: 'Central Park Walkway (11,420 steps verified)',
    aiConfidenceScore: 97,
    isVerified: true,
    antiCheatFlags: [],
    likes: 18,
    commentsCount: 3
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_101',
    type: 'win_payout',
    amount: 140.00,
    date: 'Today, 06:10 AM',
    status: 'completed',
    note: 'Won 5:00 AM Miracle Club Bet Pool (3 opponents failed)',
    method: 'Escrow Release'
  },
  {
    id: 'tx_102',
    type: 'deposit',
    amount: 500.00,
    date: 'Yesterday',
    status: 'completed',
    note: 'Deposit via Apple Pay',
    method: 'Apple Pay'
  },
  {
    id: 'tx_103',
    type: 'bet_deposit',
    amount: -50.00,
    date: 'Aug 01, 2026',
    status: 'completed',
    note: 'Locked in Escrow for 5 AM Miracle Club',
    method: 'Wallet Escrow'
  },
  {
    id: 'tx_104',
    type: 'referral_bonus',
    amount: 25.00,
    date: 'Jul 28, 2026',
    status: 'completed',
    note: 'Referral reward: @marcus_dev joined HabitBet',
    method: 'Bonus Credit'
  }
];

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'usr_2',
    name: 'Sarah Jenkins',
    username: 'sarah_fits',
    avatar: PANDA_AVATARS[4].svgDataUri,
    streak: 14,
    online: true,
    totalWon: 1850,
    isFollowing: true,
    recentAchievement: '🔥 Won 1,500,000 UZS in 5 AM Club'
  },
  {
    id: 'usr_3',
    name: 'Marcus Vance',
    username: 'marcus_dev',
    avatar: PANDA_AVATARS[1].svgDataUri,
    streak: 21,
    online: true,
    totalWon: 3100,
    isFollowing: true,
    recentAchievement: '🏆 Top 1% Developer Grind'
  },
  {
    id: 'usr_4',
    name: 'Elena Rostova',
    username: 'elena_crypto',
    avatar: PANDA_AVATARS[5].svgDataUri,
    streak: 5,
    online: false,
    totalWon: 620,
    isFollowing: false,
    recentAchievement: '⚡ Completed 7-day Cold Plunge'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'lb_1',
    rank: 1,
    name: 'David "The Machine" Kim',
    username: 'david_kim',
    avatar: PANDA_AVATARS[3].svgDataUri,
    country: 'Uzbekistan 🇺🇿',
    wins: 89,
    streak: 112,
    earnings: 12450,
    winRate: 98.2,
    rankChange: 'same'
  },
  {
    id: 'lb_2',
    rank: 2,
    name: 'Sofia Al-Mansoor',
    username: 'sofia_habits',
    avatar: PANDA_AVATARS[14].svgDataUri,
    country: 'UAE 🇦🇪',
    wins: 76,
    streak: 84,
    earnings: 9800,
    winRate: 96.5,
    rankChange: 'up'
  },
  {
    id: 'lb_3',
    rank: 3,
    name: 'Alex Rivera (You)',
    username: 'alex_apex',
    avatar: PANDA_AVATARS[0].svgDataUri,
    country: 'Uzbekistan 🇺🇿',
    wins: 48,
    streak: 18,
    earnings: 2450,
    winRate: 94.8,
    rankChange: 'up'
  },
  {
    id: 'lb_4',
    rank: 4,
    name: 'Liam O\'Connor',
    username: 'liam_beast',
    avatar: PANDA_AVATARS[12].svgDataUri,
    country: 'Ireland 🇮🇪',
    wins: 42,
    streak: 29,
    earnings: 2180,
    winRate: 91.0,
    rankChange: 'down'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'bdg_1',
    name: 'Early Bird',
    description: 'Complete 10 wake-up habits before 6:00 AM.',
    icon: 'Sun',
    category: 'Streak',
    unlocked: true,
    unlockDate: '2026-07-20',
    progressPercent: 100
  },
  {
    id: 'bdg_2',
    name: 'Money Maker',
    description: 'Win over $1,000 in total bet payouts.',
    icon: 'DollarSign',
    category: 'Earnings',
    unlocked: true,
    unlockDate: '2026-08-01',
    progressPercent: 100
  },
  {
    id: 'bdg_3',
    name: '100 Day Streak',
    description: 'Maintain an unbroken daily streak for 100 consecutive days.',
    icon: 'Flame',
    category: 'Streak',
    unlocked: false,
    progressPercent: 18
  },
  {
    id: 'bdg_4',
    name: 'Top 1% Champion',
    description: 'Reach rank #1 - #10 on the Global Leaderboard.',
    icon: 'Trophy',
    category: 'Special',
    unlocked: true,
    unlockDate: '2026-08-02',
    progressPercent: 100
  },
  {
    id: 'bdg_5',
    name: 'Iron Mind',
    description: 'Complete 5 Extreme difficulty challenges without a single fail.',
    icon: 'ShieldCheck',
    category: 'Mastery',
    unlocked: false,
    progressPercent: 60
  }
];

export const INITIAL_ALARMS: SmartAlarm[] = [
  {
    id: 'alm_1',
    time: '05:00 AM',
    label: 'Miracle Morning Wake Up',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    enabled: true,
    challengeType: 'math',
    difficulty: 'Hard'
  },
  {
    id: 'alm_2',
    time: '06:30 AM',
    label: 'Gym & Cardio Sprint',
    days: ['Mon', 'Wed', 'Fri'],
    enabled: true,
    challengeType: 'shake',
    difficulty: 'Medium'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act_1',
    userId: 'usr_2',
    userName: 'Sarah Jenkins',
    userAvatar: PANDA_AVATARS[4].svgDataUri,
    action: 'won a bet of',
    habitTitle: '5:00 AM Miracle Club',
    amount: 140,
    timeAgo: '12m ago',
    proofImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    likes: 38,
    comments: 7,
    userLiked: true
  },
  {
    id: 'act_2',
    userId: 'usr_3',
    userName: 'Marcus Vance',
    userAvatar: PANDA_AVATARS[1].svgDataUri,
    action: 'submitted verified GPS proof for',
    habitTitle: '10,000 Steps Daily Grind',
    timeAgo: '1h ago',
    likes: 19,
    comments: 2
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    chatId: 'group_ch1',
    senderId: 'usr_3',
    senderName: 'Marcus Vance',
    senderAvatar: PANDA_AVATARS[1].svgDataUri,
    text: 'Locked my $50 in! See you all at 04:55 AM tomorrow morning ⏰🔥',
    type: 'text',
    timestamp: '09:24 PM'
  },
  {
    id: 'msg_2',
    chatId: 'group_ch1',
    senderId: 'usr_2',
    senderName: 'Sarah Jenkins',
    senderAvatar: PANDA_AVATARS[4].svgDataUri,
    text: 'Don\'t snooze or your money goes straight into my HabitBet wallet! 😉💸',
    type: 'text',
    timestamp: '09:28 PM'
  }
];
