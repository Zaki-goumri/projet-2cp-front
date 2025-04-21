import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface AboutMeProps {
  isEditing: boolean;
}

const AboutMe = ({ isEditing }: AboutMeProps) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(
    'UI/UX designer and mobile developer passionate about creating intuitive and visually engaging digital experiences.'
  );
  const [tempBio, setTempBio] = useState(bio);

  const handleSave = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleCancel = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  return (
    <InfoCard
      icon={'assets/profile.svg'}
      name={'About Me'}
      isAddeable={false}
    >
      <div className="px-6 py-4">
        {isEditing && isEditingBio ? (
          <div className="space-y-4">
            <Textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              className="min-h-[100px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-[#92E3A9]"
              placeholder="Write something about yourself..."
            />
            <div className="flex justify-end space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="text-gray-600"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-[#92E3A9] hover:bg-[#7ED196] text-white"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className={`text-gray-700 text-base leading-relaxed ${isEditing ? 'cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors duration-200' : ''}`}
            onClick={() => isEditing && setIsEditingBio(true)}
          >
            {bio}
          </div>
        )}
      </div>
    </InfoCard>
  );
};

export default AboutMe; 