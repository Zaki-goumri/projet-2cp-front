import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InternshipData } from '../types/dashboard.types';
import { MoreOptionsIcon } from '@/modules/shared/components/icons';

interface InternshipTrackProps {
  internships: InternshipData[];
}

const ITEMS_PER_LOAD = 5;

export const InternshipTrack: React.FC<InternshipTrackProps> = ({
  internships,
}) => {
  const [displayedInternships, setDisplayedInternships] = useState<InternshipData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback((node: HTMLTableRowElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreItems();
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  const loadMoreItems = useCallback(() => {
    const newLength = displayedInternships.length + ITEMS_PER_LOAD;
    const newItems = internships.slice(0, newLength);
    setDisplayedInternships(newItems);
    setHasMore(newItems.length < internships.length);
  }, [displayedInternships, internships]);

  useEffect(() => {
    loadMoreItems();
  }, [internships]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-primay">
          Internship Track
        </h3>
        <button 
          className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:text-[#92E3A9] hover:border-[#92E3A9] focus:border-[#92E3A9] focus:outline-none focus:ring-2 focus:ring-[#BFEAC9]/20 transition-colors duration-200"
          aria-label="More options"
        >
          <MoreOptionsIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 max-h-[300px] overflow-y-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="sticky top-0 bg-white text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-3 py-2">
                COMPANY
              </th>
              <th scope="col" className="px-3 py-2">
                STATUS
              </th>
              <th scope="col" className="px-3 py-2">
                DATE
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedInternships.map((internship, index) => (
              <tr
                key={index}
                ref={index === displayedInternships.length - 1 ? lastItemRef : null}
                className="border-b/60 bg-white hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="whitespace-nowrap px-3 py-2 text-gray-900 font-medium">
                  {internship.company}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      internship.status === 'Accepted'
                        ? 'bg-[#BFEAC9]/20 text-[#92E3A9]'
                        : internship.status === 'Refused'
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {internship.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-500">
                  {internship.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasMore && (
          <div className="flex justify-center py-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#92E3A9]"></div>
          </div>
        )}
      </div>
    </div>
  );
}; 