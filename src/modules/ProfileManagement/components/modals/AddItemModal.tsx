import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CameraIcon } from '@/modules/shared/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  type: 'experience' | 'education';
}

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const experienceSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
  image: z
    .any()
    .refine((files) => !files || files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
    .refine(
      (files) => !files || files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
});

const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  start: z.string().min(1, 'Start date is required'),
  end: z.string().min(1, 'End date is required'),
  });

export default function AddItemModal({ isOpen, onClose, onSubmit, type }: AddItemModalProps) {
  const schema = type === 'experience' ? experienceSchema : educationSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (data: z.infer<typeof schema>) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white! rounded-xl shadow-lg p-0 border-0">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="relative">
              <img 
                src={type === 'experience' ? 'assets/bag.svg' : 'assets/education.svg'} 
                alt="icon" 
                className="w-10 h-10"
              />
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute -bottom-1 -right-1 p-1 bg-[#92E3A9] rounded-full hover:bg-[#7ED196] transition-colors"
              >
                <CameraIcon className="w-3 h-3 text-white" />
              </button>
            </div>
            Add {type === 'experience' ? 'Experience' : 'Education'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-5">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  form.setValue('image', e.target.files);
                }
              }}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={type === 'experience' ? 'role' : 'degree'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">{type === 'experience' ? 'Role' : 'Degree'}</FormLabel>
                  <FormControl>
                    <Input 
                      className="border border-gray-200 rounded-lg focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] h-11" 
                      placeholder={type === 'experience' ? 'e.g. Software Engineer' : 'e.g. Bachelor of Science'} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={type === 'experience' ? 'company' : 'institution'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">{type === 'experience' ? 'Company' : 'Institution'}</FormLabel>
                  <FormControl>
                    <Input 
                      className="border border-gray-200 rounded-lg focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] h-11" 
                      placeholder={type === 'experience' ? 'e.g. Google' : 'e.g. Stanford University'} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Start Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className="border border-gray-200 rounded-lg focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] h-11" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">End Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className="border border-gray-200 rounded-lg focus:border-[#92E3A9] focus:ring-1 focus:ring-[#92E3A9] h-11" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex justify-end gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 font-medium text-white!"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="px-6 py-2.5 bg-[#92E3A9]! hover:bg-[#7ED196] text-white! rounded-lg font-medium cursor-pointer!"
              >
                Add {type === 'experience' ? 'Experience' : 'Education'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 