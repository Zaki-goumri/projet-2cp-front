// src/modules/features/dashboards/services/dashboardService.ts
import { DashboardData } from '../types/dashboard.types';

// This is the only part you would need to change when connecting to a real API
const API_BASE_URL = '/api/dashboard'; // Replace with your actual API endpoint

export type TimeRange = 'weekly' | 'monthly' | 'yearly';

export const fetchDashboardData = async (
  timeRange: TimeRange = 'weekly'
): Promise<DashboardData> => {
  try {
    // In a real application, this would be an API call
    // const response = await fetch(`${API_BASE_URL}?timeRange=${timeRange}`);
    // if (!response.ok) throw new Error('Failed to fetch dashboard data');
    // return await response.json();

    // For now, we'll simulate an API response with mock data
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay

    // Mock data based on dashboard timeRange
    return {
      applications: {
        applied: 64,
        acceptance: {
          total: 62,
          change: 22,
          period: 'last month',
        },
        refusals: {
          total: 10,
          change: -7,
          period: 'last month',
        },
        totalApplications: 2935,
      },
      internships: [
        { company: 'Huawei', status: 'Accepted', date: '24 Jan 2025' },
        { company: 'Oppo', status: 'On Hold', date: '12 Jun 2025' },
        { company: 'Doradoo', status: 'Refused', date: '5 Jan 2025' },
        { company: 'Yassir', status: 'On Hold', date: '7 Mar 2025' },
        { company: 'Sonatrach', status: 'Accepted', date: '17 Dec 2025' },
        { company: 'Sonatrach', status: 'Accepted', date: '17 Dec 2025' },
        { company: 'Sonatrach', status: 'Accepted', date: '17 Dec 2025' },
        { company: 'Sonatrach', status: 'Accepted', date: '17 Dec 2025' },
        { company: 'Sonatrach', status: 'Accepted', date: '17 Dec 2025' },

      ],
      teams: [
        { name: 'The Hackers', members: 5 },
        { name: 'Beta Pro', members: 7 },
        { name: 'Creators', members: 7 },
      ],
      acceptanceChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Acceptance Rate',
            data: [3, 4, 3.5, 5, 4.8, 6],
            borderColor: '#92E3A9',
            backgroundColor: 'rgba(146, 227, 169, 0.1)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      activityChart: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
          {
            label: 'Applications',
            data: [15, 8, 16, 10, 28, 6, 12],
            backgroundColor: [
              'rgba(191, 234, 201, 0.4)',
              'rgba(191, 234, 201, 0.4)',
              'rgba(191, 234, 201, 0.4)',
              'rgba(191, 234, 201, 0.4)',
              'rgba(146, 227, 169, 0.8)',
              'rgba(191, 234, 201, 0.4)',
              'rgba(191, 234, 201, 0.4)',
            ],
          },
        ],
      },
      yearlyOverview: {
        acceptance: 63,
        refusals: 25,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data. Please try again later.');
  }
};
