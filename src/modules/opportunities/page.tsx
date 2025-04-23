import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Search,
  AlertTriangle,
  SearchX,
  Loader2,
  Eye,
  Timer,
  ArrowRight,
} from 'lucide-react';
import { useOpportunities } from './hooks/useOpportunities';
import {
  Opportunity,
  OpportunityFilterType,
  OpportunityCardProps,
  EmptyStateProps,
  ErrorStateProps,
} from './types/opportunity.types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

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
      <SearchX className="mb-4 h-12 w-12 text-gray-400" />
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
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    <span className="ml-3 text-lg font-medium text-gray-600">Loading...</span>
  </div>
);

const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-300 bg-red-50 p-12 text-center text-red-700">
    <div className="mb-4 rounded-full bg-red-100 p-3">
      <AlertTriangle className="h-8 w-8" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">Oops! Something went wrong</h3>
    <p className="max-w-sm text-sm">
      We encountered an error while fetching the data. Please try refreshing the
      page.
    </p>
    {error?.message && <p className="mt-2 text-xs">Error: {error.message}</p>}
    <Button
      variant="outline"
      className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
      onClick={() => window.location.reload()}
    >
      Refresh Page
    </Button>
  </div>
);

const calculateDaysLeft = (endDate?: string | null): number | null => {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = end.getTime() - now.getTime();
  if (diffTime < 0) return 0; // Return 0 if the date is today or in the past
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/opportunities/${opportunity.id}`);
  };

  const daysLeft = calculateDaysLeft(opportunity.endday);

  const descriptionSnippet = opportunity.description.substring(0, 70); // Example length
  const showLearnMore = opportunity.description.length > 70;

  const logoUrl =
    opportunity.company?.logoUrl ||
    `https://via.placeholder.com/80?text=${opportunity.company.name.charAt(0)}`;

  return (
    <li
      className="group mx-auto my-2 flex h-full w-full max-w-md cursor-pointer flex-col overflow-hidden rounded-3xl border-transparent bg-white shadow-lg duration-300 ease-in-out hover:scale-105 sm:mx-0" // Adjusted hover effect and margin
      onClick={handleCardClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Top Banner Section - Using a green shade */}
      <div className="relative h-28 flex-shrink-0 bg-green-200 p-5 pb-12"></div>

      <div className="relative -mt-10 flex flex-1 flex-col rounded-t-3xl bg-white px-5 pt-12 pb-6">
        <div className="absolute -top-8 right-5 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-white p-2 shadow-md sm:h-20 sm:w-20">
          <img
            src={opportunity.company.profilepic || logoUrl}
            alt={`${opportunity.company.name} Logo`}
            className="h-full w-full object-contain p-1" // Added padding within logo container
          />
        </div>
        {/* Text Content Section */}
        <div className="flex flex-1 flex-col justify-between space-y-4">
          {/* Title and Description */}
          <div className="mt-2 flex items-start justify-between gap-4">
            {' '}
            {/* Adjusted margin-top */}
            <div className="space-y-2 pr-4">
              {' '}
              {/* Added padding-right to prevent text overlap */}
              <h3 className="text-lg font-semibold text-gray-900">
                {' '}
                {/* Adjusted font weight/color */}
                {opportunity.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {' '}
                {/* Adjusted color */}
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
            {/* Moved ArrowRight to the bottom for layout consistency with image */}
          </div>

          {/* Views, Days Left & Arrow */}
          <div className="flex items-center justify-between gap-4 pt-2 text-sm text-gray-500">
            {' '}
            {/* Adjusted color and layout */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {' '}
              {/* Wrap metadata items */}
              {opportunity.views !== undefined && ( // Check remains useful if property *can* exist but be undefined
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {/* Use optional chaining ?.views just in case type is inaccurate, or default to 0 */}
                  <span>{opportunity.views ?? 0} views</span>
                </div>
              )}
              {daysLeft !== null && ( // Check if daysLeft was calculated
                <div className="flex items-center gap-1.5">
                  <Timer className="h-4 w-4" /> {/* Using Timer icon */}
                  <span>{daysLeft} Days left</span>
                </div>
              )}
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-600" />{' '}
            {/* Arrow on the right */}
          </div>
        </div>
      </div>
    </li>
  );
};

const OpportunitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    opportunities,
    isLoading,
    error,
    isEmpty,
    filterType,
    setFilterType,
  } = useOpportunities(searchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value: OpportunityFilterType) => {
    setFilterType(value);
  };

  const renderContent = () => {
    if (isLoading && opportunities.length === 0) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (isEmpty)
      return <EmptyState filterType={filterType} searchQuery={searchQuery} />;

    return (
      <ul className="3xl:grid-cols-4 3xl:grid-cols-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        {' '}
        {/* Adjusted gap */}
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full rounded-3xl" /> // Adjusted skeleton to match card shape/size
          ))}
        {!isLoading &&
          opportunities.map((opportunity: Opportunity) => {
            return (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            );
          })}
      </ul>
    );
  };

  const filterOptions: { label: string; value: OpportunityFilterType }[] = [
    { label: 'All Types', value: 'both' },
    { label: 'Internships Only', value: 'internships' },
    { label: 'Problems Only', value: 'problems' },
  ];

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
            onChange={handleSearch}
            className="w-full rounded-full border-gray-300 py-2 pr-4 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            aria-label="Search opportunities"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        <div className="w-full max-w-xs sm:w-auto sm:shrink-0">
          <Select value={filterType} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default OpportunitiesPage;

