import React from 'react';
import { StatCardData } from '../types/dashboard.types';
import { TrendUpIcon, TrendDownIcon } from '@/modules/shared/components/icons';

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
  valueColor = 'text-gray-900',
  iconBgColor = 'bg-[#BFEAC9]/20',
}) => {
  const getValueColor = () => {
    if (title === 'Applied' || title === 'Acceptance' || title === 'Total Applications') {
      return 'text-[#92E3A9]';
    }
    return valueColor;
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 p-4 shadow-sm transition-all duration-300 hover:shadow-md bg-white sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className={`text-2xl font-bold ${getValueColor()}`}>{value}</div>
          {trend && (
            <p className={`mt-1 flex items-center text-sm ${trend.color}`}>
              {trend.direction === 'up' ? (
                <TrendUpIcon />
              ) : (
                <TrendDownIcon />
              )}
              {trend.value}
            </p>
          )}
        </div>
        {icon && <div className={`rounded-full ${iconBgColor} p-3`}>{icon}</div>}
      </div>
    </div>
  );
};

export default StatCard;
