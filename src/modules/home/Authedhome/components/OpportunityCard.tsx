import React from 'react';
import { OpportunityCardProps } from '../types/opportunities.types';
import {
  Calendar,
  Eye,
  ArrowRight,
  Building2,
  MapPin,
  Clock,
  Users,
  Briefcase,
} from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

// Helper function to calculate days left (example)
const calculateDaysLeft = (endDate: string | null): string => {
  if (!endDate) return 'N/A';
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays} Days left` : 'Ended';
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  const daysLeft = calculateDaysLeft(opportunity.endday);
  const views = Math.floor(Math.random() * 500) + 50;
  const logo =
    opportunity.company.profilepic || 'https://via.placeholder.com/64';

  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/opportunities/${opportunity.id}`}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-[#98E9AB] hover:shadow-lg"
      >
        {/* Header with company info */}
        <div className="relative p-6 pb-0">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#98E9AB]">
                {opportunity.title}
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#98E9AB]/10">
                  <Building2 className="h-4 w-4 text-[#98E9AB]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {opportunity.company.name}
                  </p>
                  {opportunity.company.location && (
                    <p className="text-xs text-gray-500">
                      {opportunity.company.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <img
                src={logo}
                alt={`${opportunity.company.name} Logo`}
                className="h-full w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '';
                }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 px-6 py-4">
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
            {opportunity.description}
          </p>
        </div>

        {/* Footer with metadata */}
        <div className="border-t border-gray-100 bg-gray-50/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="h-3.5 w-3.5" />
                <span>{daysLeft}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#98E9AB]/10 px-2.5 py-1 text-xs font-medium text-[#98E9AB]">
                {opportunity.Type}
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#98E9AB]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    </motion.div>
  );
};

