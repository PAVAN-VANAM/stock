
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioSummary } from '@/components/stocks/PortfolioSummary';
import { PortfolioTable } from '@/components/stocks/PortfolioTable';
import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from '@/services/stockService';
import { Skeleton } from '@/components/ui/skeleton';

const Portfolio = () => {
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <>
          <PortfolioSummary portfolio={portfolio || []} />
          <PortfolioTable portfolio={portfolio || []} />
        </>
      )}
    </div>
  );
};

export default Portfolio;
