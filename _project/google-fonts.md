# Google Font Combinations for Each Theme

## Font Selection Philosophy

Each theme's font combination is carefully chosen to reflect its emotional character:
- **Primary Fonts**: Main content, headings, and body text
- **Secondary Fonts**: Supporting text, descriptions, and secondary information
- **Accent Fonts**: Special elements, quotes, and decorative text

All fonts are selected for:
- **Readability** - Excellent legibility across devices
- **Personality** - Matches each theme's emotional tone
- **Performance** - Fast loading and rendering
- **Accessibility** - Clear contrast and spacing

---

## 1. Peaceful Theme Fonts
**Mood**: Relaxed, gentle, calm, serene, tranquil

### Primary Font: **Quicksand**
- **Style**: Modern, rounded, friendly sans-serif
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium)
- **Usage**: Main headings, navigation, primary text
- **Characteristics**: Soft edges, open counters, gentle curves
- **Perfect for**: Creating a calm, approachable feeling

### Secondary Font: **Lora**
- **Style**: Elegant serif with refined details
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold)
- **Usage**: Body text, affirmations, longer content
- **Characteristics**: Graceful serifs, balanced proportions, readable
- **Perfect for**: Adding sophistication while maintaining calmness

### Accent Font: **Dancing Script**
- **Style**: Flowing, handwritten script
- **Weights**: 400 (Regular), 500 (Medium)
- **Usage**: Quotes, author names, special highlights
- **Characteristics**: Natural flow, elegant curves, personal touch
- **Perfect for**: Adding warmth and personality

### Font Combination Example:
```css
/* Peaceful Theme Fonts */
.theme-peaceful {
  --font-primary: 'Quicksand', sans-serif;
  --font-secondary: 'Lora', serif;
  --font-accent: 'Dancing Script', cursive;
  
  --font-weight-primary: 300;
  --font-weight-secondary: 400;
  --font-weight-accent: 500;
}

/* Usage Examples */
.peaceful-heading {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-primary);
  font-size: 2.5rem;
}

.peaceful-body {
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
}

.peaceful-quote {
  font-family: var(--font-accent);
  font-weight: var(--font-weight-accent);
  font-size: 1.3rem;
}
```

---

## 2. Energetic Theme Fonts
**Mood**: Vibrant, enthusiastic, creative, dynamic, uplifting

### Primary Font: **Poppins**
- **Style**: Geometric, modern sans-serif with personality
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Usage**: Main headings, titles, primary content
- **Characteristics**: Clean lines, friendly curves, excellent readability
- **Perfect for**: Conveying energy and modern creativity

### Secondary Font: **Open Sans**
- **Style**: Humanist sans-serif, highly legible
- **Weights**: 400 (Regular), 600 (Semi-bold)
- **Usage**: Body text, descriptions, secondary content
- **Characteristics**: Open counters, generous spacing, friendly appearance
- **Perfect for**: Ensuring excellent readability at all sizes

### Accent Font: **Pacifico**
- **Style**: Playful, handwritten script with personality
- **Weights**: 400 (Regular)
- **Usage**: Creative elements, fun highlights, brand elements
- **Characteristics**: Bouncy baseline, friendly curves, energetic feel
- **Perfect for**: Adding fun and creativity to the energetic theme

### Font Combination Example:
```css
/* Energetic Theme Fonts */
.theme-energetic {
  --font-primary: 'Poppins', sans-serif;
  --font-secondary: 'Open Sans', sans-serif;
  --font-accent: 'Pacifico', cursive;
  
  --font-weight-primary: 600;
  --font-weight-secondary: 400;
  --font-weight-accent: 400;
}

/* Usage Examples */
.energetic-heading {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-primary);
  font-size: 2.5rem;
  letter-spacing: -0.02em;
}

.energetic-body {
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
}

.energetic-accent {
  font-family: var(--font-accent);
  font-weight: var(--font-weight-accent);
  font-size: 1.4rem;
}
```

---

## 3. Restorative Theme Fonts
**Mood**: Contemplative, thoughtful, introspective, calming, mindful

### Primary Font: **Merriweather**
- **Style**: Traditional serif with modern proportions
- **Weights**: 300 (Light), 400 (Regular), 700 (Bold)
- **Usage**: Main headings, titles, primary content
- **Characteristics**: Refined serifs, excellent readability, timeless elegance
- **Perfect for**: Creating a thoughtful, contemplative atmosphere

