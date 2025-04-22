import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';
import { useProfileUpdate } from '../../hooks/useUserService';

interface Education {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

interface EducationProps {
  isEditing: boolean;
  userEducation: Education[];
}

const Education = ({ isEditing, userEducation }: EducationProps) => {
  const [education, setEducation] = useState<Education[]>(userEducation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateProfile, isLoading } = useProfileUpdate();

  const handleDelete = (id: string) => {
    const updatedEducation = education.filter(edu => edu.id !== id);
    setEducation(updatedEducation);
    updateProfile({ education: updatedEducation });
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: any) => {
    const newEducation: Education = {
      id: Date.now().toString(),
      company: data.company,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate
    };
    const updatedEducation = [...education, newEducation];
    setEducation(updatedEducation);
    updateProfile({ education: updatedEducation });
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
                <div key={edu.id} className="border-[#92E3A9] rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.company}</h3>
                      <p className="text-gray-600">{edu.role}</p>
                      <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
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
                          disabled={isLoading}
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