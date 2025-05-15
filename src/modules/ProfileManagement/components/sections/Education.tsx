import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EditIcon, TrashIcon } from '@/modules/shared/icons';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';
import { EducationData } from '@/modules/shared/types/shared.types';



interface EducationProps {
  isEditing: boolean;
  education: EducationData[];
  onEducationChange: (education: EducationData[]) => void;
}

const Education = ({
  isEditing,
  education,
  onEducationChange,
}: EducationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    const updatedEducation = education.filter((edu) => edu.id !== id);
    onEducationChange(updatedEducation);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: EducationData) => {
    const newEducation: EducationData = {
      id:new Date().toISOString(),
      start: data.start,
      end: data.end,
      institution: data.institution,
      degree: data.start,
    };
    const updatedEducation = [...education, newEducation];
    onEducationChange(updatedEducation);
    console.log('closing ...')
    setIsModalOpen(false);
  };

  return (
    <>
      <InfoCard
        icon="/assets/education.svg"
        name={'Education'}
        isAddeable={isEditing}
        onAdd={handleAdd}
      >
        <div className="px-6 py-4">
          {education.length === 0 ? (
            <p className="text-gray-600">No education added yet.</p>
          ) : (
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="rounded-lg border-[#92E3A9] p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.institution}</h3>
                      <p className="text-gray-600">{edu.degree}</p>
                      <p className="text-sm text-gray-500">
                        {edu.start} - {edu.end}
                      </p>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(edu.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </InfoCard>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        type="education"
      />
    </>
  );
};

export default Education;
