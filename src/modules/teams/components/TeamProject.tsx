import React from 'react';
import { ExternalLink } from 'lucide-react';
import { TeamProjectProps } from '../types/teams.types';


const TeamProject: React.FC<TeamProjectProps> = ({ 
  name, 
  members, 
  description, 
  onViewDetails 
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg  shadow-sm p-4">
      <div className="flex items-center">
        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
          <ExternalLink className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{members} members • {description}</p>
        </div>
      </div>
      <button 
        onClick={onViewDetails}
        className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
      >
        <ExternalLink className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TeamProject; 