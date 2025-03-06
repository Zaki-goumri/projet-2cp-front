import React from 'react';
const AuthedHome = React.lazy(
  () => import("@/modules/features/home/Authedhome/page"),
);
const UnAuthedHome = React.lazy(
  () => import("@/modules/features/home/unAuthedhome/page"),
);
const HomaPage = () => {
  return (
    <div className='flex flex-col'>
      <UnAuthedHome />
      {/* <AuthedHome /> */}
    </div>
  );
}
export default HomaPage;