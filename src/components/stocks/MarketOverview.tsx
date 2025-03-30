
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const marketData = [
  { name: 'S&P 500', value: '4,362.53', change: '+0.87%', isPositive: true },
  { name: 'Dow Jones', value: '34,721.80', change: '+1.12%', isPositive: true },
  { name: 'Nasdaq', value: '14,596.38', change: '-0.23%', isPositive: false },
  { name: 'Russell 2000', value: '2,278.91', change: '+0.65%', isPositive: true },
  { name: 'Bitcoin', value: '$36,782.43', change: '-2.15%', isPositive: false },
  { name: '10-Year Treasury', value: '1.58%', change: '+0.03%', isPositive: true },
];

export const MarketOverview = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {marketData.map((item) => (
            <div key={item.name} className="space-y-1">
              <p className="text-sm text-muted-foreground">{item.name}</p>
              <p className="text-xl font-bold">{item.value}</p>
              <div className="flex items-center">
                {item.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-profit mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-loss mr-1" />
                )}
                <span className={`text-sm font-medium ${item.isPositive ? 'text-profit' : 'text-loss'}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
