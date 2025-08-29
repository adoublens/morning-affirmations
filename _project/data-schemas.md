# Data Schema Definitions

## 1. Welcome Messages Schema (`welcome-messages.json`)

```json
{
  "themes": {
    "peaceful": {
      "timeRanges": [
        {
          "id": "early-morning",
          "startTime": "05:00",
          "endTime": "08:59",
          "messages": [
            "Good morning, gentle soul",
            "Welcome to a peaceful new day",
            "Rise slowly, breathe deeply",
            "Good morning, peaceful one",
            "Hello, tranquil morning"
          ]
        },
        {
          "id": "morning",
          "startTime": "09:00",
          "endTime": "11:59",
          "messages": [
            "Good morning, peaceful soul",
            "Hello, serene morning",
            "Morning peace to you",
            "Good morning, calm spirit",
            "Welcome to your peaceful morning"
          ]
        },
        {
          "id": "afternoon",
          "startTime": "12:00",
          "endTime": "16:59",
          "messages": [
            "Good afternoon, peaceful one",
            "Hello, tranquil afternoon",
            "Afternoon peace to you",
            "Good afternoon, serene soul",
            "Welcome to your peaceful afternoon"
          ]
        },
        {
          "id": "evening",
          "startTime": "17:00",
          "endTime": "20:59",
          "messages": [
            "Good evening, peaceful soul",
            "Hello, gentle evening",
            "Evening peace to you",
            "Good evening, tranquil one",
            "Welcome to your peaceful evening"
          ]
        },
        {
          "id": "night",
          "startTime": "21:00",
          "endTime": "04:59",
          "messages": [
            "Good night, peaceful one",
            "Hello, gentle night",
            "Night peace to you",
            "Good night, serene soul",
            "Welcome to your peaceful night"
          ]
        }
      ]
    },
    "energetic": {
      "timeRanges": [
        {
          "id": "early-morning",
          "startTime": "05:00",
          "endTime": "08:59",
          "messages": [
            "Good morning early bird!",
            "Rise and shine, beautiful soul!",
            "Welcome to a brand new day!",
            "Good morning, world!",
            "Hello, sunshine!"
          ]
        },
        {
          "id": "morning",
          "startTime": "09:00",
          "endTime": "11:59",
          "messages": [
            "Good morning!",
            "Hello, beautiful day!",
            "Morning blessings to you!",
            "Good morning, amazing person!",
            "Welcome to your morning!"
          ]
        },
        {
          "id": "afternoon",
          "startTime": "12:00",
          "endTime": "16:59",
          "messages": [
            "Good afternoon!",
            "Hello, afternoon!",
            "Afternoon blessings!",
            "Good afternoon, wonderful soul!",
            "Welcome to your afternoon!"
          ]
        },
        {
          "id": "evening",
          "startTime": "17:00",
          "endTime": "20:59",
          "messages": [
            "Good evening!",
            "Hello, evening!",
            "Evening blessings!",
            "Good evening, amazing soul!",
            "Welcome to your evening!"
          ]
        },
        {
          "id": "night",
          "startTime": "21:00",
          "endTime": "04:59",
          "messages": [
            "Good night!",
            "Hello, night!",
            "Night blessings!",
            "Good night, wonderful soul!",
            "Welcome to your night!"
          ]
        }
      ]
    },
    "restorative": {
      "timeRanges": [
        {
          "id": "early-morning",
          "startTime": "05:00",
          "endTime": "08:59",
          "messages": [
            "Good morning, thoughtful one",
            "Welcome to a contemplative day",
            "Rise with purpose, gentle soul",
            "Good morning, reflective spirit",
            "Hello, mindful morning"
          ]
        },
        {
          "id": "morning",
          "startTime": "09:00",
          "endTime": "11:59",
          "messages": [
            "Good morning, contemplative soul",
            "Hello, thoughtful morning",
            "Morning reflection to you",
            "Good morning, mindful one",
            "Welcome to your restorative morning"
          ]
        },
        {
          "id": "afternoon",
          "startTime": "12:00",
          "endTime": "16:59",
          "messages": [
            "Good afternoon, thoughtful one",
            "Hello, contemplative afternoon",
            "Afternoon reflection to you",
            "Good afternoon, mindful soul",
            "Welcome to your restorative afternoon"
          ]
        },
        {
          "id": "evening",
          "startTime": "17:00",
          "endTime": "20:59",
          "messages": [
            "Good evening, contemplative soul",
            "Hello, thoughtful evening",
            "Evening reflection to you",
            "Good evening, mindful one",
            "Welcome to your restorative evening"
          ]
        },
        {
          "id": "night",
          "startTime": "21:00",
          "endTime": "04:59",
          "messages": [
            "Good night, thoughtful one",
            "Hello, contemplative night",
            "Night reflection to you",
            "Good night, mindful soul",
            "Welcome to your restorative night"
          ]
        }
      ]
    }
  }
}
```

