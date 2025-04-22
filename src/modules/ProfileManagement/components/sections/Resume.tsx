import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import InfoCard from '../InfoCard';

interface ResumeFile {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

interface ResumeProps {
  isEditing: boolean;
  onResumeChange: (file: File) => void;
}

const ResumeList = ({isEditing}:ResumeProps) => {
  const [resumes, setResumes] = useState<ResumeFile[]>([
    {
      id: '1',
      name: 'Bentaleb Mohamed - CV - UI/UX Designer',
      type: 'PDF',
      date: 'Feb 12, 2023',
      size: '2.5 MB'
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert size to MB
      const size = (file.size / (1024 * 1024)).toFixed(1);
      
      const newResume: ResumeFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        size: `${size} MB`
      };

      setResumes(prev => [...prev, newResume]);
    }
  };

  const handleDelete = (id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id));
  };

  return (
    <div className="space-y-2">
      {resumes.map((resume) => (
        <div 
          key={resume.id} 
          className="group flex items-center justify-between bg-white rounded-lg p-2.5 hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-100 transition-colors duration-200 flex-shrink-0">
              <img src="/assets/pdf.svg" alt="PDF"  />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">{resume.name}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
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
           {isEditing&&(   <button 
              className="p-1.5 rounded-full hover:bg-red-50 transition-colors duration-200"
              onClick={() => handleDelete(resume.id)}
            >
              <img src="/assets/trash.svg" alt="Delete" />
            </button>  )}
          </div>
        </div>
      ))}
      
     {isEditing&&( <>  <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="w-full mt-3 flex items-center justify-center space-x-2 py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 transition-all duration-200"
      >
        <span className="text-sm font-medium">Upload New Resume</span>
      </button> </> )}
    </div>
  );
};

const Resume = ({ isEditing, onResumeChange }: ResumeProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onResumeChange(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <InfoCard
      icon="/assets/resume.svg"
      name={'Resume'}
      isAddeable={false}
      onAdd={() => {}}
    >
      <div className="px-6 py-4">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <Button
              onClick={handleUploadClick}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>{fileName || 'Upload Resume'}</span>
            </Button>
            <p className="text-sm text-gray-500">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            {fileName ? (
              <p className="text-gray-700">{fileName}</p>
            ) : (
              <p className="text-gray-500">No resume uploaded yet.</p>
            )}
          </div>
        )}
      </div>
    </InfoCard>
  );
};

export default Resume;