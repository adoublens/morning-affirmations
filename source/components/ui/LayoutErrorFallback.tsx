'use client';

export function LayoutErrorFallback() {
  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-4">
          Something went wrong
        </h1>
        <p className="text-[var(--theme-text-secondary)] mb-6">
          We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
        </p>
        <button
          onClick={handleRefresh}
          className="btn btn-primary px-6 py-3"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
