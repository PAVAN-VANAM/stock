
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';

interface ChartData {
  date: string;
  price: number;
}

interface StockChartProps {
  data: ChartData[];
  color?: string;
}

const timeRanges = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
  { label: 'ALL', days: 0 }, // 0 means all available data
];

export const StockChart = ({ data, color = "#0ea5e9" }: StockChartProps) => {
  const [selectedRange, setSelectedRange] = useState(2); // Default to 1M
  
  // Filter data based on selected time range
  const filteredData = () => {
    if (timeRanges[selectedRange].days === 0) return data;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - timeRanges[selectedRange].days);
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  };
  
  const displayData = filteredData();
  
  // Calculate min and max values for Y axis domain
  const prices = displayData.map(item => item.price);
  const minValue = Math.min(...prices) * 0.995; // Add 0.5% padding
  const maxValue = Math.max(...prices) * 1.005; // Add 0.5% padding
  
  // Check if the stock trend is positive or negative
  const isPositive = displayData.length > 1 && 
    displayData[displayData.length - 1].price >= displayData[0].price;
  
  const chartColor = isPositive ? "#10b981" : "#ef4444";
  
  return (
    <div className="w-full">
      <div className="flex space-x-2 mb-4">
        {timeRanges.map((range, index) => (
          <Button
            key={range.label}
            variant={selectedRange === index ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRange(index)}
          >
            {range.label}
          </Button>
        ))}
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#f0f0f0' }}
              tickFormatter={(value) => {
                // Format based on selected range
                const date = new Date(value);
                if (timeRanges[selectedRange].days <= 7) {
                  return date.toLocaleDateString(undefined, { weekday: 'short' });
                } else if (timeRanges[selectedRange].days <= 90) {
                  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
                } else {
                  return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
                }
              }}
            />
            <YAxis 
              domain={[minValue, maxValue]} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString(undefined, {
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                });
              }}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={chartColor} 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
