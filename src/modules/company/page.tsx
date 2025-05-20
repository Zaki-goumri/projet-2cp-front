import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './components/sections/OverviewTab';
import JobsTab from './components/sections/JobsTab';
import ApplicationsTab from './components/sections/ApplicationsTab';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white!">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Company Dashboard
          </h1>
        </div>

        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-8 grid grid-cols-3 bg-gray-100!">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#92E3A9]! data-[state=active]:text-white!"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-[#92E3A9]! data-[state=active]:text-white!"
            >
              Job Posts
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-[#92E3A9]! data-[state=active]:text-white!"
            >
              Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab activeTab={activeTab} />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <JobsTab />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <ApplicationsTab activeTab={activeTab} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;

