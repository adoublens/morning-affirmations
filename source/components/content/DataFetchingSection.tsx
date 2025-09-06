import { DataFetcher } from './DataFetcher';

export function DataFetchingSection() {
  return (
    <section className="section bg-[var(--theme-background)]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8 text-[var(--theme-text-primary)]">
          Data Fetching Test
        </h2>
        <DataFetcher />
      </div>
    </section>
  );
}
