import {
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  GraduationCapIcon,
} from '@/modules/shared/icons';
import { Card } from '@/components/ui/card';
import { Opportunity } from '../services/opportunity.service';

interface AdditionalInformationProps {
  opportunity: Opportunity;
}

export default function AdditionalInformation({ opportunity }: AdditionalInformationProps) {
  return (
    <Card className="rounded-lg !bg-white p-6 shadow-sm !border-none">
      <div className="border-l-4 border-primary pl-3 mb-6">
        <h2 className="text-xl font-semibold text-black">Additional Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPinIcon className="h-5 w-5 text-red-500" />
            <h3 className="font-medium text-gray-700">Internship Location(s)</h3>
          </div>
          <p className="text-gray-600 ml-7">
            {opportunity.company.location || 'Not specified'}
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCapIcon className="h-5 w-5 text-red-500" />
            <h3 className="font-medium text-gray-700">Educations</h3>
          </div>
          <p className="text-gray-600 ml-7">
            {opportunity.education || 'No prior education required'}
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BriefcaseIcon className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium text-gray-700">Internship Type</h3>
          </div>
          <p className="text-gray-600 ml-7">{opportunity.worktype || 'Not specified'}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium text-gray-700">Internship Detail</h3>
          </div>
          <p className="text-gray-600 ml-7">
            Internship Duration: {  (opportunity.startdate && opportunity.enddate ? 
              `${Math.ceil((new Date(opportunity.enddate).getTime() - new Date(opportunity.startdate).getTime()) / (1000 * 60 * 60 * 24))} Days` : 
              'Not specified')}
          </p>
        </div>
      </div>
    </Card>
  );
}
