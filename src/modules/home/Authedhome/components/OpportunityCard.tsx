import React from 'react';
import { OpportunityCardProps } from '../types/opportunities.types';
import { Calendar, Eye, ArrowRight } from 'lucide-react'; // Updated icons
import { Link } from 'react-router';

// Helper function to calculate days left (example)
const calculateDaysLeft = (endDate: string | null): string => {
  if (!endDate) return 'N/A';
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays} Days left` : 'Ended'; // Added "Days left"
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const daysLeft = calculateDaysLeft(opportunity.endday);
  // Placeholder for views, as it's not in the API response
  const views = Math.floor(Math.random() * 500) + 50; // Random placeholder
  const logo = opportunity.company.profilepic || 'https://via.placeholder.com/64'; // Default placeholder size

  return (
    // Adjusted outer container for slider layout
    <div className="px-2 h-full pt-10"> {/* Added padding for spacing and logo */}
      <Link 
        to={`/opportunities/${opportunity.Type.toLowerCase()}/${opportunity.id}`} 
        className="group block h-full w-full cursor-pointer overflow-hidden rounded-3xl border-transparent shadow-lg duration-300 ease-in-out hover:scale-105 bg-white" // Removed margins, added bg-white here
      >
        <aside className="relative -mt-6 flex h-full flex-1 flex-col rounded-3xl px-5 pt-8 pb-6"> {/* Kept internal structure */}
          <div className="absolute -top-8 right-5 flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm sm:h-20 sm:w-20">
            <img
              src={logo}
              alt={`${opportunity.company.name} Logo`}
              className="h-full w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/64'; // Fallback placeholder
              }}
            />
          </div>

          <div className="flex flex-1 flex-col justify-between space-y-4">
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="space-y-2 overflow-hidden"> {/* Added overflow-hidden */}
                <h3 className="text-lg font-medium text-black line-clamp-1">{opportunity.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-gray-700 line-clamp-2">
                  {opportunity.description}
                </p>
                {/* Removed learn more link as it might not be applicable here */}
              </div>
              {/* Keep ArrowRight for visual cue */}
              <ArrowRight className="text-muted-foreground mt-1 h-5 w-5 flex-shrink-0 text-gray-400" /> 
            </div>

            <div className="text-muted-foreground flex flex-col gap-4 pt-2 text-sm text-gray-600 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> 
                <span>{daysLeft}</span>
              </div>
            </div>
          </div>
        </aside>
      </Link>
    </div>
  );
}; 