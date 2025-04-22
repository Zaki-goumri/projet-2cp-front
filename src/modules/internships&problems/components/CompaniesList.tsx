import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  ExternalLink,
  Building,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useInternshipsAndProblems } from '../hooks/useInternshipsAndProblems';
import { Company } from '../types/internshipsAndProblems.types';

interface CompaniesListProps {
  searchQuery: string;
}

const CompaniesList: React.FC<CompaniesListProps> = ({ searchQuery }) => {
  const { companies, isLoading } = useInternshipsAndProblems();

  // Filter companies based on search query
  const filteredCompanies = searchQuery
    ? companies.filter(
        (company: Company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : companies;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
              <Skeleton className="mt-4 h-20 w-full" />
              <div className="mt-4 flex justify-between">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-8 w-1/3" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredCompanies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
        <Building className="mb-4 h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">
          No companies found
        </h3>
        <p className="mt-2 text-gray-600">
          Try adjusting your search query to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredCompanies.map((company: Company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <img
              src={company.profilepic || ''}
              alt={`${company.name} logo`}
              className="h-14 w-14 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {company.name}
            </h3>
            <div className="mt-1 flex items-center text-sm text-gray-600">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{company.location}</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">
                {company.category}
              </span>
              <span className="text-gray-400">•</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-3 line-clamp-3 text-sm">
          {company.type}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <div>
              <div className="text-xs text-gray-600">Founded</div>
              <div className="text-sm font-medium">{company.date_joined}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2">
            <Briefcase className="h-4 w-4 text-green-600" />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            <span>Website</span>
          </Button>
          <Button size="sm">View Profile</Button>
        </div>
      </div>
    </Card>
  );
};

export default CompaniesList;
