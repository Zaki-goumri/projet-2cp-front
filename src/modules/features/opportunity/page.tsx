import React,{useEffect} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NavBar = React.lazy(() => import("@/modules/shared/components/navBar"));
const OverView = React.lazy(
  () => import("@/modules/features/opportunity/components/overview"),
);
const AdditionalInformation = React.lazy(
  () =>
    import("@/modules/features/opportunity/components/additionalInformation"),
);
const Contact = React.lazy(
  () => import("@/modules/features/opportunity/components/contact"),
);
const InternshipDetails = React.lazy(
  () => import("@/modules/features/opportunity/components/internshipDetails"),
);
import { useParams } from "react-router";

export default function InternshipListing() {
  const { id } = useParams();
  
  useEffect(() => {
      console.log(id); // Log the ID
    }, [id]);
  
  return (
    <main>
      <NavBar isAuthenticated={true} />
      <div className="max-w-6xl mx-auto h-full p-6 bg-[#2D81940A]">
        <OverView />
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start  rounded-full h-16 px-4 !bg-white overflow-x-auto shadow">
            {[
              { value: "details", label: "Details & Description" },
              { value: "reviews", label: "Reviews" },
              { value: "faq", label: "FAQs & Miscellaneous" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:!text-primary !bg-transparent hover:!bg-gray-200/30 data-[state=active]:shadow-none sm:text-base sm:px-4 px-2 text-sm rounded-full"
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
            <div className="py-4 text-center h-full">No reviews yet</div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="py-4 text-center h-max">No FAQs available</div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
