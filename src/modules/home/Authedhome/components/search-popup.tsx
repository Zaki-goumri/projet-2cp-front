import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for search results
const MOCK_OPPORTUNITIES = [
  {
    id: 1,
    title: 'Frontend Developer Internship',
    company: 'TechSolutions Inc.',
    location: 'Remote',
    type: 'Internship',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems Ltd.',
    location: 'Algiers',
    type: 'Full-time',
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'CreativeLab',
    location: 'Oran',
    type: 'Part-time',
  },
  {
    id: 4,
    title: 'Mobile App Developer',
    company: 'AppWorks',
    location: 'Constantine',
    type: 'Contract',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    type: 'Full-time',
  },
];

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(MOCK_OPPORTUNITIES);

  if (!isOpen) return null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter results based on query
    if (query.trim() === '') {
      setResults(MOCK_OPPORTUNITIES);
    } else {
      const filtered = MOCK_OPPORTUNITIES.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.company.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:max-w-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Search Opportunities</h2>
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by title, company, location..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={handleSearch}
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((item) => (
                <Link to={`/opportunities/${item.id}`}>
                  <div
                    key={item.id}
                    className="cursor-pointer rounded-md border border-gray-200 p-3 transition-colors hover:bg-[#E8F9EB]"
                  >
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                      <span>{item.company}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                      <span>•</span>
                      <span className="rounded-full bg-[#98E9AB]/20 px-2 py-0.5 text-xs font-medium text-gray-800">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No results found</p>
              <p className="mt-1 text-sm text-gray-400">
                Try different keywords
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
