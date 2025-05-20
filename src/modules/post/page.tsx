import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useGetOpportunity } from './hooks/useGetOpportunity';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangleIcon, LoaderIcon } from '@/modules/shared/icons';
import { Button } from '@/components/ui/button';

const OverView = React.lazy(() => import('@/modules/post/components/overview'));
const AdditionalInformation = React.lazy(
  () => import('@/modules/post/components/additionalInformation')
);
const Contact = React.lazy(() => import('@/modules/post/components/contact'));
const InternshipDetails = React.lazy(
  () => import('@/modules/post/components/internshipDetails')
);

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex h-[50vh] items-center justify-center"
  >
    <div className="flex flex-col items-center gap-4">
      <LoaderIcon className="text-primary h-8 w-8 animate-spin" />
      <p className="text-lg font-medium text-gray-600">
        Loading opportunity details...
      </p>
    </div>
  </motion.div>
);

const ErrorState = ({ error }: { error: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex h-[50vh] items-center justify-center"
  >
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-full bg-red-100 p-3">
        <AlertTriangleIcon className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        Oops! Something went wrong
      </h3>
      <p className="max-w-sm text-sm text-gray-600">
        {error?.message ||
          'We encountered an error while loading the opportunity details.'}
      </p>
      <Button
        variant="outline"
        className="mt-2"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex h-[50vh] items-center justify-center"
  >
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-full bg-gray-100 p-3">
        <AlertTriangleIcon className="h-8 w-8 text-gray-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        No Opportunity Found
      </h3>
      <p className="max-w-sm text-sm text-gray-600">
        The opportunity you're looking for doesn't exist or has been removed.
      </p>
      <Button
        variant="outline"
        className="mt-2"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </div>
  </motion.div>
);

export default function InternshipListing() {
  const { id } = useParams();
  const { data: opportunity, isLoading, error } = useGetOpportunity(id || '');

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  console.log(opportunity);
  if (!opportunity) return <EmptyState />;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <OverView opportunity={opportunity.data} />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <InternshipDetails opportunity={opportunity.data} />
                <AdditionalInformation opportunity={opportunity.data} />
              </div>
              <div className="lg:col-span-1">
                <Contact {...opportunity} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
