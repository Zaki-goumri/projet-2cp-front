import { SearchIcon } from '@/modules/shared/icons';
import { ChangeEvent } from 'react';

interface UserSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const UserSearchInput = ({
  value,
  onChange,
  className = '',
}: UserSearchInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };


  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          className="focus:ring-primary w-full rounded-md bg-gray-100 px-3 py-2 pl-10 focus:ring-2 focus:outline-none"
          value={value}
          onChange={handleInputChange}
        />
        <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-500" />
      </div>
    </div>
  );
};

