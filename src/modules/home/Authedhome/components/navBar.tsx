'use client';

import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Bell,
  LayoutDashboard,
  User,
  Briefcase,
  Building2,
  Code,
  Users,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/internships', label: 'Internships', icon: Briefcase },
    { href: '/enterprises', label: 'Enterprises', icon: Building2 },
    { href: '/problems', label: 'Problems', icon: Code },
    { href: '/teams', label: 'Teams', icon: Users },
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      title: 'New Problem Added',
      description: 'A new coding challenge has been added to your queue.',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Team Invitation',
      description: "You've been invited to join Team Alpha.",
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Internship Update',
      description: 'Your application status has been updated.',
      time: '3 hours ago',
      unread: false,
    },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex text-xl font-bold">
              <div className="flex flex-col">
                <img src="/assets/logo.svg" alt="logo" className="h-6 w-auto" />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="relative">
                    <Bell className="h-10 w-10 cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-gray-100" />
                    {hasUnread && (
                      <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="!sm:max-w-sm !w-80 !max-w-[calc(100vw-2rem)] !border-gray-100 !bg-white !p-2"
                >
                  <DropdownMenuLabel className="!px-2 !text-lg !font-semibold !text-black">
                    Notifications
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="!bg-gray-200" />
                  <div className="!max-h-[300px] !overflow-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="!flex !cursor-pointer !flex-col !items-start !gap-1 !rounded-lg !p-3 hover:!bg-gray-100"
                        >
                          <div className="!flex !w-full !items-start !justify-between">
                            <span className="!flex !items-center !gap-2 !font-medium !text-black">
                              {notification.unread && (
                                <span className="!h-2 !w-2 !rounded-full !bg-blue-500" />
                              )}
                              {notification.title}
                            </span>
                            <span className="!flex !items-center !gap-1 !text-xs !text-gray-500">
                              <Clock className="!h-3 !w-3" />
                              {notification.time}
                            </span>
                          </div>
                          <p className="!text-sm !text-black">
                            {notification.description}
                          </p>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications at this time
                      </div>
                    )}
                  </div>
                  <DropdownMenuSeparator className="!bg-gray-200" />
                  <DropdownMenuItem className="!flex !items-center !justify-center !gap-2 !rounded-lg p-2 !text-blue-600 hover:!bg-blue-50 hover:!text-blue-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark all as read
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="cursor-pointer rounded-full transition-colors duration-200 hover:bg-gray-100">
                  <AvatarImage
                    src="https://media.licdn.com/dms/image/v2/D4D03AQHXpJebXN8V6g/profile-displayphoto-shrink_100_100/B4DZP3_UD_GUAU-/0/1735032392292?e=1745452800&v=beta&t=TYg-UNOHOVb41qEFarBT1yBdPnyj_RnwDGmesxbLcXg"
                    className="!bg-white"
                  />
                  <AvatarFallback className="!bg-neutral-200">
                    CN
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="!w-56 !max-w-[calc(100vw-2rem)] !border-gray-100 !bg-white !p-2"
              >
                <DropdownMenuLabel className="!px-2 !text-lg !font-semibold !text-black">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="!bg-gray-200" />
                <DropdownMenuItem className="!flex !cursor-pointer !items-center !gap-2 !rounded-lg !p-3 !text-black hover:!bg-gray-100">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="!flex !cursor-pointer !items-center !gap-2 !rounded-lg !p-3 !text-black hover:!bg-gray-100">
                  <Users className="h-4 w-4" />
                  Team Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="!bg-gray-200" />
                <DropdownMenuItem className="!flex !items-center !justify-center !gap-2 !rounded-lg !p-3 !text-red-600 hover:!bg-red-50 hover:!text-red-700">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-2 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-2 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="mt-8 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
