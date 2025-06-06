import { useState } from 'react';
import { toast } from 'react-toastify';
import { opportunityService } from '../services/opportunity.service';
import { Team } from '../types/team.types';
import { Opportunity } from '../types/opportunity.types';
import { globalErrorService } from '@/modules/shared/services/global-error.serivce';

interface UseApplicationProps {
  opportunity: Opportunity;
}

export interface OpportunityResponse {
  details: string;
  data: Opportunity;
}

export const useApplication = (opportunity: Opportunity) => {
  const [proposal, setProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTeamApplication, setIsTeamApplication] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!proposal.trim()) {
      toast.error('Please write a proposal before submitting');
      return;
    }

    if (isTeamApplication && !selectedTeam) {
      toast.error('Please select a team before submitting');
      return;
    }

    if (!opportunity) {
      toast.error('Opportunity not loaded. Please try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await opportunityService.submitApplication(
        opportunity.id,
        proposal,
        selectedFile,
        selectedTeam?.id
      );

      if (response) {
        toast.success('Your application has been submitted successfully!');
        setProposal('');
        setSelectedFile(null);
        if (isTeamApplication) {
          setSelectedTeam(null);
          setSearchQuery('');
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        await globalErrorService.getErrorHandlingMessage(err);
      toast.error(errorMessage || 'un error occured');
      throw new Error(errorMessage || 'error in submition');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTeamSelect = (team: Team | null) => {
    setSelectedTeam(team);
    setSearchQuery('');
    if (team === null) {
      setFilteredTeams([]);
    } else {
      setFilteredTeams(allTeams);
    }
  };

  const resetTeamSelection = () => {
    setIsTeamApplication(false);
    setSelectedTeam(null);
    setSearchQuery('');
    setFilteredTeams([]);
  };

  return {
    proposal,
    isSubmitting,
    isTeamApplication,
    searchQuery,
    allTeams,
    filteredTeams,
    selectedTeam,
    isLoading,
    selectedFile,

    setProposal,
    setIsTeamApplication,
    setSearchQuery,
    setAllTeams,
    setFilteredTeams,
    setIsLoading,

    handleSubmit,
    handleTeamSelect,
    resetTeamSelection,
    handleFileSelect,
  };
};
