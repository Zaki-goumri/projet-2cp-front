import React from 'react';
import { Inbox } from 'lucide-react';
import { EmptyStateProps } from '../types/opportunity.types';

export const EmptyState = ({ message = "No opportunities found." }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
      <Inbox className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">It's a bit empty here</h3>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
); 