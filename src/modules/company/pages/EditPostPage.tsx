import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useJobs, useUpdatePostDetails } from '../hooks/useCompanyService';
import { JobPost } from '../types/company.types';
import { ArrowLeft } from 'lucide-react';

// Form type for internal use
type FormValues = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  postedDate: string;
  status: string;
};

// Define the validation schema
const editJobPostSchema = z.object({
  title: z
    .string()
    .min(3, 'Job title must be at least 3 characters')
    .max(100, 'Job title must not exceed 100 characters'),
  department: z
    .string()
    .min(2, 'Department name is required')
    .max(50, 'Department name must not exceed 50 characters'),
  location: z
    .string()
    .min(2, 'Location is required')
    .max(100, 'Location must not exceed 100 characters'),
  type: z.string().min(2, 'Job type is required').optional(),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
  status: z.string().min(1, 'Status is required'),
  postedDate: z.string().optional(),
});

export type EditJobPostForm = z.infer<typeof editJobPostSchema>;

const EditPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { jobPosts, isLoading } = useJobs();
  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { updatePost } = useUpdatePostDetails();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(editJobPostSchema),
  });

  // Fetch job post data
  useEffect(() => {
    if (jobPosts.length > 0 && postId) {
      const post = jobPosts.find((job) => job.id === Number(postId));
      if (post) {
        setJobPost(post);
        // Pre-populate the form with existing data
        reset({
          title: post.title,
          department: post.department,
          location: post.location,
          type: post.type,
          description: '',

          status: post.status,
          postedDate: post.postedDate,
        });
      }
    }
  }, [jobPosts, postId, reset]);

  const onSubmit = (data: FormValues) => {
    setSubmitLoading(true);

    updatePost({ postId: parseInt(postId!), data });
    // In a real implementation, you would call an API to update the job post
    console.log('Updating job post with ID:', postId, 'Data:', data);

    // Simulate API call
    setTimeout(() => {
      setSubmitLoading(false);
      // Navigate back to the jobs list after successful update
      navigate('/company/test');
    }, 1000);
  };

  const handleBack = () => {
    navigate('/company/test');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-40 items-center justify-center">
          <p className="text-gray-500">Loading job post data...</p>
        </div>
      </div>
    );
  }

  // Job post not found
  if (!jobPost && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        <div className="flex h-40 items-center justify-center">
          <p className="text-gray-500">Job post not found</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[800px] px-4 py-8 md:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Edit <span className="text-[#92E3A9]">Job Post</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Update the details of your job post.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <h2 className="font-medium text-gray-800">Job Details</h2>
          </div>

          <div className="space-y-6 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                {...register('title')}
                type="text"
                placeholder="Enter the job title"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] focus:outline-none"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Department and Location */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  {...register('department')}
                  type="text"
                  placeholder="Enter department"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] focus:outline-none"
                />
                {errors.department && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.department.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  {...register('location')}
                  type="text"
                  placeholder="Enter location"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] focus:outline-none"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Type and Status */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Opportunity Type
                </label>
                <select
                  {...register('type')}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] focus:outline-none"
                >
                  <option value="Full-time">onsite</option>
                  <option value="Part-time">online</option>
                  <option value="Contract">hybrid</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.type.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={6}
                placeholder="Enter job description"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] focus:outline-none"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-100 bg-[#F9FBF9] px-6 py-4">
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitLoading}
                className="cursor-pointer! rounded-lg bg-[#92E3A9]! px-8 py-2.5 text-sm font-medium text-white! transition-colors hover:bg-[#7ED196] focus:ring-2 focus:ring-[#92E3A9] focus:ring-offset-2 focus:outline-none"
              >
                {submitLoading ? 'Updating...' : 'Update Job Post'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditPostPage;
