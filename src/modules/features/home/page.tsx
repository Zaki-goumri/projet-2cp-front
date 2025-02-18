import React from 'react';
const UnAuthedHome = React.lazy(
  () => import("@/modules/features/home/unAuthedhome/page"),
);
const HomaPage = () => {
  return (
    <div>
      <UnAuthedHome />
    </div>
  );
}
export default HomaPage;