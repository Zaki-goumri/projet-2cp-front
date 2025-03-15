import React from 'react';
const NavBar = React.lazy(() => import('@/modules/shared/components/navBar'));
const Signup = React.lazy(
  () => import('@/modules/features/landingPage/components/signup')
);
const Discovering = React.lazy(
  () => import('@/modules/features/landingPage/components/discovering')
);
const AppSection = React.lazy(
  () => import('@/modules/features/landingPage/components/appSection')
);
const Footer = React.lazy(() => import('@/modules/shared/components/footer'));
const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Discovering />
      <Signup />
      <AppSection />
      <Footer />
    </div>
  );
};
export default LandingPage;
