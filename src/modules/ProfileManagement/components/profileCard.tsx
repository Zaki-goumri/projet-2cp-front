import React from 'react';

function ProfileCard() {
  return (
    <div className="group relative">
      <img
        className="h-24 w-24 rounded-full border-2 border-white object-cover shadow-md transition-transform duration-200 group-hover:scale-105 md:h-32 md:w-32"
        src="assets/servicesOfsignup/profilePicTemp.png"
        alt="Profile"
      />
    </div>
  );
}

export default ProfileCard;
