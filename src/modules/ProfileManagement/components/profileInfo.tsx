import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Save, Camera, X } from 'lucide-react';
import { User } from '@/modules/shared/store/userStore';
import { useUpdateUser } from '../hooks/useUserService';
import Spinner from '@/modules/shared/components/Spinner';
import { UpdateUserData } from '../services/userService';

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
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

function ProfileInfo({ isEditing, onEditToggle, user, isUserProfile, onProfilePicChange,onSave,isEditingLoading,onCancel }: ProfileInfoProps) {
  const profilePlaceHolder = "/assets/profile-placeholder.png";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>(profilePlaceHolder);

  const isValidBlobUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'blob:' && parsedUrl.origin === window.location.origin;
    } catch {
      return false;
    }
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
    const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

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
    const objectUrl = URL.createObjectURL(file);
    if (isValidBlobUrl(objectUrl)) {
      setProfileImage(objectUrl);
    } else {
      setError('Invalid file URL');
    }
    onProfilePicChange(file);
  };


  return (
    <div className="flex flex-col rounded-xl bg-white p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="relative">
          <div 
            className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#92E3A9] ${isEditing ? 'cursor-pointer' : ''}`}
            onClick={handleImageClick}
          >
            <img 
              src={isValidBlobUrl(profileImage) ? profileImage : profilePlaceHolder} 
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-8 h-8 text-white" />
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="mt-4 md:mt-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{user?.name}</h1>
            {isUserProfile && (
              <div className="mt-3 sm:mt-0 flex space-x-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={onSave}
                      className="flex items-center justify-center space-x-2 rounded-xl transition-colors duration-200 py-2 px-4 bg-[#92E3A9] hover:bg-[#7ED196]"
                      disabled={isEditingLoading}
                    >
                      {isEditingLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          <span className="text-sm font-semibold">Save</span>
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={onCancel}
                      className="flex items-center justify-center space-x-2 rounded-xl transition-colors duration-200 py-2 px-4 bg-gray-200 hover:bg-gray-300"
                    >
                      <X className="h-5 w-5" />
                      <span className="text-sm font-semibold">Cancel</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={onEditToggle}
                    className="flex items-center justify-center space-x-2 rounded-xl transition-colors duration-200 py-2 px-4 bg-[#92E3A9] hover:bg-[#7ED196]"
                  >
                    <Edit2 className="h-5 w-5" />
                    <span className="text-sm font-semibold">Edit Profile</span>
                  </Button>
                )}
              </div>
            )}
          </div>
          <p className="mt-1 text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center sm:space-x-8 md:space-x-16 lg:space-x-24">
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <p className="text-xl font-bold text-gray-800">80</p>
          <p className="text-sm text-gray-500">InternShips</p>
        </div>
        
        <div className="hidden sm:block w-px h-10 bg-gray-200"></div>
        
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <p className="text-xl font-bold text-gray-800">{user?.date_joined}</p>
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
