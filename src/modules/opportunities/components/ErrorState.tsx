import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorStateProps } from '../types/opportunity.types';

export const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-red-300 bg-red-50 p-12 text-center text-red-700">
    <div className="mb-4 rounded-full bg-red-100 p-3">
      <AlertTriangle className="h-8 w-8" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">Oops! Something went wrong</h3>
    <p className="max-w-sm text-sm">
      We encountered an error while fetching the data. Please try refreshing the
      page.
    </p>
    {error?.message && <p className="mt-2 text-xs">Error: {error.message}</p>}
    <Button
      variant="outline"
      className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
      onClick={() => window.location.reload()} // Consider a less disruptive error recovery
    >
      Refresh Page
    </Button>
  </div>
); 