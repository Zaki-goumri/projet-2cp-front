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
      <h3 className="font-semibold">Additional Information</h3>
      <div className="grid grid-cols-2 gap-4">
        {infoItems.map((item, index) => (
          <Card
            key={index}
            className="flex items-center gap-3 !border-none !bg-white p-4"
          >
            <div className="bg-primary/10 rounded-lg p-2">
              <item.icon className="text-primary h-5 w-5" />
            </div>
            <div className="text-gray-600">
              <div className="font-medium">{item.title}</div>
              <div className="text-sm">{item.description}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInformation;
