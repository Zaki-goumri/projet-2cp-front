import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NavBar = React.lazy(() => import('@/modules/shared/components/navBar'));
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
      <NavBar isAuthenticated={true} />
      <div className="mx-auto h-full max-w-6xl bg-[#2D81940A] p-6">
        <OverView />
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="h-16 w-full justify-start overflow-x-auto rounded-full !bg-white px-4 shadow">
            {[
              { value: 'details', label: 'Details & Description' },
              { value: 'reviews', label: 'Reviews' },
              { value: 'faq', label: 'FAQs & Miscellaneous' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:!text-primary rounded-full !bg-transparent px-2 text-sm hover:!bg-gray-200/30 data-[state=active]:shadow-none sm:px-4 sm:text-base"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="details" className="space-y-6">
            <InternshipDetails />
            <AdditionalInformation />
            <Contact />
          </TabsContent>

          <TabsContent value="reviews">
            <div className="h-full py-4 text-center">No reviews yet</div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="h-max py-4 text-center">No FAQs available</div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
