
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownRight, ExternalLink, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getWatchlist } from '@/services/stockService';
import { Skeleton } from '@/components/ui/skeleton';

const Watchlist = () => {
  const { data: watchlist, isLoading } = useQuery({
    queryKey: ['watchlist'],
    queryFn: getWatchlist,
  });

  const removeFromWatchlist = (ticker: string) => {
    // This would be implemented with a real API
    console.log(`Remove ${ticker} from watchlist`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      
      {isLoading ? (
        <Skeleton className="h-[500px] w-full" />
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Watching</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Change %</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchlist?.map((stock) => {
                  const priceChange = stock.currentPrice - stock.previousClose;
                  const changePercent = (priceChange / stock.previousClose) * 100;
                  const isPositive = priceChange >= 0;
                  
                  return (
                    <TableRow key={stock.ticker}>
                      <TableCell className="font-medium">{stock.ticker}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`${isPositive ? 'text-profit' : 'text-loss'}`}>
                          {isPositive ? '+' : ''}{priceChange.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          {isPositive ? (
                            <ArrowUpRight className="h-4 w-4 text-profit mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-loss mr-1" />
                          )}
                          <span className={`${isPositive ? 'text-profit' : 'text-loss'}`}>
                            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeFromWatchlist(stock.ticker)}
                            className="text-yellow-500"
                          >
                            <Star className="h-4 w-4 fill-current" />
                          </Button>
                          <Link to={`/stocks/${stock.ticker}`}>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Watchlist;
