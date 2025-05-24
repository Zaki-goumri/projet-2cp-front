import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, User, Loader2 } from 'lucide-react';
import { generateCV } from '../services/global-error.service';
import { toast } from 'react-toastify';
interface CVBuilderDialogProps {
  userProfile: any; // Replace with your user profile type
}

const CVBuilderDialog: React.FC<CVBuilderDialogProps> = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'profile' | 'custom' | null>(null);
  const [customInfo, setCustomInfo] = useState({
    skills: '',
    experience: '',
    education: '',
    projects: '',
    achievements: '',
  });


  const handleGenerateCV = async () => {
    try {
      setIsLoading(true);
      const cvData = selectedOption === 'profile' ? userProfile : customInfo;
      const cvUrl = await generateCV(cvData);
      
      // Create a temporary link to download the CV
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'my-cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Your CV has been generated and downloaded.');
    } catch (error) {
      toast.error('Failed to generate CV. Please try again.');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#92E3A9]! text-white! hover:bg-[#4A9D66]!">
          <FileText className="h-4 w-4" />
          Build Your CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white! text-gray-900!">
        <DialogHeader>
          <DialogTitle className="text-gray-900!">Build Your CV</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!selectedOption ? (
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-900! hover:bg-gray-100!"
                onClick={() => setSelectedOption('profile')}
              >
                <User className="h-4 w-4" />
                Use Profile Information
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-900! hover:bg-gray-100!"
                onClick={() => setSelectedOption('custom')}
              >
                <FileText className="h-4 w-4" />
                Use Custom Information
              </Button>
            </div>
          ) : selectedOption === 'custom' ? (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="skills" className="text-gray-900!">Skills</label>
                <textarea
                  id="skills"
                  value={customInfo.skills}
                  onChange={(e) => setCustomInfo({ ...customInfo, skills: e.target.value })}
                  className="rounded-md border p-2 text-gray-900! bg-white!"
                  placeholder="Enter your skills (comma-separated)"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="experience" className="text-gray-900!">Experience</label>
                <textarea
                  id="experience"
                  value={customInfo.experience}
                  onChange={(e) => setCustomInfo({ ...customInfo, experience: e.target.value })}
                  className="rounded-md border p-2 text-gray-900! bg-white!"
                  placeholder="Describe your work experience"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="education" className="text-gray-900!">Education</label>
                <textarea
                  id="education"
                  value={customInfo.education}
                  onChange={(e) => setCustomInfo({ ...customInfo, education: e.target.value })}
                  className="rounded-md border p-2 text-gray-900! bg-white!"
                  placeholder="List your education"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="projects" className="text-gray-900!">Projects</label>
                <textarea
                  id="projects"
                  value={customInfo.projects}
                  onChange={(e) => setCustomInfo({ ...customInfo, projects: e.target.value })}
                  className="rounded-md border p-2 text-gray-900! bg-white!"
                  placeholder="Describe your projects"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="achievements" className="text-gray-900!">Achievements</label>
                <textarea
                  id="achievements"
                  value={customInfo.achievements}
                  onChange={(e) => setCustomInfo({ ...customInfo, achievements: e.target.value })}
                  className="rounded-md border p-2 text-gray-900! bg-white!"
                  placeholder="List your achievements"
                />
              </div>
            </div>
          ) : null}

          {selectedOption && (
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedOption(null)}
                className="text-gray-900! hover:bg-gray-100!"
              >
                Back
              </Button>
              <Button
                onClick={handleGenerateCV}
                disabled={isLoading}
                className="bg-[#92E3A9]! text-white! hover:bg-[#4A9D66]!"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating CV...
                  </>
                ) : (
                  'Generate CV'
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVBuilderDialog; 