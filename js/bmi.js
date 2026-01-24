document.addEventListener('DOMContentLoaded', () => {
    calculateBMI();
    initWaterTracker();
});

// --- BMI Logic ---
function calculateBMI() {
    const user = JSON.parse(localStorage.getItem('healthify_user'));

    if (!user || !user.height || !user.weight) {
        document.getElementById('bmi-suggestion').textContent = "Please set your height and weight in the Profile page.";
        return;
    }

    const h = user.height / 100;
    const bmi = (user.weight / (h * h)).toFixed(1);

    document.getElementById('bmi-value').textContent = bmi;

    let category = "";
    let color = "";
    let suggestion = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#e67e22"; // Orange
        suggestion = "Focus on nutrient-dense foods to gain healthy weight. Increase protein and healthy fats.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal";
        color = "#27ae60"; // Green
        suggestion = "Great job! Maintain a balanced diet and regular exercise to stay healthy.";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        color = "#f39c12"; // Yellow-Orange
        suggestion = "Try to incorporate more cardio exercises and reduce processed sugar intake.";
    } else {
        category = "Obese";
        color = "#c0392b"; // Red
        suggestion = "Consult a nutritionist for a personalized plan. Small, consistent changes make a big difference.";
    }

    const catEl = document.getElementById('bmi-category');
    catEl.textContent = category;
    catEl.style.color = color;
    catEl.style.fontWeight = "bold";

    document.getElementById('bmi-suggestion').textContent = suggestion;
}

// --- Water Logic ---
let currentWater = 0;
let targetWater = 2000;

function initWaterTracker() {
    const user = JSON.parse(localStorage.getItem('healthify_user'));
    if (user && user.weight) {
        targetWater = user.weight * 35; // 35ml per kg
    }
    document.getElementById('water-target').textContent = Math.round(targetWater);
    updateWaterUI();
}

function addWater(amount) {
    currentWater += amount;
    updateWaterUI();
}

function resetWater() {
    currentWater = 0;
    updateWaterUI();
}

function updateWaterUI() {
    document.getElementById('water-current').textContent = currentWater;

    const percentage = Math.min(100, Math.round((currentWater / targetWater) * 100));
    document.getElementById('water-bar').style.width = `${percentage}%`;

    const feedbackEl = document.getElementById('hydration-feedback');
    if (percentage >= 100) {
        feedbackEl.style.display = 'flex';
        feedbackEl.innerHTML = '<i class="fas fa-check-circle"></i> Great job! You hit your hydration goal.';
        feedbackEl.style.backgroundColor = '#d4edda';
        feedbackEl.style.borderColor = '#28a745';
        feedbackEl.style.color = '#155724';
    } else if (percentage >= 50) {
        feedbackEl.style.display = 'flex';
        feedbackEl.innerHTML = '<i class="fas fa-info-circle"></i> Halfway there! Keep drinking.';
        feedbackEl.style.backgroundColor = '#fff3cd';
        feedbackEl.style.borderColor = '#ffc107';
        feedbackEl.style.color = '#856404';
    } else {
        feedbackEl.style.display = 'none';
    }
}
