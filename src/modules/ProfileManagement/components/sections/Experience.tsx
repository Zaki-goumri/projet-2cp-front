import React from 'react';
import InfoCard from '../InfoCard';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

const ExperienceList = () => {
  const experiences: ExperienceItem[] = [
    {
      role: 'UX/UI Designer',
      company: 'Yassir',
      duration: 'Feb 22 - Mar 3 • 15 days',
      description: 'Worked on creating intuitive and engaging user interfaces for mobile applications.'
    }
  ];

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="border-b border-gray-200 last:border-0 pb-4">
          <h3 className="text-lg font-semibold text-gray-800">{exp.role}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <span>{exp.company}</span>
            <span className="mx-2">•</span>
            <span>{exp.duration}</span>
          </div>
          <p className="mt-2 text-gray-700">{exp.description}</p>
        </div>
      ))}
    </div>
  );
};

const Experience = () => {
  return (
    <InfoCard
      icon={'assets/bag.svg'}
      name={'Internship Experience'}
      isAddeable={true}
    >
      <div className="px-6 py-4">
        <ExperienceList />
      </div>
    </InfoCard>
  );
};

export default Experience; 