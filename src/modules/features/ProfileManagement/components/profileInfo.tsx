import React from 'react';
import ProfileCard from './profileCard';

function ProfileInfo() {
  return (
    <div className="m-10 flex flex-col rounded-4xl bg-white p-10">
      <ProfileCard />
      <div className="mx-4 mt-4 flex justify-between">
        <h1 className="text-3xl font-semibold">Bentaleb Mohammed</h1>
        <button className="flex justify-center gap-4 rounded-2xl bg-[#92E3A9] p-2 px-3 text-sm font-semibold">
          <p className="text-lg font-semibold text-white">Edit profile</p>
          <img src="assets/edit.svg" alt="edit" className="h-6 w-6" />
        </button>
      </div>
      <p className="mx-4 text-gray-600">mohammedBen@gmail.com</p>
      <section className="flex items-center justify-center gap-40 text-center mt-10 text-[#B2B2B2]">
        <div className="flex-col items-center justify-center">
          <p className="font-bold">80</p>
          <p>InternShips</p>
        </div>
        <div className="flex h-10 w-0.5 bg-[#B2B2B280]"></div>
        <div className="flex-col items-center justify-center">
          <p className="font-bold">03/03/25</p>

          <p>Member Since</p>
        </div>
        <div className="flex h-10 w-0.5 bg-[#B2B2B280]"></div>
        <div className="flex-col items-center justify-center">
          <p className="font-bold">60%</p>
          <p>Profile Strength</p>
        </div>
      </section>
    </div>
  );
}

export default ProfileInfo;
