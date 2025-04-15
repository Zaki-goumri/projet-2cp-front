import React from 'react';
import { FolderIcon, CheckCircleIcon, XCircleIcon, FileTextIcon } from 'lucide-react';
import StatCard from './stat-card';
import { AcceptanceChart } from './acceptance-chart';
import { ActivityChart } from './activity-chart';
import { InternshipTrack } from './internship-track';
import { TeamsList } from './teams-list';
import { YearlyOverview } from './yearly-overview';
import { useDashboardData } from '../hooks/useDashboardData';

export const Dashboard: React.FC = () => {
  const { dashboardData, isLoading, error, timeRange, setTimeRange } = useDashboardData();

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
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const statCardsData = [
    {
      title: 'Applied',
      value: dashboardData.applications.applied,
      icon: <FolderIcon className="h-5 w-5 text-[#92E3A9]" />,
      iconBgColor: 'bg-[#BFEAC9]/20',
    },
    {
      title: 'Acceptance',
      value: dashboardData.applications.acceptance.total,
      icon: <CheckCircleIcon className="h-5 w-5 text-[#92E3A9]" />,
      iconBgColor: 'bg-[#BFEAC9]/20',
      trend: {
        value: `+${dashboardData.applications.acceptance.change}% since last month`,
        direction: 'up' as const,
        color: 'text-[#92E3A9]',
      },
    },
    {
      title: 'Refusals',
      value: dashboardData.applications.refusals.total,
      valueColor: 'text-red-500',
      icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
      iconBgColor: 'bg-red-50',
      trend: {
        value: `${dashboardData.applications.refusals.change}% since last month`,
        direction: 'down' as const,
        color: 'text-red-500',
      },
    },
    {
      title: 'Total Applications',
      value: dashboardData.applications.totalApplications,
      icon: <FileTextIcon className="h-5 w-5 text-[#92E3A9]" />,
      iconBgColor: 'bg-[#BFEAC9]/20',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 ">
        Main <span className="text-[#92E3A9]">Dashboard</span>
      </h1>
      
      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        {statCardsData.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
            valueColor={card.valueColor}
            trend={card.trend as { value: string; direction: "up" | "down"; color: string; } | undefined}
          />
        ))}
      </div>
      {/* Charts */}
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AcceptanceChart data={dashboardData.acceptanceChart} />
        <ActivityChart 
          data={dashboardData.activityChart}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </div>
      
      {/* Internship Track, Yearly Overview, and Teams */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div>
          <InternshipTrack internships={dashboardData.internships} />
        </div>
        <div>
          <YearlyOverview data={dashboardData.yearlyOverview} />
        </div>
        <div>         
           <TeamsList teams={dashboardData.teams} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
