import React from 'react';
import { Team } from '../types/teams.types';
import { useTeams } from '../hooks/useTeams';

interface SuggestedTeamsProps {
  team: Team;
}

export const SuggestedTeams: React.FC<SuggestedTeamsProps> = ({ team }) => {
  // const { joinTeam } = useTeams();
  const [isJoining, setIsJoining] = React.useState(false);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      // await joinTeam(team.id);
    } catch (error) {
      console.error('Failed to join team:', error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="group flex items-center justify-between rounded-xl bg-black p-4">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#92E3A9]/20">
          {team.icon ? (
            <img src={team.icon} alt={team.name} className="h-6 w-6" />
          ) : (
            <span className="text-base font-medium text-[#92E3A9]">
              {team.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">{team.name}</h3>
          <p className="text-xs text-gray-400">
            {team.description || `${team.members} members • ${team.projects} projects`}
          </p>
        </div>
      </div>
      <button
        onClick={handleJoin}
        disabled={isJoining}
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#92E3A9] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {isJoining ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#92E3A9]/20 border-t-[#92E3A9]"></div>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </button>
    </div>
  );
}; 