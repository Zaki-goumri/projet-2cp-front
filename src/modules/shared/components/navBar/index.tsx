import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  Code,
  Users,
  MessageCircle,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '../../store/userStore';
import { useNotifications } from '@/modules/notifications/context/NotificationContext';
import NavigationItems from './NavigationItems';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import { NavItem } from './types';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

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

  const privateNavItems: NavItem[] = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/enterprises', label: 'Enterprises', icon: Building2 },
    { to: '/problems', label: 'Problems', icon: Code },
    { to: '/teams', label: 'Teams', icon: Users },
    { to: '/chat', label: 'Chat', icon: MessageCircle },
    { to: '/search', label: 'Search', icon: Search },
  ];

  return (
    <nav className="bg-background sticky top-0 right-0 left-0 z-50 bg-white px-4 py-2 shadow sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold">
              <img src="/assets/logo.svg" alt="logo" className="h-7 w-auto" loading="lazy" />
            </Link>
          </div>

          {/* Navigation Items */}
          <NavigationItems 
            items={user ? privateNavItems : publicNavItems} 
            isUserLoggedIn={!!user} 
          />

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <NotificationBell 
                  notifications={notifications}
                  unreadCount={unreadCount}
                  markAsRead={markAsRead}
                  markAllAsRead={markAllAsRead}
                />
                <UserMenu user={user} onLogout={logout} />
                <MobileMenu 
                  isOpen={isOpen} 
                  setIsOpen={setIsOpen} 
                  navItems={privateNavItems}
                  user={user}
                  onLogout={logout}
                />
              </>
            ) : (
              <>
                <div className="hidden lg:block">
                  <Link to="/auth/signin">
                    <Button variant="ghost" className="font-medium">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button className="ml-2 font-medium">
                      Sign up
                    </Button>
                  </Link>
                </div>
                <MobileMenu 
                  isOpen={isOpen} 
                  setIsOpen={setIsOpen} 
                  navItems={publicNavItems}
                  user={null}
                  onLogout={() => {}}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 