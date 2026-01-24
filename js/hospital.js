document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('healthify_user'));
    const display = document.getElementById('user-location-city');
    const btn = document.getElementById('find-hospital-btn');

    let locationQuery = "Current Location";

    if (user && user.location) {
        display.textContent = user.location;
        display.style.color = "var(--primary-blue)";
        locationQuery = user.location;
    } else {
        display.textContent = "Location not set in Profile";
        display.style.color = "#e67e22";
    }

    btn.addEventListener('click', () => {
        const query = encodeURIComponent(`hospitals near ${locationQuery}`);
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
    });
});
