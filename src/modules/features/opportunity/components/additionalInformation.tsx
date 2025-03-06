    import { MapPin, Building2, Briefcase, Calendar, Clock, Gift } from 'lucide-react';
    import {Card} from '@/components/ui/card';

    const AdditionalInformation = () => {
      const infoItems = [
        {
          icon: <MapPin className="w-5 h-5 text-primary" />,
          title: "Internship Location(s)",
          description: "Algeria",
        },
        {
          icon: <Building2 className="w-5 h-5 text-primary" />,
          title: "Experience",
          description: "Entry level/Beginner",
        },
        {
          icon: <Briefcase className="w-5 h-5 text-primary" />,
          title: "Internship Type",
          description: "Remote",
        },
        {
          icon: <Calendar className="w-5 h-5 text-primary" />,
          title: "Work Level",
          description: "Starting Soon (1 Day)",
        },
        {
          icon: <Clock className="w-5 h-5 text-primary" />,
          title: "Internship Duration",
          description: "1 Month",
        },
        {
          icon: <Gift className="w-5 h-5 text-primary" />,
          title: "Perks",
          description: "Certificate of Completion",
        },
      ];

      return (
        <div className="space-y-4 mb-10 bg-white shadow p-6 rounded-lg">
          <h3 className="font-semibold">Additional Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {infoItems.map((item, index) => (
              <Card key={index} className="p-4 flex items-center gap-3 !bg-white !border-none">
                <div className="bg-primary/10 p-2 rounded-lg ">{item.icon}</div>
                <div className="text-gray-600">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm ">{item.description}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    };

    export default AdditionalInformation;