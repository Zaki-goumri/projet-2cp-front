import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingState = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <Skeleton className="mb-2 h-5 w-3/4" />
        <Skeleton className="mb-4 h-4 w-1/2" />
        <div className="mb-4 flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="mt-4 flex justify-between">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    ))}
  </div>
); 