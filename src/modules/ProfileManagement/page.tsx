import { lazy, Suspense, useState } from 'react';
import ProfileCard from './components/profileCard';
import ProfileInfo from './components/profileInfo';
import AboutMe from './components/sections/AboutMe';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Resume from './components/sections/Resume';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X } from 'lucide-react';
import { useUserStore } from '../shared/store/userStore';
import { User } from '../auth/signin/types/signin.types';
import { useParams } from 'react-router';
import { useUserInfo, useProfileUpdate } from './hooks/useUserService';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from '../shared/components/Spinner';
import UserNotFound from './components/UserNotFound';

const NavBar = lazy(() => import('@/modules/shared/components/navBar'));

type ParamsType = { userName: string };

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { userName } = useParams<ParamsType>();
  const { data, isLoading, isError } = useUserInfo(userName!);
  const { updateProfile, isLoading: isUpdating } = useProfileUpdate(() => setIsEditing(false));
  const sameUser = userName === user?.name;

  // State for all sections
  const [aboutMe, setAboutMe] = useState(data?.description || '');
  const [experiences, setExperiences] = useState(data?.experience || []);
  const [education, setEducation] = useState(data?.education || []);
  const [resume, setResume] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes when exiting edit mode
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    const updateData: any = {
      description: aboutMe,
      experience: experiences,
      education: education,
    };
    
    if (resume) {
      updateData.cv = resume;
    }
    
    if (profilePic) {
      updateData.profilepic = profilePic;
    } 
    updateProfile(updateData);
  };

  if (isLoading) return <Spinner size="lg" className="min-h-screen" />;
  if (isError || !data) return <UserNotFound />;

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<Spinner size="lg" className="min-h-screen" />}>
      </Suspense>
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
                onTextChange={setAboutMe} 
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
              <Resume 
                isEditing={isEditing} 
                onResumeChange={setResume} 
              />
            </div>
          </div>
        </section>
      </ErrorBoundary>
    </main>
  );
};

export default ProfilePage;
