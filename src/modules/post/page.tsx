import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useOpportunity } from './hooks/useOpportunity';
import Loading from '@/loading';

const OverView = React.lazy(
  () => import('@/modules/post/components/overview')
);
const AdditionalInformation = React.lazy(
  () => import('@/modules/post/components/additionalInformation')
);
const Contact = React.lazy(
  () => import('@/modules/post/components/contact')
);
const InternshipDetails = React.lazy(
  () => import('@/modules/post/components/internshipDetails')
);

export default function InternshipListing() {
  const { id } = useParams();
  const { data: opportunity, isLoading, error } = useOpportunity(id || '');

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">Error loading opportunity details</p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No opportunity found</p>
      </div>
    );
  }

  return (
      <div className="mx-auto h-full max-w-6xl bg-[#2D81940A] p-6 space-y-6">
        <OverView opportunity={opportunity} />
        <InternshipDetails opportunity={opportunity} />
        <AdditionalInformation opportunity={opportunity} />
        <Contact opportunity={opportunity} />
      </div>
  );
}
