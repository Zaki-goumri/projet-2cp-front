import { useState } from 'react';
import { DashboardData } from '../types/dashboard.types';

export const useDashboardSettings = () => {
  const [dashboardType, setDashboardType] = useState<DashboardData>();

  const changeDashboardType = (type: DashboardData) => {
    setDashboardType(type);
  };

  return {
    dashboardType,
    changeDashboardType,
  };
};
