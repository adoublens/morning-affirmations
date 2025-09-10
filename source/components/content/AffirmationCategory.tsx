'use client';

interface AffirmationCategoryProps {
  category: string;
}

export function AffirmationCategory({ category }: AffirmationCategoryProps) {
  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'spiritual': 'bg-purple-100 text-purple-800 border-purple-200',
      'health': 'bg-green-100 text-green-800 border-green-200',
      'success': 'bg-blue-100 text-blue-800 border-blue-200',
      'self-esteem': 'bg-pink-100 text-pink-800 border-pink-200',
      'confidence': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'creativity': 'bg-orange-100 text-orange-800 border-orange-200',
      'relationships': 'bg-red-100 text-red-800 border-red-200',
      'wealth': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'positive-thinking': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };
    
    return categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category: string) => {
    const categoryIcons: { [key: string]: string } = {
      'spiritual': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      'health': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      'success': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'self-esteem': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      'confidence': 'M13 10V3L4 14h7v7l9-11h-7z',
      'creativity': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      'relationships': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      'wealth': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'positive-thinking': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    };
    
    return categoryIcons[category] || 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z';
  };

  return (
    <div className="!space-y-4 !mb-8 !mt-5">
      {/* Category Badge */}
      <div className="flex justify-center">
        <div className={`inline-flex items-center !px-4 !py-2 rounded-full text-sm font-medium !border ${getCategoryColor(category)}`}>
          <svg className="!w-4 !h-4 !mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d={getCategoryIcon(category)} clipRule="evenodd" />
          </svg>
          <span className="capitalize">{category.replace('-', ' ')}</span>
        </div>
      </div>

    </div>
  );
}
