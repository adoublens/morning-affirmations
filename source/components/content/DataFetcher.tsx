import { getContentData, ContentData } from '@/lib/utils/getContentData';
import { DataFetchingDisplay } from './DataFetchingDisplay';

// This is a Server Component - it runs on the server

export async function DataFetcher() {
  try {
    const contentData = await getContentData();
    return <DataFetchingDisplay contentData={contentData} />;
  } catch (error) {
    return (
      <div className="card max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Data Fetching Test</h3>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h4 className="font-semibold mb-2">Error Loading Data:</h4>
          <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
        </div>
      </div>
    );
  }
}
