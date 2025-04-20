import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';

interface EducationProps {
  isEditing: boolean;
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const Education = ({ isEditing }: EducationProps) => {
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: any) => {
    const newEducation: EducationItem = {
      id: Date.now().toString(),
      degree: data.degree,
      institution: data.institution,
      period: `${data.startDate} - ${data.endDate}`,
      description: data.description || ''
    };
    setEducations([...educations, newEducation]);
    setIsModalOpen(false);
  };

  return (
    <>
      <InfoCard
        icon={'assets/education.svg'}
        name={'Education'}
        isAddeable={isEditing}
        onAdd={handleAdd}
      >
        <div className="px-6 py-4">
          {educations.length === 0 ? (
            <p className="text-gray-600">No education added yet.</p>
          ) : (
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.period}</p>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(edu.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-gray-700">{edu.description}</p>
                  )}
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