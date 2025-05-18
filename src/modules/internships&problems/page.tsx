import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  SearchIcon,
  AlertTriangleIcon,
  BookmarkCheckIcon,
  ClipboardCheckIcon,
  LoaderIcon,
  CalendarIcon,
  ClockIcon,
  BuildingIcon,
  MapPinIcon,
  SearchXIcon,
  SlidersHorizontalIcon,
  BookmarkXIcon,
} from '@/modules/shared/icons';
import { useInternshipsAndProblems } from './hooks/useInternshipsAndProblems';
import { Opportunity } from './types/opportunity.types';
import { Application } from './types/application.types';
import ApplicationCard from './components/ApplicationCard';
import { useQueryClient } from '@tanstack/react-query';
import internshipsAndProblemsService from './services/internshipsAndProblems.service';

type EmptyStateProps = {
  type: 'saved' | 'applied';
  searchQuery: string;
};

type StatusBadgeProps = {
  status: string;
};

type StatsProps = {
  savedCount: number;
  appliedCount: number;
};

type OpportunityCardProps = {
  opportunity: Opportunity;
  type: 'saved' | 'applied';
  onUnsave?: (id: number) => Promise<void>;
};

const EmptyState = ({ type, searchQuery }: EmptyStateProps) => {
  const messages = {
    saved: {
      empty: "You haven't saved any opportunities yet",
      notFound: 'None of your saved opportunities match your search',
    },
    applied: {
      empty: "You haven't applied to any opportunities yet",
      notFound: 'None of your applications match your search',
    },
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mb-6 rounded-full bg-gray-50 p-4">
        <SearchXIcon className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        {searchQuery
          ? messages[type].notFound
          : messages[type].empty}
      </h3>
      <p className="max-w-sm text-center text-sm text-gray-500">
        {searchQuery
          ? 'Try adjusting your search terms or filters'
          : type === 'saved'
          ? 'Browse opportunities and bookmark the ones that interest you'
          : 'Your applications will appear here once you apply for opportunities'}
      </p>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex items-center justify-center py-16">
    <LoaderIcon className="text-primary h-8 w-8 animate-spin" />
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// Error state component
const ErrorState = () => (
  <div className="flex flex-col items-center justify-center px-4 py-16">
    <div className="mb-6 rounded-full bg-red-50 p-4">
      <AlertTriangleIcon className="h-12 w-12 text-red-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">Something went wrong</h3>
    <p className="max-w-sm text-center text-sm text-gray-500">
      We're having trouble loading your data. Please try again later.
    </p>
  </div>
);

// Status badge component
const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusStyles = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    accepted: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    submitted:'bg-blue-50 text-green-700 border-green-200',
    default: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.default
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Stats component
const Stats = ({ savedCount, appliedCount }: StatsProps) => (
  <div className="mb-8 grid grid-cols-2 gap-4">
    <div className="rounded-xl bg-blue-50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Saved Opportunities</p>
          <p className="mt-2 text-3xl font-semibold text-blue-900">{savedCount}</p>
        </div>
        <div className="rounded-full bg-blue-100 p-3">
          <BookmarkCheckIcon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
    <div className="rounded-xl bg-purple-50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-purple-600">Active Applications</p>
          <p className="mt-2 text-3xl font-semibold text-purple-900">{appliedCount}</p>
        </div>
        <div className="rounded-full bg-purple-100 p-3">
          <ClipboardCheckIcon className="h-6 w-6 text-purple-600" />
        </div>
      </div>
    </div>
  </div>
);

const OpportunityCard = ({ opportunity, type, onUnsave }: OpportunityCardProps) => {
  const daysUntilDeadline = opportunity.endday
    ? Math.ceil((new Date(opportunity.endday).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : null;

  const handleUnsave = async () => {
    if (onUnsave) {
      await onUnsave(opportunity.id);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {type === 'applied' && (
        <div className="absolute right-4 top-4">
          <StatusBadge status={opportunity.status || 'pending'} />
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1">
          {opportunity.title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center">
            <BuildingIcon className="mr-1.5 h-4 w-4" />
            {opportunity.company.name}
          </span>
          <span className="flex items-center">
            <MapPinIcon className="mr-1.5 h-4 w-4" />
            {opportunity.worktype}
          </span>
        </div>
      </div>
      
      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
        {opportunity.description}
      </p>
      
      <div className="space-y-3">
        {opportunity.duration && (
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="mr-2 h-4 w-4 text-gray-400" />
            {opportunity.duration}
          </div>
        )}
        {opportunity.endday && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {new Date(opportunity.endday).toLocaleDateString()}
            </div>
            {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                daysUntilDeadline <= 3
                  ? 'bg-red-50 text-red-700'
                  : daysUntilDeadline <= 7
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-green-50 text-green-700'
              }`}>
                {daysUntilDeadline} days left
              </span>
            )}
          </div>
        )}
      </div>

      {opportunity.skills?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {type === 'saved' && (
        <button
          onClick={handleUnsave}
          className="absolute right-4 top-4 text-red-500 hover:text-red-700"
        >
          <BookmarkXIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

const InternshipsAndProblemsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const {
    savedPosts,
    appliedInternships,
    isLoading,
    hasError,
    isEmpty,
    activeTab,
    setActiveTab,
  } = useInternshipsAndProblems(searchQuery);
  const queryClient = useQueryClient();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteApplication = async (id: number) => {
    await internshipsAndProblemsService.deleteApplication(id);
    queryClient.invalidateQueries(['appliedPosts']);
  };

  // Unsave handler for saved posts
  const handleUnsavePost = async (id: number) => {
    await internshipsAndProblemsService.unsavePost(id);
    queryClient.invalidateQueries(['savedPosts']);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Stats savedCount={savedPosts.length} appliedCount={appliedInternships.length} />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full rounded-lg border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontalIcon className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="deadline">Deadline</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="inline-flex h-11 items-center justify-center space-x-2 rounded-lg bg-gray-100/80 p-1 !bg-white !border-none shadow-sm [&>[data-state=active]]:bg-primary [&>[data-state=active]]:text-white">
          <TabsTrigger
            value="saved"
            className="inline-flex items-center space-x-2 rounded-md px-4 py-2"
          >
            <BookmarkCheckIcon className="h-5 w-5" />
            <span>Saved</span>
            <span className="ml-1.5 rounded-full bg-gray-200/30 text-gray-600/30 px-2 py-0.5 text-xs font-medium">
              {savedPosts.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="applied"
            className="inline-flex items-center space-x-2 rounded-md px-4 py-2"
          >
            <ClipboardCheckIcon className="h-5 w-5" />
            <span>Applications</span>
            <span className="ml-1.5 rounded-full bg-gray-200/30 text-gray-600/30 px-2 py-0.5 text-xs font-medium">
              {appliedInternships.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved">
          {isLoading ? (
            <LoadingState />
          ) : hasError ? (
            <ErrorState />
          ) : isEmpty.savedPosts ? (
            <EmptyState type="saved" searchQuery={searchQuery} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedPosts.map((post: Opportunity) => (
                <OpportunityCard
                  key={post.id}
                  opportunity={post}
                  type="saved"
                  onUnsave={handleUnsavePost}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applied">
          {isLoading ? (
            <LoadingState />
          ) : hasError ? (
            <ErrorState />
          ) : isEmpty.appliedInternships ? (
            <EmptyState type="applied" searchQuery={searchQuery} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {appliedInternships.map((application: Application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onDelete={handleDeleteApplication}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternshipsAndProblemsPage;
