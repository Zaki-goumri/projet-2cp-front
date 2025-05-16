import React from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useHistory } from 'react-router-dom';
import { useSearch } from '@/modules/shared/hooks/useSearch';
import { OpportunityResultItem, CompanyResultItem } from '@/modules/shared/types/search.types';
import { Link } from 'react-router';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose }) => {
  const { searchTerm, setSearchTerm, results, isLoading, error } = useSearch();
  const history = useHistory();

  if (!isOpen) return null;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpportunityClick = (id: number) => {
    history.push(`/opportunities/${id}`);
    onClose();
  };

  // Determine if there are any results to show (based on API response)
  const hasOpportunities =
    results?.opportunity && results.opportunity.length > 0;
  const hasCompanies = results?.company && results.company.length > 0;
  const hasAnyResults = hasOpportunities || hasCompanies;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[10vh] backdrop-blur-sm sm:pt-[15vh]">
      <div className="relative mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:max-w-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">
            Search Opportunities & Companies
          </h2>
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by title, company, location..."
              className="w-full pl-9"
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          )}

          {error && !isLoading && (
            <div className="py-12 text-center text-red-600">
              <p>Error loading results:</p>
              <p className="mt-1 text-sm">
                {error.message || 'An unknown error occurred'}
              </p>
            </div>
          )}

          {!isLoading && !error && searchTerm && (
            <>
              {hasOpportunities && (
                <div className="space-y-3">
                  <h4 className="mb-2 text-sm font-semibold text-gray-600">
                    Opportunities
                  </h4>
                  {results.opportunity.map((item: OpportunityResultItem) => (
                    <Link to={`/opportunities/${item.id}`}>
                    <div
                      key={`opp-${item.id}`}
                      onClick={() => handleOpportunityClick(item.id)}
                      className="cursor-pointer rounded-md border border-gray-200 p-3 transition-colors hover:bg-[#E8F9EB]"
                    >
                      <h3 className="font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                        <span>{item.company?.name || 'N/A'}</span>
                        <span>•</span>
                        <span>{item.company?.location || 'N/A'}</span>
                        <span>•</span>
                        <span className="rounded-full bg-[#98E9AB]/20 px-2 py-0.5 text-xs font-medium text-gray-800">
                          {item.Type || 'N/A'}
                        </span>
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
              )}

              {hasCompanies && (
                <div className={`space-y-3 ${hasOpportunities ? 'mt-4' : ''}`}>
                  <h4 className="mb-2 text-sm font-semibold text-gray-600">
                    Companies
                  </h4>
                  {results.company.map((comp: CompanyResultItem) => (
                    <div
                      key={`comp-${comp.id}`}
                      className="cursor-pointer rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                    >
                      <h3 className="font-medium text-gray-900">{comp.name}</h3>
                      <p className="text-sm text-gray-500">
                        {comp.location || 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {!hasAnyResults && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">
                    No results found for "{searchTerm}"
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Try different keywords.
                  </p>
                </div>
              )}
            </>
          )}

          {!isLoading && !error && !searchTerm && (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                Enter a search term to find opportunities or companies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;

