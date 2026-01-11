// Password Strength Checker Script
// This script handles real-time password evaluation, feedback, generation, copying, visibility toggle, and dark mode.

// DOM Elements
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-level');
const feedbackList = document.getElementById('feedback-list');
const generateBtn = document.getElementById('generate-password');
const copyBtn = document.getElementById('copy-password');
const toggleVisibilityBtn = document.getElementById('toggle-visibility');
const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
const body = document.body;

// Constants for Strength Calculation
const MIN_LENGTH = 12;
const STRONG_LENGTH = 16;
const COMMON_PATTERNS = ['password', '123456', 'qwerty', 'letmein', 'admin'];

// Event Listeners
passwordInput.addEventListener('input', evaluatePassword);
generateBtn.addEventListener('click', generateStrongPassword);
copyBtn.addEventListener('click', copyToClipboard);
toggleVisibilityBtn.addEventListener('click', togglePasswordVisibility);
toggleDarkModeBtn.addEventListener('click', toggleDarkMode);

// Initial Setup
evaluatePassword(); // Run once to set default state

// Function to Evaluate Password Strength
function evaluatePassword() {
    const password = passwordInput.value;
    let score = 0;
    const feedback = [];

    // Length Check
    if (password.length >= STRONG_LENGTH) {
        score += 30;
        feedback.push('Excellent length (16+ characters).');
    } else if (password.length >= MIN_LENGTH) {
        score += 20;
        feedback.push('Good length (12+ characters).');
    } else {
        feedback.push('Password should be at least 12 characters long.');
    }

    // Character Variety Checks
    if (/[A-Z]/.test(password)) {
        score += 15;
        feedback.push('Includes uppercase letters.');
    } else {
        feedback.push('Add uppercase letters for better strength.');
    }

    if (/[a-z]/.test(password)) {
        score += 15;
        feedback.push('Includes lowercase letters.');
    } else {
        feedback.push('Add lowercase letters for better strength.');
    }

    if (/[0-9]/.test(password)) {
        score += 15;
        feedback.push('Includes numbers.');
    } else {
        feedback.push('Add numbers for better strength.');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score += 15;
        feedback.push('Includes special symbols.');
    } else {
        feedback.push('Add special symbols (!@#$ etc.) for better strength.');
    }

    // Entropy/Complexity Bonus (simple approximation)
    const uniqueChars = new Set(password).size;
    if (uniqueChars > 10) {
        score += 10;
        feedback.push('High character diversity.');
    }

    // Penalty for Common Patterns
    const lowerPass = password.toLowerCase();
    if (COMMON_PATTERNS.some(pattern => lowerPass.includes(pattern))) {
        score -= 20;
        feedback.push('Avoid common words or patterns like "password".');
    }

    // Clamp Score Between 0 and 100
    score = Math.max(0, Math.min(100, score));

    // Update UI
    updateStrengthBar(score);
    updateFeedback(feedback);

    // Enable/Disable Copy Button
    copyBtn.disabled = password.length === 0;
}

// Update Strength Bar and Text
function updateStrengthBar(score) {
    const barBefore = strengthBar.style;
    barBefore.setProperty('--width', `${score}%`); // Use CSS variable for width
    strengthBar.style.setProperty('width', `${score}%`, 'important'); // Fallback

    let color = 'red';
    let level = 'Weak';
    if (score > 70) {
        color = 'green';
        level = 'Strong';
    } else if (score > 40) {
        color = 'orange';
        level = 'Medium';
    }

    strengthBar.style.background = color;
    strengthText.textContent = level;
    strengthText.style.color = color;
}

// Update Feedback List
function updateFeedback(feedback) {
    feedbackList.innerHTML = '';
    feedback.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        feedbackList.appendChild(li);
    });
}

// Generate Strong Password
function generateStrongPassword() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    for (let i = 0; i < STRONG_LENGTH; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    passwordInput.value = password;
    evaluatePassword();
}

// Copy to Clipboard
function copyToClipboard() {
    navigator.clipboard.writeText(passwordInput.value)
        .then(() => alert('Password copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    toggleVisibilityBtn.textContent = type === 'password' ? '👁️' : '🙈';
}

// Toggle Dark Mode
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
}

// CSS for Dynamic Bar (added inline for completeness)
const style = document.createElement('style');
style.textContent = `
#strength-bar::before {
    width: var(--width, 0%);
}
`;
document.head.appendChild(style);
  
