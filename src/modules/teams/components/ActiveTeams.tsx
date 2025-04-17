import React from 'react';
import { Link } from 'react-router';
import { Team } from '../types/teams.types';

interface ActiveTeamsProps {
  team: Team;
}

export const ActiveTeams: React.FC<ActiveTeamsProps> = ({ team }) => {
  return (
    <div className="relative rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div className="absolute right-4 top-4">
        <span className="text-xs font-medium text-[#92E3A9]">ACTIVE</span>
      </div>

      <div className="mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BFEAC9]/10">
          {team.icon ? (
            <img src={team.icon} alt={team.name} className="h-8 w-8" />
          ) : (
            <span className="text-lg font-medium text-[#92E3A9]">
              {team.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-medium">{team.name}</h3>

      <div className="mb-6">
        <p className="text-sm text-gray-500">
          {team.members} members • {team.projects} projects
        </p>
      </div>

      <div className="flex gap-3">
        <Link 
          to={`/teams/${team.id}`} 
          className="flex-1 rounded-md bg-black px-4 py-2 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
        >
          View Team
        </Link>
        <button className="flex-1 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50">
          Invite
        </button>
      </div>
    </div>
  );
}; 