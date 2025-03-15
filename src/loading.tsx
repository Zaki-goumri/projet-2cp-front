import React from 'react';
import { Loader2 } from 'lucide-react';

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Loader2 className="h-16 w-16 animate-spin text-gray-700" />
    </div>
  );
}

export default Loading;
