import { DashboardData } from '../types/dashboard.types';
import axios from '@/api/axios.config'; 

const fetchRealDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await axios.get<DashboardData>('/post/student/dashboard');
    console.log("Dashboard data fetched:", response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error; 
  }
};

const dashboardService = {
  
  fetchDashboardData: fetchRealDashboardData, 
};

export default dashboardService;
