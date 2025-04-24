import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const typeOptions = ['Problem', 'Internship'];

const TypeSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(typeOptions[0]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left focus:border-[#92E3A9] focus:outline-none focus:ring-1 focus:ring-[#92E3A9]"
      >
        <div className="flex items-center justify-between">
          <span className="block truncate">{selectedType}</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {typeOptions.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                selectedType === type ? 'bg-gray-50 text-[#92E3A9]' : ''
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeSelect; 