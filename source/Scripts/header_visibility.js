document.addEventListener('DOMContentLoaded', function() {
    const signInLink = document.querySelector('.login-btn');
    const profileMenu = document.querySelector('.profile-menu');
    const watchList = document.querySelector('.watchlist-btn');
    const manageUsersLink = document.getElementById('manage-users');
    const addMovieLink = document.getElementById('add-movie');

    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');

    if (userEmail) {
        signInLink.style.display = 'none';
        profileMenu.style.display = 'block';
        watchList.style.display = 'block';

        if (userRole === 'admin') {
            manageUsersLink.style.display = 'block';
            addMovieLink.style.display = 'block';
        } else {
            manageUsersLink.style.display = 'none';
            addMovieLink.style.display = 'none';
        }
    } 
    else {
        signInLink.style.display = 'block';
        profileMenu.style.display = 'none';
        manageUsersLink.style.display = 'none';
        watchList.style.display = 'none';
    }
});
