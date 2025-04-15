'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Code, Paintbrush, Terminal, Shield, Plus } from 'lucide-react';

interface TeamCardProps {
  icon: React.ReactNode;
  status: string;
  name: string;
  memberCount: number;
  projectCount: number;
  onViewTeam?: () => void;
  onInvite?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  icon,
  status,
  name,
  memberCount,
  projectCount,
  onViewTeam,
  onInvite,
}) => (
  <Card className="!bg-white p-6 space-y-4 rounded-2xl shadow-sm !border-none">
    <div className="flex items-start justify-between">
      <div className="h-12 w-12 rounded-xl bg-primary/20  flex items-center justify-center text-emerald-500 dark:text-emerald-400">
        {icon}
      </div>
      <span className="text-xs font-medium text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 px-2 py-1 rounded-full">
        {status}
      </span>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-black">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {memberCount} members • {projectCount} projects
      </p>
    </div>
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex-1 !bg-primary/90 !text-white border-none"
        onClick={onViewTeam}
      >
        View Team
      </Button>
      <Button
        variant="outline"
        className="flex-1 !bg-primary/20 !text-primary border-none"
        onClick={onInvite}
      >
        Invite
      </Button>
    </div>
  </Card>
);

interface SuggestedTeamProps {
  icon: React.ReactNode;
  name: string;
  memberCount: number;
  description: string;
  onJoin?: () => void;
}

const SuggestedTeam: React.FC<SuggestedTeamProps> = ({
  icon,
  name,
  memberCount,
  description,
  onJoin,
}) => (
  <div className="flex items-center justify-between py-4 last:border-b-0  bg-white shadow-sm p-4 first:rounded-t-xl last:rounded-b-xl">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-xl text-black flex items-center justify-center text-emerald-500 dark:text-emerald-400">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-black">{name}</h3>
        <p className="text-sm text-gray-500 ">
          {memberCount} members • {description}
        </p>
      </div>
    </div>
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      onClick={onJoin}
    >
      <Plus className="h-5 w-5" />
    </Button>
  </div>
);

export default function TeamsOverview() {
  const yourTeams = [
    {
      icon: <Code className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Developers',
      memberCount: 7,
      projectCount: 3,
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'The Sharks',
      memberCount: 7,
      projectCount: 2,
    },
    {
      icon: <Paintbrush className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Designers',
      memberCount: 7,
      projectCount: 3,
    },
    {
      icon: <Users className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Web Development',
      memberCount: 7,
      projectCount: 2,
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Web Development',
      memberCount: 7,
      projectCount: 3,
    },
  ];

  const suggestedTeams = [
    {
      icon: <Terminal className="h-6 w-6" />,
      name: 'Mobile Developers',
      memberCount: 7,
      description: 'Mobile app development and testing',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      name: 'The Hackers',
      memberCount: 7,
      description: 'Cyber Security',
    },
    {
      icon: <Code className="h-6 w-6" />,
      name: 'The Extra Team',
      memberCount: 7,
      description: 'Mobile and Web development',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Your Teams Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-1 text-gray-700">
            Your <span className="text-primary">Teams</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {yourTeams.map((team, index) => (
              <TeamCard key={index} {...team} />
            ))}
            {/* Create New Team Card */}
            <Card className="!bg-white p-6 flex flex-col items-center justify-center text-center space-y-4  !border-none dark:border-gray-800 rounded-2xl">
              <div className="h-12 w-12 rounded-xl bg-primary/30 flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">Create New Team</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Start collaborating with other teams</p>
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black">
                Create new team
              </Button>
            </Card>
          </div>
        </div>

        {/* Teams you might like Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 ">
            Teams <span className="text-primary">you might like</span>
          </h2>
          <Card className="bg-white rounded-2xl !border-none">
            {suggestedTeams.map((team, index) => (
              <SuggestedTeam key={index} {...team} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
} 