
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StockCard } from '@/components/stocks/StockCard';
import { Stock } from '@/services/stockService';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [popularStocks, setPopularStocks] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPopularStocks = async () => {
      try {
        setIsLoading(true);
        // Mock data for popular stocks
        const data: Stock[] = [
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
          },
          {
            ticker: 'TSLA',
            name: 'Tesla, Inc.',
            price: 215.65,
            change: -4.85,
            changePercent: -2.20,
            marketCap: 680000000000,
            peRatio: 54.7,
            volume: 25000000,
            high: 220.50,
            low: 215.00,
            open: 220.50,
            previousClose: 220.50,
            fiftyTwoWeekHigh: 300.00,
            fiftyTwoWeekLow: 180.00,
            timestamp: new Date().toISOString()
          },
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
          }
        ];
        setPopularStocks(data);
      } catch (error) {
        console.error('Error fetching popular stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPopularStocks();
  }, []);
  
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      setIsSearching(true);
      // Mock search results
      const results = popularStocks.filter(stock => 
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching stocks:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 300);
    
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Search Stocks</h1>
        <p className="text-muted-foreground">Search for stocks by company name or ticker symbol.</p>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stocks..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isSearching}>
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching
            </>
          ) : (
            'Search'
          )}
        </Button>
      </form>
      
      {searchQuery.trim() ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {isSearching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="loading-skeleton h-40"></div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((stock) => (
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
            <div className="p-8 text-center bg-muted rounded-lg">
              <p className="text-muted-foreground">No stocks found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Stocks</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="loading-skeleton h-40"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularStocks.map((stock) => (
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
      )}
    </div>
  );
};

export default SearchPage;
