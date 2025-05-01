import React, { useState } from 'react';
import { useTeamManagement } from '../hooks/useTeamManagement';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { User, Users, LogOut, UserX, Trash2 } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  profilepic: string | null;
}

interface TeamManagementProps {
  teamId: number;
  teamName: string;
  members: TeamMember[];
  isLeader: boolean;
  currentUserId: number;
  onActionComplete?: () => void;
}

export const TeamManagement = ({
  teamId,
  teamName,
  members,
  isLeader,
  currentUserId,
  onActionComplete
}: TeamManagementProps) => {
  const { isLoading, leaveTeam, kickMember, deleteTeam } = useTeamManagement();
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    action: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    description: '',
    action: async () => {},
  });

  const handleLeaveTeam = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Leave Team',
      description: `Are you sure you want to leave "${teamName}"? This action cannot be undone.`,
      action: async () => {
        const success = await leaveTeam(teamId);
        if (success && onActionComplete) {
          onActionComplete();
        }
      },
    });
  };

  const handleKickMember = async (userId: number, userName: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Member',
      description: `Are you sure you want to remove ${userName} from the team? This action cannot be undone.`,
      action: async () => {
        const success = await kickMember(teamId, userId);
        if (success && onActionComplete) {
          onActionComplete();
        }
      },
    });
  };

  const handleDeleteTeam = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Team',
      description: `Are you sure you want to delete "${teamName}"? This action cannot be undone and will remove all members.`,
      action: async () => {
        const success = await deleteTeam(teamId);
        if (success && onActionComplete) {
          onActionComplete();
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">{teamName}</h2>
        </div>
        {isLeader ? (
          <Button
            variant="destructive"
            onClick={handleDeleteTeam}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Team
          </Button>
        ) : (
          <Button
            variant="destructive"
            onClick={handleLeaveTeam}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Leave Team
          </Button>
        )}
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Team Members</h3>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {member.profilepic ? (
                    <img
                      src={member.profilepic}
                      alt={member.name}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <User className="h-10 w-10 p-2 rounded-full bg-gray-200" />
                  )}
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                {isLeader && member.id !== currentUserId && (
                  <Button
                    variant="ghost"
                    onClick={() => handleKickMember(member.id, member.name)}
                    disabled={isLoading}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AlertDialog
        open={confirmDialog.isOpen}
        onOpenChange={(isOpen) =>
          setConfirmDialog((prev) => ({ ...prev, isOpen }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              onClick={async (e) => {
                e.preventDefault();
                await confirmDialog.action();
                setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}; 