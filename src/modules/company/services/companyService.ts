import {
  Application,
  ApplicationChartData,
  ApplicationStatusData,
  ApplicationStatusPieChartData,
  JobPost,
  OverViewKeysType,
} from '../types/company.types';
import axios from '@/api/axios.config';

export const getOverviewData = async(): Promise<Map<
  OverViewKeysType,
  Omit<ApplicationStatusData, 'name'>
>> => {
  const response=await axios.get<ApplicationStatusData[]>("/Auth/company/dashboard/status-counts/")
  console.log(response.data)
  const data = new Map<OverViewKeysType, Omit<ApplicationStatusData, 'name'>>();
  data.set('total job  Posts', { value: response.data[0].value, thisMonth: response.data[0].thisMonth });
  data.set('Total applications', { value: response.data[1].value, thisMonth: response.data[1].thisMonth });
  data.set('total accepted', { value: response.data[2].value, thisMonth: response.data[2].thisMonth });
  return data;
};
// Mock data for charts
export const getApplicationChartData = (): ApplicationChartData[] => [
  { month: 'Jan', applications: 12, jobs: 20 },
  { month: 'Feb', applications: 19, jobs: 37 },
  { month: 'Mar', applications: 15, jobs: 21 },
  { month: 'Apr', applications: 25, jobs: 48 },
  { month: 'May', applications: 22, jobs: 16 },
  { month: 'Jun', applications: 30, jobs: 11 },
];

export const getApplicationStatusData = async(): Promise<ApplicationStatusPieChartData[]> => {
  try {
    const response=await axios.get<ApplicationStatusPieChartData[]>('/Auth/company/dashboard/status-pie-chart/');
    return response.data;
  } catch (error) {
    console.error('Error fetching application status data:', error);
    throw new Error('Failed to fetch application status data');
  }
};

// Mock data for job posts
export const getJobPosts = async(): Promise<JobPost[]> => {
  try {
    const jobPosts = await axios.get<JobPost[]>('/Auth/company/dashboard/opportunities/');
    return jobPosts.data;
  } catch (error) {
    console.error('Error fetching job posts:', error);
    throw new Error('Failed to fetch job posts');
  }
};

// Mock data for applications
export const getApplications = async (): Promise<Application[]> => {
  const applications = await axios.get<Application[]>('/Auth/company/dashboard/recent/');
  return applications.data;
}
// Utility function for CSV export
export const convertToCSV = (
  data: any[],
  headers: { [key: string]: string }
): string => {
  // Create header row
  const headerRow = Object.values(headers).join(',');

  // Create data rows
  const dataRows = data.map((item) => {
    return Object.keys(headers)
      .map((key) => {
        // Handle values that might contain commas by wrapping in quotes
        const value = item[key]?.toString() || '';
        return value.includes(',') ? `"${value}"` : value;
      })
      .join(',');
  });

  // Combine header and data rows
  return [headerRow, ...dataRows].join('\n');
};

// Function to download CSV file
export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  // Create a link to download the file
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  // Append to document, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
