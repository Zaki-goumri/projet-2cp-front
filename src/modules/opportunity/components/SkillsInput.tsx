import { useState } from 'react';
import { X } from 'lucide-react';

interface SkillsInputProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SkillsInput = ({ selectedSkills, onSkillsChange }: SkillsInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(inputValue.trim())) {
        onSkillsChange([...selectedSkills, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-center rounded-full bg-[#92E3A9]/20 px-3 py-1"
          >
            <span className="text-sm">{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 rounded-full p-1 hover:bg-[#92E3A9]/30"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#92E3A9] focus:outline-none focus:ring-1 focus:ring-[#92E3A9]"
      />
      <div className="flex flex-wrap gap-2">
        {['Figma', 'Flutter', 'Django', 'Node.js', 'NPM', 'Figma'].map(
          (suggestion) =>
            !selectedSkills.includes(suggestion) && (
              <button
                key={suggestion}
                onClick={() => {
                  onSkillsChange([...selectedSkills, suggestion]);
                }}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-[#92E3A9]/20"
              >
                {suggestion}
              </button>
            )
        )}
      </div>
    </div>
  );
};

export default SkillsInput; 