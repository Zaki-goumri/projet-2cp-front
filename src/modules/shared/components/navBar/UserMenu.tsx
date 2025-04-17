import React from 'react';
import { Link } from 'react-router';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserMenuProps = {
  user: any;
  onLogout: () => void;
};

export const UserMenu = ({ user, onLogout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center focus:outline-none">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.profilePicture || ""} alt={user?.fullName || "User"} />
        <AvatarFallback>
          {user?.fullName?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel className="font-semibold">
        {user?.fullName || "User"}
        <p className="text-xs font-normal text-gray-500">{user?.email}</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <Link to="/profile">
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-500 focus:text-red-500">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu; 