import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceProps {
  isEditing: boolean;
}

const Experience = ({ isEditing }: ExperienceProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: '1',
      role: 'UX/UI Designer',
      company: 'Yassir',
      startDate: '2022-02-22',
      endDate: '2022-03-03',
      description: 'Worked on creating intuitive and engaging user interfaces for mobile applications.'
    }
  ]);

  const handleAddExperience = (data: Omit<ExperienceItem, 'id'>) => {
    setExperiences(prev => [
      ...prev,
      {
        ...data,
        id: Date.now().toString()
      }
    ]);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  return (
    <>
      <InfoCard
        icon={'assets/bag.svg'}
        name={'Internship Experience'}
        isAddeable={isEditing}
        onAdd={() => setIsModalOpen(true)}
      >
        <div className="divide-y divide-gray-100">
          {experiences.map((exp) => (
            <div key={exp.id} className="px-6 py-4 group">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExperience}
        type="experience"
      />
    </>
  );
};

export default Experience; 