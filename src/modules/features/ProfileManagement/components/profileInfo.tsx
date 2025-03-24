import React from 'react';
import ProfileCard from './profileCard';

function ProfileInfo() {
  return (
    <div className="flex flex-col rounded-xl bg-white p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <ProfileCard />
        <div className="mt-4 md:mt-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Bentaleb Mohammed</h1>
            <button className="mt-3 sm:mt-0 flex items-center justify-center space-x-2 rounded-xl bg-[#92E3A9] hover:bg-[#83d69a] transition-colors duration-200 py-2 px-4">
              <span className="text-sm font-semibold text-white">Edit profile</span>
              <img src="assets/edit.svg" alt="edit" className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-gray-600">mohammedBen@gmail.com</p>
        </div>
      </div>

      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center sm:space-x-8 md:space-x-16 lg:space-x-24">
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <p className="text-xl font-bold text-gray-800">80</p>
          <p className="text-sm text-gray-500">InternShips</p>
        </div>
        
        <div className="hidden sm:block w-px h-10 bg-gray-200"></div>
        
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <p className="text-xl font-bold text-gray-800">03/03/25</p>
          <p className="text-sm text-gray-500">Member Since</p>
        </div>
        
        <div className="hidden sm:block w-px h-10 bg-gray-200"></div>
        
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold text-gray-800">60%</p>
          <p className="text-sm text-gray-500">Profile Strength</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
