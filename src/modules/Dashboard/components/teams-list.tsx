import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TeamData } from '../types/dashboard.types';
import { AddIcon, MoreOptionsIcon } from '@/modules/shared/icons';

interface TeamsListProps {
  teams: TeamData[];
}

const ITEMS_PER_LOAD = 5;

export const TeamsList: React.FC<TeamsListProps> = ({ teams }) => {
  const [displayedTeams, setDisplayedTeams] = useState<TeamData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreItems();
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  const loadMoreItems = useCallback(() => {
    const newLength = displayedTeams.length + ITEMS_PER_LOAD;
    const newItems = teams.slice(0, newLength);
    setDisplayedTeams(newItems);
    setHasMore(newItems.length < teams.length);
  }, [displayedTeams, teams]);

  useEffect(() => {
    loadMoreItems();
  }, [teams]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium text-primay">
          Teams
        </h3>
        <button 
          className="rounded-full bg-[#92E3A9] p-1.5 text-white hover:bg-[#83d69a] focus:outline-none focus:ring-2 focus:ring-[#BFEAC9]/50 focus:ring-offset-1 transition-colors duration-200"
          aria-label="Add new team"
        >
          <AddIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[300px] space-y-3 overflow-y-auto">
        {displayedTeams.map((team, index) => (
          <div
            key={index}
            ref={index === displayedTeams.length - 1 ? lastItemRef : null}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-[#BFEAC9] hover:shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                <span className="text-xs font-medium text-gray-500">Pic</span>
              </div>
              <div>
                <p className="text-sm font-medium text-primay">
                  {team.name}
                </p>
                <p className="text-xs text-gray-500">
                  {team.members} Members
                </p>
              </div>
            </div>
            <button 
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-colors duration-200"
              aria-label={`More options for ${team.name}`}
            >
              <MoreOptionsIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        {hasMore && (
          <div className="flex justify-center py-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#92E3A9]"></div>
          </div>
        )}
      </div>
    </div>
  );
}; 