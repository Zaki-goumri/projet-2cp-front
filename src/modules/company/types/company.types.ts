// eslint-disable-next-line @typescript-eslint/no-unused-vars
const applicationStatus = {
  submitted: 'submitted',
  under_review: 'under_review',
  accepted: 'accepted',
  rejected: 'rejected',
  interviewed: 'interviewed',
} as const;
export const overViewKeys = {
  totalPosts: 'total job  Posts',
  totalApplications: 'Total applications',
  totalAccepted: 'total accepted',
} as const;
export type OverViewKeysType = (typeof overViewKeys)[keyof typeof overViewKeys];
type ApplicationStatus =
  (typeof applicationStatus)[keyof typeof applicationStatus];
//  getCompaniesPostedOpportunities
export interface JobPost {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  applications: number;
  status: 'open' | 'under_review' | 'closed';
}
//get Recent Appliccation to the comapny opportunites (get 5 recent applications)
//getAllApplicationOfCompany
//get ApplicationByPostId
export interface Application {
  id: number;
  applicantName: string;
  position: string;
  appliedDate: string;
  status:
    | 'submitted'
    | 'under_review'
    | 'accepted'
    | 'rejected'
  experience: string;
  education: string;
}

export interface DetailedApplication extends Application {
  email: string;
  phone: string;
  coverLetter: string;
  resume: string; // URL to resume file
  skills: string[];
  proposal: string;
}

//getApplicationChartData
export interface ApplicationChartData {
  month: string;
  applications: number;
  jobs: number;
}
//getStatusCountOfCompany
export interface ApplicationStatusData {
  name: OverViewKeysType;
  value: number;
  thisMonth: number;
}
//get ApplicationStatusPieChartData
export interface ApplicationStatusPieChartData {
  status: ApplicationStatus;
  value: number;
}

export interface HeadersMap {
  [key: string]: string;
}
