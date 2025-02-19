
import { ArrowRight, Eye, Timer } from "lucide-react";
import { Link } from "react-router"; // Updated import for Link
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface InternshipCardProps {
  logo: string;
  title: string;
  description: string;
  views: number;
  daysLeft: number;
}

export default function InternshipCard({ logo, title, description, views, daysLeft }: InternshipCardProps) {
  return (
    <main className="w-full max-w-md min-w-2 h-full overflow-hidden group cursor-pointer rounded-3xl shadow-lg border-transparent my-10 mx-auto sm:mx-0 flex flex-col">
      {/* Green Section */}
      <div className="relative bg-primary h-28 p-5 pb-12 flex-shrink-0">
        <div className="flex justify-between items-start">
          {/* Optional: Add content here if needed */}
        </div>
      </div>

      {/* White Section */}
      <aside className="relative pt-8 px-5 pb-6 -mt-6 bg-white rounded-3xl flex-1 flex flex-col">
        {/* Logo positioned between green and white sections */}
        <div className="absolute -top-8 right-5 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl flex items-center justify-center p-2.5 shadow-sm">
          <img
            src={logo}
            alt="Company Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="space-y-4 flex-1 flex flex-col justify-between">
          {/* Title and Description */}
          <div className="flex justify-between mt-5 items-start gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-lg text-black">{title}</h3>
              <p className="text-sm text-muted-foreground text-black leading-relaxed">
                {description} &nbsp;
                <Link to="#" className="text-[#90D4A1] hover:underline">
                  learn more
                </Link>
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mt-1" />
          </div>

          {/* Views and Days Left */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-black text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              <span>{daysLeft} Days left</span>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}