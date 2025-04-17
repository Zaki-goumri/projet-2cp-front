import React from 'react';
import { Link } from 'react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Heart, Briefcase, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useInternshipsAndProblems } from '../hooks/useInternshipsAndProblems';
import { Internship } from '../types/internshipsAndProblems.types';

interface InternshipsListProps {
  searchQuery: string;
}

const InternshipsList: React.FC<InternshipsListProps> = ({ searchQuery }) => {
  const { internships, isLoading } = useInternshipsAndProblems();

  // Filter internships based on search query
  const filteredInternships = searchQuery
    ? internships.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : internships;

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

  if (filteredInternships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
        <Briefcase className="mb-4 h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">No internships found</h3>
        <p className="mt-2 text-gray-600">
          Try adjusting your search query or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredInternships.map((internship) => (
        <InternshipCard key={internship.id} internship={internship} />
      ))}
    </div>
  );
};

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <img
              src={internship.companyLogo}
              alt={`${internship.company} logo`}
              className="h-10 w-10 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{internship.title}</h3>
            <p className="text-primary text-sm">{internship.company}</p>
            <div className="text-muted-foreground mt-1 flex items-center text-sm">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{internship.location}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-3 line-clamp-3 text-sm">
          {internship.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {internship.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
            >
              {skill}
            </span>
          ))}
          {internship.skills.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
              +{internship.skills.length - 3}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-orange-500">
              <Clock className="mr-1 h-4 w-4" />
              <span className="font-medium">{internship.daysLeft}</span>
            </div>
            <span className="text-muted-foreground">days left</span>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={internship.isSaved ? 'text-red-500' : ''}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Link to={`/opportunities/${internship.id}`}>
              <Button size="sm">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InternshipsList; 