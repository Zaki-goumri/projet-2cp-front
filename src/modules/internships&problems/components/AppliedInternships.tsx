import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Clock4,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router';
import { useInternshipsAndProblems } from '../hooks/useInternshipsAndProblems';
import { Internship } from '../types/internshipsAndProblems.types';
import { Opportunity } from '../types/opportunity.types';
import { Badge } from '@/components/ui/badge';

interface AppliedInternshipsProps {
  searchQuery: string;
}

const mapOpportunityToInternship = (opp: Opportunity): Internship => {
  return {
    id: opp.id.toString(),
    title: opp.title,
    company: opp.company.name,
    companyLogo: opp.company.profilepic || '/placeholder-logo.png',
    location: opp.company.location || 'Remote',
    daysLeft: opp.endday
      ? Math.max(
          0,
          Math.ceil(
            (new Date(opp.endday).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0,
    description: opp.description,
    requirements: [],
    skills: opp.skills,
    category: opp.category,
    startDate: '',
    endDate: opp.endday || '',
    createdAt: opp.created_at,
    isApplied: true,
    status: (opp.status as Internship['status']) || 'Pending',
  };
};

const AppliedInternships: React.FC<AppliedInternshipsProps> = ({
  searchQuery,
}) => {
  const { appliedInternships: opportunities, isLoading } =
    useInternshipsAndProblems();

  const filteredOpportunities = searchQuery
    ? opportunities.filter(
        (opportunity) =>
          opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opportunity.company.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          opportunity.company.location
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          opportunity.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : opportunities;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((index) => (
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

  if (filteredOpportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
        <Briefcase className="mb-4 h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">
          No applied internships found
        </h3>
        <p className="mt-2 text-gray-600">
          You haven't applied to any internships yet or none match your search.
        </p>
        <Button className="mt-4" asChild>
          <Link to="/internships">Browse Internships</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">My Applications</h2>
        <span className="text-muted-foreground text-sm">
          {filteredOpportunities.length} applications
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opportunity) => {
          const internship = mapOpportunityToInternship(opportunity); // Map here
          return (
            <AppliedInternshipCard
              key={internship.id}
              internship={internship}
            />
          );
        })}
      </div>
    </div>
  );
};

interface AppliedInternshipCardProps {
  internship: Internship;
}

const AppliedInternshipCard: React.FC<AppliedInternshipCardProps> = ({
  internship,
}) => {
  const statusColors = {
    Accepted: 'bg-green-100 text-green-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    Refused: 'bg-red-100 text-red-800',
    Pending: 'bg-blue-100 text-blue-800',
  };

  const statusIcons = {
    Accepted: <CheckCircle className="h-4 w-4 text-green-600" />,
    'On Hold': <Clock4 className="h-4 w-4 text-yellow-600" />,
    Refused: <XCircle className="h-4 w-4 text-red-600" />,
    Pending: <Clock className="h-4 w-4 text-blue-600" />,
  };

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
            <h3 className="text-lg font-medium text-gray-900">
              {internship.title}
            </h3>
            <p className="text-primary text-sm">{internship.company}</p>
            <div className="text-muted-foreground mt-1 flex items-center text-sm">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{internship.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Badge
            variant="outline"
            className={`${statusColors[internship.status || 'Pending']} flex items-center gap-1`}
          >
            {statusIcons[internship.status || 'Pending']}
            <span>{internship.status || 'Pending'}</span>
          </Badge>
          <span className="text-muted-foreground text-xs">
            Applied on {new Date(internship.createdAt).toLocaleDateString()}
          </span>
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

          <Link to={`/opportunities/${internship.id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default AppliedInternships;
