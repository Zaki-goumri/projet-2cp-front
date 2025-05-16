import React from 'react';
import { StatCardData } from '../types/dashboard.types';
import { TrendUpIcon, TrendDownIcon } from '@/modules/shared/icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {                                                           
    value: string;
    direction: 'up' | 'down';                                                             
    color: string;
  };
  valueColor?: string;
  iconBgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  valueColor = 'text-gray-700',
  iconBgColor = 'bg-green-100',
}) => {
  const TrendIcon = trend?.direction === 'up' ? TrendUpIcon : TrendDownIcon;
  const trendTextColor = trend?.color || (trend?.direction === 'up' ? 'text-green-600' : 'text-red-600');

  return (
    <div className="flex flex-col rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {title}
          </h3>
          <div className={`mt-1 text-2xl font-semibold ${valueColor}`}>{value}</div>
        </div>
        {icon && <div className={`ml-4 flex-shrink-0 rounded-md ${iconBgColor} p-2`}>{icon}</div>}
      </div>
      {trend && (
        <div className={`mt-2 flex items-center text-xs ${trendTextColor}`}>
          <TrendIcon className="mr-1 h-3 w-3" />
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
