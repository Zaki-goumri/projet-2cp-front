'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Code, Paintbrush, Terminal, Shield, Plus, X } from 'lucide-react';
import { Link }from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TeamCardProps {
  id: string;
  icon: React.ReactNode;
  status: string;
  name: string;
  memberCount: number;
  projectCount: number;
}

const TeamCard: React.FC<TeamCardProps> = ({
  id,
  icon,
  status,
  name,
  memberCount,
  projectCount,
}) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [email, setEmail] = useState('');

  const handleInvite = () => {
    setShowInviteDialog(true);
  };

  const handleSendInvite = () => {
    // Here you would implement your email sending logic
    console.log(`Inviting ${email} to team ${name}`);
    setEmail('');
    setShowInviteDialog(false);
  };

  return (
    <>
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
        <div className="grid grid-cols-2 gap-2">
          <Link to={`/teams/${id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full !bg-primary/90 !text-white border-none"
            >
              View Team
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex-1 !bg-primary/20 !text-primary border-none"
            onClick={handleInvite}
          >
            Invite
          </Button>
        </div>
      </Card>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-md !bg-white">
          <DialogHeader>
            <DialogTitle>Invite to {name}</DialogTitle>
            <DialogDescription className="text-gray-500">
              Send an invitation email to join this team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                className="col-span-3 border-none shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowInviteDialog(false)} className="border-none shadow-sm !bg-gray-100 hover:!bg-gray-200 !text-gray-700">
              Cancel
            </Button>
            <Button type="button" onClick={handleSendInvite} className="!bg-primary hover:!primary/90 !text-white">
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface SuggestedTeamProps {
  id: string;
  icon: React.ReactNode;
  name: string;
  memberCount: number;
  description: string;
}

const SuggestedTeam: React.FC<SuggestedTeamProps> = ({
  id,
  icon,
  name,
  memberCount,
  description,
}) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [email, setEmail] = useState('');

  const handleJoin = () => {
    setShowInviteDialog(true);
  };

  const handleSendInvite = () => {
    console.log(`Requesting to join ${name} for ${email}`);
    setEmail('');
    setShowInviteDialog(false);
  };

  return (
    <>
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
          onClick={handleJoin}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default function TeamsOverview() {
  const yourTeams = [
    {
      id: "dev-team-1",
      icon: <Code className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Developers',
      memberCount: 7,
      projectCount: 3,
    },
    {
      id: "sharks-team",
      icon: <Terminal className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'The Sharks',
      memberCount: 7,
      projectCount: 2,
    },
    {
      id: "designers-team",
      icon: <Paintbrush className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Designers',
      memberCount: 7,
      projectCount: 3,
    },
    {
      id: "web-dev-team",
      icon: <Users className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Web Development',
      memberCount: 7,
      projectCount: 2,
    },
    {
      id: "backend-team",
      icon: <Terminal className="h-6 w-6" />,
      status: 'ACTIVE',
      name: 'Web Development',
      memberCount: 7,
      projectCount: 3,
    },
  ];

  const suggestedTeams = [
    {
      id: "mobile-dev-team",
      icon: <Terminal className="h-6 w-6" />,
      name: 'Mobile Developers',
      memberCount: 7,
      description: 'Mobile app development and testing',
    },
    {
      id: "hackers-team",
      icon: <Shield className="h-6 w-6" />,
      name: 'The Hackers',
      memberCount: 7,
      description: 'Cyber Security',
    },
    {
      id: "extra-team",
      icon: <Code className="h-6 w-6" />,
      name: 'The Extra Team',
      memberCount: 7,
      description: 'Mobile and Web development',
    },
  ];

  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const handleCreateTeam = () => {
    console.log(`Creating new team: ${newTeamName}`);
    setNewTeamName('');
    setShowCreateTeamDialog(false);
  };

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
             <Link to="/teams/create">
              <Button 
                className=" hover:bg-emerald-600 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
              >
                Create new team
              </Button>
              </Link>
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

      {/* Create Team Dialog
      <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Create a new team to collaborate with others.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team-name" className="text-right">
                Team Name
              </Label>
              <Input
                id="team-name"
                placeholder="Enter team name"
                className="col-span-3"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowCreateTeamDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateTeam} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
} 