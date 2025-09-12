'use client';

interface AffirmationAuthorProps {
  author: string;
}

export function AffirmationAuthor({ author }: AffirmationAuthorProps) {
  // Don't render if author is empty or undefined
  if (!author || author.trim() === '') {
    return null;
  }

  return (
    <div className="mb-6">
      <footer className="text-lg md:text-sm text-[var(--theme-text-secondary)] font-medium !pl-8 !pr-8" style={{ fontFamily: 'var(--font-accent)' }}>
        <div className="flex items-center justify-center space-x-2">
          <span>~ {author}</span>
        </div>
      </footer>
    </div>
  );
}
