
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StockCardProps {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  className?: string;
}

export const StockCard = ({ 
  ticker, 
  name, 
  price, 
  change, 
  changePercent, 
  className 
}: StockCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Link to={`/stocks/${ticker}`}>
      <Card className={cn("h-full transition-all hover:shadow-md", className)}>
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{ticker}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{name}</p>
            </div>
            <div className={cn(
              "flex items-center px-2 py-1 rounded-full text-xs font-medium",
              isPositive ? "bg-finGreen-100 text-finGreen-800" : "bg-red-100 text-red-800"
            )}>
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {changePercent.toFixed(2)}%
            </div>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <span className="text-2xl font-bold">${price.toFixed(2)}</span>
            <span className={cn(
              "text-sm font-medium",
              isPositive ? "text-profit" : "text-loss"
            )}>
              {isPositive ? "+" : ""}{change.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
