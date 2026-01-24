// Main Shared Logic
const HEALTH_TIPS = [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Take a 10-minute walk after lunch to improve digestion.",
    "Sleep at least 7-8 hours to boost your immune system.",
    "Reduce sugar intake to maintain steady energy levels.",
    "Practice deep breathing for 5 minutes to reduce stress.",
    "Eat more leafy greens for essential vitamins.",
    "Stretch every hour if you have a desk job."
];

document.addEventListener('DOMContentLoaded', () => {
    injectNavigation();
    injectDailyTip();
    highlightCurrentLink();
});

function injectNavigation() {
    const navHTML = `
    <nav class="navbar">
        <a href="index.html" class="brand">
            <i class="fas fa-heartbeat"></i> Healthify
        </a>
        <div class="mobile-menu-btn" onclick="toggleMenu()">
            <i class="fas fa-bars"></i>
        </div>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="profile.html">Profile</a></li>
            <li><a href="bmi-water.html">BMI & Water</a></li>
            <li><a href="diet.html">Diet Plan</a></li>
            <li><a href="sleep.html">Sleep</a></li>
            <li><a href="breathing.html">Breathing</a></li>
            <li><a href="hospitals.html">Hospitals</a></li>
            <li><a href="quiz.html">Quiz</a></li>
        </ul>
    </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Add Footer
    const footerHTML = `
    <footer style="text-align:center; padding: 2rem; color: var(--text-muted); margin-top: 2rem; border-top: 1px solid #eee;">
        <p>&copy; 2026 Healthify Platform. All rights reserved.</p>
        <div id="daily-tip-container" class="tip-banner" style="margin-top: 1rem; display:inline-flex; text-align:left;">
            <i class="fas fa-lightbulb" style="font-size: 1.2rem;"></i>
            <div>
                <strong>Daily Tip:</strong> <span id="daily-tip-text">Loading...</span>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function highlightCurrentLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
}

function injectDailyTip() {
    const today = new Date().getDay(); // 0-6
    const tipIndex = today % HEALTH_TIPS.length;
    const tipElement = document.getElementById('daily-tip-text');
    if (tipElement) {
        tipElement.textContent = HEALTH_TIPS[tipIndex];
    }
}
