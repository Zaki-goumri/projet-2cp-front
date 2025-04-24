import { useState } from 'react';

const DescriptionInput = () => {
  const [description, setDescription] = useState('');

  return (
    <div className="space-y-2">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your Team's goals and purpose"
        rows={6}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#92E3A9] focus:outline-none focus:ring-1 focus:ring-[#92E3A9]"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Minimum 100 characters</span>
        <span>{description.length} / 1000</span>
      </div>
    </div>
  );
};

export default DescriptionInput; 