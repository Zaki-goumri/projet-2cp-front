import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TypeSelect = ({ value, onChange }: TypeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const types = [
    { id: 'internship', label: 'internship' },
    { id: 'Problem', label: 'Problem' },
  ];
  const selectedType = types.find((type) => type.id === value) || types[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50"
      >
        <span>{selectedType.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {types.map((type) => (
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

export default TypeSelect; 