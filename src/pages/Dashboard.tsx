
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StockCard } from '@/components/stocks/StockCard';
import { MarketOverview } from '@/components/stocks/MarketOverview';
import { PortfolioSummary } from '@/components/stocks/PortfolioSummary';
import { StockChart } from '@/components/stocks/StockChart';
import { Stock, PortfolioItem, getPortfolio, getWatchlist, getStockDetails } from '@/services/stockService';

const Dashboard = () => {
  const [popularStocks, setPopularStocks] = useState<Stock[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isLoadingStocks, setIsLoadingStocks] = useState(true);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  const [isLoadingWatchlist, setIsLoadingWatchlist] = useState(true);
  const [isLoadingChart, setIsLoadingChart] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch popular stocks - replacing with mock data for now
        setIsLoadingStocks(true);
        const stocksData: Stock[] = [
          {
            ticker: 'AAPL',
            name: 'Apple Inc.',
            price: 175.25,
            change: 1.75,
            changePercent: 1.01,
            marketCap: 2800000000000,
            peRatio: 28.5,
            volume: 65000000,
            high: 176.50,
            low: 174.20,
            open: 174.50,
            previousClose: 173.50,
            fiftyTwoWeekHigh: 180.00,
            fiftyTwoWeekLow: 140.00,
            timestamp: new Date().toISOString()
          },
          {
            ticker: 'MSFT',
            name: 'Microsoft Corporation',
            price: 380.75,
            change: 2.25,
            changePercent: 0.60,
            marketCap: 2700000000000,
            peRatio: 32.4,
            volume: 25000000,
            high: 382.10,
            low: 378.30,
            open: 379.00,
            previousClose: 378.50,
            fiftyTwoWeekHigh: 385.00,
            fiftyTwoWeekLow: 330.00,
            timestamp: new Date().toISOString()
          },
          {
            ticker: 'GOOGL',
            name: 'Alphabet Inc.',
            price: 140.95,
            change: -1.05,
            changePercent: -0.74,
            marketCap: 1800000000000,
            peRatio: 25.6,
            volume: 18000000,
            high: 142.10,
            low: 140.50,
            open: 142.00,
            previousClose: 142.00,
            fiftyTwoWeekHigh: 145.00,
            fiftyTwoWeekLow: 120.00,
            timestamp: new Date().toISOString()
          },
          {
            ticker: 'AMZN',
            name: 'Amazon.com, Inc.',
            price: 177.23,
            change: 1.38,
            changePercent: 0.78,
            marketCap: 1850000000000,
            peRatio: 78.3,
            volume: 30000000,
            high: 178.50,
            low: 176.20,
            open: 176.50,
            previousClose: 175.85,
            fiftyTwoWeekHigh: 180.00,
            fiftyTwoWeekLow: 140.00,
            timestamp: new Date().toISOString()
          }
        ];
        setPopularStocks(stocksData);
        setIsLoadingStocks(false);
        
        // If stocks loaded, get details for the first one to show chart
        if (stocksData.length > 0) {
          setIsLoadingChart(true);
          const details = await getStockDetails(stocksData[0].ticker);
          setSelectedStock(details);
          setIsLoadingChart(false);
        }
        
        // Fetch portfolio
        setIsLoadingPortfolio(true);
        const portfolioData = await getPortfolio();
        setPortfolio(portfolioData);
        setIsLoadingPortfolio(false);
        
        // Fetch watchlist
        setIsLoadingWatchlist(true);
        // Mock watchlist data using our Stock type
        const watchlistData: Stock[] = [
          {
            ticker: 'NVDA',
            name: 'NVIDIA Corporation',
            price: 116.35,
            change: 3.50,
            changePercent: 3.10,
            marketCap: 2900000000000,
            peRatio: 60.5,
            volume: 45000000,
            high: 117.50,
            low: 115.20,
            open: 115.50,
            previousClose: 112.85,
            fiftyTwoWeekHigh: 120.00,
            fiftyTwoWeekLow: 90.00,
            timestamp: new Date().toISOString()
          },
          {
            ticker: 'META',
            name: 'Meta Platforms, Inc.',
            price: 500.12,
            change: -5.33,
            changePercent: -1.05,
            marketCap: 1280000000000,
            peRatio: 29.3,
            volume: 22000000,
            high: 506.00,
            low: 498.00,
            open: 505.45,
            previousClose: 505.45,
            fiftyTwoWeekHigh: 510.00,
            fiftyTwoWeekLow: 350.00,
            timestamp: new Date().toISOString()
          },
          {
            ticker: 'NFLX',
            name: 'Netflix, Inc.',
            price: 610.35,
            change: 10.10,
            changePercent: 1.68,
            marketCap: 270000000000,
            peRatio: 41.8,
            volume: 8000000,
            high: 612.00,
            low: 600.25,
            open: 600.25,
            previousClose: 600.25,
            fiftyTwoWeekHigh: 615.00,
            fiftyTwoWeekLow: 450.00,
            timestamp: new Date().toISOString()
          },
          {
            ticker: 'DIS',
            name: 'The Walt Disney Company',
            price: 99.25,
            change: 0.50,
            changePercent: 0.51,
            marketCap: 180000000000,
            peRatio: 22.7,
            volume: 12000000,
            high: 100.00,
            low: 98.75,
            open: 98.75,
            previousClose: 98.75,
            fiftyTwoWeekHigh: 120.00,
            fiftyTwoWeekLow: 90.00,
            timestamp: new Date().toISOString()
          }
        ];
        setWatchlist(watchlistData);
        setIsLoadingWatchlist(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoadingStocks(false);
        setIsLoadingPortfolio(false);
        setIsLoadingWatchlist(false);
        setIsLoadingChart(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your stock portfolio management system.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
              <CardDescription>
                {selectedStock ? selectedStock.ticker : 'Loading...'} Stock Price
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingChart ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                selectedStock && selectedStock.chartData ? (
                  <StockChart data={selectedStock.chartData} />
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">No chart data available</p>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <PortfolioSummary portfolio={portfolio} isLoading={isLoadingPortfolio} />
        </div>
      </div>
      
      <MarketOverview />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Popular Stocks</h2>
        {isLoadingStocks ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-[140px]">
                <CardContent className="p-4">
                  <div className="loading-skeleton h-5 w-20 mb-2"></div>
                  <div className="loading-skeleton h-4 w-32 mb-4"></div>
                  <div className="loading-skeleton h-8 w-24 mt-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularStocks.slice(0, 4).map((stock) => (
              <StockCard
                key={stock.ticker}
                ticker={stock.ticker}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                changePercent={stock.changePercent}
              />
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
        {isLoadingWatchlist ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-[140px]">
                <CardContent className="p-4">
                  <div className="loading-skeleton h-5 w-20 mb-2"></div>
                  <div className="loading-skeleton h-4 w-32 mb-4"></div>
                  <div className="loading-skeleton h-8 w-24 mt-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchlist.map((stock) => (
              <StockCard
                key={stock.ticker}
                ticker={stock.ticker}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                changePercent={stock.changePercent}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No stocks in your watchlist yet. Add some from the search page.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
