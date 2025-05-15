import { SearchIcon } from '@/modules/shared/icons';
import { ChangeEvent } from 'react';

interface UserSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onTypeChange: (type: string) => void;
  selectedType: string;
  className?: string;
}

const USER_TYPES = [
  { value: '', label: 'All' },
  { value: 'student', label: 'Student' },
  { value: 'company', label: 'Company' },
];

export const UserSearchInput = ({
  value,
  onChange,
  onTypeChange,
  selectedType,
  className = '',
}: UserSearchInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded-md bg-gray-100 px-3 py-2 pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
          value={value}
          onChange={handleInputChange}
        />
        <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-500" />
      </div>
      <select
        value={selectedType}
        onChange={handleTypeChange}
        className="w-full rounded-md bg-gray-100 px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
      >
        {USER_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}; 