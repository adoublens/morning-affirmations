Questions:
What properties does VideoCardProps have in total? (Hint: count the inherited + new ones)
- These are all the properties of VideoCardProps:
id: string;
  title: string;
  description?: string;
  url: string;
  creator: string;
  creatorChannel: string;
  category: VideoCategory;
  themes: string[];
  mood?: 'peaceful' | 'energetic' | 'restorative';
  lastUsed?: Date;
  useCount: number;
  thumbnail: {
    filename: string;
    alt: string;
  };
  tags: string[];
  active: boolean;

  id: string;
  name: string;
  displayName: string;
  description: string;
   primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: { // This is a nested object type
    primary: string;
    secondary: string;
    accent: string;
  };
  border: string;
  shadow: string;
  heading: string;
  body: string;
  accent: string;
  display: string; 
  mood: 'peaceful' | 'energetic' | 'restorative';
  isActive: boolean;


Why is onSelect optional? What happens if it's not provided?
- someone may not select anything
- if nothing is selected the `void` will be the value assigned to `onSelect`?

What's the type of the video property? Where is Video defined?
- the video property is type Video
- Video is defined in content.ts
- it means that `video` is a composite of Video and inherits all of it's properties (VideoCardProps HAS-A Video)

Why do you think theme is required but onSelect is optional?
- theme is needed for styling something
- onSelect can be left unselected and it won't break anything in the application

QUESTION: why is `video: Video` declared and then used as part of `onSelect`?
QUESTION: why is `onSelect` displayed in a different color (yellow) in the IDE? Is it a special type of property?
QUESTION: what type of function is this: ` onSelect?: (video: Video) => void;`? I think it's a ternary operator - but if you were to expand it to an old fashioned function how would it look?
    `` 
    function onSelect(video: Video) {
    void;
    }
    ``
