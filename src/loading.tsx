import React from 'react';
import { Loader2 } from 'lucide-react';

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-16 h-16 text-gray-700 animate-spin" />
    </div>
  );
}

export default Loading;