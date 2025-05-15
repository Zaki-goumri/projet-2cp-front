import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Briefcase, UserPlus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInternshipsAndProblems } from '../hooks/useInternshipsAndProblems';
import { Student, User } from '@/modules/shared/types';

interface UsersListProps {
  searchQuery: string;
}

const UsersList: React.FC<UsersListProps> = ({ searchQuery }) => {
  const { users, isLoading } = useInternshipsAndProblems();

  const filteredUsers = searchQuery
    ? users.filter(
        (user: Student) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : users;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
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

  if (filteredUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
        <Users className="mb-4 h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">No users found</h3>
        <p className="mt-2 text-gray-600">
          Try adjusting your search query to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredUsers.map((user: Student) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

interface UserCardProps {
  user: Student;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow">
            <AvatarImage src={user.profilepic || ''} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            <span className="mt-1 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
              {user.role}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Skills</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
                +{user.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {user.education.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
              <GraduationCap className="h-4 w-4" />
              <h4>Education</h4>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {user.education[0].degree} at {user.education[0].institution}
            </p>
          </div>
        )}

        {user.experience.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
              <Briefcase className="h-4 w-4" />
              <h4>Experience</h4>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {user.experience[0].role} at {user.experience[0].company}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>View Profile</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UsersList;
