document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');

    // Load existing data
    loadProfile();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfile();
    });
});

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
    updateDisplay(user);
    alert('Profile Saved Successfully!');
}

function loadProfile() {
    const data = localStorage.getItem('healthify_user');
    if (data) {
        const user = JSON.parse(data);

        document.getElementById('name').value = user.name;
        document.getElementById('age').value = user.age;
        document.getElementById('gender').value = user.gender;
        document.getElementById('location').value = user.location;
        document.getElementById('height').value = user.height;
        document.getElementById('weight').value = user.weight;

        updateDisplay(user);
    }
}

function updateDisplay(user) {
    document.getElementById('display-name').textContent = user.name || "Guest User";
    document.getElementById('display-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${user.location || "Location not set"}`;
    document.getElementById('display-height').textContent = user.height || "--";
    document.getElementById('display-weight').textContent = user.weight || "--";

    // Simple Calculate BMI for display
    if (user.height && user.weight) {
        const hMeter = user.height / 100;
        const bmi = (user.weight / (hMeter * hMeter)).toFixed(1);
        document.getElementById('display-bmi').textContent = bmi;
    }
}
