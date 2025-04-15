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
  revenue: RevenueData;
  subscriptions: SubscriptionData;
  sales: SalesData;
  activeUsers: UserData;
  applications: ApplicationData;
  internships: InternshipData[];
  teams: TeamData[];
  monthlyTrend: ChartDataPoint[];
  weeklyActivity: ChartDataPoint[];
  acceptanceChart: ChartData;
  activityChart: ChartData;
  yearlyOverview: {
    acceptance: number;
    refusals: number;
  };
}

export interface DashboardContextType {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  timeRange: 'weekly' | 'monthly' | 'yearly';
  setTimeRange: (range: 'weekly' | 'monthly' | 'yearly') => void;
}
