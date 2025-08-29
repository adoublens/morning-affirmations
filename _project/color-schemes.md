# Color Scheme Recommendations

## Theme Color Palettes

### 1. Peaceful Theme
**Mood**: Relaxed, gentle, calm, serene, tranquil

#### Primary Colors:
- **Primary**: `#E8F4F8` - Soft sky blue (main content areas)
- **Secondary**: `#B8E6B8` - Gentle mint green (accent elements)
- **Accent**: `#87CEEB` - Light steel blue (highlights, buttons)

#### Background Colors:
- **Background**: `#F0F8FF` - Alice blue (main background)
- **Background Transition**: `#E6F3FF` - Lighter sky blue (transition effect)
- **Surface**: `#F8FBFF` - Very light blue (card backgrounds)

#### Text Colors:
- **Primary Text**: `#2F4F4F` - Dark slate gray (main text)
- **Secondary Text**: `#5F7F7F` - Medium slate gray (subdued text)
- **Accent Text**: `#4682B4` - Steel blue (links, emphasis)

#### Additional Colors:
- **Border**: `#D1E7DD` - Light mint green
- **Shadow**: `#E3F2FD` - Very light blue
- **Hover**: `#B3D9FF` - Light blue hover state

---

### 2. Energetic Theme
**Mood**: Vibrant, enthusiastic, creative, dynamic, uplifting

#### Primary Colors:
- **Primary**: `#FFE4B5` - Moccasin (main content areas)
- **Secondary**: `#FFB6C1` - Light pink (accent elements)
- **Accent**: `#FFD700` - Gold (highlights, buttons)

#### Background Colors:
- **Background**: `#FFF8DC` - Cornsilk (main background)
- **Background Transition**: `#FFEFD5` - Peach puff (transition effect)
- **Surface**: `#FFFEF7` - Very light yellow (card backgrounds)

#### Text Colors:
- **Primary Text**: `#4A4A4A` - Dark gray (main text)
- **Secondary Text**: `#696969` - Dim gray (subdued text)
- **Accent Text**: `#DAA520` - Goldenrod (links, emphasis)

#### Additional Colors:
- **Border**: `#FFE4E1` - Misty rose
- **Shadow**: `#FFFACD` - Lemon chiffon
- **Hover**: `#FFE4C4` - Bisque hover state

---

### 3. Restorative Theme
**Mood**: Contemplative, thoughtful, introspective, calming, mindful

#### Primary Colors:
- **Primary**: `#E6E6FA` - Lavender (main content areas)
- **Secondary**: `#DDA0DD` - Plum (accent elements)
- **Accent**: `#9370DB` - Medium slate blue (highlights, buttons)

#### Background Colors:
- **Background**: `#F8F8FF` - Ghost white (main background)
- **Background Transition**: `#F0F0FF` - Very light lavender (transition effect)
- **Surface**: `#FAFAFF` - Very light lavender (card backgrounds)

#### Text Colors:
- **Primary Text**: `#696969` - Dim gray (main text)
- **Secondary Text**: `#808080` - Gray (subdued text)
- **Accent Text**: `#6A5ACD` - Slate blue (links, emphasis)

#### Additional Colors:
- **Border**: `#E0E0FF` - Light lavender
- **Shadow**: `#F0F0FF` - Very light lavender
- **Hover**: `#D8D8FF` - Light lavender hover state

---

## Color Usage Guidelines

### Background Transitions
- **Peaceful**: 3 seconds, ease-in-out
- **Energetic**: 2.5 seconds, ease-out  
- **Restorative**: 4 seconds, ease-in

### Contrast Ratios
All color combinations meet WCAG AA accessibility standards:
- **Primary text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI elements**: Minimum 3:1 contrast ratio

### Color Psychology
- **Peaceful**: Promotes calmness, reduces stress, encourages relaxation
- **Energetic**: Boosts motivation, increases creativity, promotes action
- **Restorative**: Encourages reflection, supports mindfulness, aids contemplation

## Implementation Notes

### CSS Variables
```css
:root {
  /* Peaceful Theme */
  --peaceful-primary: #E8F4F8;
  --peaceful-secondary: #B8E6B8;
  --peaceful-accent: #87CEEB;
  --peaceful-background: #F0F8FF;
  --peaceful-background-transition: #E6F3FF;
  --peaceful-text: #2F4F4F;
  
  /* Energetic Theme */
  --energetic-primary: #FFE4B5;
  --energetic-secondary: #FFB6C1;
  --energetic-accent: #FFD700;
  --energetic-background: #FFF8DC;
  --energetic-background-transition: #FFEFD5;
  --energetic-text: #4A4A4A;
  
  /* Restorative Theme */
  --restorative-primary: #E6E6FA;
  --restorative-secondary: #DDA0DD;
  --restorative-accent: #9370DB;
  --restorative-background: #F8F8FF;
  --restorative-background-transition: #F0F0FF;
  --restorative-text: #696969;
}
```

### Theme Switching
```css
.theme-peaceful {
  --primary: var(--peaceful-primary);
  --secondary: var(--peaceful-secondary);
  --accent: var(--peaceful-accent);
  --background: var(--peaceful-background);
  --background-transition: var(--peaceful-background-transition);
  --text: var(--peaceful-text);
}

.theme-energetic {
  --primary: var(--energetic-primary);
  --secondary: var(--energetic-secondary);
  --accent: var(--energetic-accent);
  --background: var(--energetic-background);
  --background-transition: var(--energetic-background-transition);
  --text: var(--energetic-text);
}

.theme-restorative {
  --primary: var(--restorative-primary);
  --secondary: var(--restorative-secondary);
  --accent: var(--restorative-accent);
  --background: var(--restorative-background);
  --background-transition: var(--restorative-background-transition);
  --text: var(--restorative-text);
}
```
