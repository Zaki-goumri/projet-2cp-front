import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

interface ExperienceProps {
  isEditing: boolean;
  experiences: Experience[];
  onExperiencesChange: (experiences: Experience[]) => void;
}

const Experience = ({ isEditing, experiences, onExperiencesChange }: ExperienceProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    onExperiencesChange(updatedExperiences);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: any) => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: data.company,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate
    };
    const updatedExperiences = [...experiences, newExperience];
    onExperiencesChange(updatedExperiences);
    setIsModalOpen(false);
  };

  return (
    <>
      <InfoCard
        icon="/assets/bag.svg"
        name={'Experience'}
        isAddeable={false}
        onAdd={handleAdd}
      >
        <div className="px-6 py-4">
          {' '}
          {experiences.length === 0 ? (
            <p className="text-gray-600">No experience added yet.</p>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="rounded-lg border-[#92E3A9] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{exp.company}</h3>
                      <p className="text-gray-600">{exp.role}</p>
                      <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(exp.id)}
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
        type="experience"
      />
    </>
  );
};

export default Experience; 