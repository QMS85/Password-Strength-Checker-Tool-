# Password Strength Checker - Cybersecurity Tool - For Educational Purposes Only.  

## Overview
This is a fully client-side web application built with HTML, CSS, and JavaScript to help users evaluate the strength of their passwords in real-time. It's designed for cybersecurity education, promoting best practices like using long, complex passwords without common patterns. No data is ever stored, transmitted, or processed on a server—everything runs in the browser.

### Features
- **Real-Time Evaluation**: As you type, the tool calculates a strength score (0-100) based on length, character variety (uppercase, lowercase, numbers, symbols), diversity, and avoidance of common weak patterns.
- **Visual Feedback**: A progress bar changes color (red for weak, orange for medium, green for strong) with descriptive text.
- **Detailed Suggestions**: A list of improvement tips appears below the meter.
- **Password Generator**: Button to auto-generate a strong 16-character password using a diverse charset.
- **Copy to Clipboard**: Easily copy the password (uses Navigator Clipboard API).
- **Visibility Toggle**: Show/hide password input for convenience.
- **Dark Mode**: Toggle for better accessibility in low-light environments.
- **Responsive Design**: Works on mobile and desktop with media queries.
- **Accessibility**: ARIA attributes for screen readers (e.g., aria-live for feedback, aria-describedby for input).

### Technologies Used
- **HTML5**: Semantic structure for the UI.
- **CSS3**: Styling with transitions, flexbox, media queries, and dark mode support via class toggle.
- **JavaScript (ES6+)**: Event handling, DOM manipulation, regex for checks, Math.random for generation, and Clipboard API.

No external libraries or frameworks—pure vanilla code for lightweight performance (~5KB total minified).

### How to Run
1. Download the files: `index.html`, `styles.css`, `script.js`.
2. Place them in the same directory.
3. Open `index.html` in any modern browser (Chrome, Firefox, Edge, etc.).
4. No server needed—it's static.

### File Structure
- **`index.html`**: Main structure with input, meter, buttons, and info sections.
- **`styles.css`**: Detailed styling for layout, colors, transitions, and responsiveness. Includes dark mode overrides.
- **`script.js`**: Logic for evaluation, generation, copying, toggles. Heavily commented for clarity.
- **`readme.md`**: This file.

### Strength Calculation Details
- **Score Breakdown**:
  - Length: +20 for 12+, +30 for 16+.
  - Variety: +15 each for uppercase, lowercase, numbers, symbols.
  - Diversity: +10 for >10 unique characters.
  - Penalties: -20 for common patterns (e.g., 'password', '123456').
- Clamped to 0-100.
- Levels: Weak (<40), Medium (40-70), Strong (>70).

### Limitations
- This is educational only—not a replacement for professional password managers like LastPass or Bitwarden.
- Client-side only: Can't check against breached password databases (e.g., Have I Been Pwned) without an API.
- Random generation uses `Math.random()`—sufficient for demo but not cryptographically secure (use Web Crypto API for production).
- No persistence: Passwords aren't saved.

### Security Notes
- As a cybersecurity tool, it encourages strong habits but doesn't handle real authentication.
- Avoid using generated passwords for critical accounts without further verification.
- Code is open for inspection—no hidden trackers.

### Customization Ideas
- Add more common patterns to the `COMMON_PATTERNS` array.
- Integrate Web Crypto API for better randomness: Replace `Math.random()` with `crypto.getRandomValues()`.
- Extend feedback with entropy calculation using information theory formulas.

### License
MIT License. Feel free to use, modify, or distribute for non-commercial purposes.

### Author
Jonathan Peters 

---
Last Updated: Sunday January 11, 2026 @ 02:45 AM
