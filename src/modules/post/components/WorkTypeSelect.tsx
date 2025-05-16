import { useState } from 'react';
import { ChevronDownIcon } from '@/modules/shared/icons';

interface WorkTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const WorkTypeSelect = ({ value, onChange }: WorkTypeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const workTypes = [
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'on-site', label: 'On Site' },
  ];

  const selectedType = workTypes.find((type) => type.id === value) || workTypes[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50"
      >
        <span>{selectedType.label}</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {workTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => {
                onChange(type.id);
                setIsOpen(false);
              }}
              className={`flex w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                value === type.id ? 'text-[#92E3A9]' : ''
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkTypeSelect; 