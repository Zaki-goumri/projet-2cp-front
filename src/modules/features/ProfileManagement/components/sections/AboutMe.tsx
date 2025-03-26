import React from 'react';
import InfoCard from '../InfoCard';

const AboutMe = () => {
  return (
    <InfoCard
      icon={'assets/profile.svg'}
      name={'About Me'}
      isAddeable={false}
    >
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base leading-relaxed">
          UI/UX designer and mobile developer passionate about creating
          intuitive and visually engaging digital experiences.
        </p>
      </div>
    </InfoCard>
  );
};

export default AboutMe; 