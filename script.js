// --- Shared Logic ---
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
    // Nav Logic
    injectDailyTip();

    // Page Routing Initial
    navigateTo('home');

    // Profile Logic Init
    if (localStorage.getItem('healthify_user')) loadProfile();
    const profileForm = document.getElementById('profile-form');
    if (profileForm) profileForm.addEventListener('submit', (e) => { e.preventDefault(); saveProfile(); });

    // Breathing Init
    const startBreathBtn = document.getElementById('start-btn');
    if (startBreathBtn) startBreathBtn.addEventListener('click', startBreathingSession);

    // Sleep Init
    const sleepForm = document.getElementById('sleep-form');
    if (sleepForm) sleepForm.addEventListener('submit', calculateSleepScore);

    // Hospital Init
    const findHospBtn = document.getElementById('find-hospital-btn');
    if (findHospBtn) findHospBtn.addEventListener('click', findHospital);

    // Quiz Init
    loadQuestion();
});

// --- Routing ---
function navigateTo(pageId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
    });

    // Show target
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }

    // Update Nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === pageId) item.classList.add('active');
    });

    // Page Specific Triggers
    if (pageId === 'bmi') {
        calculateBMI();
        initWaterTracker();
    }
    if (pageId === 'profile') {
        loadProfile();
    }
    if (pageId === 'hospitals') {
        initHospital();
    }
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

function injectDailyTip() {
    const today = new Date().getDay();
    const tipIndex = today % HEALTH_TIPS.length;
    const tipElement = document.getElementById('daily-tip-text');
    if (tipElement) tipElement.textContent = HEALTH_TIPS[tipIndex];
}


// --- Profile Logic ---
function saveProfile() {
    const user = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        location: document.getElementById('location').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value
    };
    localStorage.setItem('healthify_user', JSON.stringify(user));
    loadProfile();
    alert('Profile Saved Successfully!');
}

