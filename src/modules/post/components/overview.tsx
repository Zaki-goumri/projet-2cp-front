'use client';
import { MapPinIcon } from '@/modules/shared/icons';
import { Opportunity } from '../types/opportunity.types';

interface OverviewProps {
  opportunity: Opportunity;
}

export default function Overview({ opportunity }: OverviewProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-sm">
      <div className="absolute top-0 left-0 h-full w-2 bg-green-400"></div>

      <div className="flex items-start justify-between">
        <div className="pl-4">
          <img
            src={opportunity?.company?.profilepic || '/default-company.png'}
            alt={opportunity?.company?.name}
            className="mb-4 h-24 w-24 rounded-full object-contain"
          />

          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {opportunity?.title}
          </h1>

          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            {opportunity?.company?.name || 'company name'}
          </h2>

          <div className="mb-2 flex items-center text-gray-600">
            <MapPinIcon className="mr-2 h-5 w-5" />
            <span>{opportunity?.company?.location || 'Remote'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
