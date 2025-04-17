import axios from '@/api/axios.config';
import { 
  Internship, 
  Problem, 
  User, 
  Company, 
  FilterOptions 
} from '../types/internshipsAndProblems.types';

// Mock data for development
const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'Huawei',
    companyLogo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    location: 'Ben Aknoun Algiers, Algeria',
    daysLeft: 7,
    description: 'Join our team as a software development intern and work on cutting-edge projects.',
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Knowledge of JavaScript and React',
      'Good communication skills'
    ],
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
    requirements: [
      'Knowledge of design tools like Figma or Adobe XD',
      'Understanding of UI/UX principles',
      'Portfolio of previous work'
    ],
    skills: ['Figma', 'UI/UX', 'Adobe XD'],
    category: 'Design',
    startDate: '2024-07-15',
    endDate: '2024-10-15',
    createdAt: '2024-05-10',
    isSaved: false,
    isApplied: true,
    status: 'Pending'
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Microsoft',
    companyLogo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    location: 'Remote',
    daysLeft: 30,
    description: 'Work on machine learning and data analysis projects.',
    requirements: [
      'Knowledge of Python and data analysis libraries',
      'Understanding of machine learning concepts',
      'Strong analytical skills'
    ],
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    category: 'Data Science',
    startDate: '2024-08-01',
    endDate: '2024-11-30',
    createdAt: '2024-05-01',
    isSaved: true,
    isApplied: true,
    status: 'Accepted'
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
  },
  {
    id: '2',
    title: 'Build a Recommendation System',
    company: 'Sonatrach',
    companyLogo: 'https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g',
    description: 'Develop a recommendation system for our content platform.',
    difficulty: 'Hard',
    category: 'Machine Learning',
    tags: ['Recommendation Systems', 'Machine Learning', 'AI'],
    deadline: '2024-08-15',
    createdAt: '2024-05-10',
    isSaved: false,
    isSubmitted: true
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
        institution: 'University of Science and Technology Houari Boumediene',
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
  },
  {
    id: '2',
    name: 'Karim Mohammed',
    email: 'karim.mohammed@example.com',
    profilePicture: 'assets/servicesOfsignup/profilePicTemp.png',
    role: 'Professional',
    skills: ['Python', 'Data Science', 'Machine Learning'],
    education: [
      {
        institution: 'Ecole Nationale Supérieure d\'Informatique',
        degree: 'Master in Data Science',
        startDate: '2019-09',
        endDate: '2021-06'
      }
    ],
    experience: [
      {
        company: 'Sonatrach',
        role: 'Data Scientist',
        startDate: '2021-07',
        endDate: null
      }
    ],
    createdAt: '2022-03-10'
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
  },
  {
    id: '2',
    name: 'Yassir',
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQE_hQWza3WDsw/company-logo_200_200/company-logo_200_200/0/1657089111162?e=1747872000&v=beta&t=kGfFj8WqGkAiszIlv4XwQ6b4JEUkVZIuqFsL5hFpJ4g',
    description: 'The leading super app platform in North Africa.',
    location: 'Algiers, Algeria',
    website: 'https://www.yassir.com',
    industry: 'Technology',
    size: 'Medium',
    foundedIn: '2017',
    createdAt: '2023-02-15',
    activeInternships: 3,
    activeProblems: 1
  }
];

// API endpoints
const API_ENDPOINTS = {
  INTERNSHIPS: '/api/internships',
  PROBLEMS: '/api/problems',
  SAVED_INTERNSHIPS: '/api/internships/saved',
  APPLIED_INTERNSHIPS: '/api/internships/applied',
  USERS: '/api/users',
  COMPANIES: '/api/companies'
};

// Service functions
export const fetchInternships = async (filterOptions: FilterOptions = {}): Promise<Internship[]> => {
  try {
    // For development, return mock data
    // In production, uncomment the API call below
    // const response = await axios.get(API_ENDPOINTS.INTERNSHIPS, { params: filterOptions });
    // return response.data;
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter mock data based on provided filters
    let filteredData = [...mockInternships];
    
    if (filterOptions.category) {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase().includes(filterOptions.category?.toLowerCase() || '')
      );
    }
    
    if (filterOptions.location) {
      filteredData = filteredData.filter(item => 
        item.location.toLowerCase().includes(filterOptions.location?.toLowerCase() || '')
      );
    }
    
    return filteredData;
  } catch (error) {
    console.error('Error fetching internships:', error);
    throw error;
  }
};

export const fetchProblems = async (filterOptions: FilterOptions = {}): Promise<Problem[]> => {
  try {
    // For development, return mock data
    // const response = await axios.get(API_ENDPOINTS.PROBLEMS, { params: filterOptions });
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredData = [...mockProblems];
    
    if (filterOptions.category) {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase().includes(filterOptions.category?.toLowerCase() || '')
      );
    }
    
    return filteredData;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
};

export const fetchSavedInternships = async (): Promise<Internship[]> => {
  try {
    // const response = await axios.get(API_ENDPOINTS.SAVED_INTERNSHIPS);
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter internships that are saved
    return mockInternships.filter(internship => internship.isSaved);
  } catch (error) {
    console.error('Error fetching saved internships:', error);
    throw error;
  }
};

export const fetchAppliedInternships = async (): Promise<Internship[]> => {
  try {
    // const response = await axios.get(API_ENDPOINTS.APPLIED_INTERNSHIPS);
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter internships that are applied
    return mockInternships.filter(internship => internship.isApplied);
  } catch (error) {
    console.error('Error fetching applied internships:', error);
    throw error;
  }
};

export const fetchUsers = async (filterOptions: FilterOptions = {}): Promise<User[]> => {
  try {
    // const response = await axios.get(API_ENDPOINTS.USERS, { params: filterOptions });
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchCompanies = async (filterOptions: FilterOptions = {}): Promise<Company[]> => {
  try {
    // const response = await axios.get(API_ENDPOINTS.COMPANIES, { params: filterOptions });
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockCompanies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
}; 