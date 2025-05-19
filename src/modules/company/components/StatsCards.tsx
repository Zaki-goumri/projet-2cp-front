import { Briefcase, CheckCircle, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ApplicationStatusData,
  OverViewKeysType,
} from '../types/company.types';

interface StatsCardsProps {
  data: Map<OverViewKeysType, Omit<ApplicationStatusData, 'name'>>;
}

const StatsCards = ({ data }: StatsCardsProps) => {
  const cardsDisplay = [
    {
      icon: <Briefcase className="h-4 w-4 text-[#92E3A9]!" />,
      name: 'Total job posts',
      data: data.get('total job  Posts'),
    },
    {
      icon: <FileText className="h-4 w-4 text-[#92E3A9]!" />,
      name: 'Total Applications',
      data: data.get('Total applications'),
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-[#92E3A9]!" />,
      name: 'total accepted',
      data: data.get('total accepted'),
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cardsDisplay.map((card) => (
        <Card className="border border-gray-200! bg-white! shadow-sm! transition-shadow! hover:shadow-md!">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500!">
              {card.name}
            </CardTitle>
            <Briefcase className="h-4 w-4 text-[#92E3A9]!" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900!"></div>
            <p className="text-xs text-gray-500!">total: {card.data?.value} </p>
            <p className="text-xs text-gray-500!">
              This month: {card.data?.thisMonth}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
