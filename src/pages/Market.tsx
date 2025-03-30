
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketOverview } from '@/components/stocks/MarketOverview';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getMarketMovers } from '@/services/stockService';
import { Skeleton } from '@/components/ui/skeleton';

const Market = () => {
  const { data: marketMovers, isLoading } = useQuery({
    queryKey: ['market-movers'],
    queryFn: getMarketMovers,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Market</h1>
      
      <MarketOverview />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change %</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketMovers?.gainers.map((stock) => (
                    <TableRow key={stock.ticker}>
                      <TableCell className="font-medium">{stock.ticker}</TableCell>
                      <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <ArrowUpRight className="h-4 w-4 text-profit mr-1" />
                          <span className="text-profit">
                            +{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/stocks/${stock.ticker}`}>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* Top Losers */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change %</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketMovers?.losers.map((stock) => (
                    <TableRow key={stock.ticker}>
                      <TableCell className="font-medium">{stock.ticker}</TableCell>
                      <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <ArrowDownRight className="h-4 w-4 text-loss mr-1" />
                          <span className="text-loss">
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/stocks/${stock.ticker}`}>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Market;
