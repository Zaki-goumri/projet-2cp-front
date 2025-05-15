import { useState } from 'react';
import { ChevronDownIcon } from '@/modules/shared/icons';

const statuses = [
  { id: 'open', label: 'Open' },
  { id: 'closed', label: 'Closed' },
];

const StatusSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              selectedStatus.id === 'open'
                ? 'bg-[#92E3A9]'
                : selectedStatus.id === 'closed'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
          />
          {selectedStatus.label}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => {
                setSelectedStatus(status);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                selectedStatus.id === status.id ? 'text-[#92E3A9]' : ''
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  status.id === 'open'
                    ? 'bg-[#92E3A9]'
                    : status.id === 'closed'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                }`}
              />
              {status.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusSelect; 