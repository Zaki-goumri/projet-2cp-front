import { Opportunity } from '../types/opportunity.types';

export const mockInternships: Opportunity[] = [
  {
    id: 'intern-1',
    title: 'Frontend Developer Intern',
    company: { id: 'comp-1', name: 'Tech Solutions Inc.' },
    description:
      'Assist the frontend team in developing and maintaining web applications using React and TypeScript.',
    type: 'internship',
    worktype: 'Remote',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    duration: '3 months',
    endday: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString(), // 90 days from now
  },
  {
    id: 'intern-2',
    title: 'Backend Developer Intern',
    company: { id: 'comp-2', name: 'Innovate Systems' },
    description:
      'Work with the backend team on API development and database management using Node.js and PostgreSQL.',
    type: 'internship',
    worktype: 'On-site',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'REST API'],
    duration: '6 months',
    endday: new Date(new Date().setDate(new Date().getDate() + 180)).toISOString(),
  },
];

export const mockProblems: Opportunity[] = [
  {
    id: 'problem-1',
    title: 'Optimize Database Queries',
    company: { id: 'comp-3', name: 'Data Insights Co.' },
    description:
      'Analyze and optimize complex SQL queries to improve application performance.',
    type: 'problem',
    worktype: 'Remote',
    skills: ['SQL', 'Database Optimization', 'Performance Tuning'],
    duration: '1 month',
    endday: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
  },
  {
    id: 'problem-2',
    title: 'Develop UI Component Library',
    company: { id: 'comp-1', name: 'Tech Solutions Inc.' },
    description:
      'Create a reusable UI component library based on company design system specifications.',
    type: 'problem',
    worktype: 'Hybrid',
    skills: ['React', 'Styled Components', 'Storybook', 'Design Systems'],
    duration: '2 months',
    endday: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString(),
  },
];

export const mockOpportunities: Opportunity[] = [
  ...mockInternships,
  ...mockProblems,
]; 