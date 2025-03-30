
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { PortfolioItem } from '@/services/stockService';

interface PortfolioSummaryProps {
  portfolio: PortfolioItem[];
  isLoading?: boolean;
}

export const PortfolioSummary = ({ portfolio, isLoading = false }: PortfolioSummaryProps) => {
  // Calculate total portfolio value and stats
  const totalValue = portfolio.reduce((sum, item) => sum + (item.currentValue || 0), 0);
  const totalCost = portfolio.reduce((sum, item) => sum + item.cost, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;
  
  // Prepare data for pie chart
  const pieData = portfolio.map(item => ({
    name: item.ticker,
    value: item.currentValue || 0,
  }));
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="loading-skeleton h-16 w-full"></div>
            <div className="flex justify-center">
              <div className="loading-skeleton h-[200px] w-[200px] rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
              <div>
                <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {totalGain >= 0 ? '+' : ''}{totalGain.toFixed(2)} ({totalGainPercent.toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name }) => name}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']} 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
