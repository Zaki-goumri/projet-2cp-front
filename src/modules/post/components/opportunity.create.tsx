import { Button } from '@/components/ui/button';
import DatePicker from './DateRangePicker';
import TypeSelect from './TypeSelect';
import WorkTypeSelect from './WorkTypeSelect';
import SkillsInput from './SkillsInput';
import DescriptionInput from './DescriptionInput';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOpportunity } from '../hooks/useOpportunity';

type FormValues = {
  title: string;
  startdate: Date;
  enddate: Date;
  Type: string;
  workType: string;
  skills: string[];
  description: string;
};

// API submission type
type SubmissionData = Omit<FormValues, 'startdate' | 'enddate'> & {
  startdate: string;
  enddate: string;
};

// Define the validation schema
const createInternshipSchema = z
  .object({
    title: z
      .string()
      .min(3, 'Post name must be at least 3 characters')
      .max(100, 'Post name must not exceed 100 characters'),
    startdate: z.date({
      required_error: 'Start date is required',
    }),
    enddate: z.date({
      required_error: 'End date is required',
    }),
    Type: z.string({
      required_error: 'Please select an internship type',
    }),
    workType: z.string({
      required_error: 'Please select a work type',
    }),
    skills: z
      .array(z.string())
      .min(1, 'At least one skill is required')
      .max(10, 'Maximum 10 skills allowed'),
    description: z
      .string()
      .min(50, 'Description must be at least 50 characters')
      .max(5000, 'Description must not exceed 5000 characters'),
  })
  .refine((data) => data.enddate > data.startdate, {
    message: 'End date must be after start date',
    path: ['enddate'], // path of error
  });

export type CreateInternshipForm = z.infer<typeof createInternshipSchema>;

const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CreateOpportunityPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createInternshipSchema),
    defaultValues: {
      skills: [],
      description: '',
      Type: 'Problem',
      workType: 'Onsite',
    },
  });

  const { mutate, isLoading } = useOpportunity();
  const onSubmit = (data: FormValues) => {
    const formattedData: SubmissionData = {
      ...data,
      startdate: formatDateToString(data.startdate),
      enddate: formatDateToString(data.enddate),
    };
    mutate(formattedData);
  };

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <h2 className="font-medium text-gray-800">Internship Details</h2>
          </div>

          <div className="space-y-6 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Post Name
              </label>
              <input
                {...register('title')}
                type="text"
                placeholder="Enter the internship post name"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] focus:outline-none"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Internship Duration */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <Controller
                  name="startdate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select start date"
                    />
                  )}
                />
                {errors.startdate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.startdate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
                <Controller
                  name="enddate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select end date"
                    />
                  )}
                />
                {errors.enddate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.enddate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Type and Work Type Selects */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Internship Type
                </label>
                <Controller
                  name="Type"
                  control={control}
                  render={({ field }) => (
                    <TypeSelect value={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.Type && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.Type.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Work Type
                </label>
                <Controller
                  name="workType"
                  control={control}
                  render={({ field }) => (
                    <WorkTypeSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.workType && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.workType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Skills Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Required Skills
              </label>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <SkillsInput
                    selectedSkills={field.value}
                    onSkillsChange={field.onChange}
                  />
                )}
              />
              {errors.skills && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <DescriptionInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer! rounded-lg bg-[#92E3A9]! px-8 py-2.5 text-sm font-medium text-white! transition-colors hover:bg-[#7ED196] focus:ring-2 focus:ring-[#92E3A9] focus:ring-offset-2 focus:outline-none"
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateOpportunityPage;

