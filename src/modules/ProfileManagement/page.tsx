import { lazy } from 'react';

const ProfileInfo = lazy(() => import('./components/profileInfo'));
const AboutMe = lazy(() => import('./components/sections/AboutMe'));
const Experience = lazy(() => import('./components/sections/Experience')); 
const Education = lazy(() => import('./components/sections/Education'));
const Resume = lazy(() => import('./components/sections/Resume'));

const NavBar = lazy(() => import('@/modules/shared/components/navBar'));

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="w-full px-4 py-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem] rounded-xl bg-[#92E3A91A] p-3 md:p-4">
          <ProfileInfo />
          <div className="mt-3 space-y-3 md:space-y-4">
            <AboutMe />
            <Experience />
            <Education />
            <Resume />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
