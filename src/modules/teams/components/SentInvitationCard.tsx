import React from 'react';
import { Invitation } from '../types/teams.types'; 
import { Button } from '@/components/ui/button';
import { MailIcon, X } from '@/modules/shared/icons'; 
import { useUserStore } from '@/modules/shared/store/userStore';

interface SentInvitationCardProps {
  invitation: Invitation; 
  onCancel: (invitationId: number) => void;
  isCanceling?: boolean; 
}

export const SentInvitationCard: React.FC<SentInvitationCardProps> = ({
  invitation,
  onCancel,
  isCanceling = false,
}) => {
  const { user } = useUserStore();
  const recipientName = invitation.receiver?.name?? 'Invited User'; 
  const teamName = invitation.team?.name ?? 'Team Name'; 
  const status = invitation.status ?? 'Pending';

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <MailIcon width={20} height={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            Invitation sent to join{' '}
            <span className="font-semibold">{teamName}</span>
          </p>
          <p className="text-xs text-gray-500">
            Status: <span className={`font-medium ${status === 'pending' ? 'text-yellow-600' : 'text-gray-600'}`}>{status}</span>
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        {status.toLowerCase() === 'pending'  && (
             <Button
               variant="outline"
               size="sm"
               onClick={() => onCancel(invitation.id)}
               disabled={isCanceling}
               className="border-red-300 !text-white hover:!bg-red-600 !border-none  !bg-red-500 disabled:opacity-50"
             >
               {isCanceling ? (
                 <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600"></div>
               ) : (
                 <>
                   <X width={16} height={16} className="mr-1" />
                   Cancel
                 </>
               )}
             </Button>
         )}
         {status.toLowerCase() !== 'pending' && (
            <span className="text-sm text-gray-500 italic">{status}</span>
         )}
      </div>
    </div>
  );
}; 