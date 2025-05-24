import React, { useRef, useState } from 'react';
import InfoCard from '../InfoCard';
import { Attachment } from '@/modules/shared/types/shared.types';
import { FormatFileSize } from '@/lib/utils';

interface ResumeProps {
  isEditing: boolean;
  onResumeChange: (file: File) => void;
  cv?: Attachment;
}

const ResumeSection = ({ isEditing, cv, onResumeChange }: ResumeProps) => {
  const [resumes, setResumes] = useState<Attachment | undefined>(cv);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newResume: Attachment = {
        name: file.name,
        size: file.size,
        link: URL.createObjectURL(file),
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      setResumes(newResume);
      onResumeChange(file);
    }
  };

  const handleDelete = () => {
    setResumes(undefined);
  };
  const displaySize = FormatFileSize(cv?.size || 0);

  return (
    <div className="space-y-2">
      {resumes ? (
        <a
          download
          href={cv?.link}
          key={resumes.name}
          className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2.5 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex min-w-0 items-center space-x-3">
            <div className="flex-shrink-0 rounded-lg bg-red-50 p-2 transition-colors duration-200 group-hover:bg-red-100">
              <img src="/assets/pdf.svg" alt="PDF" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {resumes.name}
              </h3>
              <div className="mt-0.5 flex items-center text-xs text-gray-500">
                <span>{resumes.createdAt}</span>
                <span className="mx-1.5">•</span>
                <span>{resumes.size}</span>
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
                onClick={() => handleDelete()}
              >
                <img src="/assets/trash.svg" alt="Delete" />
              </button>
            )}
          </div>
        </a>
      ) : (
        <div className="py-4 text-center">
          <p className="text-gray-500">No resume uploaded yet.</p>
        </div>
      )}

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

const Resume = ({ isEditing, onResumeChange, cv }: ResumeProps) => {
  // const [, setFileName] = useState<string | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setFileName(file.name);
  //     onResumeChange(file);
  //   }
  // };

  // const handleUploadClick = () => {
  //   fileInputRef.current?.click();
  // };

  return (
    <InfoCard
      icon="/assets/resume.svg"
      name={'Resume'}
      isAddeable={false}
      onAdd={() => {}}
    >
      <div className="px-6 py-4">
        <ResumeSection
          isEditing={isEditing}
          onResumeChange={onResumeChange}
          cv={cv}
        />
        {isEditing ? (
          <div className="space-y-4"></div>
        ) : (
          <div className="py-4 text-center"></div>
        )}
      </div>
    </InfoCard>
  );
};

export default Resume;
