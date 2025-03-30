export interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  timestamp: string;
  description?: string;
  chartData?: { date: string; price: number }[];
  historicalData?: { date: string; open: number; high: number; low: number; close: number; volume: number }[];
}

export const getStockDetails = async (ticker: string): Promise<Stock> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const chartData = Array.from({ length: 30 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    
    const basePrice = 150;
    const randomVariation = (Math.random() - 0.5) * 10;
    const price = basePrice + randomVariation + (i * 0.5);
    
    return {
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2))
    };
  });

  const historicalData = Array.from({ length: 10 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (10 - i));
    
    const basePrice = 150;
    const open = Number((basePrice - 2 + (Math.random() * 4)).toFixed(2));
    const close = Number((basePrice - 2 + (Math.random() * 4)).toFixed(2));
    const high = Number(Math.max(open, close, basePrice + (Math.random() * 3)).toFixed(2));
    const low = Number(Math.min(open, close, basePrice - (Math.random() * 3)).toFixed(2));
    
    return {
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(500000 + Math.random() * 1000000)
    };
  });

  const mockData: Stock = {
    ticker: ticker.toUpperCase(),
    name: 'Mock Company',
    price: 150.25,
    change: 1.50,
    changePercent: 1.01,
    marketCap: 50000000000,
    peRatio: 25.5,
    volume: 1000000,
    high: 151.50,
    low: 149.75,
    open: 149.90,
    previousClose: 148.75,
    fiftyTwoWeekHigh: 160.00,
    fiftyTwoWeekLow: 120.50,
    timestamp: new Date().toISOString(),
    description: 'This is a mock company description. In a real application, this would contain actual information about the company, its business model, and other relevant details that investors might find useful.',
    chartData,
    historicalData
  };

  return mockData;
};

export interface PortfolioItem {
  ticker: string;
  name: string;
  shares: number;
  cost: number;
  currentPrice: number;
  currentValue?: number;
  previousClose: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  ticker: string;
  name: string;
  shares: number;
  price: number;
}

export interface MarketMover {
  ticker: string;
  name: string;
  currentPrice: number;
  changePercent: number;
}

export interface MarketMovers {
  gainers: MarketMover[];
  losers: MarketMover[];
}

export interface WatchlistItem {
  ticker: string;
  name: string;
  currentPrice: number;
  previousClose: number;
}

export const getPortfolio = async (): Promise<PortfolioItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      shares: 10,
      cost: 1500,
      currentPrice: 175.25,
      currentValue: 1752.5,
      previousClose: 173.50
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 5,
      cost: 1200,
      currentPrice: 380.75,
      currentValue: 1903.75,
      previousClose: 378.85
    },
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 3,
      cost: 900,
      currentPrice: 140.95,
      currentValue: 422.85,
      previousClose: 142.10
    },
    {
      ticker: 'AMZN',
      name: 'Amazon.com, Inc.',
      shares: 4,
      cost: 600,
      currentPrice: 177.23,
      currentValue: 708.92,
      previousClose: 175.85
    },
    {
      ticker: 'TSLA',
      name: 'Tesla, Inc.',
      shares: 8,
      cost: 2400,
      currentPrice: 215.65,
      currentValue: 1725.20,
      previousClose: 220.50
    },
  ];
};

export const getWatchlist = async (): Promise<WatchlistItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      ticker: 'NVDA',
      name: 'NVIDIA Corporation',
      currentPrice: 116.35,
      previousClose: 112.85
    },
    {
      ticker: 'META',
      name: 'Meta Platforms, Inc.',
      currentPrice: 500.12,
      previousClose: 505.45
    },
    {
      ticker: 'NFLX',
      name: 'Netflix, Inc.',
      currentPrice: 610.35,
      previousClose: 600.25
    },
    {
      ticker: 'DIS',
      name: 'The Walt Disney Company',
      currentPrice: 99.25,
      previousClose: 98.75
    },
    {
      ticker: 'JPM',
      name: 'JPMorgan Chase & Co.',
      currentPrice: 195.30,
      previousClose: 193.50
    },
  ];
};

export const getTransactions = async (): Promise<Transaction[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      date: '2023-09-15T13:45:30Z',
      type: 'buy',
      ticker: 'AAPL',
      name: 'Apple Inc.',
      shares: 5,
      price: 145.50
    },
    {
      id: '2',
      date: '2023-09-10T10:30:15Z',
      type: 'buy',
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 3,
      price: 330.25
    },
    {
      id: '3',
      date: '2023-08-25T14:20:45Z',
      type: 'sell',
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 2,
      price: 135.75
    },
    {
      id: '4',
      date: '2023-08-15T09:15:10Z',
      type: 'buy',
      ticker: 'TSLA',
      name: 'Tesla, Inc.',
      shares: 8,
      price: 240.80
    },
    {
      id: '5',
      date: '2023-07-30T11:45:30Z',
      type: 'buy',
      ticker: 'AMZN',
      name: 'Amazon.com, Inc.',
      shares: 4,
      price: 140.35
    },
    {
      id: '6',
      date: '2023-07-22T15:30:20Z',
      type: 'sell',
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 2,
      price: 345.50
    },
  ];
};

export const getMarketMovers = async (): Promise<MarketMovers> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    gainers: [
      {
        ticker: 'NVDA',
        name: 'NVIDIA Corporation',
        currentPrice: 116.35,
        changePercent: 5.2
      },
      {
        ticker: 'ADBE',
        name: 'Adobe Inc.',
        currentPrice: 580.20,
        changePercent: 4.8
      },
      {
        ticker: 'AMD',
        name: 'Advanced Micro Devices, Inc.',
        currentPrice: 160.15,
        changePercent: 3.7
      },
      {
        ticker: 'CRM',
        name: 'Salesforce, Inc.',
        currentPrice: 280.50,
        changePercent: 3.2
      },
      {
        ticker: 'PYPL',
        name: 'PayPal Holdings, Inc.',
        currentPrice: 65.40,
        changePercent: 2.9
      },
    ],
    losers: [
      {
        ticker: 'META',
        name: 'Meta Platforms, Inc.',
        currentPrice: 500.12,
        changePercent: -3.5
      },
      {
        ticker: 'NFLX',
        name: 'Netflix, Inc.',
        currentPrice: 610.35,
        changePercent: -2.8
      },
      {
        ticker: 'IBM',
        name: 'International Business Machines Corporation',
        currentPrice: 170.75,
        changePercent: -2.3
      },
      {
        ticker: 'INTC',
        name: 'Intel Corporation',
        currentPrice: 35.25,
        changePercent: -2.1
      },
      {
        ticker: 'GS',
        name: 'The Goldman Sachs Group, Inc.',
        currentPrice: 410.30,
        changePercent: -1.8
      },
    ]
  };
};
