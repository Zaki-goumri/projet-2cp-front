import { Briefcase, Edit, Eye, MoreVertical, Trash, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router';
import { useJobs, useStatusUtils } from '../../hooks/useCompanyService';

const JobsTab = () => {
  const { filteredJobPosts, searchTerm, setSearchTerm } = useJobs();
  const { getStatusColor, getStatusText } = useStatusUtils();
  const navigate = useNavigate();

  const handleEditPost = (jobId: number) => {
    // Navigate to the edit page with the job id
    navigate(`/company/post/edit/${jobId}`);
  };

  const handleDeletePost = (jobId: number) => {
    console.log(`Delete job post with ID: ${jobId}`);
    // In a real implementation, show confirmation dialog and delete
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="mb-4 flex items-center space-x-2 md:mb-0">
          <Input
            placeholder="Search jobs..."
            className="w-full border-gray-200! focus:border-[#92E3A9]! focus:ring-[#92E3A9]! md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to={'/opportunity/create'}>
          <Button className="bg-[#92E3A9]! text-white! hover:bg-[#7ED196]!">
            <Briefcase className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      <Card className="border border-gray-200! bg-white! shadow-sm!">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50!">
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Job Title
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">Type</th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Posted Date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Applications
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600!">Status</th>
                  <th className="px-4 py-3 text-left text-gray-600!">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredJobPosts.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-100! hover:bg-gray-50!"
                  >
                    <td className="px-4 py-3 text-gray-900!">{job.title}</td>
                    <td className="px-4 py-3 text-gray-900!">
                      {job.department}
                    </td>
                    <td className="px-4 py-3 text-gray-900!">{job.location}</td>
                    <td className="px-4 py-3 text-gray-900!">{job.type}</td>
                    <td className="px-4 py-3 text-gray-900!">
                      {job.postedDate}
                    </td>
                    <td className="px-4 py-3 text-gray-900!">
                      {job.applications}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(job.status)}>
                        {getStatusText(job.status)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="bg-white!">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600!"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border border-gray-200! bg-white!"
                        >
                          <DropdownMenuItem className="text-gray-700! hover:bg-[#92E3A9]/10! hover:text-[#4A9D66]!">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-700! hover:bg-[#92E3A9]/10! hover:text-[#4A9D66]!"
                            onClick={() => handleEditPost(job.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-700! hover:bg-[#92E3A9]/10! hover:text-[#4A9D66]!"
                            onClick={() => navigate(`/company/post/applications/${job.id}`)}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            View Applications
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600! hover:bg-red-50!"
                            onClick={() => handleDeletePost(job.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default JobsTab;
