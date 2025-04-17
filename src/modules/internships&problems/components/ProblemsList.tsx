import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Filter, Code, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useInternshipsAndProblems } from '../hooks/useInternshipsAndProblems';
import { Problem } from '../types/internshipsAndProblems.types';

interface ProblemsListProps {
  searchQuery: string;
}

const ProblemsList: React.FC<ProblemsListProps> = ({ searchQuery }) => {
  const { problems, isLoading } = useInternshipsAndProblems();

  // Filter problems based on search query
  const filteredProblems = searchQuery
    ? problems.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : problems;

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

  if (filteredProblems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
        <Code className="mb-4 h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">No problems found</h3>
        <p className="mt-2 text-gray-600">
          Try adjusting your search query or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProblems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
};

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const difficultyColors = {
    Easy: 'text-green-600 bg-green-50',
    Medium: 'text-yellow-600 bg-yellow-50',
    Hard: 'text-red-600 bg-red-50',
  };

  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <img
              src={problem.companyLogo}
              alt={`${problem.company} logo`}
              className="h-10 w-10 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{problem.title}</h3>
            <p className="text-primary text-sm">{problem.company}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              <span className="text-muted-foreground text-xs">{problem.category}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-3 line-clamp-3 text-sm">
          {problem.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground">Deadline: {new Date(problem.deadline).toLocaleDateString()}</span>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={problem.isSaved ? 'text-red-500' : ''}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm">View</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProblemsList; 