## 2. Affirmations Schema (`affirmations.json`)

```json
{
  "affirmations": [
    {
      "id": "unique-id-1",
      "text": "Gratitude, peace, and joy are ways that God communicates with us. During these times, we are feeling a real connection with God, though we might not initially identify it as such.",
      "author": "Faith",
      "category": "spiritual",
      "themes": ["peaceful", "energetic"],
      "tags": ["gratitude", "peace", "joy", "faith", "connection"],
      "image": {
        "filename": "faith-connection.jpg",
        "alt": "Peaceful spiritual connection"
      },
      "active": true
    }
  ],
  "categories": [
    "spiritual",
    "health",
    "success",
    "self-esteem",
    "confidence",
    "creativity",
    "relationships",
    "wealth",
    "positive-thinking"
  ]
}
```

## 3. YouTube Videos Schema (`youtube-videos.json`)

```json
{
  "videos": [
    {
      "id": "unique-video-id-1",
      "title": "Powerful Positive Morning Affirmations ☀️ start your day w/ bright beautiful energy",
      "url": "https://www.youtube.com/watch?v=uT6ASPy2Dbs",
      "creator": "Lavendaire",
      "creatorChannel": "https://www.youtube.com/@Lavendaire",
      "category": "affirmations",
      "themes": ["energetic"],
      "thumbnail": {
        "filename": "lavendaire-morning-affirmations.jpg",
        "alt": "Morning affirmations video thumbnail"
      },
      "tags": ["morning", "affirmations", "positive", "energy"],
      "active": true
    }
  ],
  "categories": [
    "affirmations",
    "bible",
    "yoga",
    "meditation",
    "artsy-creative"
  ]
}
```

## 4. Themes Schema (`themes.json`)

