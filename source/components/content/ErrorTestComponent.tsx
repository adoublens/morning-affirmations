'use client';

import { useState } from 'react';

export function ErrorTestComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error triggered by the ErrorTestComponent');
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
        <h3 className="font-semibold mb-2">Error Boundary Test</h3>
        <p className="mb-3">Click the button below to trigger an error and test the ErrorBoundary component:</p>
        <button
          onClick={() => setShouldError(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Trigger Error
        </button>
      </div>
    </div>
  );
}
