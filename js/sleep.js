document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sleep-form').addEventListener('submit', calculateSleepScore);
});

function calculateSleepScore(e) {
    e.preventDefault();

    const hours = parseFloat(document.getElementById('sleep-hours').value);
    const peaceful = document.getElementById('peaceful').value;
    const dream = document.getElementById('dream').value;

    let score = 0;

    // Base score on hours
    if (hours >= 7 && hours <= 9) score += 60; // Optimal
    else if (hours >= 6) score += 40;
    else score += 20;

    // Quality additions
    if (peaceful === 'yes') score += 30;
    else score += 10;

    if (dream === 'yes') score += 10;

    // Cap at 100
    score = Math.min(100, score);

    // Save to local storage (optional history)
    localStorage.setItem('healthify_last_sleep', score);

    displayResult(score, hours);
}

function displayResult(score, hours) {
    document.getElementById('sleep-placeholder').style.display = 'none';
    const container = document.getElementById('sleep-score-container');
    container.style.display = 'block';

    const scoreEl = document.getElementById('sleep-score');
    const qualityEl = document.getElementById('sleep-quality');
    const adviceEl = document.getElementById('sleep-advice');

    scoreEl.textContent = score;

    if (score >= 80) {
        qualityEl.textContent = "Excellent Sleep!";
        qualityEl.style.color = "#2e7d32";
        adviceEl.textContent = "You're getting great rest. Keep up this routine!";
    } else if (score >= 50) {
        qualityEl.textContent = "Average Sleep";
        qualityEl.style.color = "#f57f17";
        adviceEl.textContent = "Try to aim for 7-8 hours or improve your sleep environment.";
    } else {
        qualityEl.textContent = "Poor Sleep";
        qualityEl.style.color = "#c62828";
        adviceEl.textContent = "Consider reducing screen time before bed and creating a calming routine.";
    }
}
