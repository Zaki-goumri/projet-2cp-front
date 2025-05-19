import StatsCards from '../StatsCards';
import DashboardCharts from './DashboardCharts';
import RecentApplications from './RecentApplications';
import {
  getApplicationChartData,
  getApplicationStatusData,
  getApplications,
  getJobPosts,
  getOverviewData,
} from '../../services/companyService';
import { useExport } from '../../hooks/useCompanyService';

interface OverviewTabProps {
  activeTab: string;
}

const OverviewTab = ({ activeTab }: OverviewTabProps) => {
  const applicationData = getApplicationChartData();
  const applicationStatusData = getApplicationStatusData();
  const jobPosts = getJobPosts();
  const applications = getApplications();
  const { handleExport } = useExport(activeTab);
  const overviewData = getOverviewData();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards data={overviewData} />

      {/* Export Button */}
      {/* Charts */}
      <DashboardCharts
        applicationStatusData={applicationStatusData}
        applicationData={applicationData}
      />

      {/* Recent Applications */}
      <RecentApplications applications={applications} />
    </div>
  );
};

export default OverviewTab;
