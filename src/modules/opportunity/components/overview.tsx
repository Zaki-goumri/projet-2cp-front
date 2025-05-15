'use client';
import { MapPinIcon } from '@/modules/shared/icons';
import { Opportunity } from '../services/opportunity.service';

interface OverviewProps {
  opportunity: Opportunity;
}

export default function Overview({ opportunity }: OverviewProps) {

 

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-2 bg-green-400"></div>
      
      <div className="flex justify-between items-start">
        <div className="pl-4">
          <img
            src={opportunity.company.profilepic || '/default-company.png'}
            alt={opportunity.company.name}
            className="h-24 w-24 object-contain mb-4 rounded-full"
          />
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {opportunity.title}
          </h1>
          
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {opportunity.company.name}
          </h2>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>{opportunity.company.location || 'Remote'}</span>
          </div>
                  
        </div>
      </div>
    </div>
  );
}
