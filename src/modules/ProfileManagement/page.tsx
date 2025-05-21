import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserInfo } from './hooks/useUserService';
import ProfileInfo from './components/profileInfo';
import AboutMe from './components/sections/AboutMe';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Resume from './components/sections/Resume';
import UserNotFound from './components/UserNotFound';
import { useProfileUpdate } from './hooks/useUserService';

const ProfileManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useUserInfo(id);
  const [isEditing, setIsEditing] = React.useState(false);
  const { updateProfile, isLoading: isUpdating } = useProfileUpdate();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#92E3A9] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <UserNotFound />;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (file: File) => {
    // TODO: Implement profile picture update
    console.log('Profile picture changed:', file);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <ProfileInfo
          isUserProfile={true}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          user={user}
          onProfilePicChange={handleProfilePicChange}
          isEditingLoading={isUpdating}
          onCancel={handleCancel}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <AboutMe
            isEditing={isEditing}
            text={user.description || ''}
            onTextChange={(text) => {
              // TODO: Implement description update
              console.log('Description changed:', text);
            }}
          />

          <Skills
            isEditing={isEditing}
            skills={user.skills || []}
            onSkillsChange={(skills) => {
              // TODO: Implement skills update
              console.log('Skills changed:', skills);
            }}
          />

          <Education
            isEditing={isEditing}
            education={user.education || []}
            onEducationChange={(education) => {
              // TODO: Implement education update
              console.log('Education changed:', education);
            }}
          />

          <Resume
            isEditing={isEditing}
            cv={user.cv}
            onCvChange={(file) => {
              // TODO: Implement CV update
              console.log('CV changed:', file);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
