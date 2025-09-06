import { DataFetchingSection } from '@/components/content/DataFetchingSection';
import { ClientPageContent } from '@/components/content/ClientPageContent';

export default function Home() {
  return (
    <>
      <ClientPageContent />
      <DataFetchingSection />
    </>
  );
}