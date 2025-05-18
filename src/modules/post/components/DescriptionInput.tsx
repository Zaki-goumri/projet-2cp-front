import { useState } from 'react';

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionInput = ({ value = '', onChange }: DescriptionInputProps) => {
  const characterCount = value?.length || 0;
  const maxLength = 5000; 

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a detailed description of the internship..."
        rows={6}
        maxLength={maxLength}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-[#92E3A9] focus:outline-none focus:ring-1 focus:ring-[#92E3A9]"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Minimum 50 characters</span>
        <span>{characterCount} / {maxLength}</span>
      </div>
    </div>
  );
};

export default DescriptionInput; 