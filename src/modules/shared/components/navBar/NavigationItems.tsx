import { Link } from 'react-router';
import { NavItem } from './types';

type NavigationItemsProps = {
  items: NavItem[];
  isUserLoggedIn: boolean;
};

export const NavigationItems = ({ items, isUserLoggedIn }: NavigationItemsProps) => (
  <div className={isUserLoggedIn ? "hidden lg:flex lg:items-center lg:gap-6" : "hidden lg:block"}>
    {isUserLoggedIn ? (
      items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:scale-105 hover:text-gray-900"
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </Link>
      ))
    ) : (
      <div className="ml-10 flex items-center space-x-8">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-md px-3 py-2 font-medium text-gray-700 transition-all duration-200 hover:scale-105 hover:text-gray-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default NavigationItems; 