
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ScrollArea } from '@/components/ui/scroll-area';

export const AppLayout = () => {
  // In a real app, you would check if the user is authenticated here
  // For now, we'll just allow access
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <ScrollArea className="flex-1 p-4 md:p-6">
          <main className="max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};
