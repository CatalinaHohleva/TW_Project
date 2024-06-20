document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sign-out').addEventListener('click', function(event) {
        event.preventDefault();

        // Clear local storage
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        console.log("Stored credentials removed from localStorage.");

        // Optionally, clear all local storage items
        // localStorage.clear();

        // Redirect to the sign-in page
        window.location.href = 'home.html';
    });
});
