import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Home, Map, School, User, MessageSquare, TrendingUp, BookOpen } from 'lucide-react';
import type { Page, User as UserType } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: UserType;
}

export function Navigation({ currentPage, onNavigate, user }: NavigationProps) {
  const navItems = [
    { 
      id: 'dashboard' as Page, 
      label: 'Dashboard', 
      icon: Home
    },
    { 
      id: 'career-path' as Page, 
      label: 'Career Paths', 
      icon: Map
    },
    { 
      id: 'college-directory' as Page, 
      label: 'Colleges', 
      icon: School
    },
    { 
      id: 'resource-hub' as Page, 
      label: 'Resources', 
      icon: BookOpen
    },
    { 
      id: 'expert-forum' as Page, 
      label: 'Expert Forum', 
      icon: MessageSquare
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#0891b2] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a202c]">
                CareerGuide
              </h1>
              <p className="text-xs text-[#718096] -mt-1">Growth Canvas</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#0891b2] text-white shadow-md' 
                      : 'text-[#718096] hover:bg-gray-100 hover:text-[#1a202c]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <Avatar className="h-9 w-9 border-2 border-[#0891b2]">
                <AvatarFallback className="bg-[#0891b2] text-white font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="font-medium text-[#1a202c]">{user.name}</p>
                <p className="text-xs text-[#718096]">{user.class}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-lg rounded-lg">
            <DropdownMenuItem 
              onClick={() => onNavigate('user-profile')}
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 transition-all duration-200"
            >
              <User className="h-4 w-4" />
              <span className="font-medium">My Profile</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4">
        <div className="flex justify-between space-x-1 bg-gray-100 p-2 rounded-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onNavigate(item.id)}
                size="sm"
                className={`flex-1 flex flex-col items-center space-y-1 py-3 rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#0891b2] text-white' 
                    : 'text-[#718096] hover:bg-white hover:text-[#1a202c]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}