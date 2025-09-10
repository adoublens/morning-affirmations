'use client';

interface AffirmationAuthorProps {
  author: string;
  category: string;
}

export function AffirmationAuthor({ author, category }: AffirmationAuthorProps) {
  // Don't render if author is empty or undefined
  if (!author || author.trim() === '') {
    return null;
  }

  return (
    <div className="mb-6">
      <footer className="text-lg md:text-xl text-[var(--theme-text-secondary)] font-medium" style={{ fontFamily: 'var(--font-accent)' }}>
        <div className="flex items-center justify-center space-x-2">
          <span>~ {author}</span>
        </div>
      </footer>
    </div>
  );
}
