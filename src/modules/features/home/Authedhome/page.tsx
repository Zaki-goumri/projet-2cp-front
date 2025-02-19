import React from "react";
const NavBar = React.lazy(
  () => import("@/modules/features/home/Authedhome/components/navBar"),
);

const AuthedHome = () => {
  return <main>
  <NavBar />
  </main>;
};
export default AuthedHome;
