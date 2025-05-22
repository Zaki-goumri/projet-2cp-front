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
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  FileIcon,
  TrendUpIcon,
  UsersIcon,
} from '@/modules/shared/icons';
import { FilterIcon, SparklesIcon, TrendingUpIcon } from 'lucide-react';
import { useOpportunitySearch } from './hooks/useOpportunitySearch';
import { useOpportunities } from './hooks/useOpportunities';
import {
  Opportunity,
  OpportunityCardProps,
  EmptyStateProps,
  ErrorStateProps,
  Company,
} from './types/opportunity.types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { opportunitiesService } from './services/opportunities.service';
import { toast } from 'react-toastify';
import { useDebounce } from '@/modules/shared/hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50/50 p-12 text-center backdrop-blur-sm"
    >
      <SearchXIcon className="mb-4 h-12 w-12 text-gray-400" />
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{message}</h3>
      <p className="max-w-sm text-sm text-gray-500">
        {searchQuery
          ? 'Try adjusting your search or filter terms.'
          : 'Check back later or adjust the filters.'}
      </p>
    </motion.div>
  );
};

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex h-64 items-center justify-center rounded-xl bg-gray-50/50 backdrop-blur-sm"
  >
    <LoaderIcon className="h-8 w-8 animate-spin text-blue-600" />
    <span className="ml-3 text-lg font-medium text-gray-600">Loading...</span>
  </motion.div>
);

const ErrorState = ({ error }: ErrorStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center rounded-xl border border-dashed border-red-300 bg-red-50/50 p-12 text-center backdrop-blur-sm"
  >
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
  </motion.div>
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
      await opportunitiesService.savePost(id);
      toast.success('Opportunity saved successfully');
    } catch (error) {
      console.error('Error saving opportunity:', error);
      toast.error('Failed to save opportunity');
    }
  };

  const daysLeft = calculateDaysLeft(opportunity.endday);
  const descriptionSnippet = opportunity.description.substring(0, 70);
  const showLearnMore = opportunity.description.length > 70;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative mx-auto my-2 flex h-full w-full max-w-md cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      onClick={handleCardClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="from-primary to-primary/80 relative h-32 flex-shrink-0 bg-gradient-to-r p-5">
        <div className="absolute inset-0 bg-black/10" />
        <button
          className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
          onClick={(e) => handleSaveClick(e, Number(opportunity.id))}
          aria-label="Save opportunity"
        >
          <BookmarkIcon className="h-4 w-4 text-gray-600" />
        </button>
        <div className="absolute right-0 bottom-0 left-0 p-4">
          <span className="text-primary inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
            {opportunity.type}
          </span>
        </div>
      </div>

      <div className="relative -mt-8 flex flex-1 flex-col rounded-t-2xl bg-white px-5 pt-8 pb-6">
        <div className="absolute -top-8 right-5 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-white p-2 shadow-md">
          <img
            src={opportunity.company.profilepic?.link}
            alt={`${opportunity.company.name} Logo`}
            className="h-full w-full rounded-lg object-contain p-1"
            onError={(e) => {
              e.target.src =
                'https://kzmgd88y1mo81i4qcrxd.lite.vusercontent.net/placeholder.svg?height=300&width=400';
            }}
          />
        </div>
        <div className="mt-2 flex flex-1 flex-col justify-between space-y-4">
          <div className="space-y-2 pr-4">
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
              {opportunity.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {descriptionSnippet}
              {showLearnMore && (
                <>
                  ...{' '}
                  <span className="text-primary cursor-pointer font-medium hover:underline">
                    learn more
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 pt-2 text-sm text-gray-500">
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
          <ArrowRightIcon className="text-primary h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.li>
  );
};

// Companies list component
const CompanyList = ({ companies }: { companies: Company[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-8 rounded-xl border bg-white p-6 shadow-sm"
  >
    <h2 className="mb-6 text-xl font-semibold text-gray-800">
      Companies Found
    </h2>
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {companies.map((company) => (
        <motion.li
          key={`search-comp-${company.id}`}
          whileHover={{ y: -5 }}
          className="group rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={company.profilepic || ''}
                alt={`${company.name} Logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">{company.name}</p>
              <p className="text-sm text-gray-600">
                {company.location || 'Location N/A'}
              </p>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const OpportunitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    opportunities: defaultOpportunities,
    isLoading: isDefaultLoading,
    error: defaultError,
    isEmpty: isDefaultEmpty,
    filterType,
    setFilterType,
  } = useOpportunities(searchQuery);

  const { searchResults, isSearchLoading, searchError } =
    useOpportunitySearch(debouncedSearchQuery);

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
        return (
          <EmptyState
            filterType={filterType}
            searchQuery={debouncedSearchQuery}
          />
        );
      }

      return (
        <div className="space-y-6">
          {opportunities.length > 0 && (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {opportunities.map((opportunity: Opportunity) => (
                <OpportunityCard
                  key={`search-opp-${opportunity.id}`}
                  opportunity={opportunity}
                />
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
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="from-primary to-primary/80 relative overflow-hidden bg-gradient-to-r py-20">
        <div className="bg-grid-white/10 absolute inset-0" />
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-4xl font-bold text-white sm:text-5xl"
            >
              Discover Opportunities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-lg text-white/90"
            >
              Find internships and problems that match your skills and career
              goals
            </motion.p>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <div className="relative flex-1">
                <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-0 bg-white/90 pr-4 pl-10 shadow-lg backdrop-blur-sm focus:bg-white"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full rounded-full !border-none !bg-white/90 !shadow-lg !backdrop-blur-sm focus:!bg-white sm:!w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="!border-none !bg-white !text-gray-900">
                  {[
                    { value: 'all', label: 'all types' },
                    { value: 'internship', label: 'internships' },
                    { value: 'problem', label: 'problems' },
                  ].map((element, key) => (
                    <SelectItem key={key} value={element.value}>
                      {element.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <BriefcaseIcon className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Opportunities
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {defaultOpportunities.length}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <Building2Icon className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Companies
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {searchResults?.company?.length || 0}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <TrendingUpIcon className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Trending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {
                    defaultOpportunities.filter((opp) => (opp.views || 0) > 100)
                      .length
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Opportunities Grid */}
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900"
          >
            Available Opportunities
          </motion.h2>
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
