'use client';

interface AffirmationTextProps {
  text: string;
  category: string;
}

export function AffirmationText({ text, category }: AffirmationTextProps) {
  return (
    <div className="mb-6">
      <blockquote className="relative">
        {/* Quote decoration */}
        <div className="absolute -top-4 -left-4 w-8 h-8 text-[var(--theme-accent)] opacity-30">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        
        {/* Main text */}
        <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-medium text-[var(--theme-text-primary)] relative z-10" style={{ fontFamily: 'var(--font-body)' }}>
          {text}
        </p>
        
        {/* Closing quote decoration */}
        <div className="absolute -bottom-4 -right-4 w-8 h-8 text-[var(--theme-accent)] opacity-30 transform rotate-180">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
      </blockquote>
    </div>
  );
}
