import React from 'react';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router';
import { NavItem } from './types';

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
  user: any;
  onLogout: () => void;
};

export const MobileMenu = ({ isOpen, setIsOpen, navItems, user, onLogout }: MobileMenuProps) => (
  <>
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <X className="block h-6 w-6" />
      ) : (
        <Menu className="block h-6 w-6" />
      )}
    </button>

    {/* Mobile menu, show/hide based on menu state */}
    {isOpen && (
      <div className="fixed inset-0 z-40 bg-white lg:hidden">
        <div className="flex justify-end p-4">
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-4 py-2 sm:px-6">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <item.icon className="mr-3 h-5 w-5 text-gray-500" />}
                {item.label}
              </Link>
            ))}
            
            {user && (
              <>
                <div className="my-2 h-px bg-gray-200"></div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center rounded-md px-3 py-3 text-base font-medium text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);

export default MobileMenu; 