function loadProfile() {
    const data = localStorage.getItem('healthify_user');
    if (data) {
        const user = JSON.parse(data);
        // Fill form
        if (document.getElementById('name')) document.getElementById('name').value = user.name;
        if (document.getElementById('age')) document.getElementById('age').value = user.age;
        if (document.getElementById('gender')) document.getElementById('gender').value = user.gender;
        if (document.getElementById('location')) document.getElementById('location').value = user.location;
        if (document.getElementById('height')) document.getElementById('height').value = user.height;
        if (document.getElementById('weight')) document.getElementById('weight').value = user.weight;

        // Update Display Card (used in Profile section)
        const dName = document.getElementById('display-name');
        if (dName) {
            dName.textContent = user.name || "Guest User";
            document.getElementById('display-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${user.location || "Location not set"}`;
            document.getElementById('display-height').textContent = user.height || "--";
            document.getElementById('display-weight').textContent = user.weight || "--";

            if (user.height && user.weight) {
                const hMeter = user.height / 100;
                const bmi = (user.weight / (hMeter * hMeter)).toFixed(1);
                document.getElementById('display-bmi').textContent = bmi;
            }
        }
    }
}


// --- BMI & Water Logic ---
let currentWater = 0;
let targetWater = 2000;

function calculateBMI() {
    const user = JSON.parse(localStorage.getItem('healthify_user'));
    if (!user || !user.height || !user.weight) {
        document.getElementById('bmi-suggestion').textContent = "Please set your height and weight in the Profile page.";
        return;
    }
    const h = user.height / 100;
    const bmi = (user.weight / (h * h)).toFixed(1);

    document.getElementById('bmi-value').textContent = bmi;
    let category = "", color = "", suggestion = "";

    if (bmi < 18.5) {
        category = "Underweight"; color = "#e67e22"; suggestion = "Focus on nutrient-dense foods to gain healthy weight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal"; color = "#27ae60"; suggestion = "Great job! Maintain a balanced diet.";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight"; color = "#f39c12"; suggestion = "Consider more cardio exercises.";
    } else {
        category = "Obese"; color = "#c0392b"; suggestion = "Consult a nutritionist for a personalized plan.";
    }

    const catEl = document.getElementById('bmi-category');
    catEl.textContent = category;
    catEl.style.color = color;
    document.getElementById('bmi-suggestion').textContent = suggestion;
}

function initWaterTracker() {
    const user = JSON.parse(localStorage.getItem('healthify_user'));
    if (user && user.weight) targetWater = user.weight * 35;
    document.getElementById('water-target').textContent = Math.round(targetWater);
    updateWaterUI();
}

function addWater(amount) { currentWater += amount; updateWaterUI(); }
function resetWater() { currentWater = 0; updateWaterUI(); }
function updateWaterUI() {
    document.getElementById('water-current').textContent = currentWater;
    const percentage = Math.min(100, Math.round((currentWater / targetWater) * 100));
    document.getElementById('water-bar').style.width = `${percentage}%`;
}


// --- Diet Logic ---
const DIET_DATA = {
    gain: [
        { meal: "Breakfast", item: "Oatmeal with nuts", cal: "500 kcal" },
        { meal: "Lunch", item: "Chicken & Rice", cal: "700 kcal" },
        { meal: "Dinner", item: "Salmon & Quinoa", cal: "600 kcal" }
    ],
    loss: [
        { meal: "Breakfast", item: "Boiled Eggs", cal: "250 kcal" },
        { meal: "Lunch", item: "Green Salad", cal: "350 kcal" },
        { meal: "Dinner", item: "Veggie Soup", cal: "300 kcal" }
    ],
    maintain: [
        { meal: "Breakfast", item: "Toast & Eggs", cal: "400 kcal" },
        { meal: "Lunch", item: "Turkey Wrap", cal: "500 kcal" },
        { meal: "Dinner", item: "Baked Fish", cal: "450 kcal" }
    ]
};
function generateDiet() {
    const goal = document.getElementById('diet-goal').value;
    const plan = DIET_DATA[goal];
    const tbody = document.getElementById('diet-table-body');
    tbody.innerHTML = "";
    plan.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td style="padding:1rem;"><strong>${row.meal}</strong></td><td style="padding:1rem;">${row.item}</td><td style="padding:1rem;">${row.cal}</td>`;
        tbody.appendChild(tr);
    });
    document.getElementById('diet-result').style.display = 'block';
}


// --- Sleep Logic ---
function calculateSleepScore(e) {
    e.preventDefault();
    const hours = parseFloat(document.getElementById('sleep-hours').value);
    const peaceful = document.getElementById('peaceful').value;
    const dream = document.getElementById('dream').value;
    let score = 0;
    if (hours >= 7 && hours <= 9) score += 60; else score += 40;
    if (peaceful === 'yes') score += 30; else score += 10;
    if (dream === 'yes') score += 10;
    score = Math.min(100, score);

    document.getElementById('sleep-placeholder').style.display = 'none';
    const container = document.getElementById('sleep-score-container');
    container.style.display = 'block';
    document.getElementById('sleep-score').textContent = score;
    document.getElementById('sleep-quality').textContent = score >= 80 ? "Excellent" : "Average";
}


// --- Breathing Logic ---
let breathInterval, timerInterval;
function startBreathingSession() {
    const bCircle = document.getElementById('breath-circle');
    const bText = document.getElementById('breath-text');
    const bDuration = parseInt(document.getElementById('breath-duration').value);
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');

    startBtn.disabled = true;
    let timeLeft = bDuration * 60;

    bCircle.classList.add('grow');
    bText.textContent = "Breathe In";

    timerInterval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        timerDisplay.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (timeLeft <= 0) endBreathSession();
    }, 1000);

    breathInterval = setInterval(() => {
        if (bText.textContent === "Breathe In") {
            bText.textContent = "Breathe Out";
            bCircle.style.transform = "scale(0.5)";
        } else {
            bText.textContent = "Breathe In";
            bCircle.style.transform = "scale(1.0)";
        }
    }, 4000);
}
function endBreathSession() {
    clearInterval(breathInterval); clearInterval(timerInterval);
    document.getElementById('start-btn').disabled = false;
    document.getElementById('timer-display').textContent = "Session Complete";
    const bCircle = document.getElementById('breath-circle');
    bCircle.style.transform = "scale(0.5)";
    document.getElementById('breath-text').textContent = "Relax";
}


// --- Hospital Logic ---
function initHospital() {
    const user = JSON.parse(localStorage.getItem('healthify_user'));
    const display = document.getElementById('user-location-city');
    if (user && user.location) {
        display.textContent = user.location;
        display.style.color = "var(--primary-blue)";
    } else {
        display.textContent = "Location not set in Profile";
    }
}
function findHospital() {
    const user = JSON.parse(localStorage.getItem('healthify_user'));
    const loc = (user && user.location) ? user.location : "Current Location";
    window.open(`https://www.google.com/maps/search/hospitals+near+${encodeURIComponent(loc)}`, '_blank');
}


// --- Quiz Logic ---
const QUESTIONS = [
    { q: "Daily recommended water intake?", a: ["1L", "2-3L", "5L"], c: 1, exp: "2-3 Liters is standard." },
    { q: "Which vitamin comes from sun?", a: ["C", "A", "D"], c: 2, exp: "Vitamin D is the sunshine vitamin." },
    { q: "Healthy BMI range?", a: ["10-15", "18.5-24.9", "30+"], c: 1, exp: "18.5-24.9 is healthy." }
    // Truncated for brevity in SPA, usually 10 questions
];
let qIdx = 0; let qScore = 0;
function loadQuestion() {
    if (qIdx >= QUESTIONS.length) { showQuizResult(); return; }
    const q = QUESTIONS[qIdx];
    document.getElementById('current-q').textContent = qIdx + 1;
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';

    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkQuiz(i, btn);
        document.getElementById('options-container').appendChild(btn);
    });
}
function checkQuiz(i, btn) {
    const q = QUESTIONS[qIdx];
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);
    if (i === q.c) { btn.classList.add('correct'); qScore++; }
    else { btn.classList.add('wrong'); btns[q.c].classList.add('correct'); }

    document.getElementById('explanation').textContent = q.exp;
    document.getElementById('explanation').style.display = 'block';
    const next = document.getElementById('next-btn');
    next.style.display = 'inline-block';
    next.onclick = () => { qIdx++; loadQuestion(); };
}
function showQuizResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('final-score').textContent = qScore;
}
