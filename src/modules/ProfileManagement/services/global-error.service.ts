import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

interface UserCVData {
  // Personal Information
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  portfolio?: string;

  // Education
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    courses: string[];
    achievements?: string[];
  }[];

  // Skills
  skills: {
    languages: string[];
    backend: string[];
    frontend: string[];
    databases: string[];
    devops: string[];
    tools: string[];
    softSkills: string[];
  };

  // Projects
  projects: {
    name: string;
    description: string;
    role: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    achievements: string[];
    link?: string;
  }[];

  // Experience
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location?: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }[];

  // Languages
  languages: {
    name: string;
    level: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
  }[];

  // Certifications
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
}

export const generateCV = async (data: UserCVData): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Given the following user information, generate a professional LaTeX resume using this exact template. Fill in the template with the user's information, keeping the same structure and formatting. Return ONLY the LaTeX code, no explanations or additional text.

    User Information:
    ${JSON.stringify(data, null, 2)}

    Instructions for content generation:
    1. Personal Information:
       - Use the full name as provided
       - Format email and social links properly
       - Add location if provided
       - Ensure all links are properly formatted with \\href

    2. Education:
       - List all education entries in reverse chronological order
       - Format dates consistently
       - Include GPA if provided
       - List relevant courses and achievements
       - Use proper LaTeX formatting for dates and locations

    3. Skills:
       - Group skills into clear categories
       - Use bullet points for better readability
       - Highlight key technologies and tools
       - Include soft skills if provided
       - Format consistently with proper LaTeX commands

    4. Projects:
       - For each project:
         * Write a concise but impactful description
         * Highlight key achievements and technologies
         * Include role and duration
         * Add project link if available
         * Use proper LaTeX formatting for dates and technologies
       - Format projects in reverse chronological order
       - Use the \\resumeProjectHeading command for each project
       - Include bullet points for achievements

    5. Experience:
       - For each experience:
         * Write clear, achievement-focused descriptions
         * Use action verbs and quantify achievements
         * Include relevant technologies
         * Format dates consistently
       - List experiences in reverse chronological order
       - Use the \\resumeSubheading command for each entry
       - Include bullet points for achievements

    6. Languages:
       - List all languages with proficiency levels
       - Format consistently with proper LaTeX commands
       - Use the provided proficiency levels

    7. Certifications (if provided):
       - List in reverse chronological order
       - Include issuer and date
       - Add links if available

    Template to use:
    %-------------------------
    % CV en LaTeX
    %-------------------------

    \\documentclass[letterpaper,11pt]{article}

    \\usepackage{latexsym}
    \\usepackage[empty]{fullpage}
    \\usepackage{titlesec}
    \\usepackage{marvosym}
    \\usepackage[usenames,dvipsnames]{color}
    \\usepackage{enumitem}
    \\usepackage[hidelinks]{hyperref}
    \\usepackage{fancyhdr}
    \\usepackage[french]{babel}
    \\usepackage{tabularx}
    \\usepackage{xcolor}
    \\usepackage{fontawesome5}
    \\input{glyphtounicode}

    % Ajuster les marges
    \\addtolength{\\oddsidemargin}{-0.5in}
    \\addtolength{\\evensidemargin}{-0.5in}
    \\addtolength{\\textwidth}{1in}
    \\addtolength{\\topmargin}{-1in} 
    \\addtolength{\\textheight}{1.0in}

    \\urlstyle{same}
    \\raggedbottom
    \\raggedright
    \\setlength{\\tabcolsep}{0in}

    % Formatage des sections
    \\titleformat{\\section}{
      \\vspace{-5pt}\\scshape\\raggedright\\large
    }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

    % Assurer la lisibilité par ATS
    \\pdfgentounicode=1

    % -------------------- COMMANDES PERSONNALISÉES --------------------
    \\newcommand{\\resumeItem}[1]{\\item\\small{#1 \\vspace{-2pt}}}

    \\newcommand{\\resumeSubheading}[4]{
      \\vspace{-2pt}\\item
        \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{#1} & #2 \\\\
          \\textit{\\small#3} & \\textit{\\small #4} \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeProjectHeading}[2]{
        \\item
        \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
          \\small#1 & #2 \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
    \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

    \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

    \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
    \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

    % -------------------- DÉBUT DU DOCUMENT --------------------
    \\begin{document}

    % -------------------- EN-TÊTE --------------------
    \\begin{center}
        \\textbf{\\Huge \\scshape [NAME]} \\\\ \\vspace{8pt}
        \\small 
        \\faIcon{github} \\href{[GITHUB_URL]}{[GITHUB_USERNAME]} $\\vert$ 
        \\faIcon{code} \\href{[WEBSITE_URL]}{[WEBSITE]} $\\vert$ 
        \\faIcon{linkedin} \\href{[LINKEDIN_URL]}{[LINKEDIN_USERNAME]} $\\vert$ 
        \\faIcon{envelope} \\href{mailto:[EMAIL]}{[EMAIL]}
    \\end{center}

    % -------------------- FORMATION --------------------
    \\section{Formation}
    \\resumeSubHeadingListStart
     \\resumeSubheading
          {\\textbf{[SCHOOL_NAME]}}{[GRADUATION_DATE]}
          {[DEGREE]}{}
    \\resumeSubHeadingListEnd

    \\textbf{Cours :} [COURSES]

    % -------------------- COMPÉTENCES --------------------
    \\section{Compétences}
    \\resumeSubHeadingListStart
      \\resumeItem{\\textbf{Langages :} [LANGUAGES]}
      \\resumeItem{\\textbf{Backend :} [BACKEND_SKILLS]}
      \\resumeItem{\\textbf{Frontend :} [FRONTEND_SKILLS]}
      \\resumeItem{\\textbf{DevOps :} [DEVOPS_SKILLS]}
    \\resumeSubHeadingListEnd

    % -------------------- PROJETS --------------------
    \\section{Projets}
    \\resumeSubHeadingListStart
      [PROJECTS]
    \\resumeSubHeadingListEnd

    % -------------------- EXPÉRIENCE --------------------
    \\section{Expérience}
    \\resumeSubHeadingListStart
      [EXPERIENCE]
    \\resumeSubHeadingListEnd

    % -------------------- LANGUES --------------------
    \\section{Langues}
    \\resumeSubHeadingListStart
      \\resumeItem{\\textbf{[LANGUAGES_SPOKEN]}}
    \\resumeSubHeadingListEnd

    \\end{document}

    Return ONLY the filled LaTeX code, starting with \\documentclass and ending with \\end{document}.`;

    const geminiResponse = await model.generateContent(prompt);
    const latexCode = geminiResponse.response.text();

    if (!latexCode) {
      throw new Error('No LaTeX code generated');
    }

    // Create a PDF using a LaTeX compilation service
    const pdfResponse = await fetch('https://latex.vercel.app/api/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latex: latexCode,
        format: 'pdf'
      })
    });

    if (!pdfResponse.ok) {
      throw new Error('Failed to compile LaTeX to PDF');
    }

    const pdfBlob = await pdfResponse.blob();
    const pdfUrl = URL.createObjectURL(pdfBlob);

    return pdfUrl;
  } catch (error) {
    console.error('Error generating CV:', error);
    throw new Error('Failed to generate CV');
  }
}; 