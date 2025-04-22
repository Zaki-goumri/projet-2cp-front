import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import InfoCard from '../InfoCard';
import { Attachment } from '@/modules/shared/types/attachement';
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
  cv?: Attachment,
}

const ResumeSection = ({isEditing,cv}:ResumeProps) => {
  const testResume:Attachment={
    id: '1',
    fileName: 'test.pdf',
    fileType: 'application/pdf',
    fileSize: '100',
    fileUrl: 'https://example.com/test.pdf',
    type: 'pdf',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01'
  }
  const [resumes, setResumes] = useState<Attachment|undefined>(cv);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert size to MB
      const size = (file.size / (1024 * 1024)).toFixed(1);
      
      const newResume: Attachment = {

        id: Date.now().toString(),
        fileName: file.name,
        fileType: file.type.split('/')[1].toUpperCase(),
        fileSize: `${size} MB`,
        fileUrl: URL.createObjectURL(file),
        type: file.type.split('/')[1].toUpperCase(),
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      };

      setResumes(newResume);
    }
  };

  const handleDelete = (id: string) => {
    setResumes(undefined);
  };

  return (
    <div className="space-y-2">
      {resumes?(
        <div 
          key={resumes.id} 
          className="group flex items-center justify-between bg-white rounded-lg p-2.5 hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-100 transition-colors duration-200 flex-shrink-0">
              <img src="/assets/pdf.svg" alt="PDF"  />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">{resumes.fileName}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <span>{resumes.createdAt}</span>
                <span className="mx-1.5">•</span>
                <span>{resumes.fileSize}</span>
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
              onClick={() => handleDelete(resumes.id)}
            >
              <img src="/assets/trash.svg" alt="Delete" />
            </button>  )}
          </div>
        </div>
      ):(
        <div className="text-center py-4">
          <p className="text-gray-500">No resume uploaded yet.</p>
        </div>
      )}
      
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

const Resume = ({ isEditing, onResumeChange,cv }: ResumeProps) => {
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

            <ResumeSection isEditing={isEditing} onResumeChange={onResumeChange} cv={cv} />
        {isEditing ? (
          <div className="space-y-4">
          </div>
        ) : (
          <div className="text-center py-4">
                      </div>
        )}
      </div>
    </InfoCard>
  );
};

export default Resume;