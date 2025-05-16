import React from 'react';
import { FolderIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import StatCard from './stat-card';
import { AcceptanceChart } from './acceptance-chart';
import { ActivityChart } from './activity-chart';
import { InternshipTrack } from './internship-track';
import { TeamsList } from './teams-list';
import { YearlyOverview } from './yearly-overview';
import { useDashboardData } from '../hooks/useDashboardData';
import { ChartData } from '../types/dashboard.types'; // Import ChartData type

export const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useDashboardData();
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#92E3A9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p>
            {error instanceof Error
              ? error.message
              : 'An unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const statCardsData = [
    {
      title: 'Total Applications',
      value: dashboardData.total_application,
      icon: <FolderIcon className="h-5 w-5 text-[#92E3A9]" />,
      iconBgColor: 'bg-[#BFEAC9]/20',
      trend:
        dashboardData.total_application_last_month !== undefined
          ? {
              value: `${dashboardData.total_application - dashboardData.total_application_last_month} since last month`,
              direction:
                dashboardData.total_application >=
                dashboardData.total_application_last_month
                  ? ('up' as const)
                  : ('down' as const),
              color:
                dashboardData.total_application >=
                dashboardData.total_application_last_month
                  ? 'text-[#92E3A9]'
                  : 'text-red-500',
            }
          : undefined,
    },
    {
      title: 'Accepted',
      value: dashboardData.accepted_count,
      icon: <CheckCircleIcon className="h-5 w-5 text-[#92E3A9]" />,
      iconBgColor: 'bg-[#BFEAC9]/20',
      trend: {
        value: `${(dashboardData.accepted_ratio * 100).toFixed(1)}% acceptance`,
        direction: 'up' as const,
        color: 'text-[#92E3A9]',
      },
    },
    {
      title: 'Refused',
      value: dashboardData.refused_count,
      valueColor: 'text-red-500',
      icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
      iconBgColor: 'bg-red-50',
      trend: {
        value: `${(dashboardData.refused_ratio * 100).toFixed(1)}% refusal`,
        direction: 'down' as const,
        color: 'text-red-500',
      },
    },
  ];

  const activityChartData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Applications',
        data: dashboardData.daily_count || [],
        backgroundColor: 'rgba(146, 227, 169, 0.8)',
        borderColor: '#92E3A9',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6 font-sans sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Main <span className="text-[#92E3A9]">Dashboard</span>
      </h1>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCardsData.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            valueColor={card.valueColor}
            trend={
              card.trend as
                | { value: string; direction: 'up' | 'down'; color: string }
                | undefined
            }
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AcceptanceChart data={dashboardData.daily_count} />
        <ActivityChart data={activityChartData} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <InternshipTrack internships={dashboardData.applications as any} />
        </div>
        <div className="lg:col-span-1">
          <YearlyOverview
            accepted_ratio={dashboardData.accepted_ratio}
            refused_ratio={dashboardData.refused_ratio}
          />
        </div>
        <div className="lg:col-span-1">
          <TeamsList teams={dashboardData.teams as any} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
