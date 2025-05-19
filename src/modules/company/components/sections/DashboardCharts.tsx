import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ApplicationChartData,
  ApplicationStatusPieChartData,
} from '../../types/company.types';

// Updated colors to match the theme
const COLORS = ['#92E3A9', '#7ED195', '#6ABF83', '#4A9D66'];

interface DashboardChartsProps {
  applicationData: ApplicationChartData[];
  applicationStatusData: ApplicationStatusPieChartData[];
}

const DashboardCharts = ({
  applicationData,
  applicationStatusData,
}: DashboardChartsProps) => {
  console.log('applicationStatusData', applicationStatusData);
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="border border-gray-200! bg-white! shadow-sm!">
        <CardHeader>
          <CardTitle className="text-gray-900!">
            Applications Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={applicationData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#92E3A9"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="interviews" stroke="#7ED196" />
                <Line type="monotone" dataKey="offers" stroke="#4A9D66" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200! bg-white! shadow-sm!">
        <CardHeader>
          <CardTitle className="text-gray-900!">Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#92E3A9"
                  dataKey="value"
                  label={({ status, percent }) =>
                    `${status} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
