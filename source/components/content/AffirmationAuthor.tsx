'use client';

interface AffirmationAuthorProps {
  author: string;
  category: string;
}

export function AffirmationAuthor({ author, category }: AffirmationAuthorProps) {
  return (
    <div className="mb-6">
      <footer className="text-lg md:text-xl text-[var(--theme-text-secondary)] font-medium" style={{ fontFamily: 'var(--font-accent)' }}>
        <div className="flex items-center justify-center space-x-2">
          <span className="w-1 h-1 bg-[var(--theme-accent)] rounded-full"></span>
          <span>— {author}</span>
        </div>
      </footer>
    </div>
  );
}
