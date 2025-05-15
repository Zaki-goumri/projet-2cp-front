import React from 'react';
import { UserIcon, X } from '@/modules/shared/icons';

const UserNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="relative mb-4">
        <div className="bg-[#92E3A91A] p-6 rounded-full">
          <UserIcon className="w-12 h-12 text-[#92E3A9]" />
        </div>
        <div className="absolute bottom-1 right-1 bg-red-500 rounded-full p-1">
          <X className="w-4 h-4 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">User Not Found</h2>
      <p className="text-gray-600 max-w-md">
        The profile you're looking for doesn't exist or has been removed.
      </p>
    </div>
  );
};

export default UserNotFound; 