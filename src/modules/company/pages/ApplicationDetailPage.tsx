import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MessageCircle, XCircle, ArrowLeft, FileText, Download } from 'lucide-react';
import { useStatusUtils } from '../hooks/useCompanyService';
import { DetailedApplication } from '../types/company.types';

const mockDetailedApplication: DetailedApplication = {
  id: 1,
  applicantName: "John Doe",
  position: "Frontend Developer",
  appliedDate: "2025-05-15T14:30:00Z",
  status: "submitted",
  experience: "3 years of React development",
  education: "Bachelor's in Computer Science",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  coverLetter: "I am excited to apply for the Frontend Developer position at your company. With my experience in React, TypeScript, and modern web development practices, I believe I can contribute significantly to your team...",
  resume: "/path/to/resume.pdf",
  skills: ["React", "TypeScript", "CSS", "Node.js", "Git"],
  proposal: "I would like to propose implementing a new dashboard feature that would help visualize data more effectively. My approach would leverage modern charting libraries and optimize for performance."
};

const ApplicationDetailPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { getStatusColor, getStatusText } = useStatusUtils();
  
  // In a real implementation, you would fetch the application details based on appId
  // For now, we'll use our static mock data
  const application = mockDetailedApplication;

  const handleAccept = () => {
    // In a real implementation, you would call an API to update the status
    console.log(`Accepting application ${appId}`);
    // Navigate back to applications list after action
    // navigate('/company/test');
  };

  const handleReject = () => {
    // In a real implementation, you would call an API to update the status
    console.log(`Rejecting application ${appId}`);
    // Navigate back to applications list after action
    // navigate('/company/test');
  };

  const handleChat = () => {
    // In a real implementation, you would navigate to chat with this applicant
    console.log(`Chat with applicant ${appId}`);
  };

  const handleBack = () => {
    navigate('/company/test');
  };

  const handleDownloadResume = () => {
    // In a real implementation, this would download the resume
    console.log(`Downloading resume for ${appId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-gray-600! hover:text-gray-900!"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Applications
      </Button>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column - Applicant info */}
        <div className="md:col-span-1">
          <Card className="border border-gray-200! bg-white! shadow-sm!">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900!">Applicant Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900!">{application.applicantName}</h3>
                  <p className="text-gray-600!">{application.position}</p>
                  <div className="mt-2">
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusText(application.status)}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="mb-1 text-sm font-medium text-gray-500!">Email</p>
                  <p className="text-gray-900!">{application.email}</p>
                </div>
                
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500!">Phone</p>
                  <p className="text-gray-900!">{application.phone}</p>
                </div>
                
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500!">Applied Date</p>
                  <p className="text-gray-900!">{new Date(application.appliedDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium text-gray-500!">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {application.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100! text-gray-800!">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="flex w-full items-center justify-center border-[#92E3A9]! bg-white! text-[#4A9D66]! hover:bg-[#92E3A9]/10!"
                    onClick={handleDownloadResume}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>View Resume</span>
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Application details */}
        <div className="md:col-span-2">
          <Card className="border border-gray-200! bg-white! shadow-sm!">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900!">Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-md font-semibold text-gray-900!">Experience</h3>
                  <p className="text-gray-700!">{application.experience}</p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-md font-semibold text-gray-900!">Education</h3>
                  <p className="text-gray-700!">{application.education}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-md font-semibold text-gray-900!">Proposal</h3>
                  <p className="text-gray-700!">{application.proposal}</p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-md font-semibold text-gray-900!">Cover Letter</h3>
                  <div className="rounded-md bg-gray-50! p-4 text-gray-700!">
                    <p>{application.coverLetter}</p>
                  </div>
                </div>

                {application.status === 'submitted' && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 items-center justify-center bg-[#92E3A9]! text-white! hover:bg-[#4A9D66]!"
                      onClick={handleAccept}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 items-center justify-center border-red-500! text-red-500! hover:bg-red-50!"
                      onClick={handleReject}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 items-center justify-center border-blue-500! text-blue-500! hover:bg-blue-50!"
                      onClick={handleChat}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                )}
                
                {application.status !== 'submitted' && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 items-center justify-center border-blue-500! text-blue-500! hover:bg-blue-50!"
                      onClick={handleChat}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat with Applicant
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
