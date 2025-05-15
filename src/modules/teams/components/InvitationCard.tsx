import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Invitation } from '../types/teams.types';
import { CheckIcon, X } from '@/modules/shared/icons'; // Icons for buttons

interface InvitationCardProps {
  invitation: Invitation;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ 
  invitation,
  onAccept,
  onDecline
}) => {
  return (
    <Card className="!bg-white p-4 flex items-center justify-between rounded-lg shadow-sm !border-none">
      <div>
        <p className="text-sm text-gray-600">
          You have been invited to join the team:
        </p>
        <p className="font-semibold text-black">{invitation.team.name}</p>
       
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="!bg-green-100 hover:!bg-green-200 !text-green-700 border-none h-8 w-8"
          onClick={() => onAccept(invitation.id)}
          aria-label="Accept Invitation"
        >
          <CheckIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="!bg-red-100 hover:!bg-red-200 !text-red-700 border-none h-8 w-8"
          onClick={() => onDecline(invitation.id)}
          aria-label="Decline Invitation"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}; 