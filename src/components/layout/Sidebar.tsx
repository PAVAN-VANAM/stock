
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  LineChart, 
  PieChart, 
  Star, 
  History, 
  Settings,
  Search
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
  { name: 'Watchlist', icon: Star, path: '/watchlist' },
  { name: 'Transactions', icon: History, path: '/transactions' },
  { name: 'Market', icon: LineChart, path: '/market' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = () => {
  // Using window.location.pathname for the current path (consider using React Router hooks in a real app)
  const currentPath = window.location.pathname;

  return (
    <div className="w-full md:w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-center md:justify-start">
        <div className="text-white font-bold text-xl flex items-center">
          <PieChart className="h-6 w-6 mr-2 text-accent" />
          <span className="hidden md:inline">Stocktastic</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
              currentPath === item.path
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center px-4 py-2 text-sm text-sidebar-foreground">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground">
            U
          </div>
          <div className="ml-3 hidden md:block">
            <p className="font-medium">User</p>
            <p className="text-xs">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
