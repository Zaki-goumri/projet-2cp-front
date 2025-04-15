import React from 'react';
const Signup = React.lazy(
  () => import('@/modules/landingPage/components/signup')
);
const Discovering = React.lazy(
  () => import('@/modules/landingPage/components/discovering')
);
const AppSection = React.lazy(
  () => import('@/modules/landingPage/components/appSection')
);
const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Discovering />
      <Signup />
      <AppSection />
    </div>
  );
};
export default LandingPage;
