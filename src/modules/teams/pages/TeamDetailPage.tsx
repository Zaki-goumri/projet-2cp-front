import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useTeam } from '../hooks/useTeam';
import { UsersRound, BarChart2, Calendar, ExternalLink, AlertTriangle, Wifi } from 'lucide-react';
import TeamProject from '../components/TeamProject';
import { Avatar } from '@/components/ui/avatar';
import { Line } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Team } from '../types/teams.types';

// Define types for project data
interface Project {
  id: string;
  name: string;
  members: number;
  description: string;
}

// Default team data to use if API fails


// Mock projects data

const TeamDetailPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { team, isLoading, error, networkError, leaveTeam, retryFetch } = useTeam(teamId || '');
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsError, setProjectsError] = useState<boolean>(false);
  const [confirmLeaveDialogOpen, setConfirmLeaveDialogOpen] = useState<boolean>(false);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setProjectsError(false);
      } catch (err) {
        console.error("Error loading projects:", err);
        setProjectsError(true);
      }
    };

    if (teamId && !networkError) {
      loadProjects();
    }
  }, [teamId, networkError]);

  const handleLeaveTeam = async () => {
    try {
      setIsLeaving(true);
      const success = await leaveTeam();
      if (success) {
        toast.success('Successfully left the team');
        setConfirmLeaveDialogOpen(false);
        navigate('/teams');
      }
    } catch (err) {
      console.error('Error leaving team:', err);
      toast.error('Failed to leave team. Please try again.');
    } finally {
      setIsLeaving(false);
    }
  };

  const handleViewProject = (projectId: string) => {
    console.log(`View project details for project ID: ${projectId}`);
    // Navigate to project details or open a modal
  };

  // Network Error Page to do change the condition to show the error page
  if (networkError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="rounded-full bg-red-100 p-4 mb-4">
          <Wifi className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
        <p className="text-gray-600 mb-6">Network Error</p>
        <button 
          onClick={retryFetch}
          className="px-4 py-2 bg-[#92E3A9] text-white rounded-md hover:bg-[#7bc791] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#92E3A9]"></div>
      </div>
    );
  }

  // Data Not Found Error
  // TODO: change the error page to the new one
  if (!error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="rounded-full bg-yellow-100 p-4 mb-4">
          <AlertTriangle className="h-10 w-10 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Team Not Found</h2>
        <p className="text-gray-600 mb-6">The requested team doesn't exist or has been removed</p>
        <button
          onClick={() => navigate('/teams')}
          className="px-4 py-2 bg-[#92E3A9] text-white rounded-md hover:bg-[#7bc791] transition-colors"
        >
          Go Back to Teams
        </button>
      </div>
    );
  }

  // Use team data or default data if properties are missing
  const teamData = team ;

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
          <h1 className="mb-4 flex items-center text-2xl font-bold sm:mb-0">
            <span className="text-black">{teamData?.name}</span>
            <span className="text-[#92E3A9]">Teams</span>
          </h1>
          <button
            onClick={() => setConfirmLeaveDialogOpen(true)}
            className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Leave Team
          </button>
        </div>

        {/* Team Description */}
        <div className="mb-10 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold">
            <span className="mr-2">👉</span> Team Description
          </h2>
          <p className="text-gray-600">
            {teamData?.description}
          </p>
        </div>

        {/* Team Stats */}
        <div className="mb-10 rounded-lg bg-white p-6 ">
          <h2 className="mb-6 flex items-center text-xl font-semibold">
            <span className="mr-2">📊</span> Team Stats
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: UsersRound,
                value: teamData?.students.length ,
                label: 'Team Members',
                buttonText: 'See All',
                link: '/dashboard'
              },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md shadow-primary/20">
                <div className="mb-4 rounded-full bg-green-100 p-4">
                  <stat.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">{stat.value}</h3>
                <p className="text-md ">{stat.label}</p>
                <Link to={stat.link}>
                  <button className="mt-4 rounded-full bg-primary px-3 py-1 text-md font-bold text-white">
                    {stat.buttonText}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Team Projects */}
        <div className="rounded-lg bg-white p-6">
          <h2 className="mb-6 flex items-center text-xl font-semibold">
            <span className="mr-2">🚀</span> Team Projects
          </h2>
          
          {projectsError ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">Failed to load projects</p>
              <button 
                onClick={() => setProjectsError(false)}
                className="text-[#92E3A9] underline"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.map(project => (
                  <TeamProject
                    key={project.id}
                    name={project.name}
                    members={project.members}
                    description={project.description}
                    onViewDetails={() => handleViewProject(project.id)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No projects found for this team</p>
              )}
            </div>
          )}
        </div>

        {/* Team Leader */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center text-xl font-semibold">
            <span className="mr-2">👑</span> Team Leader
          </h2>
          
          <div className="flex items-center">
            <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
              <img
                src="/avatar.jpg"
                alt="Team Leader"
                className="h-full w-full object-cover"
                loading='lazy'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces";
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">Bentaieb Mohammed</h3>
              <p className="text-sm text-gray-500">Full Stack Developer</p>
            </div>  
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={confirmLeaveDialogOpen} onOpenChange={setConfirmLeaveDialogOpen}>
          <DialogContent className="sm:max-w-[425px] !bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">Leave Team</DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-600">
                Are you sure you want to leave this team? You will lose access to all team projects and resources.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex space-x-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setConfirmLeaveDialogOpen(false)}
        className="rounded-md border !border-gray-300 !bg-white px-4 py-2 text-sm font-medium !text-gray-700 hover:!bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                onClick={handleLeaveTeam}
                disabled={isLeaving}
                className="rounded-md !bg-red-500 px-4 py-2 text-sm font-medium !text-white hover:!bg-red-600 focus:!outline-none focus:!ring-2 focus:!ring-red-500 focus:r!ing-offset-2"
              >
                {isLeaving ? 'Leaving...' : 'Leave Team'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeamDetailPage; 