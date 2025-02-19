import React from 'react';
const AuthedHome = React.lazy(
  () => import("@/modules/features/home/Authedhome/page"),
);
const UnAuthedHome = React.lazy(
  () => import("@/modules/features/home/unAuthedhome/page"),
);
const HomaPage = () => {
  return (
    <div>
      <UnAuthedHome />
      {/* <AuthedHome /> */}
    </div>
  );
}
export default HomaPage;