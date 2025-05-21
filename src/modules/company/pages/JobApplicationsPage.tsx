import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, CheckCircle, Download, Eye, XCircle } from 'lucide-react';
import {
  useApplications,
  useExport,
  useJobs,
  useSelectBulk,
  useStatusUtils,
} from '../hooks/useCompanyService';
import { Application, JobPost } from '../types/company.types';
import { Checkbox } from '@/components/ui/checkbox';
const JobApplicationsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { getStatusColor, getStatusText } = useStatusUtils();
  const { applications, isLoading: isLoadingApplications } = useApplications();
  const { jobPosts, isLoading: isLoadingJobs } = useJobs();
  const { handleExport } = useExport('applications');

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState<number[]>(
    []
  );

  // Find the job post that matches the postId
  const jobPost: JobPost | undefined = jobPosts.find(
    (job) => job.id === Number(postId)
  );

  const { selectBulk, selectError } = useSelectBulk();
  // Filter applications - in a real implementation, these would be fetched based on postId
  // For now, we're just using the same applications as the main page
  const filteredApplications = applications.filter(
    (app) =>
      (filterStatus === 'all' || app.status === filterStatus) &&
      (searchTerm === '' ||
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBack = () => {
    navigate('/company/test');
  };

  const handleSelectApplication = (appId: number, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, appId]);
    } else {
      setSelectedApplications(
        selectedApplications.filter((id) => id !== appId)
      );
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map((app) => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleBulkAccept = () => {
    // In a real implementation, call API to update status
    // Then clear selection
    selectBulk({ postId: parseInt(postId!), ids: selectedApplications });
    setSelectedApplications([]);
  };

  const handleBulkReject = () => {
    console.log('Rejecting applications:', selectedApplications);
    // In a real implementation, call API to update status
    // Then clear selection
    setSelectedApplications([]);
  };

  // If job post not found
  if (jobPost === undefined && !isLoadingJobs) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600! hover:text-gray-900!"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        <Card className="border border-gray-200! bg-white! shadow-sm!">
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-gray-500!">Job post not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoadingJobs || isLoadingApplications) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border border-gray-200! bg-white! shadow-sm!">
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-gray-500!">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-gray-600! hover:text-gray-900!"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <Card className="mb-6 border border-gray-200! bg-white! shadow-sm!">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900!">
            Applications for: {jobPost?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-md bg-gray-50! p-4">
              <p className="text-sm font-medium text-gray-500!">Department</p>
              <p className="mt-1 font-medium text-gray-900!">
                {jobPost?.department}
              </p>
            </div>
            <div className="rounded-md bg-gray-50! p-4">
              <p className="text-sm font-medium text-gray-500!">Location</p>
              <p className="mt-1 font-medium text-gray-900!">
                {jobPost?.location}
              </p>
            </div>
            <div className="rounded-md bg-gray-50! p-4">
              <p className="text-sm font-medium text-gray-500!">Type</p>
              <p className="mt-1 font-medium text-gray-900!">{jobPost?.type}</p>
            </div>
            <div className="rounded-md bg-gray-50! p-4">
              <p className="text-sm font-medium text-gray-500!">Status</p>
              <p className="mt-1">
                <Badge className={getStatusColor(jobPost?.status || '')}>
                  {getStatusText(jobPost?.status || '')}
                </Badge>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
                className="text-gray-900! hover:bg-[#92E3A9]/20!"
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
        <div className="flex space-x-2">
          {selectedApplications.length > 0 && (
            <>
              <Button
                className="bg-[#92E3A9]! text-white! hover:bg-[#4A9D66]!"
                onClick={handleBulkAccept}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Accept Selected
              </Button>
              <Button
                variant="outline"
                className="border-red-500! text-red-500! hover:bg-red-50!"
                onClick={handleBulkReject}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Selected
              </Button>
            </>
          )}
          <Button
            variant="outline"
            className="border-[#92E3A9]! bg-white! text-[#4A9D66]! hover:bg-[#92E3A9]/10!"
            onClick={() => handleExport()}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="border border-gray-200! bg-white! shadow-sm!">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50!">
                  <th className="px-4 py-3 text-left">
                    <Checkbox
                      id="select-all"
                      checked={
                        selectedApplications.length ===
                          filteredApplications.length &&
                        filteredApplications.length > 0
                      }
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      className="border-gray-300!"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Applicant
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
                    <td className="px-4 py-3 text-left">
                      <Checkbox
                        id={`select-${app.id}`}
                        checked={selectedApplications.includes(app.id)}
                        onCheckedChange={(checked) =>
                          handleSelectApplication(app.id, !!checked)
                        }
                        className="border-gray-300!"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-900!">
                      {app.applicantName}
                    </td>
                    <td className="px-4 py-3 text-gray-900!">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-900!">
                      {app.experience}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(app.status)}>
                        {getStatusText(app.status)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#4A9D66]! hover:text-[#92E3A9]!"
                          onClick={() =>
                            navigate(`/company/applications/${app.id}`)
                          }
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

export default JobApplicationsPage;
