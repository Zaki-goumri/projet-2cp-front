import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';
import { EducationData } from '@/modules/shared/types/shared.types';

interface Education {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

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

  const handleModalSubmit = (data: Education) => {
    const newEducation: EducationData = {
      id: Date.now().toString(),
      company: data.company,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate,
      institution: data.company,
      degree: data.role,
      description: '',
      attachments: [],
      type: 'education',
    };
    const updatedEducation = [...education, newEducation];
    onEducationChange(updatedEducation);
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
                      <h3 className="font-semibold">{edu.company}</h3>
                      <p className="text-gray-600">{edu.role}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(edu.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
