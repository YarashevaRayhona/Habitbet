export interface PandaAvatarOption {
  id: string;
  name: string;
  category: 'Asian & Cultural' | 'Cute & Cozy' | 'Warrior & Hero' | 'Futuristic & Pro' | 'Wealth & Royal';
  description: string;
  svgDataUri: string;
}

// Function to generate high quality SVG data URI for 30 distinct panda avatars
function createPandaSvg(
  bgColor: string,
  hatType: 'bamboo' | 'crown' | 'silk_hat' | 'ninja' | 'samurai' | 'headphone' | 'space' | 'glasses' | 'chef' | 'boba' | 'none' | 'wizard' | 'beanie' | 'detective' | 'flower' | 'gold_crown' | 'visor' | 'hoodie' | 'viking' | 'pirate',
  accessory: 'bamboo_stick' | 'gold_coin' | 'boba_cup' | 'star' | 'katana' | 'wand' | 'uzs_bill' | 'glasses' | 'sparkles' | 'none',
  eyeType: 'happy' | 'wink' | 'cool' | 'sparkle' | 'star' | 'sleepy'
): string {
  // Color presets
  const eyeColors = '#1E293B';
  const earColor = '#0F172A';
  
  // Custom hat graphics
  let hatGraphic = '';
  if (hatType === 'bamboo') {
    hatGraphic = `<path d="M 30 35 L 70 35 L 50 12 Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
    <line x1="50" y1="12" x2="50" y2="35" stroke="#15803D" stroke-width="2"/>`;
  } else if (hatType === 'crown' || hatType === 'gold_crown') {
    hatGraphic = `<path d="M 32 35 L 35 15 L 42 25 L 50 10 L 58 25 L 65 15 L 68 35 Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
    <circle cx="50" cy="10" r="3" fill="#EF4444"/>
    <circle cx="35" cy="15" r="2.5" fill="#3B82F6"/>
    <circle cx="65" cy="15" r="2.5" fill="#10B981"/>`;
  } else if (hatType === 'silk_hat') {
    hatGraphic = `<rect x="30" y="28" width="40" height="8" rx="2" fill="#DC2626"/>
    <path d="M 36 28 L 40 14 L 60 14 L 64 28 Z" fill="#991B1B"/>
    <circle cx="50" cy="14" r="3" fill="#F59E0B"/>
    <path d="M 50 14 L 56 6" stroke="#F59E0B" stroke-width="2"/>`;
  } else if (hatType === 'ninja') {
    hatGraphic = `<rect x="22" y="24" width="56" height="18" rx="4" fill="#1E1B4B"/>
    <rect x="36" y="28" width="28" height="10" fill="#EF4444"/>
    <circle cx="50" cy="33" r="2" fill="#FFF"/>`;
  } else if (hatType === 'samurai') {
    hatGraphic = `<path d="M 20 36 Q 50 20 80 36 L 68 22 Q 50 16 32 22 Z" fill="#991B1B"/>
    <path d="M 45 16 L 50 6 L 55 16 Z" fill="#F59E0B"/>`;
  } else if (hatType === 'headphone') {
    hatGraphic = `<path d="M 20 45 A 30 30 0 0 1 80 45" fill="none" stroke="#3B82F6" stroke-width="6"/>
    <rect x="15" y="42" width="10" height="20" rx="4" fill="#1D4ED8"/>
    <rect x="75" y="42" width="10" height="20" rx="4" fill="#1D4ED8"/>`;
  } else if (hatType === 'space') {
    hatGraphic = `<circle cx="50" cy="50" r="42" fill="none" stroke="#00E5FF" stroke-width="3" opacity="0.6"/>
    <rect x="30" y="10" width="40" height="12" rx="4" fill="#0284C7"/>`;
  } else if (hatType === 'wizard') {
    hatGraphic = `<path d="M 24 35 L 76 35 L 50 4 Z" fill="#6D28D9"/>
    <path d="M 20 35 L 80 35 L 80 39 L 20 39 Z" fill="#4C1D95"/>
    <polygon points="50,14 53,20 59,20 54,24 56,30 50,26 44,30 46,24 41,20 47,20" fill="#F59E0B"/>`;
  } else if (hatType === 'chef') {
    hatGraphic = `<path d="M 32 35 C 26 20 40 10 50 15 C 60 10 74 20 68 35 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="32" y="32" width="36" height="6" fill="#F1F5F9"/>`;
  } else if (hatType === 'beanie') {
    hatGraphic = `<path d="M 26 36 C 26 18 74 18 74 36 Z" fill="#EC4899"/>
    <rect x="24" y="32" width="52" height="7" rx="3" fill="#DB2777"/>
    <circle cx="50" cy="16" r="6" fill="#F472B6"/>`;
  } else if (hatType === 'detective') {
    hatGraphic = `<path d="M 20 35 Q 50 25 80 35 L 70 24 Q 50 20 30 24 Z" fill="#78350F"/>
    <rect x="34" y="24" width="32" height="4" fill="#451A03"/>`;
  } else if (hatType === 'flower') {
    hatGraphic = `<circle cx="35" cy="22" r="5" fill="#F43F5E"/>
    <circle cx="45" cy="18" r="6" fill="#FB7185"/>
    <circle cx="55" cy="18" r="6" fill="#F43F5E"/>
    <circle cx="65" cy="22" r="5" fill="#FB7185"/>
    <circle cx="50" cy="20" r="3" fill="#FBBF24"/>`;
  } else if (hatType === 'visor') {
    hatGraphic = `<path d="M 20 35 Q 50 15 80 35 L 78 42 Q 50 28 22 42 Z" fill="#00E5FF" opacity="0.95"/>`;
  } else if (hatType === 'viking') {
    hatGraphic = `<path d="M 26 36 C 26 22 74 22 74 36 Z" fill="#64748B"/>
    <path d="M 26 32 Q 12 10 10 25 Q 20 28 26 32 Z" fill="#F59E0B"/>
    <path d="M 74 32 Q 88 10 90 25 Q 80 28 74 32 Z" fill="#F59E0B"/>`;
  } else if (hatType === 'pirate') {
    hatGraphic = `<path d="M 16 34 Q 50 18 84 34 L 70 20 Q 50 15 30 20 Z" fill="#0F172A"/>
    <circle cx="50" cy="26" r="4" fill="#EF4444"/>`;
  }

  // Eye graphic variations
  let eyeGraphic = '';
  if (eyeType === 'cool') {
    eyeGraphic = `<rect x="28" y="44" width="20" height="12" rx="3" fill="#0F172A"/>
    <rect x="52" y="44" width="20" height="12" rx="3" fill="#0F172A"/>
    <line x1="48" y1="48" x2="52" y2="48" stroke="#0F172A" stroke-width="2"/>
    <line x1="30" y1="46" x2="40" y2="46" stroke="#38BDF8" stroke-width="1.5"/>
    <line x1="54" y1="46" x2="64" y2="46" stroke="#38BDF8" stroke-width="1.5"/>`;
  } else if (eyeType === 'wink') {
    eyeGraphic = `<circle cx="36" cy="48" r="4" fill="${eyeColors}"/>
    <path d="M 54 48 Q 62 42 70 48" stroke="${eyeColors}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  } else if (eyeType === 'sparkle' || eyeType === 'star') {
    eyeGraphic = `<circle cx="36" cy="48" r="5" fill="${eyeColors}"/>
    <circle cx="64" cy="48" r="5" fill="${eyeColors}"/>
    <circle cx="38" cy="46" r="2" fill="#FFF"/>
    <circle cx="66" cy="46" r="2" fill="#FFF"/>
    <polygon points="50,42 51.5,45 55,45 52,47 53,50 50,48 47,50 48,47 45,45 48.5,45" fill="#F59E0B"/>`;
  } else if (eyeType === 'sleepy') {
    eyeGraphic = `<path d="M 30 50 Q 36 44 42 50" stroke="${eyeColors}" stroke-width="3" fill="none"/>
    <path d="M 58 50 Q 64 44 70 50" stroke="${eyeColors}" stroke-width="3" fill="none"/>`;
  } else {
    // happy
    eyeGraphic = `<circle cx="36" cy="48" r="4.5" fill="${eyeColors}"/>
    <circle cx="64" cy="48" r="4.5" fill="${eyeColors}"/>
    <circle cx="38" cy="46.5" r="1.8" fill="#FFF"/>
    <circle cx="66" cy="46.5" r="1.8" fill="#FFF"/>`;
  }

  // Accessory graphic
  let accGraphic = '';
  if (accessory === 'bamboo_stick') {
    accGraphic = `<rect x="68" y="55" width="6" height="35" rx="3" fill="#22C55E" transform="rotate(-20 68 55)"/>
    <line x1="68" y1="65" x2="74" y2="63" stroke="#15803D" stroke-width="1.5"/>
    <line x1="68" y1="75" x2="74" y2="73" stroke="#15803D" stroke-width="1.5"/>`;
  } else if (accessory === 'uzs_bill') {
    accGraphic = `<g transform="translate(56, 62) rotate(15)">
      <rect x="0" y="0" width="28" height="16" rx="2" fill="#10B981" stroke="#047857" stroke-width="1"/>
      <circle cx="14" cy="8" r="4" fill="#065F46"/>
      <text x="14" y="11" font-size="5" font-weight="bold" fill="#A7F3D0" text-anchor="middle">UZS</text>
    </g>`;
  } else if (accessory === 'boba_cup') {
    accGraphic = `<g transform="translate(62, 58)">
      <rect x="0" y="4" width="16" height="22" rx="3" fill="#FDE68A" stroke="#D97706" stroke-width="1"/>
      <line x1="8" y1="-2" x2="8" y2="6" stroke="#EF4444" stroke-width="2.5"/>
      <circle cx="5" cy="18" r="1.5" fill="#78350F"/>
      <circle cx="11" cy="20" r="1.5" fill="#78350F"/>
      <circle cx="8" cy="22" r="1.5" fill="#78350F"/>
    </g>`;
  } else if (accessory === 'gold_coin') {
    accGraphic = `<g transform="translate(64, 60)">
      <circle cx="8" cy="8" r="9" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
      <text x="8" y="11" font-size="8" font-weight="900" fill="#78350F" text-anchor="middle">UZS</text>
    </g>`;
  } else if (accessory === 'katana') {
    accGraphic = `<line x1="72" y1="40" x2="85" y2="85" stroke="#94A3B8" stroke-width="3"/>
    <rect x="68" y="42" width="8" height="4" fill="#F59E0B"/>`;
  } else if (accessory === 'sparkles') {
    accGraphic = `<path d="M 72 40 L 74 44 L 78 44 L 75 47 L 76 51 L 72 48 L 68 51 L 69 47 L 66 44 L 70 44 Z" fill="#F59E0B"/>`;
  }

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <!-- Background Circle -->
    <circle cx="50" cy="50" r="48" fill="${bgColor}"/>
    
    <!-- Panda Ears -->
    <circle cx="24" cy="26" r="13" fill="${earColor}"/>
    <circle cx="24" cy="26" r="7" fill="#F43F5E" opacity="0.3"/>
    <circle cx="76" cy="26" r="13" fill="${earColor}"/>
    <circle cx="76" cy="26" r="7" fill="#F43F5E" opacity="0.3"/>
    
    <!-- Panda Head Base -->
    <ellipse cx="50" cy="54" rx="34" ry="30" fill="#FFFFFF"/>
    <ellipse cx="50" cy="54" rx="34" ry="30" fill="none" stroke="#E2E8F0" stroke-width="1"/>
    
    <!-- Eye Patches -->
    <ellipse cx="36" cy="48" rx="10" ry="12" fill="${earColor}" transform="rotate(-10 36 48)"/>
    <ellipse cx="64" cy="48" rx="10" ry="12" fill="${earColor}" transform="rotate(10 64 48)"/>
    
    <!-- Eyes -->
    ${eyeGraphic}
    
    <!-- Cheeks (Blush) -->
    <circle cx="24" cy="58" r="6" fill="#F472B6" opacity="0.4"/>
    <circle cx="76" cy="58" r="6" fill="#F472B6" opacity="0.4"/>
    
    <!-- Nose & Mouth -->
    <ellipse cx="50" cy="58" rx="4" ry="3" fill="${earColor}"/>
    <path d="M 46 63 Q 50 67 54 63" stroke="${earColor}" stroke-width="2" fill="none" stroke-linecap="round"/>
    
    <!-- Hat Graphic -->
    ${hatGraphic}
    
    <!-- Accessory -->
    ${accGraphic}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const PANDA_AVATARS: PandaAvatarOption[] = [
  {
    id: 'panda_uzs_emperor',
    name: '👑 Silk Road UZS Emperor',
    category: 'Wealth & Royal',
    description: 'Golden crown and Uzbek UZS wealth aura. Ultimate High-Stakes Boss!',
    svgDataUri: createPandaSvg('#4C1D95', 'gold_crown', 'uzs_bill', 'sparkle')
  },
  {
    id: 'panda_bamboo_ninja',
    name: '🥷 Bamboo Shadow Ninja',
    category: 'Warrior & Hero',
    description: 'Stealthy master of early morning habit streaks.',
    svgDataUri: createPandaSvg('#064E3B', 'ninja', 'katana', 'cool')
  },
  {
    id: 'panda_samurai_master',
    name: '⚔️ Uzbek Silk Warrior',
    category: 'Asian & Cultural',
    description: 'Wearing traditional warrior crest and fierce focus.',
    svgDataUri: createPandaSvg('#7C2D12', 'samurai', 'bamboo_stick', 'cool')
  },
  {
    id: 'panda_uzs_banker',
    name: '💰 UZS Millionaire Panda',
    category: 'Wealth & Royal',
    description: 'Stacking millions of Uzbek Som from won challenge pools.',
    svgDataUri: createPandaSvg('#047857', 'silk_hat', 'gold_coin', 'sparkle')
  },
  {
    id: 'panda_boba_cute',
    name: '🧋 Boba Tea Lover Panda',
    category: 'Cute & Cozy',
    description: 'Sweet panda sipping fresh brown sugar boba tea.',
    svgDataUri: createPandaSvg('#BE185D', 'flower', 'boba_cup', 'happy')
  },
  {
    id: 'panda_cyberpunk_neon',
    name: '⚡ Cyberpunk 2077 Panda',
    category: 'Futuristic & Pro',
    description: 'Neon cyan HUD visor and high-tech habit tracking.',
    svgDataUri: createPandaSvg('#0F172A', 'visor', 'sparkles', 'cool')
  },
  {
    id: 'panda_space_astro',
    name: '🚀 Cosmic Astronaut Panda',
    category: 'Futuristic & Pro',
    description: 'Exploring space and reaching 100-day unbroken streaks.',
    svgDataUri: createPandaSvg('#0369A1', 'space', 'star', 'sparkle')
  },
  {
    id: 'panda_sleepy_nightcap',
    name: '💤 5 AM Alarm Survivor',
    category: 'Cute & Cozy',
    description: 'Beating the snooze alarm with cute pink beanie.',
    svgDataUri: createPandaSvg('#9333EA', 'beanie', 'none', 'sleepy')
  },
  {
    id: 'panda_gamer_pro',
    name: '🎧 Pro Gaming Panda',
    category: 'Futuristic & Pro',
    description: 'RGB headphones and 24/7 coding grind.',
    svgDataUri: createPandaSvg('#1E1B4B', 'headphone', 'sparkles', 'wink')
  },
  {
    id: 'panda_wizard_sorcerer',
    name: '🧙‍♂️ Habit Arcane Wizard',
    category: 'Warrior & Hero',
    description: 'Casting magical discipline spells over bad habits.',
    svgDataUri: createPandaSvg('#581C87', 'wizard', 'sparkles', 'sparkle')
  },
  {
    id: 'panda_chef_wok',
    name: '👨‍🍳 Master Chef Panda',
    category: 'Cute & Cozy',
    description: 'Cooking up healthy meal preps and clean nutrition.',
    svgDataUri: createPandaSvg('#C2410C', 'chef', 'none', 'happy')
  },
  {
    id: 'panda_detective_holmes',
    name: '🕵️‍♂️ Anti-Cheat Detective',
    category: 'Warrior & Hero',
    description: 'AI fraud detector verifying GPS & selfie proofs.',
    svgDataUri: createPandaSvg('#451A03', 'detective', 'glasses', 'cool')
  },
  {
    id: 'panda_viking_king',
    name: '🛡️ Valhalla Viking Panda',
    category: 'Warrior & Hero',
    description: 'Fierce conqueror of extreme gym & cold plunge bets.',
    svgDataUri: createPandaSvg('#334155', 'viking', 'katana', 'cool')
  },
  {
    id: 'panda_pirate_captain',
    name: '🏴‍☠️ High Seas Pirate Panda',
    category: 'Wealth & Royal',
    description: 'Hunting for loser pool treasure chests.',
    svgDataUri: createPandaSvg('#111827', 'pirate', 'gold_coin', 'wink')
  },
  {
    id: 'panda_flower_princess',
    name: '🌸 Blossom Garden Panda',
    category: 'Cute & Cozy',
    description: 'Peaceful zen meditation and positive mindfulness.',
    svgDataUri: createPandaSvg('#9D174D', 'flower', 'none', 'happy')
  },
  {
    id: 'panda_bamboo_zen',
    name: '🎍 Classic Bamboo Panda',
    category: 'Asian & Cultural',
    description: 'Traditional bamboo forest habit master.',
    svgDataUri: createPandaSvg('#166534', 'bamboo', 'bamboo_stick', 'happy')
  },
  {
    id: 'panda_gold_crown',
    name: '🥇 #1 Leaderboard Champion',
    category: 'Wealth & Royal',
    description: 'Holding the #1 global rank crown with pride.',
    svgDataUri: createPandaSvg('#B45309', 'crown', 'sparkles', 'star')
  },
  {
    id: 'panda_tea_master',
    name: '🍵 Asian Tea Ceremony Master',
    category: 'Asian & Cultural',
    description: 'Calm green tea drinker with infinite patience.',
    svgDataUri: createPandaSvg('#065F46', 'bamboo', 'none', 'happy')
  },
  {
    id: 'panda_cool_shades',
    name: '🕶️ High-Roller Boss Panda',
    category: 'Wealth & Royal',
    description: 'Always confident, always securing the bet payouts.',
    svgDataUri: createPandaSvg('#1F2937', 'none', 'uzs_bill', 'cool')
  },
  {
    id: 'panda_sparkle_eyes',
    name: '✨ Anime Sparkle Panda',
    category: 'Cute & Cozy',
    description: 'Super adorable panda with twinkling anime eyes.',
    svgDataUri: createPandaSvg('#DB2777', 'flower', 'sparkles', 'sparkle')
  },
  {
    id: 'panda_winking_star',
    name: '😉 Winking Superstar Panda',
    category: 'Cute & Cozy',
    description: 'Playful winking panda ready to take on the world.',
    svgDataUri: createPandaSvg('#2563EB', 'beanie', 'none', 'wink')
  },
  {
    id: 'panda_golden_wealth',
    name: '💵 Asian Fortune Blessing Panda',
    category: 'Asian & Cultural',
    description: 'Bringing good luck, discipline, and high UZS earnings.',
    svgDataUri: createPandaSvg('#854D0E', 'gold_crown', 'uzs_bill', 'sparkle')
  },
  {
    id: 'panda_superhero_cape',
    name: '🦸‍♂️ Habit Avenger Panda',
    category: 'Warrior & Hero',
    description: 'Saving your routine from procrastination.',
    svgDataUri: createPandaSvg('#B91C1C', 'ninja', 'sparkles', 'cool')
  },
  {
    id: 'panda_futuristic_hologram',
    name: '🌐 Holographic AI Panda',
    category: 'Futuristic & Pro',
    description: 'AI habit coach guiding your daily bets.',
    svgDataUri: createPandaSvg('#0D9488', 'visor', 'star', 'sparkle')
  },
  {
    id: 'panda_cozy_reader',
    name: '📚 Scholar Student Panda',
    category: 'Cute & Cozy',
    description: 'Studying 2 hours daily with deep concentration.',
    svgDataUri: createPandaSvg('#3730A3', 'detective', 'none', 'happy')
  },
  {
    id: 'panda_party_celebration',
    name: '🎉 Payout Party Panda',
    category: 'Wealth & Royal',
    description: 'Celebrating a successful week of habit streaks.',
    svgDataUri: createPandaSvg('#C026D3', 'crown', 'sparkles', 'happy')
  },
  {
    id: 'panda_golden_dragon',
    name: '🐉 Eastern Dragon Spirit Panda',
    category: 'Asian & Cultural',
    description: 'Harnessing ancient dragon energy for 100% win rate.',
    svgDataUri: createPandaSvg('#9A3412', 'samurai', 'sparkles', 'cool')
  },
  {
    id: 'panda_gym_beast',
    name: '💪 Iron Gym Beast Panda',
    category: 'Warrior & Hero',
    description: 'Never skipping leg day or morning workouts.',
    svgDataUri: createPandaSvg('#1E293B', 'headphone', 'bamboo_stick', 'cool')
  },
  {
    id: 'panda_tashkent_legend',
    name: '🇺🇿 Tashkent Star Panda',
    category: 'Asian & Cultural',
    description: 'Proud Asian habit champion betting in UZS.',
    svgDataUri: createPandaSvg('#0284C7', 'silk_hat', 'uzs_bill', 'sparkle')
  },
  {
    id: 'panda_golden_phoenix',
    name: '🔥 Phoenix Rebirth Panda',
    category: 'Warrior & Hero',
    description: 'Rising stronger after every challenge reset.',
    svgDataUri: createPandaSvg('#DC2626', 'crown', 'sparkles', 'sparkle')
  }
];

export const DEFAULT_PANDA_AVATAR = PANDA_AVATARS[0].svgDataUri;
