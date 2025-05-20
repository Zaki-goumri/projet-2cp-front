'use client';
import { MapPinIcon, ClockIcon, EyeIcon, BookmarkIcon } from '@/modules/shared/icons';
import { Opportunity } from '../types/opportunity.types';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { opportunitiesService } from '@/modules/opportunities/services/opportunities.service';

interface OverviewProps {
  opportunity: Opportunity;
}

const calculateDaysLeft = (endDate?: string | null): number | null => {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = end.getTime() - now.getTime();
  if (diffTime < 0) return 0;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function Overview({ opportunity }: OverviewProps) {
  const handleSaveClick = async () => {
    try {
      await opportunitiesService.savePost(Number(opportunity.id));
      toast.success("Opportunity saved successfully");
    } catch (error) {
      console.error("Error saving opportunity:", error);
      toast.error("Failed to save opportunity");
    }
  };

  const daysLeft = calculateDaysLeft(opportunity.enddate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-lg ring-1 ring-gray-100"
    >
      <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-primary to-primary/80"></div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-6">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg ring-1 ring-gray-100">
            <img
              src={opportunity?.company?.profilepic || '/default-company.png'}
              alt={opportunity?.company?.name}
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                {opportunity.type}
              </span>
              {daysLeft !== null && (
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-orange-50 px-3 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-200">
                  {daysLeft} Days left
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              {opportunity?.title}
            </h1>

            <h2 className="text-lg font-semibold text-gray-800">
              {opportunity?.company?.name || 'Company Name'}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 ring-1 ring-gray-100">
                <MapPinIcon className="h-4 w-4 text-primary" />
                <span>{opportunity?.company?.location || 'Remote'}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 ring-1 ring-gray-100">
                <ClockIcon className="h-4 w-4 text-primary" />
                <span>{opportunity.worktype}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="gap-2 !border-primary/20 !bg-white !text-primary hover:!bg-primary/5 hover:!text-primary"
            onClick={handleSaveClick}
          >
            <BookmarkIcon className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
