import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Application } from '../../types/company.types';
import { useStatusUtils } from '../../hooks/useCompanyService';

interface RecentApplicationsProps {
  applications: Application[];
}

const RecentApplications = ({ applications }: RecentApplicationsProps) => {
  const { getStatusColor, getStatusText } = useStatusUtils();
  
  return (
    <Card className="border border-gray-200! shadow-sm! bg-white!">
      <CardHeader>
        <CardTitle className="text-gray-900!">Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200!">
                <th className="text-left py-3 px-4 text-gray-600!">Applicant</th>
                <th className="text-left py-3 px-4 text-gray-600!">Position</th>
                <th className="text-left py-3 px-4 text-gray-600!">Applied Date</th>
                <th className="text-left py-3 px-4 text-gray-600!">Status</th>
                <th className="text-left py-3 px-4 text-gray-600!">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="border-b border-gray-100! hover:bg-gray-50!">
                  <td className="py-3 px-4 text-gray-900!">{app.applicantName}</td>
                  <td className="py-3 px-4 text-gray-900!">{app.position}</td>
                  <td className="py-3 px-4 text-gray-900!">{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(app.status)}>
                      {getStatusText(app.status)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="text-[#4A9D66]! hover:text-[#92E3A9]!">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;
