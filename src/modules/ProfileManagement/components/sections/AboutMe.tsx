import { useState } from 'react';
import InfoCard from '../InfoCard';

interface AboutMeProps {
  isEditing: boolean;
  text: string;
  onTextChange: (text: string) => void;
}

const AboutMe = ({ isEditing, text, onTextChange }: AboutMeProps) => {

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value==""){
      onTextChange("")
    }
    onTextChange(e.target.value);
  };

  const handleAddItem = () => {
  };

  return (
    <InfoCard
      icon="/assets/profile.svg"
      name={'About Me'}
      isAddeable={isEditing}
      onAdd={handleAddItem}
    >
      <div className="px-6 py-4">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#92E3A9]"
              rows={4}
              value={text}
              onChange={handleTextChange}
              placeholder="Tell us about yourself..."
            />
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre-line">
            {text || 'No information provided yet.'}
          </p>
        )}
      </div>
    </InfoCard>
  );
};

export default AboutMe; 
