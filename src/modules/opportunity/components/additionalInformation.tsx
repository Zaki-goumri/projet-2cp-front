import {
  MapPin,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  Gift,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const infoItems = [
  {
    icon: MapPin,
    title: 'Internship Location(s)',
    description: 'Algeria',
  },
  {
    icon: Building2,
    title: 'Experience',
    description: 'Entry level/Beginner',
  },
  {
    icon: Briefcase,
    title: 'Internship Type',
    description: 'Remote',
  },
  {
    icon: Calendar,
    title: 'Work Level',
    description: 'Starting Soon (1 Day)',
  },
  {
    icon: Clock,
    title: 'Internship Duration',
    description: '1 Month',
  },
  {
    icon: Gift,
    title: 'Perks',
    description: 'Certificate of Completion',
  },
];

const AdditionalInformation = () => {
  return (
    <div className="mb-10 space-y-4 rounded-lg bg-white p-6 shadow">
      <h3 className="text-xl font-semibold border-b pb-3">Additional Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {infoItems.map((item, index) => (
          <Card
            key={index}
            className="flex items-center gap-3 !border-none !bg-white p-4 shadow-sm hover:shadow transition-shadow duration-200"
          >
            <div className="bg-primary/10 rounded-full p-2.5">
              <item.icon className="text-primary h-5 w-5" />
            </div>
            <div className="text-gray-700">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInformation;
