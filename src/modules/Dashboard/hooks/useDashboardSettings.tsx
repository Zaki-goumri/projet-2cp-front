// src/modules/features/dashboards/hooks/useDashboardSettings.ts
import { useState } from 'react';
import { DashboardType } from '../services/dashboardService';

export const useDashboardSettings = () => {
  const [dashboardType, setDashboardType] = useState<DashboardType>('overview');

  const changeDashboardType = (type: DashboardType) => {
    setDashboardType(type);
  };

  return {
    dashboardType,
    changeDashboardType,
  };
};
