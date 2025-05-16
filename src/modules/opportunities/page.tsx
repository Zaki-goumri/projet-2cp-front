import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  SearchIcon,
  AlertTriangleIcon,
  SearchXIcon,
  LoaderIcon,
  EyeIcon,
  ClockIcon,
  ArrowRightIcon,
  BookmarkIcon
} from '@/modules/shared/icons';
import { useOpportunitySearch } from './hooks/useOpportunitySearch';
import { useOpportunities } from './hooks/useOpportunities';
import {
  Opportunity,
  OpportunityCardProps,
  EmptyStateProps,
  ErrorStateProps,
  Company
} from './types/opportunity.types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { opportunityService } from "./services/opportunity.service";
import { toast } from 'react-toastify';
import { useDebounce } from '@/modules/shared/hooks/useDebounce';

// UI Components
const EmptyState = ({ filterType, searchQuery }: EmptyStateProps) => {
  const typeText = {
    internships: 'internships',
    problems: 'problems',
    both: 'opportunities',
  };
  const message = searchQuery
    ? `No ${typeText[filterType]} match your search.`
    : `No ${typeText[filterType]} available at the moment.`;

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-gray-50 p-12 text-center">
      <SearchXIcon className="mb-4 h-12 w-12 text-gray-400" />
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{message}</h3>
      <p className="max-w-sm text-sm text-gray-500">
        {searchQuery
          ? 'Try adjusting your search or filter terms.'
          : 'Check back later or adjust the filters.'}
      </p>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex h-64 items-center justify-center rounded-lg">
    <LoaderIcon className="h-8 w-8 animate-spin text-blue-600" />
    <span className="ml-3 text-lg font-medium text-gray-600">Loading...</span>
  </div>
);

const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-300 bg-red-50 p-12 text-center text-red-700">
    <div className="mb-4 rounded-full bg-red-100 p-3">
      <AlertTriangleIcon className="h-8 w-8" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">Oops! Something went wrong</h3>
    <p className="max-w-sm text-sm">
      We encountered an error while fetching the data. Please try refreshing the
      page.
    </p>
    <Button
      variant="outline"
      className="mt-4 !bg-red-500 !text-white hover:bg-red-600"
      onClick={() => window.location.reload()}
    >
      Refresh Page
    </Button>
  </div>
);

// Utility functions
const calculateDaysLeft = (endDate?: string | null): number | null => {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = end.getTime() - now.getTime();
  if (diffTime < 0) return 0;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/opportunities/${opportunity.id}`);
  };

  const handleSaveClick = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    try {
      await opportunityService.savePost(id);
      toast.success("Opportunity saved successfully");
    } catch (error) {
      console.error("Error saving opportunity:", error);
      toast.error("Failed to save opportunity");
    }
  };

  const daysLeft = calculateDaysLeft(opportunity.endday);
  const descriptionSnippet = opportunity.description.substring(0, 70);
  const showLearnMore = opportunity.description.length > 70;

  return (
    <li
      className="group mx-auto my-2 flex h-full w-full max-w-md cursor-pointer flex-col overflow-hidden rounded-3xl border-transparent bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 sm:mx-0"
      onClick={handleCardClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="relative h-28 flex-shrink-0 bg-green-200 p-5 pb-12">
        <button
          className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-100"
          onClick={(e) => handleSaveClick(e, Number(opportunity.id))}
          aria-label="Save opportunity"
        >
          <BookmarkIcon className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="relative -mt-10 flex flex-1 flex-col rounded-t-3xl bg-white px-5 pt-12 pb-6">
        <div className="absolute -top-8 right-5 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-white p-2 shadow-md sm:h-20 sm:w-20">
          <img
            src={opportunity.company.profilepic || ''}
            alt={`${opportunity.company.name} Logo`}
            className="h-full w-full object-contain p-1"
          />
        </div>
        <div className="mt-2 flex flex-1 flex-col justify-between space-y-4">
          <div className="space-y-2 pr-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {opportunity.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {descriptionSnippet}
              {showLearnMore && (
                <>
                  ...{' '}
                  <span className="cursor-pointer font-medium text-green-600 hover:underline">
                    learn more
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2 text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {opportunity.views !== undefined && (
              <div className="flex items-center gap-1.5">
                <EyeIcon className="h-4 w-4" />
                <span>{opportunity.views ?? 0} views</span>
              </div>
            )}
            {daysLeft !== null && (
              <div className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" />
                <span>{daysLeft} Days left</span>
              </div>
            )}
          </div>
          <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-gray-600" />
        </div>
      </div>
    </li>
  );
};

// Companies list component
const CompanyList = ({ companies }: { companies: Company[] }) => (
  <div className="mt-8 border-t pt-6">
    <h2 className="mb-4 text-xl font-semibold text-gray-800">Companies Found</h2>
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {companies.map((company) => (
        <li key={`search-comp-${company.id}`} className="rounded-lg border bg-gray-50 p-4 transition-colors hover:bg-gray-100">
          <p className="font-medium">{company.name}</p>
          <p className="text-sm text-gray-600">{company.location || 'Location N/A'}</p>
        </li>
      ))}
    </ul>
  </div>
);

const OpportunitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    opportunities: defaultOpportunities,
    isLoading: isDefaultLoading,
    error: defaultError,
    isEmpty: isDefaultEmpty,
    filterType,
    setFilterType,
  } = useOpportunities(searchQuery);

  const {
    searchResults,
    isSearchLoading,
    searchError,
  } = useOpportunitySearch(debouncedSearchQuery);

  const isSearching = debouncedSearchQuery.trim().length > 0;
  const isLoading = isSearching ? isSearchLoading : isDefaultLoading;
  const error = isSearching ? searchError : defaultError;

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

    if (isSearching) {
      const opportunities = searchResults?.opportunity || [];
      const companies = searchResults?.company || [];
      const hasResults = opportunities.length > 0 || companies.length > 0;

      if (!hasResults) {
        return <EmptyState filterType={filterType} searchQuery={debouncedSearchQuery} />;
      }

      return (
        <div className="space-y-6">
          {opportunities.length > 0 && (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {opportunities.map((opportunity: Opportunity) => (
                <OpportunityCard key={`search-opp-${opportunity.id}`} opportunity={opportunity} />
              ))}
            </ul>
          )}
          
          {companies.length > 0 && <CompanyList companies={companies} />}
        </div>
      );
    } else {
      if (isDefaultEmpty)
        return <EmptyState filterType={filterType} searchQuery={searchQuery} />;
      
      return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {defaultOpportunities.map((opportunity: Opportunity) => (
            <OpportunityCard key={`default-opp-${opportunity.id}`} opportunity={opportunity} />
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Explore Opportunities
      </h1>

      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="relative w-full max-w-lg sm:w-auto sm:flex-grow">
          <Input
            type="text"
            placeholder="Search by title, company, skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default OpportunitiesPage;
