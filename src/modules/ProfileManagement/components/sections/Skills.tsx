import { useState } from 'react';
import InfoCard from '../InfoCard';
import { X, PlusCircle } from 'lucide-react';

interface SkillsProps {
  isEditing: boolean;
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const Skills = ({ isEditing, skills, onSkillsChange }: SkillsProps) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      onSkillsChange(updatedSkills);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    onSkillsChange(updatedSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <InfoCard
      icon="/assets/skills.svg"
      name={'Skills'}
      isAddeable={isEditing}
      onAdd={handleAddSkill}
    >
      <div className="px-6 py-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#92E3A9]"
              />
              <button
                onClick={handleAddSkill}
                className="p-2 text-[#92E3A9] hover:text-[#6cb985]"
              >
                <PlusCircle size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-[#92E3A91A] rounded-full"
                >
                  <span className="text-sm">{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-[#92E3A91A] rounded-full"
                >
                  <span className="text-sm">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No skills added yet.</p>
            )}
          </div>
        )}
      </div>
    </InfoCard>
  );
};

export default Skills;
