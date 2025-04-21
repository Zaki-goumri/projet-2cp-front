import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface EducationProps {
  isEditing: boolean;
}

const Education = ({ isEditing }: EducationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educations, setEducations] = useState<EducationItem[]>([
    {
      id: '1',
      degree: 'Computer Engineering',
      institution: 'École supérieure en informatique - Sidi Bel Abbès',
      startDate: '2023-09-01',
      endDate: '2024-06-30',
      description: 'Specializing in software engineering and system design.'
    }
  ]);

  const handleAddEducation = (data: Omit<EducationItem, 'id'>) => {
    setEducations(prev => [
      ...prev,
      {
        ...data,
        id: Date.now().toString()
      }
    ]);
  };

  const handleDeleteEducation = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  return (
    <>
      <InfoCard
        icon={'assets/education.svg'}
        name={'Education'}
        isAddeable={isEditing}
        onAdd={() => setIsModalOpen(true)}
      >
        <div className="divide-y divide-gray-100">
          {educations.map((edu) => (
            <div key={edu.id} className="px-6 py-4 group">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.description && (
                    <p className="mt-2 text-gray-700">{edu.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEducation}
        type="education"
      />
    </>
  );
};

export default Education; 