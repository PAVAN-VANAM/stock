
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/services/stockService';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const Transactions = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transaction History</h1>
      
      {isLoading ? (
        <Skeleton className="h-[500px] w-full" />
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map((transaction) => {
                  const total = transaction.price * transaction.shares;
                  
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>{format(new Date(transaction.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'buy' ? 'default' : 'destructive'}>
                          {transaction.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.ticker}</TableCell>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell className="text-right">{transaction.shares}</TableCell>
                      <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${total.toFixed(2)}</TableCell>
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

export default Transactions;