```json
{
  "themes": [
    {
      "id": "peaceful",
      "name": "Peaceful",
      "description": "Relaxed, waking up slowly and enjoying the moment, well rested, looking for quiet, resting",
      "colors": {
        "primary": "#E8F4F8",
        "secondary": "#B8E6B8",
        "accent": "#87CEEB",
        "text": "#2F4F4F",
        "background": "#F0F8FF",
        "backgroundTransition": "#E6F3FF"
      },
      "fonts": {
        "primary": "Quicksand",
        "secondary": "Lora",
        "accent": "Dancing Script"
      },
      "fontWeights": {
        "primary": "300",
        "secondary": "400",
        "accent": "500"
      },
      "transitions": {
        "backgroundDuration": "3000",
        "backgroundEasing": "ease-in-out"
      },
      "active": true
    },
    {
      "id": "energetic",
      "name": "Energetic",
      "description": "Restorative, waking up with energy and ready to start the day, feeling creative, doing",
      "colors": {
        "primary": "#FFE4B5",
        "secondary": "#FFB6C1",
        "accent": "#FFD700",
        "text": "#4A4A4A",
        "background": "#FFF8DC",
        "backgroundTransition": "#FFEFD5"
      },
      "fonts": {
        "primary": "Poppins",
        "secondary": "Open Sans",
        "accent": "Pacifico"
      },
      "fontWeights": {
        "primary": "600",
        "secondary": "400",
        "accent": "700"
      },
      "transitions": {
        "backgroundDuration": "2500",
        "backgroundEasing": "ease-out"
      },
      "active": true
    },
    {
      "id": "restorative",
      "name": "Restorative",
      "description": "Contemplative, waking up with low energy or tired at end of day; looking for motivation, thinking",
      "colors": {
        "primary": "#E6E6FA",
        "secondary": "#DDA0DD",
        "accent": "#9370DB",
        "text": "#696969",
        "background": "#F8F8FF",
        "backgroundTransition": "#F0F0FF"
      },
      "fonts": {
        "primary": "Merriweather",
        "secondary": "Source Sans Pro",
        "accent": "Playfair Display"
      },
      "fontWeights": {
        "primary": "400",
        "secondary": "300",
        "accent": "600"
      },
      "transitions": {
        "backgroundDuration": "4000",
        "backgroundEasing": "ease-in"
      },
      "active": true
    }
  ]
}
```

## 5. App Configuration Schema (`app-config.json`)

```json
{
  "app": {
    "name": "Morning Affirmations",
    "version": "1.0.0",
    "description": "Daily affirmations and wellness resources for mental and physical health"
  },
  "features": {
    "themeSwitching": true,
    "persistentThemes": true,
    "randomization": true,
    "offlineMode": false
  },
  "ui": {
    "defaultTheme": "peaceful",
    "autoThemeSwitch": false,
    "animationSpeed": "normal",
    "showThumbnails": true,
    "showTimestamps": false
  },
  "performance": {
    "maxRetries": 3,
    "timeout": 5000
  }
}
```

## 6. User Preferences Schema (`user-preferences.json`)

```json
{
  "userId": "user-123",
  "preferences": {
    "defaultTheme": "peaceful",
    "persistentTheme": null,
    "uiSettings": {
      "showThumbnails": true,
      "autoPlayVideos": false,
      "darkMode": false
    },
    "notifications": {
      "dailyReminder": true,
      "reminderTime": "08:00"
    }
  },
  "usage": {
    "lastVisit": "2024-01-15T08:30:00Z",
    "totalVisits": 45
  }
}
```

## 7. Content Rotation Schema (`rotation-logic.md`)

### Affirmation Selection Logic:
- **Random Selection**: Load randomly on each page refresh
- **Theme Constraints**: Select from affirmations matching current theme
- **Avoidance**: Don't repeat same affirmation within 7 days
- **Fallback**: If no theme-specific affirmation, use universal ones

### Video Selection Logic:
- **Category Distribution**: 1 video per category per theme
- **Random Selection**: Load randomly from videos matching current theme
- **Avoidance**: Don't repeat same video within 5 days
- **Fallback**: If no theme-specific video, use universal ones

### Theme Selection Logic:
- **Default**: Peaceful theme as default
- **Random Default**: Random theme selection on page refresh (default behavior)
- **Manual Override**: Allow user to switch themes freely
- **Persistence**: Remember user's last selected theme (optional, can be disabled)
- **Fallback**: If persistence disabled, return to random selection

## 8. Data Validation Rules

### Required Fields:
- All IDs must be unique strings
- All URLs must be valid YouTube URLs
- All colors must be valid hex codes
- All font names must be valid Google Fonts

### Optional Fields:
- Thumbnail images (with fallback to default)
- Font weights (with fallback to theme defaults)
- Transition durations (with fallback to theme defaults)

### Data Integrity:
- No orphaned references between schemas
- All active content must have valid required fields
- Deleted content should be soft-deleted (marked inactive)
- Regular validation of YouTube video availability
- Image dimensions handled in app configuration, not in JSON files
