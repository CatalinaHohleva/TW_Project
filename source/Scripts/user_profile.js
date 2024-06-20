document.addEventListener("DOMContentLoaded", function() {
    const profileButton = document.querySelector('.profile-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    profileButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.profile-btn')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});
