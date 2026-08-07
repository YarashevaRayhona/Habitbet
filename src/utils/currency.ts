export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  rateFromUSD: number; // How many units equal 1 USD
  flag: string;
  position: 'prefix' | 'suffix';
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'UZS', name: "Uzbekistan Som (so'm)", symbol: 'UZS', rateFromUSD: 12800, flag: '🇺🇿', position: 'suffix' },
  { code: 'USD', name: 'US Dollar', symbol: '$', rateFromUSD: 1, flag: '🇺🇸', position: 'prefix' },
  { code: 'CNY', name: 'Chinese Yuan (¥)', symbol: '¥', rateFromUSD: 7.25, flag: '🇨🇳', position: 'prefix' },
  { code: 'JPY', name: 'Japanese Yen (¥)', symbol: '¥', rateFromUSD: 155, flag: '🇯🇵', position: 'prefix' },
  { code: 'KRW', name: 'Korean Won (₩)', symbol: '₩', rateFromUSD: 1380, flag: '🇰🇷', position: 'prefix' },
  { code: 'KZT', name: 'Kazakhstani Tenge (₸)', symbol: '₸', rateFromUSD: 480, flag: '🇰🇿', position: 'suffix' },
  { code: 'INR', name: 'Indian Rupee (₹)', symbol: '₹', rateFromUSD: 83.5, flag: '🇮🇳', position: 'prefix' },
  { code: 'EUR', name: 'Euro (€)', symbol: '€', rateFromUSD: 0.92, flag: '🇪🇺', position: 'prefix' },
  { code: 'GBP', name: 'British Pound (£)', symbol: '£', rateFromUSD: 0.79, flag: '🇬🇧', position: 'prefix' },
  { code: 'SOL', name: 'Solana (SOL)', symbol: 'SOL', rateFromUSD: 0.006, flag: '0️⃣', position: 'suffix' },
  { code: 'BTC', name: 'Bitcoin (BTC)', symbol: 'BTC', rateFromUSD: 0.000015, flag: '₿', position: 'suffix' },
];

export function getCurrencyConfig(code: string = 'UZS'): CurrencyConfig {
  const found = SUPPORTED_CURRENCIES.find((c) => c.code.toUpperCase() === code.toUpperCase());
  return found || SUPPORTED_CURRENCIES[0]; // Default UZS
}

export function formatCurrency(
  amountInUSD: number,
  currencyCode: string = 'UZS',
  customDecimals?: boolean
): string {
  if (isNaN(amountInUSD)) return '0 ' + currencyCode;

  const config = getCurrencyConfig(currencyCode);
  const converted = amountInUSD * config.rateFromUSD;

  // Decide decimals
  let decimals = 0;
  if (customDecimals !== undefined) {
    decimals = customDecimals ? 2 : 0;
  } else {
    if (config.code === 'USD' || config.code === 'EUR' || config.code === 'GBP') {
      decimals = converted % 1 === 0 ? 0 : 2;
    } else if (config.code === 'SOL') {
      decimals = 3;
    } else if (config.code === 'BTC') {
      decimals = 6;
    } else {
      // UZS, JPY, KRW, KZT, INR - integer preferred
      decimals = 0;
    }
  }

  const formattedNum = converted.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (config.position === 'prefix') {
    return `${config.symbol}${formattedNum}`;
  } else {
    return `${formattedNum} ${config.symbol}`;
  }
}

export function convertFromUSD(amountInUSD: number, currencyCode: string = 'UZS'): number {
  const config = getCurrencyConfig(currencyCode);
  return Math.round(amountInUSD * config.rateFromUSD);
}

export function convertToUSD(amountInTargetCurrency: number, currencyCode: string = 'UZS'): number {
  const config = getCurrencyConfig(currencyCode);
  if (!config.rateFromUSD) return amountInTargetCurrency;
  return amountInTargetCurrency / config.rateFromUSD;
}
