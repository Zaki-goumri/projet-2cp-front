import { useState } from 'react';
import InfoCard from '../InfoCard';

interface AboutMeProps {
  isEditing: boolean;
  aboutMe:string;
}

const AboutMe = ({ isEditing ,aboutMe}: AboutMeProps) => {
  const [aboutText, setAboutText] = useState(aboutMe);

  return (
    <InfoCard
      onAdd={() => {}}
      icon={'assets/profile.svg'}
      name={'About Me'}
      isAddeable={false}
    >
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">About Me</h2>
          
        </div>
        {isEditing ? (
          <textarea
            className="w-full p-2 border rounded-lg"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Write something about yourself..."
          />
        ) : (
          <p className="text-gray-600">{aboutText || 'No information provided yet.'}</p>
        )}
      </div>
    </InfoCard>
  );
};

export default AboutMe; 