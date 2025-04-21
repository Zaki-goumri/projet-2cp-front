import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, AlertTriangle, BookmarkCheck, Briefcase, Users, Building, SearchX, Loader2, Calendar, Clock } from 'lucide-react';
import { useInternshipsAndProblems } from './hooks/useInternshipsAndProblems';
import { Opportunity } from './types/opportunity.types';
import { User } from './types/user.types';
import { Company } from './types/internshipsAndProblems.types';

// Empty state component for better reusability
const EmptyState = ({ type, searchQuery }: { type: string; searchQuery: string }) => {
  const messages = {
    internships: {
      empty: 'No internships available at the moment',
      notFound: 'No internships match your search'
    },
    problems: {
      empty: 'No problems available at the moment',
      notFound: 'No problems match your search'
    },
    saved: {
      empty: 'You haven\'t saved any posts yet',
      notFound: 'None of your saved posts match your search'
    },
    applied: {
      empty: 'You haven\'t applied to any posts yet',
      notFound: 'None of your applied posts match your search'
    },
    users: {
      empty: 'No users found',
      notFound: 'No users match your search'
    },
    companies: {
      empty: 'No companies available',
      notFound: 'No companies match your search'
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <SearchX className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {searchQuery ? messages[type as keyof typeof messages].notFound : messages[type as keyof typeof messages].empty}
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        {searchQuery ?
          'Try adjusting your search terms or removing some filters' :
          'Check back later for new opportunities'}
      </p>
    </div>
  );
};

// Loading state component
const LoadingState = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// Error state component
const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-red-500">
    <div className="rounded-full bg-red-100 p-3 mb-4">
      <AlertTriangle className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
    <p className="text-sm text-center max-w-sm">
      We're having trouble loading the data. Please try again later.
    </p>
  </div>
);

const InternshipsAndProblemsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    internships,
    problems,
    savedPosts,
    appliedInternships,
    users,
    companies,
    isLoading,
    hasError,
    isEmpty,
    activeTab,
    setActiveTab
  } = useInternshipsAndProblems(searchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-8 !bg-white shadow-sm">
          <TabsTrigger value="internships" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" /> Internships
          </TabsTrigger>
          <TabsTrigger value="problems" className="flex items-center">
            <BookmarkCheck className="mr-2 h-4 w-4" /> Problems
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center">
            <BookmarkCheck className="mr-2 h-4 w-4" /> Saved
          </TabsTrigger>
          <TabsTrigger value="applied" className="flex items-center">
            <BookmarkCheck className="mr-2 h-4 w-4" /> Applied
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center">
            <Building className="mr-2 h-4 w-4" /> Companies
          </TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <TabsContent value="internships">
            {isLoading ? (
              <LoadingState />
            ) : hasError ? (
              <ErrorState />
            ) : isEmpty.internships ? (
              <EmptyState type="internships" searchQuery={searchQuery} />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {internships.map((internship: Opportunity) => (
                  <li key={internship.id} className="rounded-lg bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{internship.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{internship.company.name} - {internship.worktype}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{internship.description}</p>
                    {internship.duration && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {internship.duration}
                      </div>
                    )}
                    {internship.endday && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Ends: {new Date(internship.endday).toLocaleDateString()}
                      </div>
                    )}
                    {internship.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {internship.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="problems">
            {isLoading ? (
              <LoadingState />
            ) : hasError ? (
              <ErrorState />
            ) : isEmpty.problems ? (
              <EmptyState type="problems" searchQuery={searchQuery} />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {problems.map((problem: Opportunity) => (
                  <li key={problem.id} className="rounded-lg bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{problem.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{problem.company.name} - {problem.worktype}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{problem.description}</p>
                    {problem.duration && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {problem.duration}
                      </div>
                    )}
                    {problem.endday && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Ends: {new Date(problem.endday).toLocaleDateString()}
                      </div>
                    )}
                    {problem.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {problem.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {isLoading ? (
              <LoadingState />
            ) : hasError ? (
              <ErrorState />
            ) : isEmpty.savedPosts ? (
              <EmptyState type="saved" searchQuery={searchQuery} />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedPosts.map((post: Opportunity) => (
                  <li key={post.id} className="rounded-lg bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{post.company.name} - {post.worktype}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.description}</p>
                    {post.duration && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {post.duration}
                      </div>
                    )}
                    {post.endday && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Ends: {new Date(post.endday).toLocaleDateString()}
                      </div>
                    )}
                    {post.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="applied">
            {isLoading ? (
              <LoadingState />
            ) : hasError ? (
              <ErrorState />
            ) : appliedInternships.length === 0 ? (
              <EmptyState type="applied" searchQuery={searchQuery} />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appliedInternships.map((post: Opportunity) => (
                  <li key={post.id} className="rounded-lg bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{post.company.name} - {post.worktype}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.description}</p>
                    {post.duration && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {post.duration}
                      </div>
                    )}
                    {post.endday && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        Ends: {new Date(post.endday).toLocaleDateString()}
                      </div>
                    )}
                    {post.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="users">
            {isLoading ? (
              <LoadingState />
            ) : hasError ? (
              <ErrorState />
            ) : users.length === 0 ? (
              <EmptyState type="users" searchQuery={searchQuery} />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: User) => (
                  <li key={user.id} className="rounded-lg bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="companies">
            {isLoading ? (
              <LoadingState />
            ) : hasError ? (
              <ErrorState />
            ) : companies.length === 0 ? (
              <EmptyState type="companies" searchQuery={searchQuery} />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((company: Company) => (
                  <li key={company.id} className="rounded-lg bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{company.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
                    <p className="text-sm text-gray-600">{company.location}</p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default InternshipsAndProblemsPage;