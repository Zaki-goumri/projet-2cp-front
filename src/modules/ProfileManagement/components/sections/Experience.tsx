import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';
import { ExperienceItem,ExperienceProps } from '../../types/profile.types';

const Experience = ({ isEditing }: ExperienceProps) => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: any) => {
    const newExperience: ExperienceItem = {
      id: Date.now().toString(),
      role: data.role,
      title: data.role,
      company: data.company,
      period: `${data.startDate} - ${data.endDate}`,
      description: data.description,
    };
    setExperiences([...experiences, newExperience]);
    setIsModalOpen(false);
  };

  return (
    <>
      <InfoCard
        icon="assets/bag.svg"
        name={'Internship Experience'}
        isAddeable={isEditing}
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
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.period}</p>
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
                  <p className="mt-2 text-gray-700">{exp.description}</p>
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

