import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '@/api/axios.config';
import { Team } from '../services/team.service';
import { Opportunity } from '../services/opportunity.service';

interface ApplicationResponse {
  details: string;
  data: {
    id: number;
    message: string;
    status: string;
    created_at: string;
  };
}

interface UseApplicationProps {
  opportunity: Opportunity;
}

export const useApplication = ({ opportunity }: UseApplicationProps) => {
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
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
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
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('proposal', proposal);
      
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await axios.post<ApplicationResponse>(
        `/app/application/${opportunity.id}/`,
        formData,
        {
          params: { team: selectedTeam?.name || '' },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Application response:', response);
      if (response.status === 200) {
        toast.success('Your application has been submitted successfully!');
        setProposal('');
        setSelectedFile(null);
        if (isTeamApplication) {
          setSelectedTeam(null);
          setSearchQuery('');
        }
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error: any) {
      console.error('Application submission error:', error);
      const errorMessage = error.response?.data?.details || 'There was an error submitting your application. Please try again.';
      toast.error(errorMessage);
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
    // State
    proposal,
    isSubmitting,
    isTeamApplication,
    searchQuery,
    allTeams,
    filteredTeams,
    selectedTeam,
    isLoading,
    selectedFile,

    // Setters
    setProposal,
    setIsTeamApplication,
    setSearchQuery,
    setAllTeams,
    setFilteredTeams,
    setIsLoading,

    // Actions
    handleSubmit,
    handleTeamSelect,
    resetTeamSelection,
    handleFileSelect,
  };
}; 