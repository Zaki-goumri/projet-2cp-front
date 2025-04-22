import { lazy, useState } from 'react';
import ProfileCard from './components/profileCard';
import ProfileInfo from './components/profileInfo';
import AboutMe from './components/sections/AboutMe';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Resume from './components/sections/Resume';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X } from 'lucide-react';
import { useUserStore } from '../shared/store/userStore';
import { User } from '../shared/store/userStore';
import { Params, useParams } from 'react-router';
import { useEffect } from 'react';

const NavBar = lazy(() => import('@/modules/shared/components/navBar'));

type ParamsType={userName:string}
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const { user } = useUserStore();
  const dummyUser: User = {
    id: 0,
    name: '',
    email: '',
    date_joined: '2025-05-03',
    type: 'dla3',
    picture: null,
    role: 'Student',
    skills: [],
    education: [],
    experience: [],
  };
  const {userName} =useParams<ParamsType>()
    return (
    <main className="min-h-screen bg-gray-50">
      <section className="w-full px-4 py-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem] rounded-xl bg-[#92E3A91A] p-3 md:p-4">
          <ProfileInfo
            isUserProfile={user?.name==userName}
            isEditing={isEditing}
            onEditToggle={handleEditToggle}
            user={user ?? undefined}
          />
          <div className="mt-3 space-y-3 md:space-y-4">
            <AboutMe isEditing={isEditing} aboutMe={'THis is a plaeholder'} />
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
