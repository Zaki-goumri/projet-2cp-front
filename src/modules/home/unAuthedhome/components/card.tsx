import { ArrowRight, Eye, Timer } from 'lucide-react';
import { Link } from 'react-router'; // Updated import for Link
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
    <main className="group mx-auto my-10 flex h-full w-full max-w-md min-w-2 cursor-pointer flex-col overflow-hidden rounded-3xl border-transparent shadow-lg duration-300 ease-in-out hover:scale-110 sm:mx-0">
      {/* Green Section */}
      <div className="bg-primary relative h-28 flex-shrink-0 p-5 pb-12">
        <div className="flex items-start justify-between">
          {/* Optional: Add content here if needed */}
        </div>
      </div>

      {/* White Section */}
      <aside className="relative -mt-6 flex flex-1 flex-col rounded-3xl bg-white px-5 pt-8 pb-6">
        {/* Logo positioned between green and white sections */}
        <div className="absolute -top-8 right-5 flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm sm:h-20 sm:w-20">
          <img
            src={logo}
            alt="Company Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between space-y-4">
          {/* Title and Description */}
          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-black">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-black">
                {description} &nbsp;
                <Link to="#" className="text-[#90D4A1] hover:underline">
                  learn more
                </Link>
              </p>
            </div>
            <ArrowRight className="text-muted-foreground mt-1 h-5 w-5" />
          </div>

          {/* Views and Days Left */}
          <div className="text-muted-foreground flex flex-col gap-4 pt-2 text-sm text-black sm:flex-row sm:gap-6">
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
