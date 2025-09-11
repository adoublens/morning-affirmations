'use client';

interface AffirmationTextProps {
  text: string;
  category: string;
}

export function AffirmationText({ text, category }: AffirmationTextProps) {
  return (
    <div className="mb-6 !mt-5">
      <blockquote className="relative">
        
        {/* Main text */}
        <p className="!p-3.5 text-2xl md:text-2xl lg:text-2xl text-[var(--theme-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>
          {text}
        </p>
      
      </blockquote>
    </div>
  );
}
