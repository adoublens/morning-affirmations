
# Project Vision

## Overview
I want to have a affirmations web app that displays a different affirmation each time the page loads. It has a specific purpose - display affirmations and information to help improve mental and physical health.

These resources would correspond to one of three themes:
1) Peaceful
2) Energetic
3) Restorative 

The page would display the following resources:
- A welcome message that changes based on the time of day
- Daily affirmation text and its category - randomly selected from a JSON file with option to include thumbnail imiage
- Link to a Lavendaire YouTube video  - randomly selected from a JSON file with option to include thumbnail imiage
- Link to a Bible YouTube video  - randomly selected from a JSON file with option to include thumbnail imiage
- Link to a Yoga YouTube video  - randomly selected from a JSON file with option to include thumbnail imiage
- Link to a Meditation YouTube video  - randomly selected from a JSON file with option to include thumbnail imiage
- Link to an Artsy/Creative YouTube video  - randomly selected from a JSON file with option to include thumbnail imiage
- Display the theme that all of these resources correspond to and have the option to switch to a different theme if I'm in a different mood that day


## Examples

Below is an exampme of what a typical page could look like

### Morning Example (Energetic theme)

Good morning early bird!

Gratitude, peace, and joy are ways that God communicates with us. During these times, we are feeling a real connection with God, though we might not initially identify it as such.
~ Faith

[Optional thumbnail image]
[Powerful Positive Morning Affirmations ☀️ start your day w/ bright beautiful energy](https://www.youtube.com/watch?v=uT6ASPy2Dbs)
Lavendaire

[Optional thumbnail image]
[Begin Your Day by Thanking the One Who Carried You Through | A Blessed Morning Prayer](https://www.youtube.com/watch?v=68glOWE90IA)
Grace For Purpose Prayers

[Optional thumbnail image]
[10 min Morning Yoga For Hips & Lower Back](https://www.youtube.com/watch?v=rBfdsyk8UK0)
Yoga with Kassandra

[Optional thumbnail image]
[5 Minute Meditation for Relaxation & Positive Energu](https://www.youtube.com/watch?v=VpHz8Mb13_Y)
Lavendaire

[Optional thumbnail image]
[ArtistPages](https://www.youtube.com/shorts/2Y2HscdKquQ)
@ArtistsPage

(Energetic theme | Switch to a different theme)


## Formatting

The affirmations page should have nice but simple UI. 

Overall tone for each themes:
- Peaceful: relaxed, waking up slowly and enjoying the moment, well rested, looking for quiet, resting
- Energetic: restorative, waking up with energy and ready to start the day, feeling creative, doing
- Restorative: contemplative, waking up with low energy or tired at end of day; looking for motivation, thinking

UI Requirements
* Background color that changes on page refresh
* The background color should transition into a different color after a few seconds
* The background colors should use colors that match each theme (e.g. Peaceful =  pastel, muted and calming colors); NOTE: suggest a color scheme for each theme
* The fonts should change as well to match each theme; there can be multiple icon sets per theme (e.g. 3 each)
* Randonmly select from a range of Google fonts; NOTE: suggest a Google font set for each theme


## Technology stack

- React and Next.js
- Store welcome message in a JSON file and pull in a message based on the time of the day
- Store resources (affirmations, YouTube videos) in separate JSON files that can be loaded into the app; Json file should include properties such as: title, URL, creator, thumbnail image filename (optional)
- Store each theme in a separate json files with associated color and font properties so it's easy to modify
- Have the ability to add more themes beyond the original three themes