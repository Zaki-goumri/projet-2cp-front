import React, { useRef, useState } from 'react';
import InfoCard from '../InfoCard';
import { ResumeFile } from '../../types/profile.types';

const ResumeList = ({ isEditing }: ResumeProps) => {
  const [resumes, setResumes] = useState<ResumeFile[]>([
    {
      id: '1',
      name: 'Bentaleb Mohamed - CV - UI/UX Designer',
      type: 'PDF',
      date: 'Feb 12, 2023',
      size: '2.5 MB',
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const size = (file.size / (1024 * 1024)).toFixed(1);
      const newResume: ResumeFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        size: `${size} MB`,
      };

      setResumes((prev) => [...prev, newResume]);
    }
  };

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
  };

  return (
    <div className="space-y-2">
      {resumes.map((resume) => (
        <div
          key={resume.id}
          className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2.5 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex min-w-0 items-center space-x-3">
            <div className="flex-shrink-0 rounded-lg bg-red-50 p-2 transition-colors duration-200 group-hover:bg-red-100">
              <img src="/assets/pdf.svg" alt="PDF" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {resume.name}
              </h3>
              <div className="mt-0.5 flex items-center text-xs text-gray-500">
                <span>{resume.date}</span>
                <span className="mx-1.5">•</span>
                <span>{resume.size}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            {/* TODO: Add download button */}
            {/* <button 
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <img src="assets/download.svg" alt="Download" className="h-4 w-4" />

            </button> */}
            {isEditing && (
              <button
                className="rounded-full p-1.5 transition-colors duration-200 hover:bg-red-50"
                onClick={() => handleDelete(resume.id)}
              >
                <img src="/assets/trash.svg" alt="Delete" />
              </button>
            )}
          </div>
        </div>
      ))}

      {isEditing && (
        <>
          {' '}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-gray-600 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700"
          >
            <span className="text-sm font-medium">Upload New Resume</span>
          </button>{' '}
        </>
      )}
    </div>
  );
};

interface ResumeProps {
  isEditing: boolean;
}
const Resume = ({ isEditing }: ResumeProps) => {
  return (
    <InfoCard
      icon={'/assets/resume.svg'}
      name={'Resume'}
      isAddeable={false}
      onAdd={() => {}}
    >
      <div className="p-3">
        <ResumeList isEditing={isEditing} />
      </div>
    </InfoCard>
  );
};

export default Resume;

