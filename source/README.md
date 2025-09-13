This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Adding New Video Categories

This project supports multiple video categories that are displayed in a specific order on the main page. Here's how to add a new video category:

### 1. Add Videos to JSON Data

Add your new videos to `source/data/youtube-videos.json` with the desired category:

```json
{
  "id": "your-video-id",
  "title": "Your Video Title",
  "url": "https://www.youtube.com/watch?v=your-video-id",
  "creator": "Creator Name",
  "creatorChannel": "https://www.youtube.com/@creator-channel",
  "category": "your-new-category",
  "themes": ["peaceful", "energetic"],
  "thumbnail": {
    "filename": "your-video-id-thumbnail.jpg",
    "alt": "Thumbnail description"
  },
  "tags": ["tag1", "tag2", "tag3"],
  "active": true
}
```

### 2. Update VideoGrid Component

Add your new category to the categories array in `source/components/content/VideoGrid.tsx`:

```typescript
const categories = ['affirmations', 'yoga', 'bible', 'artsy-creative', 'your-new-category'];
```

**Note:** The order in this array determines the display order on the page.

### 3. Add Category Styling

Add styling for your new category in `source/components/content/VideoCard.tsx`:

#### Category Colors
```typescript
const getCategoryColor = (category: string) => {
  const categoryColors: { [key: string]: string } = {
    'affirmations': 'bg-purple-100 text-purple-800 border-purple-200',
    'bible': 'bg-blue-100 text-blue-800 border-blue-200',
    'yoga': 'bg-green-100 text-green-800 border-green-200',
    'meditation': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'artsy-creative': 'bg-pink-100 text-pink-800 border-pink-200',
    'your-new-category': 'bg-orange-100 text-orange-800 border-orange-200', // Add your colors
  };
  
  return categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};
```

#### Category Icons
```typescript
const getCategoryIcon = (category: string) => {
  const categoryIcons: { [key: string]: string } = {
    'affirmations': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    'bible': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'yoga': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    'meditation': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    'artsy-creative': 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    'your-new-category': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Add your SVG path
  };
  
  return categoryIcons[category] || 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z';
};
```

### 4. Add Thumbnail Images

Place your video thumbnail images in `source/public/images/videos/` with the naming convention:
- `{video-id}-thumbnail.jpg`

### 5. Update Type Definitions (if needed)

If your new category requires special properties, update the type definitions in `source/types/content.ts`:

```typescript
export type VideoCategory = 
  | 'affirmations' 
  | 'bible' 
  | 'yoga' 
  | 'meditation' 
  | 'artsy-creative' 
  | 'your-new-category'; // Add your category
```

### 6. Test Your Changes

1. Run the development server: `npm run dev`
2. Check that your new category appears in the correct order
3. Verify the styling and icons look correct
4. Test that videos are clickable and open correctly

### Current Category Order

The current display order is:
1. **Affirmations** (Purple) - Positive affirmations and mindset videos
2. **Yoga** (Green) - Yoga and movement videos  
3. **Bible** (Blue) - Biblical and spiritual content
4. **Artsy Creative** (Pink) - Creative and artistic content

### Tips

- Use consistent naming conventions for categories (lowercase, hyphenated)
- Choose colors that complement the existing theme
- Use appropriate SVG icons that represent your category
- Test thoroughly to ensure the new category integrates seamlessly
- Consider the user experience when ordering categories