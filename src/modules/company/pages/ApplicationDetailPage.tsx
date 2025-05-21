import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MessageCircle, XCircle, ArrowLeft, FileText, Download, Users, User } from 'lucide-react';
import { useStatusUtils } from '../hooks/useCompanyService';
import { DetailedApplication } from '../types/company.types';

interface ApiResponse {
  application: {
    id: number;
    title: string | null;
    team: string | null;
    proposal: string | null;
    status: string;
    atachedfile: string | null;
    links: string | null;
  };
  user?: {
    id: number;
    name: string;
    email: string;
    number: string | null;
    type: string;
    profilepic: {
      link: string;
      name: string;
      size: number;
      created_at: string;
    } | null;
    links: string | null;
    date_joined: string;
    location: string | null;
    education: Array<{
      degree: string;
      institution: string;
      start: string;
      end: string;
    }>;
    gendre: string;
    description: string | null;
    skills: string[];
    rating: number;
    category: string | null;
    cv: string | null;
    experience: Array<{
      title: string;
      company: string;
      start: string;
      end: string;
    }>;
  };
  team?: {
    id: number;
    name: string;
    members: Array<{
      id: number;
      name: string;
      role: string;
    }>;
  };
  type: string;
}

const mockApiResponse: ApiResponse = {
  application: {
    id: 4,
    title: null,
    team: null,
    proposal: "Hello",
    status: "accepted",
    atachedfile: null,
    links: null
  },
  user: {
    id: 2,
    name: "Mouloud hasrane",
    email: "mouloudhasrane24@gmail.com",
    number: null,
    type: "Student",
    profilepic: {
      link: "https://xzbfazkzsezcjgwpsdlm.supabase.co/storage/v1/object/public/cp2/uploads/zaki-test.jpeg+Mouloud hasrane+2025_05_20_00_54_05+.jpeg?",
      name: "zaki-test.jpeg",
      size: 3931,
      created_at: "2025-05-20 00:54:06"
    },
    links: null,
    date_joined: "2025-05-20",
    location: null,
    education: [
      {
        degree: "2025-04-27",
        institution: "Guelma 5adra",
        start: "2025-04-27",
        end: "2025-05-30"
      },
      {
        degree: "2025-05-08",
        institution: "dla3",
        start: "2025-05-08",
        end: "2025-05-22"
      }
    ],
    gendre: "P",
    description: null,
    skills: ["React", "TypeScript", "Node.js"],
    rating: 5,
    category: null,
    cv: null,
    experience: [
      {
        title: "Flutter Internship",
        company: "Banka sghira",
        start: "2025-05-08",
        end: "2025-05-20"
      }
    ]
  },
  type: "user"
};

const ApplicationDetailPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { getStatusColor, getStatusText } = useStatusUtils();
  const [applicationData, setApplicationData] = useState<ApiResponse | null>(null);
  const [parsedSkills, setParsedSkills] = useState<string[]>([]);
  
  useEffect(() => {
    setApplicationData(mockApiResponse);
    
    if (mockApiResponse.user?.skills) {
      try {
        const skills = mockApiResponse.user.skills.map(skill => {
          if (typeof skill === 'string' && skill.startsWith('[')) {
            try {
              const cleanedSkill = skill.replace(/\\\\/g, '\\').replace(/\\"/g, '"');
              return JSON.parse(cleanedSkill);
            } catch {
              return skill;
            }
          }
          return skill;
        }).flat();
        
        const flatSkills = Array.isArray(skills) ? 
          [...new Set(skills.flat(Infinity).filter(s => typeof s === 'string'))] : 
          [];
        
        setParsedSkills(flatSkills);
      } catch (error) {
        console.error("Error parsing skills:", error);
        setParsedSkills([]);
      }
    }
  }, [appId]);

  const handleAccept = () => {
    console.log(`Accepting application ${appId}`);
  };

  const handleReject = () => {
    console.log(`Rejecting application ${appId}`);
  };

  const handleChat = () => {
    console.log(`Chat with applicant ${appId}`);
  };

  const handleBack = () => {
    navigate('/company/test');
  };

  const handleDownloadResume = () => {
    if (applicationData?.user?.cv) {
      console.log(`Downloading resume: ${applicationData.user.cv}`);
    } else {
      console.log('No resume available');
    }
  };

  if (!applicationData) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4 py-8">
        <p className="text-lg text-gray-500">Loading application details...</p>
      </div>
    );
  }

  const isTeamApplication = applicationData.type === 'team' && applicationData.team;
  const applicantData = isTeamApplication ? applicationData.team : applicationData.user;

  if (!applicantData) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4 py-8">
        <p className="text-lg text-gray-500">Applicant data not available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">
                {isTeamApplication ? 'Team Information' : 'Applicant Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  {applicantData.profilepic ? (
                    <img 
                      src={isTeamApplication ? undefined : applicationData.user?.profilepic?.link} 
                      alt={`${applicantData.name} profile`}
                      className="mr-3 h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                      {isTeamApplication ? (
                        <Users className="h-6 w-6 text-gray-500" />
                      ) : (
                        <User className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{applicantData.name}</h3>
                    <p className="text-gray-600">{applicationData.user?.type || 'Team'}</p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <Badge className={getStatusColor(applicationData.application.status)}>
                    {getStatusText(applicationData.application.status)}
                  </Badge>
                </div>
                
                {!isTeamApplication && applicationData.user && (
                  <>
                    <div className="pt-2">
                      <p className="mb-1 text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{applicationData.user.email}</p>
                    </div>
                    
                    {applicationData.user.number && (
                      <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-900">{applicationData.user.number}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="mb-1 text-sm font-medium text-gray-500">Joined Date</p>
                      <p className="text-gray-900">{applicationData.user.date_joined}</p>
                    </div>

                    {parsedSkills.length > 0 && (
                      <div>
                        <p className="mb-1 text-sm font-medium text-gray-500">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {parsedSkills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {applicationData.user.cv && (
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          className="flex w-full items-center justify-center border-[#92E3A9] bg-white text-[#4A9D66] hover:bg-[#92E3A9]/10"
                          onClick={handleDownloadResume}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Resume</span>
                          <Download className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {isTeamApplication && applicationData.team && (
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-500">Team Members</p>
                    <div className="space-y-2">
                      {applicationData.team.members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{member.name}</span>
                          <Badge variant="outline">{member.role}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Application details */}
        <div className="md:col-span-2">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900">Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {!isTeamApplication && applicationData.user?.experience && applicationData.user.experience.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-md font-semibold text-gray-900">Experience</h3>
                    <div className="space-y-3">
                      {applicationData.user.experience.map((exp, index) => (
                        <div key={index} className="rounded-md border border-gray-100 bg-gray-50 p-3">
                          <p className="font-medium text-gray-900">{exp.title}</p>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.start).toLocaleDateString()} - 
                            {exp.end ? new Date(exp.end).toLocaleDateString() : 'Present'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {!isTeamApplication && applicationData.user?.education && applicationData.user.education.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-md font-semibold text-gray-900">Education</h3>
                    <div className="space-y-3">
                      {applicationData.user.education.map((edu, index) => (
                        <div key={index} className="rounded-md border border-gray-100 bg-gray-50 p-3">
                          <p className="font-medium text-gray-900">{edu.degree}</p>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(edu.start).toLocaleDateString()} - 
                            {edu.end ? new Date(edu.end).toLocaleDateString() : 'Present'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {applicationData.application.proposal && (
                  <div>
                    <h3 className="mb-2 text-md font-semibold text-gray-900">Proposal</h3>
                    <div className="rounded-md bg-gray-50 p-4 text-gray-700">
                      <p>{applicationData.application.proposal}</p>
                    </div>
                  </div>
                )}
                
                {applicationData.application.links && (
                  <div>
                    <h3 className="mb-2 text-md font-semibold text-gray-900">Links</h3>
                    <div className="rounded-md bg-gray-50 p-4 text-gray-700">
                      <p>{applicationData.application.links}</p>
                    </div>
                  </div>
                )}

                {applicationData.application.atachedfile && (
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center border-[#92E3A9] bg-white text-[#4A9D66] hover:bg-[#92E3A9]/10"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View Attached File</span>
                      <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {applicationData.application.status === 'submitted' && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 items-center justify-center bg-[#92E3A9] text-white hover:bg-[#4A9D66]"
                      onClick={handleAccept}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 items-center justify-center border-red-500 text-red-500 hover:bg-red-50"
                      onClick={handleReject}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 items-center justify-center border-blue-500 text-blue-500 hover:bg-blue-50"
                      onClick={handleChat}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                )}
                
                {applicationData.application.status !== 'submitted' && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 items-center justify-center border-blue-500 text-blue-500 hover:bg-blue-50"
                      onClick={handleChat}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat with {isTeamApplication ? 'Team' : 'Applicant'}
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
