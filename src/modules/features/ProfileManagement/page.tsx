import { lazy } from 'react';
import ProfileInfo from './components/profileInfo';
const NavBar = lazy(() => import('@/modules/shared/components/navBar'));

const ProfilePage = () => {
  return (
    <main>
      <NavBar />
      <section className="mx-60 bg-[#92E3A91A] p-0.5">
        <ProfileInfo />
        <InfoCard
          icon={'assets/profile.svg'}
          name={'About Me'}
          isAddeable={false}
        >
          <div>
            <p>
              UI/UX designer and mobile developer passionate about creating
              intuitive and visually engaging digital experiences.
            </p>
          </div>
        </InfoCard>
        <InfoCard
          icon={'assets/bag.svg'}
          name={'Internship experience'}
          isAddeable={true}
        >
          <p>
            I am a cool guy Experiecde in lorum ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </InfoCard>
        <InfoCard
          icon={'assets/education.svg'}
          name={'Education'}
          isAddeable={true}
        >
          <p>
            I am a cool guy Experiecde in lorum ipsum dolor sit amet,
            consectetur adipiscing elit. STUDY in ESI BTW
          </p>
        </InfoCard>
        <InfoCard icon={'assets/resume.svg'} name={'Resume'} isAddeable={true}>
          <p>
            I am a cool guy Experiecde in lorum ipsum dolor sit amet,
            consectetur adipiscing elit. STUDY in ESI BTW
          </p>
        </InfoCard>
      </section>
    </main>
  );
};

export default ProfilePage;
