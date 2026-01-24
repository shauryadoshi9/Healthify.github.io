document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', startBreathingSession);
});

let breathingInterval;
let timerInterval;

function startBreathingSession() {
    const circle = document.getElementById('breath-circle');
    const text = document.getElementById('breath-text');
    const durationSelect = document.getElementById('breath-duration');
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');

    let minutes = parseInt(durationSelect.value);
    let timeLeft = minutes * 60;

    startBtn.disabled = true;
    startBtn.textContent = "In Progress...";
    text.textContent = "Breathe In";
    circle.classList.add('grow');

    // Timer Logic
    timerDisplay.textContent = formatTime(timeLeft);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            endSession();
        }
    }, 1000);

    // Breathing Animation Loop (4s in, 4s out = 8s cycle)
    breathingInterval = setInterval(() => {
        if (text.textContent === "Breathe In") {
            text.textContent = "Breathe Out";
            circle.classList.remove('grow');
            circle.classList.add('shrink');
        } else {
            text.textContent = "Breathe In";
            circle.classList.remove('shrink');
            circle.classList.add('grow');
        }
    }, 4000);
}

function endSession() {
    clearInterval(breathingInterval);
    clearInterval(timerInterval);

    const circle = document.getElementById('breath-circle');
    const text = document.getElementById('breath-text');
    const startBtn = document.getElementById('start-btn');
    const timerDisplay = document.getElementById('timer-display');

    circle.classList.remove('grow', 'shrink');
    text.textContent = "Relax";
    startBtn.disabled = false;
    startBtn.textContent = "Start Session";
    timerDisplay.textContent = "Session Complete. Well done!";
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}
