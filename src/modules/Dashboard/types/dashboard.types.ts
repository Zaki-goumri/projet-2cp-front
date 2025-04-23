// src/modules/features/dashboards/types.ts
export interface RevenueData {
  total: number;
  change: number;
  period: string;
}

export interface SubscriptionData {
  total: number;
  change: number;
  period: string;
}

export interface SalesData {
  total: number;
  change: number;
  period: string;
}

export interface UserData {
  total: number;
  change: number;
  period: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down';
    color: string;
  };
  valueColor?: string;
  iconBgColor?: string;
}

export interface ApplicationData {
  applied: number;
  acceptance: {
    total: number;
    change: number;
    period: string;
  };
  refusals: {
    total: number;
    change: number;
    period: string;
  };
  totalApplications: number;
}

export interface InternshipData {
  company: string;
  status: 'Accepted' | 'On Hold' | 'Refused';
  date: string;
}

export interface TeamData {
  name: string;
  members: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface DashboardData {
  total_application: number;
  total_application_last_month: number;
  accepted_count: number;
  refused_count: number;
  accepted_ratio: number;
  refused_ratio: number;
  daily_count: number[]; // Assuming array of numbers for days 0-6
  teams: any[]; // Placeholder type - refine if structure is known
  applications: any[]; // Placeholder type - refine if structure is known
}

export interface DashboardContextType {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  timeRange: 'weekly' | 'monthly' | 'yearly';
  setTimeRange: (range: 'weekly' | 'monthly' | 'yearly') => void;
}
