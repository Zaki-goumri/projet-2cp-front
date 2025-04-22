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
import { useUserInfo } from './hooks/useUserService';
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
  const sameUser = userName === user?.name;

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
              onEditToggle={() => setIsEditing(!isEditing)}
              user={data}
            />
            <div className="mt-3 space-y-3 md:space-y-4">
              <AboutMe isEditing={isEditing} aboutMe={data?.description ?? ""} />
              <Experience isEditing={isEditing} userExperiences={data?.experience ?? []} />
              <Education isEditing={isEditing} userEducation={data?.education ?? []} />
              <Resume isEditing={isEditing} />
            </div>
          </div>
        </section>
      </ErrorBoundary>
    </main>
  );
};

export default ProfilePage;
