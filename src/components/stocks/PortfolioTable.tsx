
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PortfolioItem } from '@/services/stockService';

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
}

export const PortfolioTable = ({ portfolio }: PortfolioTableProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead className="text-right">Avg. Cost</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Market Value</TableHead>
              <TableHead className="text-right">Gain/Loss</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((stock) => {
              const gainLoss = (stock.currentPrice * stock.shares) - stock.cost;
              const gainLossPercent = (gainLoss / stock.cost) * 100;
              const isPositive = gainLoss >= 0;
              
              return (
                <TableRow key={stock.ticker}>
                  <TableCell className="font-medium">{stock.ticker}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.shares}</TableCell>
                  <TableCell className="text-right">${(stock.cost / stock.shares).toFixed(2)}</TableCell>
                  <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(stock.currentPrice * stock.shares).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {isPositive ? (
                        <ArrowUpRight className="h-4 w-4 text-profit mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-loss mr-1" />
                      )}
                      <span className={`${isPositive ? 'text-profit' : 'text-loss'}`}>
                        {isPositive ? '+' : ''}{gainLoss.toFixed(2)} ({Math.abs(gainLossPercent).toFixed(2)}%)
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
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
