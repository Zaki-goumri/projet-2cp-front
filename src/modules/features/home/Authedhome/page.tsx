import React from "react";
const NavBar = React.lazy(
  () => import("@/modules/features/home/Authedhome/components/navBar"),
);
const SearchSection = React.lazy(
  () => import("@/modules/features/home/Authedhome/components/searchSection"),
);
const Oppertunities = React.lazy(
  () => import("@/modules/features/home/Authedhome/components/oppertunities"),
);

const AuthedHome = () => {
  return (
    <main  >
  <NavBar />
  <SearchSection />
  <Oppertunities />
  </main>

  )};
export default AuthedHome;
