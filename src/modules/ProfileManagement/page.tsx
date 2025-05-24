import { Suspense, useEffect, useState } from 'react';
import ProfileInfo from './components/profileInfo';
import AboutMe from './components/sections/AboutMe';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Resume from './components/sections/Resume';
import { useUserStore } from '../shared/store/userStore';
import { useParams } from 'react-router';
import { useUserInfo, useProfileUpdate } from './hooks/useUserService';
import ErrorBoundary from './components/ErrorBoundary';
import { Spinner } from '@/modules/shared/components';
import UserNotFound from './components/UserNotFound';
import { EducationData, ExperienceData } from '../shared/types/shared.types';
import Skills from './components/sections/Skills';
import { set } from 'date-fns';
type ParamsType = { userName: string };

const ProfilePage: React.FC = () => {
  const { userName } = useParams<ParamsType>();
  const { data, isLoading, isError } = useUserInfo(userName!);
  const currentUserName = useUserStore((state) => state.user?.name);
  const [isEditing, setIsEditing] = useState(false);

  const { updateProfile, isLoading: isUpdating } = useProfileUpdate();
  const sameUser = userName === currentUserName;
  console.log(userName, currentUserName, sameUser);
  // State for all sections
  const [aboutMe, setAboutMe] = useState('');
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [education, setEducation] = useState<EducationData[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    setEducation(data?.education || []);
    setExperiences(data?.experience || []);
    setAboutMe(data?.description || '');
    setIsEditing(false);
    setSkills(data?.skills || []);
  }, [data]);
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes when exiting edit mode
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };
  const handleAboutMeDesc=(text:string)=>{
    
    setAboutMe("")
  }

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    console.log(aboutMe)

    // eslint-disable-next-line
    const updateData: any = {
      description: aboutMe,
      experience: experiences,
      education: education,
      skills: skills,
    };

    if (resume) {
      updateData.cv = resume;
    }

    if (profilePic) {
      updateData.profilepic = profilePic;
    }
    updateProfile({ sectionData: updateData, cb: () => setIsEditing(false) });
  };

  if (isLoading) return <Spinner size="lg" className="min-h-screen" />;
  if (isError || !data) return <UserNotFound />;

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<Spinner size="lg" className="min-h-screen" />}>
        <ErrorBoundary>
          <section className="w-full px-4 py-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-[90rem] rounded-xl bg-[#92E3A91A] p-3 md:p-4">
              <ProfileInfo
                isUserProfile={sameUser}
                isEditing={isEditing}
                isEditingLoading={isUpdating}
                onCancel={() => setIsEditing(false)}
                onEditToggle={() => setIsEditing(!isEditing)}
                user={data}
                onProfilePicChange={setProfilePic}
                onSave={handleSaveChanges}
              />
              <div className="mt-3 space-y-3 md:space-y-4">
                <AboutMe
                  isEditing={isEditing}
                  text={aboutMe}
                  onTextChange={handleAboutMeDesc}
                />
                <Experience
                  isEditing={isEditing}
                  experiences={experiences}
                  onExperiencesChange={setExperiences}
                />
                <Education
                  isEditing={isEditing}
                  education={education}
                  onEducationChange={setEducation}
                />
                <Skills
                  skills={skills}
                  isEditing={isEditing}
                  onSkillsChange={setSkills}
                />
                <Resume
                  isEditing={isEditing}
                  onResumeChange={setResume}
                  cv={data?.cv ?? undefined}
                />
              </div>
            </div>
          </section>
        </ErrorBoundary>
      </Suspense>
    </main>
  );
};

export default ProfilePage;
