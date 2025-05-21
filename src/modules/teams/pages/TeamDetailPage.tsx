import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useTeam } from '../hooks/useTeam';
import {
  UsersRoundIcon,
  AlertTriangleIcon,
  WifiIcon,
  UserXIcon,
} from '@/modules/shared/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '../types/teams.types';
import { useUserStore } from '@/modules/shared/store/userStore';
import { useTeamManagement } from '../hooks/useTeamManagement';

const TeamDetailPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { team, isLoading, error, networkError, leaveTeam, retryFetch } =
    useTeam(teamId || '');
  const { kickMember, deleteTeam } = useTeamManagement();

  const [confirmLeaveDialogOpen, setConfirmLeaveDialogOpen] =
    useState<boolean>(false);
  const [confirmKickDialogOpen, setConfirmKickDialogOpen] =
    useState<boolean>(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
    useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Student | null>(null);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [isKicking, setIsKicking] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

  const handleKickMember = async () => {
    if (!selectedMember || !teamId) return;
    try {
      setIsKicking(true);
      await kickMember({
        teamId: parseInt(teamId),
        memberId: selectedMember.id,
      });
      toast.success(`Successfully kicked ${selectedMember.name} from the team`);
      setConfirmKickDialogOpen(false);
      retryFetch();
    } catch (err) {
      console.error('Error kicking member:', err);
      toast.error('Failed to kick member. Please try again.');
    } finally {
      setIsKicking(false);
      setSelectedMember(null);
    }
  };

  const handleDeleteTeam = async () => {
    if (!teamId) return;
    try {
      setIsDeleting(true);
      await deleteTeam(parseInt(teamId));
      navigate('/teams');
    } catch (err) {
      console.error('Error deleting team:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (networkError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="mb-4 rounded-full bg-red-100 p-4">
          <WifiIcon className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-red-500">Error</h1>
        <p className="mb-6 text-gray-600">Network Error</p>
        <button
          onClick={retryFetch}
          className="rounded-md bg-[#92E3A9] px-4 py-2 text-white transition-colors hover:bg-[#7bc791]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#92E3A9]"></div>
      </div>
    );
  }

  if (error && !networkError) {
    const isNotFound = error.status === 404;
    const title = isNotFound ? 'Team Not Found' : 'Error Loading Team';
    const message = isNotFound
      ? "The requested team doesn't exist or has been removed."
      : error.message || 'An unexpected error occurred.';

    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 rounded-full bg-yellow-100 p-4">
          <AlertTriangleIcon className="h-10 w-10 text-yellow-500" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="mb-6 px-4 text-center text-gray-600">{message}</p>
        <button
          onClick={() => navigate('/teams')}
          className="rounded-md bg-[#92E3A9] px-4 py-2 text-white transition-colors hover:bg-[#7bc791]"
        >
          Go Back to Teams
        </button>
      </div>
    );
  }

  if (!team) {
    return null;
  }

  const teamData = team.data;
  const isLeader = user?.id === teamData.leader?.id;
  console.log(teamData);

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-1 flex items-center text-2xl font-bold sm:mb-0">
              <span className="text-black">{teamData.name}</span>
              <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">
                {teamData.category}
              </span>
            </h1>
          </div>
          <div className="flex gap-2">
            {isLeader ? (
              <button
                onClick={() => setConfirmDeleteDialogOpen(true)}
                className="flex-shrink-0 rounded-md bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                Delete Team
              </button>
            ) : (
              <button
                onClick={() => setConfirmLeaveDialogOpen(true)}
                className="flex-shrink-0 rounded-md bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                Leave Team
              </button>
            )}
          </div>
        </div>

        {/* Team Description */}
        <div className="mb-10 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold">
            <span className="mr-2">👉</span> Team Description
          </h2>
          <p className="text-gray-600">
            {/* Use description from data */}
            {teamData.description || 'No description provided.'}
          </p>
        </div>

        {/* Team Members Section with Management */}
        <div className="mb-10 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center text-xl font-semibold">
            <UsersRoundIcon className="mr-2 h-5 w-5 text-[#92E3A9]" /> Team
            Members ({teamData.students?.length ?? 0})
          </h2>
          {teamData.students && teamData.students.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teamData.students.map((student: Student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                      <img
                        src={student.profilepic || '/avatar.jpg'}
                        alt={student.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces';
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                      <Link
                        to={`/profile/${student.name}`}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  {isLeader && student.id !== user?.id && (
                    <button
                      onClick={() => {
                        setSelectedMember(student);
                        setConfirmKickDialogOpen(true);
                      }}
                      className="ml-2 rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      title="Kick member"
                    >
                      <UserXIcon width={16} height={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No members found in this team yet.
            </p>
          )}
        </div>

        {/* Team Leader */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center text-xl font-semibold">
            <span className="mr-2">👑</span> Team Leader
          </h2>

          {teamData.leader ? (
            <div className="flex items-center">
              <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200">
                <img
                  src={teamData.leader.profilepic || '/avatar.jpg'}
                  alt={`Leader: ${teamData.leader.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces';
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{teamData.leader.name}</h3>
                <p className="text-sm text-gray-500">{teamData.leader.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Team leader information not available.
            </p>
          )}
        </div>

        {/* Leave Team Dialog */}
        <Dialog
          open={confirmLeaveDialogOpen}
          onOpenChange={setConfirmLeaveDialogOpen}
        >
          <DialogContent className="!bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Leave Team
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-600">
                Are you sure you want to leave this team? You will lose access
                to all team projects and resources.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex justify-end space-x-2">
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
                className="rounded-md !bg-red-500 px-4 py-2 text-sm font-medium !text-white hover:!bg-red-600 focus:!ring-2 focus:!ring-red-500 focus:!ring-offset-2 focus:!outline-none"
              >
                {isLeaving ? 'Leaving...' : 'Leave Team'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Kick Member Dialog */}
        <Dialog
          open={confirmKickDialogOpen}
          onOpenChange={setConfirmKickDialogOpen}
        >
          <DialogContent className="!bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Kick Member
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-600">
                Are you sure you want to kick {selectedMember?.name} from the
                team? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setConfirmKickDialogOpen(false);
                  setSelectedMember(null);
                }}
                className="rounded-md border !border-gray-300 !bg-white px-4 py-2 text-sm font-medium !text-gray-700 hover:!bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleKickMember}
                disabled={isKicking}
                className="rounded-md !bg-red-500 px-4 py-2 text-sm font-medium !text-white hover:!bg-red-600 focus:!ring-2 focus:!ring-red-500 focus:!ring-offset-2 focus:!outline-none"
              >
                {isKicking ? 'Kicking...' : 'Kick Member'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Team Dialog */}
        <Dialog
          open={confirmDeleteDialogOpen}
          onOpenChange={setConfirmDeleteDialogOpen}
        >
          <DialogContent className="!bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Delete Team
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-600">
                Are you sure you want to delete this team? This action cannot be
                undone and will remove all team data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setConfirmDeleteDialogOpen(false)}
                className="rounded-md border !border-gray-300 !bg-white px-4 py-2 text-sm font-medium !text-gray-700 hover:!bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleDeleteTeam}
                disabled={isDeleting}
                className="rounded-md !bg-red-500 px-4 py-2 text-sm font-medium !text-white hover:!bg-red-600 focus:!ring-2 focus:!ring-red-500 focus:!ring-offset-2 focus:!outline-none"
              >
                {isDeleting ? 'Deleting...' : 'Delete Team'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeamDetailPage;

