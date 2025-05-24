import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApplicationDetails } from '../hooks/useApplicationDetails';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import { useSelectBulk, useStatusUtils } from '../hooks/useCompanyService';
import { ApiResponse } from '../types/application.types';
import {
  CheckCircle,
  MessageCircle,
  XCircle,
  ArrowLeft,
  FileText,
  Download,
  Users,
  User,
} from 'lucide-react';
import { useChat } from '@/modules/chat/hooks/useChat';

const ApplicationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.appId || '';
  const [postId, setPostId] = React.useState<number | null>(null);
  const { isLoading, fetchDetails, error } = useApplicationDetails(id);
  const application = fetchDetails as ApiResponse;

  const { selectBulk, isSelecting } = useSelectBulk();
  const { getStatusColor, getStatusText } = useStatusUtils();
  const { startNewConversation } = useChat();

  useEffect(() => {
    if (application) {
      setPostId(application.application.post_id?? null);
    }
  }, [application]);

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center bg-white! px-4 py-8">
        <p className="text-lg text-gray-500">Loading application details...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center bg-white! px-4 py-8">
        <p className="text-lg text-gray-500">Applicant data not available</p>
      </div>
    );
  }

  const handleAccept = async () => {
    try {
    selectBulk({
        ids: [application.application.id],
        postId: application.post_id ?? 0,
        cmd: 'ACCEPT',
      });
    } catch (error) {
      console.error('Failed to accept application', error);

      toast.error('Failed to accept application');
    }
  };

  const handleReject = async () => {
    try {
      selectBulk({
        ids: [application.application.id],
        postId: application.post_id ?? 0,
        cmd: 'REJECT',
      });
    } catch (error) {
      console.error('Failed to reject application', error);
      toast.error('Failed to reject application');
    }
  };

  const handleChat = async () => {
    if (!application?.user?.id) return;
    try {
      await startNewConversation(application.user.id);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleBack = () => {
    navigate('/company/test');
  };

  

  const isUserApplication = application.type === 'user';
  const applicantData = isUserApplication ? application.user : application.team;

  if (!applicantData) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center bg-white! px-4 py-8">
        <p className="text-lg text-gray-500">Applicant data not available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-white! px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Applications
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column - Applicant info */}
        <div className="md:col-span-1">
          <Card className="border border-gray-200 bg-white! shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">
                {isUserApplication
                  ? 'Applicant Information'
                  : 'Team Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  {isUserApplication && application.user?.profilepic ? (
                    <img
                      src={application.user.profilepic.link}
                      alt={`${applicantData.name} profile`}
                      className="mr-3 h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                      {isUserApplication ? (
                        <User className="h-6 w-6 text-gray-500" />
                      ) : (
                        <Users className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {applicantData.name}
                    </h3>
                    <p className="text-gray-600">
                      {isUserApplication ? application.user?.type : 'Team'}
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <Badge
                    className={getStatusColor(application.application.status)}
                  >
                    {getStatusText(application.application.status)}
                  </Badge>
                </div>

                {isUserApplication && application.user && (
                  <>
                    <div className="pt-2">
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        Email
                      </p>
                      <p className="text-gray-900">{application.user.email}</p>
                    </div>

                    {application.user.number && (
                      <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">
                          Phone
                        </p>
                        <p className="text-gray-900">
                          {application.user.number}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        Joined Date
                      </p>
                      <p className="text-gray-900">
                        {application.user.date_joined}
                      </p>
                    </div>

                    {application.user.skills &&
                      application.user.skills.length > 0 && (
                        <div>
                          <p className="mb-1 text-sm font-medium text-gray-500">
                            Skills
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {application.user.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-100 text-gray-800!"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {application.user.cv && (
                      <div className="pt-2">
                       <a download href={application.user.cv.link}> <Button
                          variant="outline"
                          className="flex w-full items-center justify-center border-[#92E3A9] bg-white! text-[#4A9D66] hover:bg-[#92E3A9]/10"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Resume</span>
                          <Download className="ml-2 h-4 w-4" />
                        </Button></a>
                      </div>
                    )}
                  </>
                )}

                {!isUserApplication && application.team && (
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500">
                      Team Members
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-500!">
                          Leader: {application.team.leader.name}
                        </span>
                        <Badge variant="outline" className="text-gray-800!">
                          Leader
                        </Badge>
                      </div>
                      {application.team.students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-500!">{student.name}</span>
                          <Badge variant="outline" className="text-gray-800!">
                            Member
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        Team Description
                      </p>
                      <p className="text-gray-700">
                        {application.team.description}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        Category
                      </p>
                      <Badge variant="outline" className="text-gray-800!">
                        {application.team.category}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <p className="mb-1 text-sm font-medium text-gray-500">
                        Created Date
                      </p>
                      <p className="text-gray-700">
                        {new Date(
                          application.team.createdate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Application details */}
        <div className="md:col-span-2">
          <Card className="border border-gray-200 bg-white! shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {isUserApplication &&
                  application.user?.experience &&
                  application.user.experience.length > 0 && (
                    <div>
                      <h3 className="text-md mb-2 font-semibold text-gray-900">
                        Experience
                      </h3>
                      <div className="space-y-3">
                        {application.user.experience.map((exp, index) => (
                          <div
                            key={index}
                            className="rounded-md border border-gray-100 bg-gray-50 p-3"
                          >
                            <p className="font-medium text-gray-900">
                              {exp.title}
                            </p>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(exp.start).toLocaleDateString()} -
                              {exp.end
                                ? new Date(exp.end).toLocaleDateString()
                                : 'Present'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {isUserApplication &&
                  application.user?.education &&
                  application.user.education.length > 0 && (
                    <div>
                      <h3 className="text-md mb-2 font-semibold text-gray-900">
                        Education
                      </h3>
                      <div className="space-y-3">
                        {application.user.education.map((edu, index) => (
                          <div
                            key={index}
                            className="rounded-md border border-gray-100 bg-gray-50 p-3"
                          >
                            <p className="font-medium text-gray-900">
                              {edu.degree}
                            </p>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(edu.start).toLocaleDateString()} -
                              {edu.end
                                ? new Date(edu.end).toLocaleDateString()
                                : 'Present'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {application.application.proposal && (
                  <div>
                    <h3 className="text-md mb-2 font-semibold text-gray-900">
                      Proposal
                    </h3>
                    <div className="rounded-md bg-gray-50 p-4 text-gray-700">
                      <p>{application.application.proposal}</p>
                    </div>
                  </div>
                )}

                {application.application.links && (
                  <div>
                    <h3 className="text-md mb-2 font-semibold text-gray-900">
                      Links
                    </h3>
                    <div className="rounded-md bg-gray-50 p-4 text-gray-700">
                      <p>{application.application.links}</p>
                    </div>
                  </div>
                )}

                {application.application.atachedfile && (
                  <div className="pt-2">
                    <a download href={application.application.atachedfile.link}>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center border-[#92E3A9] bg-white! text-[#4A9D66] hover:bg-[#92E3A9]/10"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>View Attached File</span>
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                )}

                {(application.application.status === 'submitted' ||
                  application.application.status === 'under_review') && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 cursor-pointer items-center justify-center bg-[#92E3A9]! text-white! hover:bg-[#4A9D66]!"
                      onClick={handleAccept}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept Internship
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 cursor-pointer items-center justify-center border-red-500 bg-red-400! text-red-500 text-white! hover:bg-red-700!"
                      onClick={handleReject}
                      disabled={isSelecting}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Internship
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 cursor-pointer items-center justify-center border-blue-500 text-blue-500 hover:bg-blue-50"
                      onClick={handleChat}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                )}

                {application.application.status !== 'submitted' &&
                  application.application.status !== 'under_review' && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 items-center justify-center border-blue-500 text-blue-500 hover:bg-blue-50"
                        onClick={handleChat}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat with {isUserApplication ? 'Applicant' : 'Team'}
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
