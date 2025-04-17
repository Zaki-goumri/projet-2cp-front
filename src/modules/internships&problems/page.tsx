import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Filter, BookmarkCheck, Briefcase, Users, Building } from 'lucide-react';
import { useInternshipsAndProblems } from './hooks/useInternshipsAndProblems';

const InternshipsAndProblemsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    internships, 
    problems, 
    users, 
    companies, 
    savedInternships, 
    appliedInternships,
    isLoading
  } = useInternshipsAndProblems();

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
          <p className="mt-2 text-gray-600">
            Find the perfect internship, solve challenging problems, or connect with professionals
          </p>
        </div>

        {/* Search and filters bar */}
        <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Search for internships, problems, users or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 !bg-gray-100 border-none !text-black hover:!bg-gray-200">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        <Tabs defaultValue="internships" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8 !bg-white !text-black"> 
            <TabsTrigger value="internships" className="flex gap-2 items-center ">
              <Briefcase className="h-4 w-4" />
              <span>Internships</span>
            </TabsTrigger>
            <TabsTrigger value="problems" className="flex gap-2 items-center">
              <Filter className="h-4 w-4" />
              <span>Problems</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex gap-2 items-center">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex gap-2 items-center">
              <Building className="h-4 w-4" />
              <span>Companies</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex gap-2 items-center">
              <BookmarkCheck className="h-4 w-4" />
              <span>Saved</span>
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex gap-2 items-center">
              <Briefcase className="h-4 w-4" />
              <span>Applied</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="internships">
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold">Internships List</h2>
              {isLoading ? (
                <p>Loading internships...</p>
              ) : (
                <div className="mt-4">
                  <p>Found {internships.length} internship(s)</p>
                  <ul className="mt-4 space-y-2">
                    {internships.map(internship => (
                      <li key={internship.id} className="rounded bg-white p-3 text-left shadow">
                        <h3 className="font-medium">{internship.title}</h3>
                        <p className="text-sm text-gray-600">{internship.company} - {internship.location}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="problems">
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold">Problems List</h2>
              {isLoading ? (
                <p>Loading problems...</p>
              ) : (
                <div className="mt-4">
                  <p>Found {problems.length} problem(s)</p>
                  <ul className="mt-4 space-y-2">
                    {problems.map(problem => (
                      <li key={problem.id} className="rounded bg-white p-3 text-left shadow">
                        <h3 className="font-medium">{problem.title}</h3>
                        <p className="text-sm text-gray-600">{problem.company} - {problem.difficulty}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold">Users List</h2>
              {isLoading ? (
                <p>Loading users...</p>
              ) : (
                <div className="mt-4">
                  <p>Found {users.length} user(s)</p>
                  <ul className="mt-4 space-y-2">
                    {users.map(user => (
                      <li key={user.id} className="rounded bg-white p-3 text-left shadow">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email} - {user.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="companies">
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold">Companies List</h2>
              {isLoading ? (
                <p>Loading companies...</p>
              ) : (
                <div className="mt-4">
                  <p>Found {companies.length} company(ies)</p>
                  <ul className="mt-4 space-y-2">
                    {companies.map(company => (
                      <li key={company.id} className="rounded bg-white p-3 text-left shadow">
                        <h3 className="font-medium">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.location} - {company.industry}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold">Saved Internships</h2>
              {isLoading ? (
                <p>Loading saved internships...</p>
              ) : (
                <div className="mt-4">
                  <p>Found {savedInternships.length} saved internship(s)</p>
                  <ul className="mt-4 space-y-2">
                    {savedInternships.map(internship => (
                      <li key={internship.id} className="rounded bg-white p-3 text-left shadow">
                        <h3 className="font-medium">{internship.title}</h3>
                        <p className="text-sm text-gray-600">{internship.company} - {internship.location}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="applied">
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold">Applied Internships</h2>
              {isLoading ? (
                <p>Loading applied internships...</p>
              ) : (
                <div className="mt-4">
                  <p>Found {appliedInternships.length} applied internship(s)</p>
                  <ul className="mt-4 space-y-2">
                    {appliedInternships.map(internship => (
                      <li key={internship.id} className="rounded bg-white p-3 text-left shadow">
                        <h3 className="font-medium">{internship.title}</h3>
                        <p className="text-sm text-gray-600">{internship.company} - Status: {internship.status || 'Pending'}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default InternshipsAndProblemsPage; 