import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, User, Loader2, Plus, X, Calendar, MapPin, Phone, Mail, Github, Linkedin, Globe } from 'lucide-react';
// import { generateCV } from '../services/cv-generator.service'; // Updated import
import { toast } from 'react-toastify';

interface CVData {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    courses: string[];
  }[];
  skills: {
    languages: string[];
    backend: string[];
    frontend: string[];
    devops: string[];
  };
  projects: {
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  languages: {
    name: string;
    level: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
  }[];
}

interface CVBuilderDialogProps {
  userProfile: any;
}

const CVBuilderDialog: React.FC<CVBuilderDialogProps> = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'personal' | 'education' | 'skills' | 'projects' | 'experience' | 'languages' | 'certifications' | 'review'>('personal');

  const [cvData, setCvData] = useState<CVData>(() => {
    // Transform user profile education data if available
    const userEducation = userProfile?.education?.map((edu: any) => ({
      school: edu.school || edu.institution || '',
      degree: edu.degree || edu.diploma || '',
      field: edu.field || edu.major || '',
      startDate: edu.startDate || edu.start_year || '',
      endDate: edu.endDate || edu.end_year || '',
      courses: edu.courses || []
    })) || [];

    return {
      fullName: userProfile?.name || userProfile?.fullName || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      location: userProfile?.location || userProfile?.address || '',
      github: userProfile?.github || userProfile?.githubUrl || '',
      linkedin: userProfile?.linkedin || userProfile?.linkedinUrl || '',
      website: userProfile?.website || userProfile?.portfolioUrl || '',
      education: userEducation.length > 0 ? userEducation : [{
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        courses: [],
      }],
      skills: {
        languages: userProfile?.skills?.languages || [],
        backend: userProfile?.skills?.backend || [],
        frontend: userProfile?.skills?.frontend || [],
        devops: userProfile?.skills?.devops || [],
      },
      projects: [{
        name: '',
        description: '',
        technologies: [],
        startDate: '',
        endDate: '',
      }],
      experience: [{
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      }],
      languages: [{
        name: '',
        level: 'Intermediate'
      }],
    };
  });

  const escapeLatex = (text: string) => {
    return text.replace(/([&%$#_{}~^\\])/g, '\\$1');
  };

  const handleGenerateCV = async () => {
    const capitalize = (str:string) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    try {
      setIsLoading(true);
      const latexCode = `
%-------------------------
% CV in LaTeX
%------------------------

\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage{tabularx}
\\usepackage{xcolor}
\\usepackage{fontawesome5}
\\input{glyphtounicode}
\\pdfgentounicode=1

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-0.9in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-5pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\newcommand{\\resumeItem}[1]{\\item \\small{#1}\\vspace{-2pt}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small #3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
  \\item
  \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
    \\small #1 & #2 \\\\
  \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

\\begin{document}

\\begin{center}
  \\textbf{\\Huge \\scshape ${escapeLatex(cvData.fullName)}} \\\\ \\vspace{8pt}
  \\small
  ${cvData.github ? `\\faIcon{github} \\href{${cvData.github}}{${cvData.github.replace("https://", "")}}` : ""} 
  ${cvData.website ? ` $\\vert$ \\faIcon{code} \\href{${cvData.website}}{${cvData.website.replace("https://", "")}}` : ""} 
  ${cvData.linkedin ? ` $\\vert$ \\faIcon{linkedin} \\href{${cvData.linkedin}}{${cvData.linkedin.replace("https://", "")}}` : ""} 
  ${cvData.email ? ` $\\vert$ \\faIcon{envelope} \\href{mailto:${cvData.email}}{${cvData.email}}` : ""}
\\end{center}

${cvData.education.length > 0 ? `
\\section{Education}
\\resumeSubHeadingListStart
${cvData.education.map(edu => `
  \\resumeSubheading
    {${escapeLatex(edu.school)}}{${edu.endDate || ""}}
  {${escapeLatex(edu.degree)} in ${escapeLatex(edu.field)}}{${edu.startDate || ""}}
`).join("\n")}
\\resumeSubHeadingListEnd
` : ""}

${cvData.experience.length > 0 ? `
\\section{Experience}
\\resumeSubHeadingListStart
${cvData.experience.map(exp => `
  \\resumeSubheading
    {${escapeLatex(exp.company)}}{${exp.endDate || ""}}
    {${escapeLatex(exp.position)}}{${exp.startDate || ""}}
    \\resumeItemListStart
      ${exp.description}
    \\resumeItemListEnd
`).join("\n")}
\\resumeSubHeadingListEnd
` : ""}

${cvData.skills && Object.values(cvData.skills).some(arr => arr.length > 0) ? `
\\section{Skills}
\\resumeSubHeadingListStart
${Object.entries(cvData.skills).map(([category, list]) => 
  list.length > 0 ? `  \\resumeItem{\\textbf{${capitalize(category)}}: ${list.map(capitalize).join(', ')}}` : ''
).join('\n')}
\\resumeSubHeadingListEnd
` : ""}



${cvData.projects.length > 0 ? `
\\section{Projects}
\\resumeSubHeadingListStart
${cvData.projects.map(project => `
  \\resumeProjectHeading
    {\\textbf{${escapeLatex(project.name)}} | \\footnotesize\\emph{${project.technologies.map(capitalize).join(', ')}}}{${project.endDate || ""}}
    \\resumeItemListStart
      \\resumeItem{${escapeLatex(project.description)}}
    \\resumeItemListEnd
`).join('\n')}
\\resumeSubHeadingListEnd
` : ""}

${cvData.languages.length > 0 ? `
\\section{Languages}
\\resumeSubHeadingListStart
  \\resumeItem{${cvData.languages.map(lang => escapeLatex(lang.name)).join(', ')}}
\\resumeSubHeadingListEnd
` : ""}

\\end{document}
`;

      // Create a blob with the LaTeX code
      const blob = new Blob([latexCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.fullName.replace(/\s+/g, '_')}_CV.tex`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Your CV LaTeX file has been generated and downloaded.');
    } catch (error) {
      toast.error('Failed to generate CV. Please try again.');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setCurrentStep('personal');
    }
  };

  const addArrayItem = (field: string, subField?: string) => {
    setCvData(prev => {
      const newData = { ...prev };
      if (subField) {
        // @ts-ignore
        newData[field][subField] = [...newData[field][subField], ''];
      } else {
        // @ts-ignore
        newData[field] = [...newData[field], getDefaultItem(field)];
      }
      return newData;
    });
  };

  const removeArrayItem = (field: string, index: number, subField?: string) => {
    setCvData(prev => {
      const newData = { ...prev };
      if (subField) {
        // @ts-ignore
        newData[field][subField] = newData[field][subField].filter((_, i) => i !== index);
      } else {
        // @ts-ignore
        newData[field] = newData[field].filter((_, i) => i !== index);
      }
      return newData;
    });
  };

  const getDefaultItem = (field: string) => {
    switch (field) {
      case 'education':
        return { school: '', degree: '', field: '', startDate: '', endDate: '', courses: [] };
      case 'projects':
        return { name: '', description: '', technologies: [], startDate: '', endDate: '' };
      case 'experience':
        return { company: '', position: '', startDate: '', endDate: '', description: '' };
      case 'languages':
        return { name: '', level: 'Intermediate' };
      default:
        return {};
    }
  };

  const updateArrayItem = (field: keyof CVData, index: number, key: string, value: any) => {
    setCvData(prev => {
      const fieldValue = prev[field];
      if (Array.isArray(fieldValue)) {
        return {
          ...prev,
          [field]: fieldValue.map((item: any, i: number) => 
            i === index ? { ...item, [key]: value } : item
          )
        };
      }
      return prev;
    });
  };

  const updateSkillCategory = (category: string, value: string[]) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: value
      }
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={cvData.fullName}
            onChange={(e) => setCvData(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={cvData.email}
            onChange={(e) => setCvData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={cvData.phone}
            onChange={(e) => setCvData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={cvData.location}
            onChange={(e) => setCvData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            placeholder="City, Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <input
            type="url"
            value={cvData.github}
            onChange={(e) => setCvData(prev => ({ ...prev, github: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            placeholder="https://github.com/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="url"
            value={cvData.linkedin}
            onChange={(e) => setCvData(prev => ({ ...prev, linkedin: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            type="url"
            value={cvData.website}
            onChange={(e) => setCvData(prev => ({ ...prev, website: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <Button
          type="button"
          onClick={() => addArrayItem('education')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>
      {cvData.education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
            {cvData.education.length > 1 && (
              <Button
                type="button"
                onClick={() => removeArrayItem('education', index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={edu.school}
              onChange={(e) => updateArrayItem('education', index, 'school', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="University/School Name"
            />
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Degree (e.g., Bachelor's, Master's)"
            />
            <input
              type="text"
              value={edu.field}
              onChange={(e) => updateArrayItem('education', index, 'field', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Field of Study"
            />
            <input
              type="text"
              value={edu.startDate}
              onChange={(e) => updateArrayItem('education', index, 'startDate', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Start Date (e.g., Sep 2020)"
            />
            <input
              type="text"
              value={edu.endDate}
              onChange={(e) => updateArrayItem('education', index, 'endDate', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="End Date (e.g., Jun 2024)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Courses (comma-separated)</label>
            <textarea
              value={edu.courses.join(', ')}
              onChange={(e) => updateArrayItem('education', index, 'courses', e.target.value.split(',').map(s => s.trim()))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Data Structures, Algorithms, Web Development"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
        <Button
          type="button"
          onClick={() => addArrayItem('experience')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>
      {cvData.experience.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
            {cvData.experience.length > 1 && (
              <Button
                type="button"
                onClick={() => removeArrayItem('experience', index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Company Name"
            />
            <input
              type="text"
              value={exp.position}
              onChange={(e) => updateArrayItem('experience', index, 'position', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Position/Role"
            />
            <input
              type="text"
              value={exp.startDate}
              onChange={(e) => updateArrayItem('experience', index, 'startDate', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Start Date (e.g., Jan 2023)"
            />
            <input
              type="text"
              value={exp.endDate}
              onChange={(e) => updateArrayItem('experience', index, 'endDate', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="End Date (e.g., Present)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Describe your responsibilities and achievements"
              rows={3}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
      <div className="space-y-4">
        {Object.entries({
          languages: 'Programming Languages',
          backend: 'Backend Technologies',
          frontend: 'Frontend Technologies',
          devops: 'DevOps & Tools',
        }).map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
              onChange={(e) => updateSkillCategory(key, e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Enter skills separated by commas"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <Button
          type="button"
          onClick={() => addArrayItem('projects')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>
      {cvData.projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
            {cvData.projects.length > 1 && (
              <Button
                type="button"
                onClick={() => removeArrayItem('projects', index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={project.name}
              onChange={(e) => updateArrayItem('projects', index, 'name', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Project Name"
            />
            <input
              type="text"
              value={project.startDate}
              onChange={(e) => updateArrayItem('projects', index, 'startDate', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Start Date (e.g., Jan 2023)"
            />
            <input
              type="text"
              value={project.endDate}
              onChange={(e) => updateArrayItem('projects', index, 'endDate', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="End Date (e.g., Present)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Describe your project and its impact"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
            <textarea
              value={project.technologies.join(', ')}
              onChange={(e) => updateArrayItem('projects', index, 'technologies', e.target.value.split(',').map(s => s.trim()))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="React, Node.js, MongoDB, etc."
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderLanguages = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
        <Button
          type="button"
          onClick={() => addArrayItem('languages')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Language
        </Button>
      </div>
      {cvData.languages.map((lang, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Language {index + 1}</h4>
            {cvData.languages.length > 1 && (
              <Button
                type="button"
                onClick={() => removeArrayItem('languages', index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={lang.name}
              onChange={(e) => updateArrayItem('languages', index, 'name', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Language Name"
            />
            <select
              value={lang.level}
              onChange={(e) => updateArrayItem('languages', index, 'level', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            >
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Professional">Professional</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Review Your CV</h3>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Name:</span> {cvData.fullName}
            </div>
            <div>
              <span className="text-gray-600">Email:</span> {cvData.email}
            </div>
            {cvData.phone && (
              <div>
                <span className="text-gray-600">Phone:</span> {cvData.phone}
              </div>
            )}
            {cvData.location && (
              <div>
                <span className="text-gray-600">Location:</span> {cvData.location}
              </div>
            )}
          </div>
        </div>

        {cvData.education.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-2">Education</h4>
            {cvData.education.map((edu, index) => (
              <div key={index} className="mb-2 text-sm">
                <div className="font-medium">{edu.school}</div>
                <div className="text-gray-600">{edu.degree} in {edu.field}</div>
                <div className="text-gray-500">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}

        {Object.entries(cvData.skills).some(([_, skills]) => skills.length > 0) && (
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
            {Object.entries(cvData.skills).map(([category, skills]) => 
              skills.length > 0 && (
                <div key={category} className="mb-2 text-sm">
                  <span className="font-medium">{category}:</span> {skills.join(', ')}
                </div>
              )
            )}
          </div>
        )}

        {cvData.experience.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
            {cvData.experience.map((exp, index) => (
              <div key={index} className="mb-2 text-sm">
                <div className="font-medium">{exp.company}</div>
                <div className="text-gray-600">{exp.position}</div>
                <div className="text-gray-500">{exp.startDate} - {exp.endDate}</div>
                <div className="text-gray-700 mt-1">{exp.description}</div>
              </div>
            ))}
          </div>
        )}

        {cvData.projects.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-2">Projects</h4>
            {cvData.projects.map((project, index) => (
              <div key={index} className="mb-2 text-sm">
                <div className="font-medium">{project.name}</div>
                <div className="text-gray-500">{project.startDate} - {project.endDate}</div>
                <div className="text-gray-700 mt-1">{project.description}</div>
                <div className="text-gray-600 mt-1">
                  <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {cvData.languages.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
            {cvData.languages.map((lang, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{lang.name}</span> ({lang.level})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal':
        return renderPersonalInfo();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'experience':
        return renderExperience();
      case 'projects':
        return renderProjects();
      case 'languages':
        return renderLanguages();
      case 'review':
        return renderReview();
      default:
        return <div>Step not implemented yet</div>;
    }
  };

  const steps = ['personal', 'education', 'skills', 'experience', 'projects', 'languages', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex] as any);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex] as any);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-green-600! hover:bg-green-700! text-white!">
          <FileText className="h-4 w-4" />
          Build Your CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto !bg-white !text-gray-900">
        <DialogHeader className="!bg-white">
          <DialogTitle className="!text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            CV Builder
          </DialogTitle>
          <div className="text-sm !text-gray-600">
            Step {currentStepIndex + 1} of {steps.length}: {currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
          </div>
        </DialogHeader>

        <div className="py-4 !bg-white">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 !bg-white">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className="!text-gray-900 hover:bg-gray-100"
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {currentStepIndex === steps.length - 1 ? (
              <Button
                onClick={handleGenerateCV}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
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
            ) : (
              <Button
                onClick={nextStep}
                className="bg-green-600! hover:bg-blue-700 text-white!"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVBuilderDialog;
