import { CheckCircle, Download, Eye, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router';
import {
  useApplications,
  useExport,
  useStatusUtils,
} from '../../hooks/useCompanyService';

interface ApplicationsTabProps {
  activeTab: string;
}

const ApplicationsTab = ({ activeTab }: ApplicationsTabProps) => {
  const {
    filteredApplications,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
  } = useApplications();
  const { getStatusColor, getStatusText } = useStatusUtils();
  const { handleExport } = useExport(activeTab);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="mb-4 flex items-center space-x-2 md:mb-0">
          <Input
            placeholder="Search applications..."
            className="w-full border-gray-200! focus:border-[#92E3A9]! focus:ring-[#92E3A9]! md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] border-gray-200! focus:border-[#92E3A9]! focus:ring-[#92E3A9]!">
              <SelectValue
                placeholder="Filter by status"
                className="!text-gray-900 hover:!bg-[#92E3A9]/20"
              />
            </SelectTrigger>
            <SelectContent className="border-gray-200! bg-white! hover:bg-white!">
              <SelectItem
                value="all"
                className="text-gray-900! hover:bg-[#92E3A9]/20!"
              >
                All Status
              </SelectItem>
              <SelectItem
                value="submitted"
                className="text-gray-900! hover:bg-[#92E3A9]/20!"
              >
                Submitted
              </SelectItem>
              <SelectItem
                value="under_review"
                className="text-gray-900! hover:bg-[#92E3A9]/20!"
              >
                Under Review
              </SelectItem>
              <SelectItem
                value="interviewed"
                className="text-gray-900! hover:bg-[#92E3A9]/20!"
              >
                Interviewed
              </SelectItem>
              <SelectItem
                value="accepted"
                className="text-gray-900! hover:bg-[#92E3A9]/20!"
              >
                Accepted
              </SelectItem>
              <SelectItem
                value="rejected"
                className="text-gray-900! hover:bg-[#92E3A9]/20!"
              >
                Rejected
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          className="border-[#92E3A9]! bg-white! text-[#4A9D66]! hover:bg-[#92E3A9]/10!"
          onClick={() => handleExport()}
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card className="border border-gray-200! bg-white! shadow-sm!">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50!">
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Position
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Applied Date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                  Proposal
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">Status</th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-100! hover:bg-gray-50!"
                  >
                    <td className="px-4 py-3 text-gray-900!">
                      {app.applicantName}
                    </td>
                    <td className="px-4 py-3 text-gray-900!">{app.position}</td>
                    <td className="px-4 py-3 text-gray-900!">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-900!">
                      {app.experience?.length > 10 ? app.experience.slice(0,10)+'...' : app.experience}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(app.status)+' !border-none'}>
                        {getStatusText(app.status)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!text-[#4A9D66] hover:!text-[#92E3A9] hover:!bg-gray-200"
                          onClick={() => navigate(`/company/applications/${app.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {app.status === 'submitted' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#4A9D66]! hover:text-[#92E3A9]!"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600! hover:text-red-700!"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsTab;
