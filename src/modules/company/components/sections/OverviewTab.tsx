import StatsCards from '../StatsCards';
import DashboardCharts from './DashboardCharts';
import RecentApplications from './RecentApplications';
import { 
  useExport, 
  useApplicationChartData, 
  useApplicationStatusData, 
  useApplications, 
  useOverviewData
} from '../../hooks/useCompanyService';

interface OverviewTabProps {
  activeTab: string;
}

const OverviewTab = ({ activeTab }: OverviewTabProps) => {
  const { chartData: applicationData, isLoading: isChartDataLoading } = useApplicationChartData();
  const { statusData: applicationStatusData, isLoading: isStatusDataLoading } = useApplicationStatusData();
  const { applications, isLoading: isApplicationsLoading } = useApplications();
  const { overviewData, isLoading: isOverviewDataLoading } = useOverviewData();
  const { handleExport, isExporting } = useExport(activeTab);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {isOverviewDataLoading ? (
        <div className="flex justify-center p-8">Loading overview data...</div>
      ) : (
        <StatsCards data={overviewData} />
      )}

      {/* Export Button */}
      {/* Charts */}
      {isChartDataLoading || isStatusDataLoading ? (
        <div className="flex justify-center p-8">Loading charts data...</div>
      ) : (
        <DashboardCharts
          applicationStatusData={applicationStatusData}
          applicationData={applicationData}
        />
      )}

      {/* Recent Applications */}
      {isApplicationsLoading ? (
        <div className="flex justify-center p-8">Loading applications data...</div>
      ) : (
        <RecentApplications applications={applications} />
      )}
    </div>
  );
};

export default OverviewTab;
