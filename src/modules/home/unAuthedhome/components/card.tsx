import { ArrowRight, Eye, Timer, Building2 } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

interface InternshipCardProps {
  logo: string;
  title: string;
  description: string;
  views: number;
  daysLeft: number;
}

export default function InternshipCard({
  logo,
  title,
  description,
  views,
  daysLeft,
}: InternshipCardProps) {
  return (
    <motion.div 
      className="group h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-[#98E9AB] hover:shadow-lg">
        {/* Header with company info */}
        <div className="relative p-6 pb-0">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-[#98E9AB] transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#98E9AB]/10">
                  <Building2 className="h-4 w-4 text-[#98E9AB]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Company Name</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>
            </div>
            <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <img
                src={logo}
                alt="Company Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/64';
                }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 px-6 py-4">
          <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Footer with metadata */}
        <div className="border-t border-gray-100 bg-gray-50/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Timer className="h-3.5 w-3.5" />
                <span>{daysLeft} Days left</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Eye className="h-3.5 w-3.5" />
                <span>{views}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#98E9AB]/10 px-2.5 py-1 text-xs font-medium text-[#98E9AB]">
                Internship
              </span>
              <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#98E9AB]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}