### Secondary Font: **Source Sans Pro**
- **Style**: Clean, modern sans-serif with excellent legibility
- **Weights**: 300 (Light), 400 (Regular), 600 (Semi-bold)
- **Usage**: Body text, descriptions, supporting content
- **Characteristics**: Clear forms, balanced proportions, professional appearance
- **Perfect for**: Ensuring clarity and ease of reading

### Accent Font: **Playfair Display**
- **Style**: Elegant, high-contrast serif with dramatic flair
- **Weights**: 400 (Regular), 600 (Semi-bold), 700 (Bold)
- **Usage**: Special headings, quotes, emphasis
- **Characteristics**: High contrast, refined details, sophisticated appearance
- **Perfect for**: Adding elegance and depth to contemplative content

### Font Combination Example:
```css
/* Restorative Theme Fonts */
.theme-restorative {
  --font-primary: 'Merriweather', serif;
  --font-secondary: 'Source Sans Pro', sans-serif;
  --font-accent: 'Playfair Display', serif;
  
  --font-weight-primary: 400;
  --font-weight-secondary: 300;
  --font-weight-accent: 600;
}

/* Usage Examples */
.restorative-heading {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-primary);
  font-size: 2.5rem;
  line-height: 1.2;
}

.restorative-body {
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
}

.restorative-quote {
  font-family: var(--font-accent);
  font-weight: var(--font-weight-accent);
  font-size: 1.4rem;
  font-style: italic;
}
```

---

## Font Loading Strategy

### Google Fonts Import
```html
<!-- Peaceful Theme Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&family=Lora:wght@400;500;600&family=Dancing+Script:wght@400;500&display=swap" rel="stylesheet">

<!-- Energetic Theme Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600&family=Pacifico&display=swap" rel="stylesheet">

<!-- Restorative Theme Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@300;400;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
```

### Performance Optimization
```css
/* Font Display Strategy */
@font-face {
  font-family: 'Quicksand';
  font-display: swap; /* Show fallback immediately, swap when custom font loads */
}

/* Preload Critical Fonts */
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap" as="style">
```

---

## Typography Scale

### Base Font Sizes
```css
:root {
  /* Base font sizes for each theme */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
}

/* Theme-specific line heights */
.theme-peaceful {
  --line-height-tight: 1.25;
  --line-height-normal: 1.7;
  --line-height-relaxed: 2;
}

.theme-energetic {
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.8;
}

.theme-restorative {
  --line-height-tight: 1.3;
  --line-height-normal: 1.8;
  --line-height-relaxed: 2.2;
}
```

---

## Accessibility Considerations

### Font Sizing
- **Minimum body text**: 16px (1rem) for optimal readability
- **Line height**: 1.5 minimum for body text
- **Letter spacing**: Adjustable for better readability

### Contrast and Spacing
- **Font weights**: Provide sufficient contrast with backgrounds
- **Spacing**: Generous spacing between lines and paragraphs
- **Fallbacks**: System font fallbacks for better performance

### Responsive Typography
```css
/* Responsive font sizing */
@media (max-width: 768px) {
  .theme-heading {
    font-size: var(--font-size-3xl); /* Smaller on mobile */
  }
  
  .theme-body {
    font-size: var(--font-size-base); /* Maintain readability */
    line-height: var(--line-height-normal);
  }
}
```

---

## Implementation Notes

### CSS Custom Properties
```css
/* Complete theme font system */
:root {
  /* Peaceful Theme */
  --peaceful-fonts: 'Quicksand', 'Lora', 'Dancing Script';
  --peaceful-weights: 300, 400, 500;
  
  /* Energetic Theme */
  --energetic-fonts: 'Poppins', 'Open Sans', 'Pacifico';
  --energetic-weights: 400, 500, 600, 700;
  
  /* Restorative Theme */
  --restorative-fonts: 'Merriweather', 'Source Sans Pro', 'Playfair Display';
  --restorative-weights: 300, 400, 600, 700;
}
```

### Font Switching
```css
/* Dynamic font switching */
.theme-peaceful .content {
  font-family: var(--peaceful-primary);
}

.theme-energetic .content {
  font-family: var(--energetic-primary);
}

.theme-restorative .content {
  font-family: var(--restorative-primary);
}
```

This font system provides a complete typography foundation that enhances each theme's emotional character while maintaining excellent readability and performance.
