import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EditIcon, SaveIcon, CameraIcon, X } from '@/modules/shared/icons';
import { User } from '@/modules/shared/types';
import { Spinner } from '@/modules/shared/components';

interface ProfileInfoProps {
  isUserProfile: boolean;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  user?: User;
  onProfilePicChange: (file: File) => void;
  isEditingLoading: boolean;
  onCancel: () => void;
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

function ProfileInfo({
  isEditing,
  onEditToggle,
  user,
  isUserProfile,
  onProfilePicChange,
  onSave,
  isEditingLoading,
  onCancel,
}: ProfileInfoProps) {
  const profilePlaceHolder = '/assets/profile-placeholder.png';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profilepic ?? profilePlaceHolder);
  const [, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleImageClick = () => {
    if (isEditing) {
       
      fileInputRef.current?.click();
    }
  };

  console.log('profileImage', profileImage);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit');
      return;
    }

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a JPG, PNG, or WebP image');
      return;
    }

    setError(null);
    setSelectedFile(file);
    setProfileImage(URL.createObjectURL(file));
    onProfilePicChange(file);
  };

  return (
    <div className="flex flex-col rounded-xl bg-white p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="relative">
          <div
            className={`relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#92E3A9] ${isEditing ? 'cursor-pointer' : ''}`}
            onClick={handleImageClick}
          >
            <img
              src={profileImage || profilePlaceHolder}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {isEditing && (
              <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-200 hover:opacity-100">
                <CameraIcon className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <div className="mt-4 flex-1 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              {user?.name}
            </h1>
            {isUserProfile && (
              <div className="mt-3 flex space-x-2 sm:mt-0">
                {isEditing ? (
                  <>
                    <Button
                      onClick={onSave}
                      className="flex items-center justify-center space-x-2 rounded-xl bg-[#92E3A9] px-4 py-2 transition-colors duration-200 hover:bg-[#7ED196]"
                      disabled={isEditingLoading}
                    >
                      {isEditingLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <SaveIcon className="h-5 w-5" />
                          <span className="text-sm font-semibold">Save</span>
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={onCancel}
                      className="flex items-center justify-center space-x-2 rounded-xl bg-gray-200 px-4 py-2 transition-colors duration-200 hover:bg-gray-300"
                    >
                      <X className="h-5 w-5" />
                      <span className="text-sm font-semibold">Cancel</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={onEditToggle}
                    className="flex items-center justify-center space-x-2 rounded-xl bg-[#92E3A9] px-4 py-2 transition-colors duration-200 hover:bg-[#7ED196]"
                  >
                    <EditIcon className="h-5 w-5" />
                    <span className="text-sm font-semibold">Edit Profile</span>
                  </Button>
                )}
              </div>
            )}
          </div>
          <p className="mt-1 text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center sm:flex-row sm:space-x-8 md:mt-8 md:space-x-16 lg:space-x-24">
        <div className="mb-4 flex flex-col items-center sm:mb-0">
          <p className="text-xl font-bold text-gray-800">80</p>
          <p className="text-sm text-gray-500">InternShips</p>
        </div>

        <div className="hidden h-10 w-px bg-gray-200 sm:block"></div>

        <div className="mb-4 flex flex-col items-center sm:mb-0">
          <p className="text-xl font-bold text-gray-800">{user?.date_joined}</p>
          <p className="text-sm text-gray-500">Member Since</p>
        </div>

        <div className="hidden h-10 w-px bg-gray-200 sm:block"></div>

        <div className="flex flex-col items-center">
          <p className="text-xl font-bold text-gray-800">60%</p>
          <p className="text-sm text-gray-500">Profile Strength</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
