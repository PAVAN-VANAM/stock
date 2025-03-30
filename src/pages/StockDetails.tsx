
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Info, 
  Building, 
  DollarSign, 
  BarChart3,
  Loader2,
  Star, 
  StarOff,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StockChart } from '@/components/stocks/StockChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import { Stock, getStockDetails } from '@/services/stockService';

const StockDetails = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const [stock, setStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchStockDetails = async () => {
      if (!ticker) return;
      
      try {
        setIsLoading(true);
        const stockData = await getStockDetails(ticker);
        setStock(stockData);
        
        // Check if the stock is in watchlist - mock data for now
        setIsInWatchlist(Math.random() > 0.5); // Random for demo purposes
      } catch (error) {
        console.error('Error fetching stock details:', error);
        toast({
          title: "Error loading stock details",
          description: "Could not load stock details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStockDetails();
  }, [ticker, toast]);
  
  const handleAddToWatchlist = async () => {
    if (!ticker) return;
    
    try {
      // Mock adding to watchlist
      setIsInWatchlist(true);
      toast({
        title: "Added to watchlist",
        description: `${ticker} has been added to your watchlist.`,
      });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "Error",
        description: "Could not add to watchlist. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleRemoveFromWatchlist = async () => {
    if (!ticker) return;
    
    try {
      // Mock removing from watchlist
      setIsInWatchlist(false);
      toast({
        title: "Removed from watchlist",
        description: `${ticker} has been removed from your watchlist.`,
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "Error",
        description: "Could not remove from watchlist. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleAddToPortfolio = () => {
    // This could open a dialog to input shares, price, etc.
    toast({
      title: "Portfolio management",
      description: "This feature would open a dialog to add this stock to your portfolio.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading stock details...</p>
        </div>
      </div>
    );
  }
  
  if (!stock) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-2">Stock Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find information for the stock "{ticker}".
        </p>
        <Button asChild>
          <a href="/search">Search for another stock</a>
        </Button>
      </div>
    );
  }
  
  const isPositive = stock.change >= 0;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mr-3">{stock.ticker}</h1>
            <span className="text-xl font-medium text-muted-foreground">{stock.name}</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold mr-3">${stock.price.toFixed(2)}</span>
            <span className={`flex items-center text-lg font-medium ${isPositive ? 'text-profit' : 'text-loss'}`}>
              {isPositive ? <ArrowUpRight className="h-5 w-5 mr-1" /> : <ArrowDownRight className="h-5 w-5 mr-1" />}
              {isPositive ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {isInWatchlist ? (
            <Button variant="outline" onClick={handleRemoveFromWatchlist}>
              <StarOff className="h-4 w-4 mr-2" />
              Remove from Watchlist
            </Button>
          ) : (
            <Button onClick={handleAddToWatchlist}>
              <Star className="h-4 w-4 mr-2" />
              Add to Watchlist
            </Button>
          )}
          <Button variant="outline" onClick={handleAddToPortfolio}>
            <Plus className="h-4 w-4 mr-2" />
            Add to Portfolio
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="chart">
            <TabsList className="mb-6">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="historical">Historical Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="mt-0">
              {stock.chartData && stock.chartData.length > 0 ? (
                <StockChart data={stock.chartData} />
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">No chart data available</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Company Information
                  </h3>
                  <p className="text-muted-foreground mb-4">{stock.description || 'No company description available.'}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Key Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">{stock.marketCap}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">{stock.volume}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">P/E Ratio</span>
                      <span className="font-medium">{stock.peRatio}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">52-week High</span>
                      <span className="font-medium">${stock.fiftyTwoWeekHigh.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">52-week Low</span>
                      <span className="font-medium">${stock.fiftyTwoWeekLow.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="historical" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left font-medium">Date</th>
                      <th className="py-3 text-right font-medium">Open</th>
                      <th className="py-3 text-right font-medium">High</th>
                      <th className="py-3 text-right font-medium">Low</th>
                      <th className="py-3 text-right font-medium">Close</th>
                      <th className="py-3 text-right font-medium">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.historicalData && stock.historicalData.length > 0 ? (
                      stock.historicalData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 text-left">{item.date}</td>
                          <td className="py-3 text-right">${item.open.toFixed(2)}</td>
                          <td className="py-3 text-right">${item.high.toFixed(2)}</td>
                          <td className="py-3 text-right">${item.low.toFixed(2)}</td>
                          <td className="py-3 text-right">${item.close.toFixed(2)}</td>
                          <td className="py-3 text-right">{item.volume.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-muted-foreground">
                          No historical data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockDetails;
