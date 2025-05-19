import {
  Application,
  ApplicationChartData,
  ApplicationStatusData,
  ApplicationStatusPieChartData,
  JobPost,
  OverViewKeysType,
} from '../types/company.types';

export const getOverviewData = (): Map<
  OverViewKeysType,
  Omit<ApplicationStatusData, 'name'>
> => {
  const data = new Map<OverViewKeysType, Omit<ApplicationStatusData, 'name'>>();
  data.set('total job  Posts', { value: 50, thisMonth: 5 });
  data.set('Total applications', { value: 200, thisMonth: 20 });
  data.set('total accepted', { value: 100, thisMonth: 10 });
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

export const getApplicationStatusData = (): ApplicationStatusPieChartData[] => [
  { status: 'submitted', value: 40 },
  { status: 'under_review', value: 30 },
  { status: 'rejected', value: 20 },
  { status: 'accepted', value: 10 },
];

// Mock data for job posts
export const getJobPosts = (): JobPost[] => [
  {
    id: 1,
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '2023-06-15',
    applications: 24,
    status: 'open',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    postedDate: '2023-06-10',
    applications: 18,
    status: 'under_review',
  },
  {
    id: 3,
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'On-site',
    type: 'Full-time',
    postedDate: '2023-06-05',
    applications: 32,
    status: 'closed',
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '2023-05-28',
    applications: 15,
    status: 'closed',
  },
];

// Mock data for applications
export const getApplications = (): Application[] => [
  {
    id: 1,
    applicantName: 'John Doe',
    position: 'Frontend Developer',
    appliedDate: '2023-06-18',
    status: 'submitted',
    experience: '3 years',
    education: 'Bachelor in Computer Science',
  },
  {
    id: 2,
    applicantName: 'Jane Smith',
    position: 'UI/UX Designer',
    appliedDate: '2023-06-17',
    status: 'under_review',
    experience: '5 years',
    education: 'Master in Design',
  },
  {
    id: 3,
    applicantName: 'Mike Johnson',
    position: 'Backend Developer',
    appliedDate: '2023-06-16',
    status: 'accepted',
    experience: '4 years',
    education: 'Bachelor in Software Engineering',
  },
  {
    id: 4,
    applicantName: 'Sarah Williams',
    position: 'Product Manager',
    appliedDate: '2023-06-15',
    status: 'rejected',
    experience: '6 years',
    education: 'MBA',
  },
];

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
