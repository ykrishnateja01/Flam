
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useBookmarks } from '@/hooks/useBookmarks';
import { 
  Home, 
  Bookmark, 
  BarChart3, 
  Moon, 
  Sun, 
  Users,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const location = useLocation();

  const navItems = [
    { 
      to: '/', 
      icon: Home, 
      label: 'Dashboard',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      to: '/bookmarks', 
      icon: Bookmark, 
      label: 'Bookmarks',
      gradient: 'from-yellow-500 to-orange-500',
      badge: bookmarks.length > 0 ? bookmarks.length : null
    },
    { 
      to: '/analytics', 
      icon: BarChart3, 
      label: 'Analytics',
      gradient: 'from-green-500 to-emerald-500'
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Thrive HR
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Performance Metrics
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              
              return (
                <Link key={item.to} to={item.to} className="relative group">
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={`
                      relative h-10 px-4 font-medium transition-all duration-300
                      ${active 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl` 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }
                      group-hover:scale-105
                    `}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${active ? 'animate-pulse' : ''}`} />
                    <span className="hidden sm:inline">{item.label}</span>
                    
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-white/20 text-white text-xs font-bold animate-bounce"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                  
                  {/* Active indicator */}
                  {active && (
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full animate-pulse`} />
                  )}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 hover:text-indigo-600 transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400 hover:text-yellow-300 transition-colors animate-spin" style={{ animationDuration: '3s' }} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
