import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { convertToCSV, downloadCSV, getApplications, getJobPosts, getApplicationChartData, getApplicationStatusData } from '../services/companyService';
import { Application, JobPost, ApplicationChartData, ApplicationStatusData } from '../types/company.types';

// Hook for status utilities
export const useStatusUtils = () => {
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-[#92E3A9]/20! text-[#4A9D66]!';
      case 'closed':
        return 'bg-gray-100! text-gray-800!';
      case 'under_review':
        return 'bg-yellow-100! text-yellow-800!';
      case 'accepted':
        return 'bg-[#92E3A9]/20! text-[#4A9D66]!';
      case 'rejected':
        return 'bg-red-100! text-red-800!';
      case 'submitted':
        return 'bg-orange-100! text-orange-800!';
      default:
        return 'bg-gray-100! text-gray-800!';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
      case 'under_review':
        return 'Under Review';
      case 'submitted':
        return 'Submitted';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return { getStatusColor, getStatusText };
};

// Hook for jobs management
export const useJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const jobsQuery = useQuery<JobPost[], Error>({
    queryKey: ['jobPosts'],
    queryFn: async () => {
      try {
        return getJobPosts();
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Failed to fetch job posts');
      }
    }
  });

  // Filter job posts based on search term
  const filteredJobPosts = (jobsQuery.data || []).filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    jobPosts: jobsQuery.data || [],
    filteredJobPosts,
    isLoading: jobsQuery.isLoading,
    error: jobsQuery.error,
    searchTerm,
    setSearchTerm,
    refetch: jobsQuery.refetch
  };
};

// Hook for applications management
export const useApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const applicationsQuery = useQuery<Application[], Error>({
    queryKey: ['applications'],
    queryFn: async () => {
      try {
        return getApplications();
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Failed to fetch applications');
      }
    }
  });

  // Filter applications based on status and search term
  const filteredApplications = (applicationsQuery.data || []).filter(app => 
    (filterStatus === 'all' || app.status === filterStatus) &&
    (searchTerm === '' || 
     app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    applications: applicationsQuery.data || [],
    filteredApplications,
    isLoading: applicationsQuery.isLoading,
    error: applicationsQuery.error,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    refetch: applicationsQuery.refetch
  };
};

// Hooks for chart data
export const useApplicationChartData = () => {
  const chartDataQuery = useQuery<ApplicationChartData[], Error>({
    queryKey: ['applicationChartData'],
    queryFn: async () => {
      try {
        return getApplicationChartData();
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Failed to fetch chart data');
      }
    }
  });

  return {
    chartData: chartDataQuery.data || [],
    isLoading: chartDataQuery.isLoading,
    error: chartDataQuery.error
  };
};

export const useApplicationStatusData = () => {
  const statusDataQuery = useQuery<ApplicationStatusData[], Error>({
    queryKey: ['applicationStatusData'],
    queryFn: async () => {
      try {
        return getApplicationStatusData();
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Failed to fetch status data');
      }
    }
  });

  return {
    statusData: statusDataQuery.data || [],
    isLoading: statusDataQuery.isLoading,
    error: statusDataQuery.error
  };
};

// Hook for export functionality
export const useExport = (activeTab: string) => {
  const { filteredJobPosts } = useJobs();
  const { filteredApplications } = useApplications();
  const queryClient = useQueryClient();
  
  // Using mutation for export functionality
  const exportMutation = useMutation({
    mutationFn: async () => {
      try {
      let csvContent = '';
      let filename = '';
      
      if (activeTab === 'jobs') {
        // Export job posts
        const jobHeaders = {
          id: 'ID',
          title: 'Job Title',
          department: 'Department',
          location: 'Location',
          type: 'Type',
          postedDate: 'Posted Date',
          applications: 'Applications',
          status: 'Status'
        };
        
        csvContent = convertToCSV(filteredJobPosts, jobHeaders);
        filename = 'job_posts.csv';
      } else if (activeTab === 'applications') {
        // Export applications
        const applicationHeaders = {
          id: 'ID',
          applicantName: 'Applicant Name',
          position: 'Position',
          appliedDate: 'Applied Date',
          status: 'Status',
          experience: 'Experience',
          education: 'Education'
        };
        
        csvContent = convertToCSV(filteredApplications, applicationHeaders);
        filename = 'applications.csv';
      } else {
        // Export overview data (combine job posts and applications)
        const jobPosts = getJobPosts();
        const applications = getApplications();
        
        const jobHeaders = {
          id: 'ID',
          title: 'Job Title',
          department: 'Department',
          location: 'Location',
          type: 'Type',
          postedDate: 'Posted Date',
          applications: 'Applications',
          status: 'Status'
        };
        
        const applicationHeaders = {
          id: 'ID',
          applicantName: 'Applicant Name',
          position: 'Position',
          appliedDate: 'Applied Date',
          status: 'Status',
          experience: 'Experience',
          education: 'Education'
        };
        
        const jobCSV = convertToCSV(jobPosts, jobHeaders);
        const applicationCSV = convertToCSV(applications, applicationHeaders);
        
        csvContent = `Job Posts\n${jobCSV}\n\nApplications\n${applicationCSV}`;
        filename = 'dashboard_overview.csv';
      }
      
        downloadCSV(csvContent, filename);
        return { success: true, filename };
      } catch (error) {
        console.error('Error exporting data:', error);
        throw new Error('Failed to export data');
      }
    },
    onSuccess: (data) => {
      toast.success('Data exported successfully!');
    },
    onError: (error) => {
      toast.error('Failed to export data. Please try again.');
    }
  });

  return { 
    handleExport: exportMutation.mutate,
    isExporting: exportMutation.isLoading,
    exportError: exportMutation.error 
  };
};
