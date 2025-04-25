'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router';
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
import { toast } from 'react-toastify';
import api from '@/api/axios.config';

interface TeamCardProps {
  id: number;
  icon: React.ReactNode;
  status: string;
  name: string;
  memberCount: number;
  projectCount?: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  id,
  icon,
  status,
  name,
  memberCount,
  projectCount,
}) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = () => {
    setShowInviteDialog(true);
  };

  const addEmail = () => {
    if (!email) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (emails.includes(email)) {
      toast.warning('This email is already in the list');
      return;
    }
    
    setEmails([...emails, email]);
    setEmail('');
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(e => e !== emailToRemove));
  };

  const handleSendInvite = async () => {
    if (emails.length === 0 && !email) {
      toast.error('Please add at least one email address');
      return;
    }

    if (email) {
      addEmail();
    }

    setIsLoading(true);
    try {
      await api.post(`/post/team/inviter/`, {
        team_id: id,
        invited_email: emails[0]
      });
      
      toast.success('Invitations sent successfully');
      setEmails([]);
      setEmail('');
      setShowInviteDialog(false);
    } catch (error) {
      console.error('Error sending invitations:', error);
      toast.error('Failed to send invitations. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            {memberCount} members{projectCount ? ` • ${projectCount} projects` : ''}
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
              Send invitation emails to join this team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  className="border-none shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addEmail();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={addEmail}
                  className="!bg-primary !text-white"
                >
                  Add
                </Button>
              </div>
            </div>
            
            {emails.length > 0 && (
              <div className="mt-2">
                <Label className="mb-2 block">Invitation List:</Label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                  {emails.map((email, index) => (
                    <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <span className="text-sm">{email}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="h-5 w-5 p-0 ml-1"
                        onClick={() => removeEmail(email)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowInviteDialog(false)} className="border-none shadow-sm !bg-gray-100 hover:!bg-gray-200 !text-gray-700">
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSendInvite} 
              className="!bg-primary hover:!primary/90 !text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Invitations'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}; 