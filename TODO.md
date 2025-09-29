# TODO: Add Scrolling Animation for About Us Section

## Approved Plan
- Enhance scrolling animation for the About Us section by adding individual refs for title, paragraphs, and video container.
- Use IntersectionObserver to trigger staggered animations (e.g., slideUp, fadeIn) as elements come into view while scrolling.
- Ensure Episodes, Let's Connect (Contact), and Footer sections have appropriate scrolling animations (already partially implemented).
- Add new animation utility classes in globals.css if needed for better effects.

## Steps
- [ ] Step 1: Add new refs in app/page.js for About Us section elements (title, first paragraph, video container, second paragraph).
- [ ] Step 2: Update the IntersectionObserver useEffect to observe these new refs and add animation classes with appropriate delays.
- [ ] Step 3: Add new animation keyframes or utility classes in app/globals.css for staggered effects (e.g., animate-stagger-delay).
- [ ] Step 4: Test the scrolling animations by running the development server and scrolling through the sections.
- [ ] Step 5: Verify animations work on About Us, Episodes, Let's Connect, and Footer sections.
- [ ] Step 6: Make any adjustments based on testing (e.g., timing, effects).
