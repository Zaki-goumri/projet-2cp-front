import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import InfoCard from '../InfoCard';
import AddItemModal from '../modals/AddItemModal';
import { ExperienceData } from '@/modules/shared/store/userStore';

interface ExperienceProps {
  isEditing: boolean;
  userExperiences:ExperienceData[];
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  starDate:string;
  endDate:string;
}

const Experience = ({ isEditing ,userExperiences}: ExperienceProps) => {
  const [experiences, setExperiences] = useState<ExperienceData[]>(userExperiences);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: any) => {
    const newExperience: ExperienceData= {
      id: Date.now().toString(),
      role: data.role,
      company: data.company,
      startDate:data.startDate,
      endDate:data.endDate
    };
    setExperiences([...experiences, newExperience]);
    setIsModalOpen(false);
  };

  return (
    <>
      <InfoCard
        icon={'/assets/bag.svg'}
        name={'Internship Experience'}
        isAddeable={isEditing}
        onAdd={handleAdd}
      >
        <div className="px-6 py-4">
          {experiences.length === 0 ? (
            <p className="text-gray-600">No experience added yet.</p>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-[#92E3A9] rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.startDate} -  {exp.endDate}</p>


                    </div>
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(exp.id)}>
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