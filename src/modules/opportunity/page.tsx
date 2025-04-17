import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OverView = React.lazy(
  () => import('@/modules/opportunity/components/overview')
);
const AdditionalInformation = React.lazy(
  () =>
    import('@/modules/opportunity/components/additionalInformation')
);
const Contact = React.lazy(
  () => import('@/modules/opportunity/components/contact')
);
const InternshipDetails = React.lazy(
  () => import('@/modules/opportunity/components/internshipDetails')
);
import { useParams } from 'react-router';

export default function InternshipListing() {
  const { id } = useParams();

  useEffect(() => {
    console.log(id); // Log the ID
  }, [id]);

  return (
    <main>
      <div className="mx-auto h-full max-w-6xl bg-[#2D81940A] p-6">
        <OverView  />
        <InternshipDetails />
        <AdditionalInformation />
        <Contact />

      </div>
    </main>
  );
}
