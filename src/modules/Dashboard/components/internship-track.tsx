import React, { useState, useEffect, useRef, useCallback } from 'react';
// Ensure InternshipData matches the structure in dashboardData.applications
// Might need to import the actual Opportunity type or define a matching interface here
// For now, assuming it has company: { name: string }, status: string, created_at: string
interface InternshipLikeData {
  id: string | number; // Add id for key
  company: { name: string };
  status: string; // 'Accepted', 'Refused', 'On Hold', 'Pending'?
  created_at: string; // Assuming application date is created_at
}

interface InternshipTrackProps {
  internships: InternshipLikeData[];
}

import { MoreHorizontal } from 'lucide-react'; // Using MoreHorizontal for the icon

const ITEMS_PER_LOAD = 7; // Adjust items per load if needed

export const InternshipTrack: React.FC<InternshipTrackProps> = ({ internships }) => {
  const [displayedInternships, setDisplayedInternships] = useState<InternshipLikeData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreItems = useCallback(() => {
    const currentLength = displayedInternships.length;
    const newItems = internships.slice(currentLength, currentLength + ITEMS_PER_LOAD);
    if (newItems.length > 0) {
      setDisplayedInternships(prev => [...prev, ...newItems]);
    }
    setHasMore(currentLength + newItems.length < internships.length);
  }, [displayedInternships.length, internships]);

  const lastItemRef = useCallback((node: HTMLTableRowElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Intersecting, loading more...');
        loadMoreItems();
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore, loadMoreItems]);

   useEffect(() => {
    // Initial load
    setDisplayedInternships(internships.slice(0, ITEMS_PER_LOAD));
    setHasMore(internships.length > ITEMS_PER_LOAD);
    // Reset observer on new internship list
     return () => {
       if(observer.current) observer.current.disconnect();
     }
  }, [internships]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'text-green-600';
      case 'refused':
        return 'text-red-600';
      case 'on hold': // Match potential variations
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  // Format date function (example)
  const formatDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
        return dateString; // Return original if formatting fails
    }
  };

  return (
    // Adjusted padding and ensuring height accommodates content
    <div className="h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        {/* Adjusted title style */}
        <h3 className="text-base font-semibold text-gray-800">
          Internship Track
        </h3>
        {/* Simplified options button */}
        <button 
          className="text-gray-400 hover:text-gray-600"
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
      {/* Adjusted height and scrollbar styling */}
      <div className="mt-3 overflow-y-auto" style={{ maxHeight: '350px' }}> {/* Adjust max-height as needed */}
        <table className="w-full text-left text-sm">
           {/* Adjusted header style */}
          <thead className="text-xs text-gray-500"> 
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                COMPANY NAME
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                STATUS
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                APPLICATION DATE
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedInternships.map((internship, index) => (
              <tr
                key={internship.id || index} // Use internship.id if available
                ref={index === displayedInternships.length - 1 ? lastItemRef : null}
                 // Lighter border, more padding
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Adjusted cell padding and text style */}
                <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                  {internship.company?.name || 'N/A'} 
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                   {/* Use text color directly */}
                  <span className={`font-medium ${getStatusColor(internship.status)}`}>
                    {internship.status || 'Pending'} 
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                  {formatDate(internship.created_at)} 
                </td>
              </tr>
            ))}
             {/* Display message if list is empty */}
             {internships.length === 0 && (
                <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                        No applications tracked yet.
                    </td>
                </tr>
             )}
          </tbody>
        </table>
        {/* Simplified Loading Indicator */}
        {hasMore && (
          <div className="flex justify-center py-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#92E3A9]"></div>
          </div>
        )}
      </div>
    </div>
  );
}; 