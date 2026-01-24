const QUESTIONS = [
    { q: "What is the recommended daily water intake for an average adult?", a: ["1 liter", "2-3 liters", "5 liters", "10 liters"], correct: 1, explanation: "Most health authorities recommend around 2-3 liters (or 8 glasses) per day." },
    { q: "Which vitamin is primarily produced by skin exposure to sunlight?", a: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin B12"], correct: 2, explanation: "Vitamin D is known as the 'sunshine vitamin' because the body produces it upon sun exposure." },
    { q: "What is a healthy BMI range?", a: ["10-15", "18.5-24.9", "25-30", "30+"], correct: 1, explanation: "A BMI between 18.5 and 24.9 is generally considered a healthy weight range." },
    { q: "Which organ is primarily responsible for pumping blood?", a: ["Brain", "Lungs", "Heart", "Liver"], correct: 2, explanation: "The heart is the muscular organ that pumps blood through the circulatory system." },
    { q: "How many hours of sleep are generally recommended for adults?", a: ["4-5 hours", "7-9 hours", "10-12 hours", "15 hours"], correct: 1, explanation: "7 to 9 hours of quality sleep is the standard recommendation for optimal health." },
    { q: "Which nutrient is the body's primary source of energy?", a: ["Protein", "Fats", "Carbohydrates", "Vitamins"], correct: 2, explanation: "Carbohydrates are broken down into glucose, which is the body's main energy source." },
    { q: "Which type of exercise improves heart health the most?", a: ["Stretching", "Cardio (Aerobic)", "Balance training", "Lifting weights"], correct: 1, explanation: "Cardio exercises like running, swimming, and cycling strengthen the heart and lungs." },
    { q: "High intake of salt is linked to:", a: ["Low blood pressure", "High blood pressure", "Better vision", "Weight loss"], correct: 1, explanation: "Excess sodium can cause the body to hold onto water, increasing blood pressure." },
    { q: "What is the most effective way to wash your hands?", a: ["Water only", "Soap and water for 20s", "Quick rinse", "Wiping with towel"], correct: 1, explanation: "Washing with soap and water for at least 20 seconds effectively removes germs." },
    { q: "Which food is a good source of protein?", a: ["Apple", "Bread", "Chicken Breast", "Cucumber"], correct: 2, explanation: "Chicken breast, along with eggs, fish, and beans, is protein-rich." }
];

let currentIdx = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', loadQuestion);

function loadQuestion() {
    if (currentIdx >= QUESTIONS.length) {
        showResult();
        return;
    }

    const q = QUESTIONS[currentIdx];
    document.getElementById('current-q').textContent = currentIdx + 1;
    document.getElementById('question-text').textContent = q.q;

    // Hide Next btn, Explanation
    document.getElementById('next-btn').style.display = 'none';
    const explanationEl = document.getElementById('explanation');
    explanationEl.style.display = 'none';
    explanationEl.textContent = q.explanation;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index, btn);
        container.appendChild(btn);
    });
}

function checkAnswer(selectedIdx, btnElement) {
    const q = QUESTIONS[currentIdx];
    const allBtns = document.querySelectorAll('.option-btn');

    // Disable all
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIdx === q.correct) {
        btnElement.classList.add('correct');
        score++;
        document.getElementById('score').textContent = score;
    } else {
        btnElement.classList.add('wrong');
        allBtns[q.correct].classList.add('correct');
    }

    document.getElementById('explanation').style.display = 'block';

    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'inline-block';
    nextBtn.onclick = () => {
        currentIdx++;
        loadQuestion();
    };
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('final-score').textContent = score;

    const msg = document.getElementById('performance-msg');
    if (score === 10) msg.textContent = "Perfect Score! You are a health expert.";
    else if (score >= 7) msg.textContent = "Great job! You have good health awareness.";
    else msg.textContent = "Keep learning! Health is wealth.";
}
