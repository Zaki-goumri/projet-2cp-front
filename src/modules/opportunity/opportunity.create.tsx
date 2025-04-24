import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DateRangePicker from './components/DateRangePicker';
import StatusSelect from './components/StatusSelect';
import TypeSelect from './components/TypeSelect';
import WorkTypeSelect from './components/WorkTypeSelect';
import SkillsInput from './components/SkillsInput';
import DescriptionInput from './components/DescriptionInput';

const CreateOpportunityPage = () => {
  const [postName, setPostName] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[800px] px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Create new <span className="text-[#92E3A9]">Internship Post</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to create a new internship opportunity.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <h2 className="font-medium text-gray-800">Internship Details</h2>
          </div>

          <div className="space-y-6 p-6">
            {/* Post Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Post Name
              </label>
              <input
                type="text"
                value={postName}
                onChange={(e) => setPostName(e.target.value)}
                placeholder="Enter the internship post name"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-[#92E3A9] focus:outline-none focus:ring-1 focus:ring-[#92E3A9]"
              />
            </div>

            {/* Internship Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Internship Duration
              </label>
              <DateRangePicker />
            </div>

            {/* Type and Work Type Selects */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Internship Type
                </label>
                <TypeSelect />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Work Type
                </label>
                <WorkTypeSelect />
              </div>
            </div>

            {/* Skills Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Required Skills
              </label>
              <SkillsInput
                selectedSkills={selectedSkills}
                onSkillsChange={setSelectedSkills}
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <DescriptionInput />
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex justify-end">
              <Button
                className="rounded-lg bg-[#92E3A9]! px-8 py-2.5 text-sm font-medium text-white! cursor-pointer! transition-colors hover:bg-[#7ED196] focus:outline-none focus:ring-2 focus:ring-[#92E3A9] focus:ring-offset-2"
                type="submit"
              >
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateOpportunityPage;