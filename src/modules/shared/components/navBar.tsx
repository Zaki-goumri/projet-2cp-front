import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  X,
  LayoutDashboard,
  User,
  Users,
  Briefcase,
  Clock,
  CheckCircle2,
  Menu,
  MessageCircle,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Bell } from '@/modules/shared/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '../store/userStore';
import { useNotifications } from '@/modules/notifications/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from '@/modules/notifications/types/notification';
import { clearAuthTokens } from '@/api/axios.config';
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const { data: notificationsData, markAllAsRead } = useNotifications();
  const notifications = notificationsData?.notifications || [];
  const unreadCount = notifications?.filter((n) => !n.read).length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const publicNavItems: NavItem[] = [
    { to: '/home', label: 'Home' },
    { to: '/qa', label: 'Q&A' },
    { to: '/contact', label: 'Contact us' },
  ];

  const privateNavItems: NavItem[] =
    user && user?.type?.toLowerCase() === 'student'
      ? [
          { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/opportunities', label: 'opportunities', icon: Briefcase },
          { to: '/teams', label: 'Teams', icon: Users },
          { to: '/chat', label: 'Chat', icon: MessageCircle },
        ]
      : [
          { to: '/company/test', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/chat', label: 'Chat', icon: MessageCircle },
        ];

  const handleSignOut = () => {
    clearAuthTokens();
    logout();
    window.location.href = '/auth/signin';
  };

  return (
    <nav className="sticky top-0 right-0 left-0 z-50 border-b border-gray-200/50 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to={user ? '/home' : '/'}
              className="flex items-center text-xl font-bold"
            >
              <img
                src="/assets/logo.svg"
                alt="logo"
                className="h-7 w-auto"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {user?.type ? (
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {privateNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:scale-105 hover:text-gray-900"
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  )}
                  {item.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-8">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="relative rounded-md px-3 py-2 font-medium text-gray-700 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:scale-105 hover:text-gray-900 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Notification Bell */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <div className="relative">
                          <Bell className="h-10 w-10 cursor-pointer rounded-full p-2 transition-all duration-200 hover:scale-110 hover:bg-gray-100" />
                          {unreadCount > 0 && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500"
                            />
                          )}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="!sm:max-w-sm !w-80 !max-w-[calc(100vw-2rem)] !border-gray-100 !bg-white/95 !p-2 !shadow-lg !backdrop-blur-md"
                      >
                        <DropdownMenuLabel className="!px-2 !text-lg !font-semibold !text-black">
                          Notifications
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="!bg-gray-200" />
                        <div className="!max-h-[300px] !overflow-auto">
                          {notifications.length > 0 ? (
                            notifications
                              .slice(0, 5)
                              .map((notification: Notification) => (
                                <DropdownMenuItem
                                  key={notification.id}
                                  className="!flex !cursor-pointer !flex-col !items-start !gap-1 !rounded-lg !p-3 transition-colors duration-200 hover:!bg-gray-100/80"
                                >
                                  <div className="!flex !w-full !items-start !justify-between">
                                    <span className="!flex !items-center !gap-2 !font-medium !text-black">
                                      {!notification.read && (
                                        <motion.span
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="!h-2 !w-2 !rounded-full !bg-blue-500"
                                        />
                                      )}
                                      {notification.title}
                                    </span>
                                    <span className="!flex !items-center !gap-1 !text-xs !text-gray-500">
                                      <Clock className="!h-3 !w-3" />
                                      {formatDistanceToNow(
                                        new Date(notification.created_at),
                                        { addSuffix: true }
                                      )}
                                    </span>
                                  </div>
                                  <p className="!text-sm !text-black">
                                    {notification.message}
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
                        <Link to="/notifications" className="block w-full">
                          <DropdownMenuItem className="!flex !items-center !justify-center !gap-2 !rounded-lg p-2 !text-blue-600 transition-colors duration-200 hover:!bg-blue-50 hover:!text-blue-700">
                            View all notifications
                          </DropdownMenuItem>
                        </Link>
                        {unreadCount > 0 && (
                          <DropdownMenuItem
                            className="!flex !items-center !justify-center !gap-2 !rounded-lg p-2 !text-blue-600 transition-colors duration-200 hover:!bg-blue-50 hover:!text-blue-700"
                            onClick={() => markAllAsRead()}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Mark all as read
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="mb-2 focus:outline-none">
                    <Avatar className="cursor-pointer rounded-full transition-all duration-200 hover:scale-110 hover:bg-gray-100">
                      <AvatarImage
                        src={user.profilepic?.link || ''}
                        className="!bg-white"
                        placeholder="blur"
                        blurDataURL=""
                        priority
                      />
                      <AvatarFallback className="!bg-neutral-200">
                        {(user.name?.trim().split(' ')[1]?.[2] || '') +
                          (user.name?.trim().split(' ')[2]?.[1] || '')}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="!w-56 !max-w-[calc(100vw-2rem)] !border-gray-100 !bg-white/95 !p-2 !shadow-lg !backdrop-blur-md"
                  >
                    <DropdownMenuLabel className="!px-2 !text-lg !font-semibold !text-black">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="!bg-gray-200" />
                    {[
                      {
                        to: `/profile/${user.name}`,
                        icon: <User className="h-4 w-4" />,
                        label: 'Profile',
                        isExternal: false,
                        type: ['student', 'company'],
                      },
                      {
                        to: '/search',
                        icon: <Bookmark className="h-4 w-4" />,
                        label: 'Applied & saved ',
                        isExternal: false,
                        type: ['student'],
                      },
                    ]
                      .filter((element) =>
                        element.type.includes(user?.type?.toLowerCase())
                      )
                      .map((item, index) =>
                        item.isExternal ? (
                          <a
                            href={item.to}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <DropdownMenuItem className="!flex !cursor-pointer !items-center !gap-2 !rounded-lg !p-3 !text-black transition-colors duration-200 hover:!bg-gray-100/80">
                              {item.icon}
                              {item.label}
                            </DropdownMenuItem>
                          </a>
                        ) : (
                          <Link to={item.to} key={index}>
                            <DropdownMenuItem className="!flex !cursor-pointer !items-center !gap-2 !rounded-lg !p-3 !text-black transition-colors duration-200 hover:!bg-gray-100/80">
                              {item.icon}
                              {item.label}
                            </DropdownMenuItem>
                          </Link>
                        )
                      )}
                    <DropdownMenuSeparator className="!bg-gray-200" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="!flex !items-center !justify-center !gap-2 !rounded-lg !p-3 !text-red-600 transition-colors duration-200 hover:!bg-red-50 hover:!text-red-700"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              // Unauthenticated Right Section
              <div className="hidden items-center space-x-4 lg:flex">
                <Link
                  to="/auth/signin"
                  className="text-primary hover:text-primary/80 rounded-md px-3 py-2 text-base font-medium transition-all duration-200 hover:scale-105"
                >
                  Sign in
                </Link>
                <Button asChild className="rounded-full">
                  <Link to="/auth/signup">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setIsOpen(true)}
                size="icon"
                className="rounded-full !bg-transparent !shadow-none hover:!bg-gray-200"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 lg:hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg"
                  >
                    <div className="p-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
                        aria-label="Close menu"
                      >
                        <X className="h-6 w-6" />
                      </button>
                      <div className="mt-8 space-y-3">
                        {user ? (
                          <>
                            {privateNavItems.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.icon && <item.icon className="h-5 w-5" />}
                                {item.label}
                              </Link>
                            ))}
                            <div className="my-2 h-px bg-gray-200" />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                                handleSignOut();
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Sign out
                            </button>
                          </>
                        ) : (
                          <>
                            {publicNavItems.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                            <Link
                              to="/auth/signin"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                              onClick={() => setIsOpen(false)}
                            >
                              Sign in
                            </Link>
                            <Link
                              to="/auth/signup"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                              onClick={() => setIsOpen(false)}
                            >
                              Sign up
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
