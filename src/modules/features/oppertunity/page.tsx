import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Building2,
  Briefcase,
  Clock,
  Gift,
  Send,
  Heart,
  Share2,
  Users,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea"

const NavBar = React.lazy(
  () => import("@/modules/features/home/Authedhome/components/navBar"),
);
const OverView = React.lazy(() => import("@/modules/features/oppertunity/components/overview")
);

export default function InternshipListing() {
  return (
    <div className="max-w-6xl mx-auto  p-4 space-y-6 bg-[#2D81940A]">
      <NavBar />

      <OverView/>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        {/* <TabsList className="w-full justify-start border-b rounded-full h-16  px- bg-white"> */}
        <TabsList className="w-full justify-start  rounded-full h-16 px-4 bg-white overflow-x-auto shadow">
          {[
            { value: "details", label: "Details & Description" },
            { value: "reviews", label: "Reviews" },
            { value: "faq", label: "FAQs & Miscellaneous" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-base sm:px-4 px-2 text-sm whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* </TabsList> */}

        <TabsContent value="details" className="space-y-6">
          {/* Details Section */}
          <div className="space-y-4 mx-5">
            <h2 className="font-semibold text-lg">Details</h2>
            <p className="text-muted-foreground">
              Huawei is hiring for the Internship Program!
            </p>

            <div className="space-y-2">
              <h3 className="font-medium">Sales & Project Details:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Background: This internship provides a hands-on learning
                  opportunity in the ICT sector focusing on key technical areas
                </li>
                <li>
                  Opportunity to network opportunities, data analysis, and
                  innovative solutions across different core technology domains
                </li>
              </ul>
            </div>

            <div className="space-y-2" id="apply">
              <h3 className="font-medium">Requirements:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Open to 3rd year students or recent graduates in IT,
                  Telecommunications, or related fields
                </li>
                <li>Strong analytical skills and proficiency in IT tools</li>
                <li>
                  Student communication skills and openness for technology
                </li>
              </ul>
            </div>
          </div>

          <Card className="p-4 space-y-4 mt-5">
            <h3 className="font-semibold">Contact the Organisers</h3>
            <form className="space-y-4" >
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Proposal Submission</h4>
                  <p className="text-muted-foreground text-sm">
                    If you have any proposals or suggestions, feel free to share them with us.
                  </p>
                  <div className="flex gap-2">
                    <Textarea placeholder="Enter your proposal" className="h-[10vh]" />
                  </div>
                </div>
              </div>
              <Button type="submit" className="flex items-center gap-2 place-self-center bg-gray-400 hover:bg-primary">
                <Send className="w-4 h-4" />
                Apply
              </Button>
            </form>
          </Card>

          {/* Additional Information */}
          <div className="space-y-4 mb-10">
            <h3 className="font-semibold">Additional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Internship Location(s)</div>
                  <div className="text-sm text-muted-foreground">Algeria</div>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Experience</div>
                  <div className="text-sm text-muted-foreground">
                    Entry level/Beginner
                  </div>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Internship Type</div>
                  <div className="text-sm text-muted-foreground">Remote</div>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Work Level</div>
                  <div className="text-sm text-muted-foreground">
                    Starting Soon (1 Day)
                  </div>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Internship Duration</div>
                  <div className="text-sm text-muted-foreground">1 Month</div>
                </div>
              </Card>

              <Card className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Perks</div>
                  <div className="text-sm text-muted-foreground">
                    Certificate of Completion
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Feedback Section */}
          {/* <div className="space-y-4">
            <h3 className="font-semibold">Feedback & rating</h3>
            <div className="text-muted-foreground">Write a feedback...</div>
          </div> */}
        </TabsContent>

        <TabsContent value="reviews">
          <div className="py-4 text-center text-muted-foreground">
            No reviews yet
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <div className="py-4 text-center text-muted-foreground">
            No FAQs available
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
