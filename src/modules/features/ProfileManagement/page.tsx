import { lazy, useState } from 'react';
import ProfileCard from './components/profileCard';
import ProfileInfo from './components/profileInfo';
import AboutMe from './components/sections/AboutMe';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Resume from './components/sections/Resume';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X } from 'lucide-react';
import { useProfileUpdate } from '../../hooks/useUserService';
import { useUserStore } from '@/modules/shared/store/userStore';

const NavBar = lazy(() => import('@/modules/shared/components/navBar'));

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { updateProfile, isLoading } = useProfileUpdate();
  
  // State for all sections
  const [aboutMe, setAboutMe] = useState(user?.description || '');
  const [experiences, setExperiences] = useState(user?.experience || []);
  const [education, setEducation] = useState(user?.education || []);
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

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      <section className="w-full px-4 md:px-6 lg:px-8 py-4">
        <div className="mx-auto max-w-[90rem] bg-[#92E3A91A] rounded-xl p-3 md:p-4">
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleEditToggle}
              className={`${
                isEditing 
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                  : 'bg-[#92E3A9] hover:bg-[#7ED196] text-white'
              }`}
              disabled={isLoading}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <ProfileInfo 
            isEditing={isEditing} 
            onProfilePicChange={setProfilePic} 
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
    </main>
  );
};

export default ProfilePage; 