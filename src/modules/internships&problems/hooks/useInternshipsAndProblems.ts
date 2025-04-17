import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchInternships, 
  fetchProblems, 
  fetchSavedInternships, 
  fetchAppliedInternships,
  fetchUsers,
  fetchCompanies
} from '../services/internshipsAndProblems.service';
import { 
  Internship, 
  Problem, 
  User, 
  Company 
} from '../types/internshipsAndProblems.types';

export const useInternshipsAndProblems = () => {
  const [filter, setFilter] = useState({
    category: '',
    location: '',
    status: ''
  });

  // Simplify the hook by returning mock data directly without using React Query
  // This helps identify if React Query is the source of the issue
  
  const mockInternships: Internship[] = [
    {
      id: '1',
      title: 'Software Development Intern',
      company: 'Huawei',
      companyLogo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
      location: 'Ben Aknoun Algiers, Algeria',
      daysLeft: 7,
      description: 'Join our team as a software development intern and work on cutting-edge projects.',
      requirements: ['Requirement 1', 'Requirement 2'],
      skills: ['JavaScript', 'React', 'TypeScript'],
      category: 'Software Development',
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      createdAt: '2024-05-15',
      isSaved: true,
      isApplied: false
    },
    {
      id: '2',
      title: 'UI/UX Design Intern',
      company: 'Yassir',
      companyLogo: 'https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g',
      location: 'Algiers, Algeria',
      daysLeft: 15,
      description: 'Design user interfaces for our mobile applications.',
      requirements: ['Requirement 1', 'Requirement 2'],
      skills: ['Figma', 'UI/UX', 'Adobe XD'],
      category: 'Design',
      startDate: '2024-07-15',
      endDate: '2024-10-15',
      createdAt: '2024-05-10',
      isSaved: false,
      isApplied: true,
      status: 'Pending'
    }
  ];

  const mockProblems: Problem[] = [
    {
      id: '1',
      title: 'Optimize E-commerce Search Algorithm',
      company: 'Jumia',
      companyLogo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
      description: 'Develop an optimized search algorithm for our e-commerce platform.',
      difficulty: 'Medium',
      category: 'Algorithms',
      tags: ['Search', 'Optimization', 'E-commerce'],
      deadline: '2024-07-30',
      createdAt: '2024-05-15',
      isSaved: true,
      isSubmitted: false
    }
  ];

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Ahmed Bentaleb',
      email: 'ahmed.bentaleb@example.com',
      profilePicture: 'assets/servicesOfsignup/profilePicTemp.png',
      role: 'Student',
      skills: ['JavaScript', 'React', 'Node.js'],
      education: [
        {
          institution: 'USTHB',
          degree: 'Bachelor in Computer Science',
          startDate: '2021-09',
          endDate: null
        }
      ],
      experience: [
        {
          company: 'Yassir',
          role: 'UX/UI Designer Intern',
          startDate: '2023-02',
          endDate: '2023-03'
        }
      ],
      createdAt: '2023-01-15'
    }
  ];

  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'Huawei',
      logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
      description: 'A global provider of ICT infrastructure and smart devices.',
      location: 'Ben Aknoun Algiers, Algeria',
      website: 'https://www.huawei.com',
      industry: 'Technology',
      size: 'Large',
      foundedIn: '1987',
      createdAt: '2023-01-01',
      activeInternships: 5,
      activeProblems: 3
    }
  ];

  // Return mock data directly
  return {
    internships: mockInternships,
    problems: mockProblems,
    savedInternships: mockInternships.filter(i => i.isSaved),
    appliedInternships: mockInternships.filter(i => i.isApplied),
    users: mockUsers,
    companies: mockCompanies,
    isLoading: false,
    hasError: false,
    filter,
    setFilter,
  };
}; 