import { lazy, useState } from 'react';
import ProfileCard from './components/profileCard';
import ProfileInfo from './components/profileInfo';
import AboutMe from './components/sections/AboutMe';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Resume from './components/sections/Resume';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X } from 'lucide-react';

const NavBar = lazy(() => import('@/modules/shared/components/navBar'));

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
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
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel Editing
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <ProfileInfo />
          <div className="mt-3 space-y-3 md:space-y-4">
            <AboutMe isEditing={isEditing} />
            <Experience isEditing={isEditing} />
            <Education isEditing={isEditing} />
            <Resume isEditing={isEditing} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage; 