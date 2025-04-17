import React from 'react';
import InfoCard from '../InfoCard';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
}

const EducationList = () => {
  const educations: EducationItem[] = [
    {
      degree: 'Computer Engineering',
      institution: 'École supérieure en informatique - Sidi Bel Abbès',
      period: 'Sep 2023 - Jun 2024 • 5 Years',
      status: 'Student'
    },
    {
      degree: 'Computer Engineering',
      institution: 'École supérieure en informatique - Sidi Bel Abbès',
      period: 'Sep 2023 - Jun 2024 • 5 Years',
      status: 'Student'
    }
  ];

  return (
    <div className="space-y-6">
      {educations.map((edu, index) => (
        <div key={index} className="border-b border-gray-200 last:border-0 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600 mt-1">{edu.institution}</p>
              <p className="text-sm text-gray-500 mt-1">{edu.period}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {edu.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Education = () => {
  return (
    <InfoCard
      icon={'assets/education.svg'}
      name={'Education'}
      isAddeable={true}
    >
      <div className="px-6 py-4">
        <EducationList />
      </div>
    </InfoCard>
  );
};

export default Education; 