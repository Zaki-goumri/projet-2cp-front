import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
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
  Line
} from 'recharts';
import { 
  Briefcase, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

// Mock data for charts
const applicationData = [
  { month: 'Jan', applications: 12, interviews: 5, offers: 2 },
  { month: 'Feb', applications: 19, interviews: 8, offers: 3 },
  { month: 'Mar', applications: 15, interviews: 6, offers: 4 },
  { month: 'Apr', applications: 25, interviews: 10, offers: 5 },
  { month: 'May', applications: 22, interviews: 9, offers: 3 },
  { month: 'Jun', applications: 30, interviews: 12, offers: 6 },
];

const applicationStatusData = [
  { name: 'Pending', value: 40 },
  { name: 'Under Review', value: 30 },
  { name: 'Closed', value: 20 },
  { name: 'Accepted', value: 10 },
  { name: 'Rejected', value: 10 },
];

// Updated colors to match the theme
const COLORS = ['#92E3A9', '#7ED196', '#6ABF83', '#4A9D66'];

// Mock data for job posts
const jobPosts = [
  {
    id: 1,
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '2023-06-15',
    applications: 24,
    status: 'open',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    postedDate: '2023-06-10',
    applications: 18,
    status: 'under_review',
  },
  {
    id: 3,
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'On-site',
    type: 'Full-time',
    postedDate: '2023-06-05',
    applications: 32,
    status: 'closed',
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '2023-05-28',
    applications: 15,
    status: 'closed',
  },
];

// Mock data for applications
const applications = [
  {
    id: 1,
    applicantName: 'John Doe',
    position: 'Frontend Developer',
    appliedDate: '2023-06-18',
    status: 'submitted',
    experience: '3 years',
    education: 'Bachelor in Computer Science',
  },
  {
    id: 2,
    applicantName: 'Jane Smith',
    position: 'UI/UX Designer',
    appliedDate: '2023-06-17',
    status: 'under_review',
    experience: '5 years',
    education: 'Master in Design',
  },
  {
    id: 3,
    applicantName: 'Mike Johnson',
    position: 'Backend Developer',
    appliedDate: '2023-06-16',
    status: 'accepted',
    experience: '4 years',
    education: 'Bachelor in Software Engineering',
  },
  {
    id: 4,
    applicantName: 'Sarah Williams',
    position: 'Product Manager',
    appliedDate: '2023-06-15',
    status: 'rejected',
    experience: '6 years',
    education: 'MBA',
  },
];

const CompanyDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Filter job posts based on search term
  const filteredJobPosts = jobPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter applications based on status
  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-[#92E3A9]/20! text-[#4A9D66]!';
     case 'closed':
        return 'bg-gray-100! text-gray-800!';
      case 'under_review':
        return 'bg-yellow-100! text-yellow-800!';
      case 'accepted':
        return 'bg-[#92E3A9]/20! text-[#4A9D66]!';
      case 'rejected':
        return 'bg-red-100! text-red-800!';
      case 'submitted':
        return 'bg-orange-100! text-orange-800!';
      default:
        return 'bg-gray-100! text-gray-800!';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'closed':
        return 'Closed';
      case 'under_review':
        return 'Under Review';
      case 'submitted':
        return 'Submitted';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  // Function to convert data to CSV format
  const convertToCSV = (data: any[], headers: { [key: string]: string }) => {
    // Create header row
    const headerRow = Object.values(headers).join(',');
    
    // Create data rows
    const dataRows = data.map(item => {
      return Object.keys(headers)
        .map(key => {
          // Handle values that might contain commas by wrapping in quotes
          const value = item[key]?.toString() || '';
          return value.includes(',') ? `"${value}"` : value;
        })
        .join(',');
    });
    
    // Combine header and data rows
    return [headerRow, ...dataRows].join('\n');
  };

  // Function to download CSV file
  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Create a link to download the file
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    // Append to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle export based on active tab
  const handleExport = () => {
    try {
      let csvContent = '';
      let filename = '';
      
      if (activeTab === 'jobs') {
        // Export job posts
        const jobHeaders = {
          id: 'ID',
          title: 'Job Title',
          department: 'Department',
          location: 'Location',
          type: 'Type',
          postedDate: 'Posted Date',
          applications: 'Applications',
          status: 'Status'
        };
        
        csvContent = convertToCSV(filteredJobPosts, jobHeaders);
        filename = 'job_posts.csv';
      } else if (activeTab === 'applications') {
        // Export applications
        const applicationHeaders = {
          id: 'ID',
          applicantName: 'Applicant Name',
          position: 'Position',
          appliedDate: 'Applied Date',
          status: 'Status',
          experience: 'Experience',
          education: 'Education'
        };
        
        csvContent = convertToCSV(filteredApplications, applicationHeaders);
        filename = 'applications.csv';
      } else {
        // Export overview data (combine job posts and applications)
        const jobHeaders = {
          id: 'ID',
          title: 'Job Title',
          department: 'Department',
          location: 'Location',
          type: 'Type',
          postedDate: 'Posted Date',
          applications: 'Applications',
          status: 'Status'
        };
        
        const applicationHeaders = {
          id: 'ID',
          applicantName: 'Applicant Name',
          position: 'Position',
          appliedDate: 'Applied Date',
          status: 'Status',
          experience: 'Experience',
          education: 'Education'
        };
        
        const jobCSV = convertToCSV(jobPosts, jobHeaders);
        const applicationCSV = convertToCSV(applications, applicationHeaders);
        
        csvContent = `Job Posts\n${jobCSV}\n\nApplications\n${applicationCSV}`;
        filename = 'dashboard_overview.csv';
      }
      
      downloadCSV(csvContent, filename);
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white! !bg-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
                 </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8 bg-gray-100!">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#92E3A9]! data-[state=active]:text-white!">Overview</TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-[#92E3A9]! data-[state=active]:text-white!">Job Posts</TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-[#92E3A9]! data-[state=active]:text-white!">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border border-gray-200! shadow-sm! hover:shadow-md! transition-shadow! bg-white!">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500!">Total Job Posts</CardTitle>
                  <Briefcase className="h-4 w-4 text-[#92E3A9]!" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900!">{jobPosts.length}</div>
                  <p className="text-xs text-gray-500!">Active: {jobPosts.filter(p => p.status === 'active').length}</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200! shadow-sm! hover:shadow-md! transition-shadow! bg-white!">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500!">Total Applications</CardTitle>
                  <FileText className="h-4 w-4 text-[#92E3A9]!" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900!">{applications.length}</div>
                  <p className="text-xs text-gray-500!">This month: {applications.filter(a => new Date(a.appliedDate) > new Date('2023-06-01')).length}</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200! shadow-sm! hover:shadow-md! transition-shadow! bg-white!">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500!">Interviews Scheduled</CardTitle>
                  <Clock className="h-4 w-4 text-[#92E3A9]!" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900!">{applications.filter(a => a.status === 'interviewed').length}</div>
                  <p className="text-xs text-gray-500!">Next 7 days: 3</p>
                </CardContent>
              </Card>
              <Card className="border border-gray-200! shadow-sm! hover:shadow-md! transition-shadow! bg-white!">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500!">Hired Candidates</CardTitle>
                  <CheckCircle className="h-4 w-4 text-[#92E3A9]!" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900!">{applications.filter(a => a.status === 'accepted').length}</div>
                  <p className="text-xs text-gray-500!">This month: 1</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-gray-200! shadow-sm! bg-white!">
                <CardHeader>
                  <CardTitle className="text-gray-900!">Applications Overview</CardTitle>
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
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }} />
                        <Legend />
                        <Line type="monotone" dataKey="applications" stroke="#92E3A9" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="interviews" stroke="#7ED196" />
                        <Line type="monotone" dataKey="offers" stroke="#4A9D66" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200! shadow-sm! bg-white!">
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
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {applicationStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
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
                          <td className="py-3 px-4">{app.applicantName}</td>
                          <td className="py-3 px-4">{app.position}</td>
                          <td className="py-3 px-4">{app.appliedDate}</td>
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
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Input
                  placeholder="Search jobs..."
                  className="w-full md:w-64 border-gray-200! focus:border-[#92E3A9]! focus:ring-[#92E3A9]!"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                              </div>
              <Link to={'/opportunity/create'}><Button className="bg-[#92E3A9]! text-white! hover:bg-[#7ED196]!">
                <Briefcase className="mr-2 h-4 w-4" />
                Post New Job
              </Button></Link>
            </div>

            <Card className="border border-gray-200! shadow-sm! bg-white!">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50!">
                        <th className="text-left py-3 px-4 text-gray-600!">Job Title</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Department</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Location</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Type</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Posted Date</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Applications</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Status</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobPosts.map((job) => (
                        <tr key={job.id} className="border-b border-gray-100! hover:bg-gray-50!">
                          <td className="py-3 px-4  text-gray-900!">{job.title}</td>
                          <td className="py-3 px-4 text-gray-900!">{job.department}</td>
                          <td className="py-3 px-4 text-gray-900!">{job.location}</td>
                          <td className="py-3 px-4 text-gray-900!">{job.type}</td>
                          <td className="py-3 px-4 text-gray-900!">{job.postedDate}</td>
                          <td className="py-3 px-4 text-gray-900!">{job.applications}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(job.status)}>
                              {getStatusText(job.status)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild className='bg-white!'>
                                <Button variant="ghost" size="sm" className="text-gray-600! ">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="border border-gray-200! bg-white!">
                                <DropdownMenuItem className="text-gray-700! hover:bg-[#92E3A9]/10! hover:text-[#4A9D66]!">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-700! hover:bg-[#92E3A9]/10! hover:text-[#4A9D66]!">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-700! hover:bg-[#92E3A9]/10! hover:text-[#4A9D66]!">
                                  <Users className="mr-2 h-4 w-4" />
                                  View Applications
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600! hover:bg-red-50!">
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
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Input
                  placeholder="Search applications..."
                  className="w-full md:w-64 border-gray-200! focus:border-[#92E3A9]! focus:ring-[#92E3A9]!"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px] border-gray-200! focus:border-[#92E3A9]! focus:ring-[#92E3A9]!">
                    <SelectValue placeholder="Filter by status" className='text-gray-900! hover:bg-[#92E3A9]/20!'/>
                  </SelectTrigger>
                  <SelectContent className="border-gray-200! bg-white! hover:bg-white!">
                    <SelectItem value="all" className='text-gray-900! hover:bg-[#92E3A9]/20!'>All Status</SelectItem>
                    <SelectItem value="pending" className='text-gray-900! hover:bg-[#92E3A9]/20!'>Pending</SelectItem>
                    <SelectItem value="interviewed" className='text-gray-900! hover:bg-[#92E3A9]/20!'>Interviewed</SelectItem>
                    <SelectItem value="accepted" className='text-gray-900! hover:bg-[#92E3A9]/20!'>Accepted</SelectItem>
                    <SelectItem value="rejected" className='text-gray-900! hover:bg-[#92E3A9]/20!'>Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                className="border-[#92E3A9]! bg-white! text-[#4A9D66]! hover:bg-[#92E3A9]/10!"
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <Card className="border border-gray-200! shadow-sm! bg-white!">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50!">
                        <th className="text-left py-3 px-4 text-gray-600!">Applicant</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Position</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Applied Date</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Experience</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Education</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Status</th>
                        <th className="text-left py-3 px-4 text-gray-600!">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="border-b border-gray-100! hover:bg-gray-50!">
                          <td className="py-3 px-4 text-gray-900!">{app.applicantName}</td>
                          <td className="py-3 px-4 text-gray-900!">{app.position}</td>
                          <td className="py-3 px-4 text-gray-900!">{app.appliedDate}</td>
                          <td className="py-3 px-4 text-gray-900!">{app.experience}</td>
                          <td className="py-3 px-4 text-gray-900!">{app.education}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(app.status)}>
                              {getStatusText(app.status)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="text-[#4A9D66]! hover:text-[#92E3A9]!">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {app.status === 'pending' && (
                                <>
                                  <Button variant="ghost" size="sm" className="text-[#4A9D66]! hover:text-[#92E3A9]!">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600! hover:text-red-700!">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard; 