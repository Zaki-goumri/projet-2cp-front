import React, { useRef, useState } from 'react';
import ProfileCard from './profileCard';
import { Button } from '@/components/ui/button';
import { Edit2, Save, Camera } from 'lucide-react';
import { User } from '@/modules/internships&problems/types/internshipsAndProblems.types';

interface ProfileInfoProps {
  isEditing: boolean;
  onEditToggle: () => void;
  user?:User
}

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function ProfileInfo({ isEditing, onEditToggle,user }: ProfileInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePlaceHolder="https://shorturl.at/6SX4W";
  const [profileImage, setProfileImage] = useState<string>(user?.profilePicture ?? profilePlaceHolder);
  const [error, setError] = useState<string>("");

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError("Only .jpg, .jpeg, .png and .webp formats are supported");
        return;
      }
      // Clear any previous errors
      setError("");

      // Create a URL for the image preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
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
              src={profileImage} 
              alt="Profile" 
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
            onChange={handleImageChange}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="mt-4 md:mt-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{user?.name}</h1>
            <Button
              onClick={onEditToggle}
              className={`mt-3 sm:mt-0 bg-[#92E3A9]! flex items-center text-white justify-center space-x-2 rounded-xl transition-colors duration-200 py-2 px-4 text-white! ${
                isEditing 
                  ? ' hover:bg-[#7ED196]' 
                  : 'hover:bg-[#7ED196]'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="h-5 w-5" />
                  <span className="text-sm font-semibold">Save Changes</span>
                </>
              ) : (
                <>
                  <Edit2 className="h-5 w-5" />
                  <span className="text-sm font-semibold">Edit Profile</span>
                </>
              )}
            </Button>
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
          <p className="text-xl font-bold text-gray-800">{user?.createdAt??"2025-05-03"}</p>
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
