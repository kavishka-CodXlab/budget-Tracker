// Currency configuration and utilities
export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  LKR: { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' }
};

// Get currency symbol from currency code
export const getCurrencySymbol = (currencyCode) => {
  return CURRENCIES[currencyCode]?.symbol || '$';
};

// Get currency name from currency code
export const getCurrencyName = (currencyCode) => {
  return CURRENCIES[currencyCode]?.name || 'US Dollar';
};

// Format amount with currency symbol
export const formatCurrency = (amount, currencyCode = 'USD', showSymbol = true) => {
  const numAmount = parseFloat(amount) || 0;
  const symbol = getCurrencySymbol(currencyCode);
  
  if (!showSymbol) {
    return numAmount.toFixed(2);
  }
  
  // For currencies that typically show symbol after amount
  if (currencyCode === 'LKR') {
    return `${numAmount.toFixed(2)} ${symbol}`;
  }
  
  // For most currencies, show symbol before amount
  return `${symbol}${numAmount.toFixed(2)}`;
};

// Get currency options for dropdowns
export const getCurrencyOptions = () => {
  return Object.values(CURRENCIES).map(currency => ({
    value: currency.code,
    label: `${currency.name} (${currency.symbol})`
  }));
};

// Convert old currency symbol to currency code (for migration)
export const migrateCurrencySymbolToCode = (currencySymbol) => {
  const symbolToCode = {
    '$': 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY',
    'C$': 'CAD',
    'A$': 'AUD',
    'Rs': 'LKR'
  };
  
  return symbolToCode[currencySymbol] || 'USD';
};
