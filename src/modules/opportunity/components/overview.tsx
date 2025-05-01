'use client';
import { Opportunity } from '../services/opportunity.service';
import { MapPin, Calendar } from 'lucide-react';

interface OverviewProps {
  opportunity: Opportunity;
}

export default function Overview({ opportunity }: OverviewProps) {

 

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm relative overflow-hidden">
      {/* Left green accent bar */}
      <div className="absolute left-0 top-0 h-full w-2 bg-green-400"></div>
      
      <div className="flex justify-between items-start">
        <div className="pl-4">
          {/* Company logo */}
          <img
            src={opportunity.company.profilepic || '/default-company.png'}
            alt={opportunity.company.name}
            className="h-24 w-24 object-contain mb-4 rounded-full"
          />
          
          {/* Opportunity title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {opportunity.title}
          </h1>
          
          {/* Company name styled as a subtitle */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {opportunity.company.name}
          </h2>
          
          {/* Location with icon */}
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{opportunity.company.location || 'Remote'}</span>
          </div>
                  
        </div>
      </div>
    </div>
  );
}
