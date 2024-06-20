document.addEventListener('DOMContentLoaded', function() {
    const signInLink = document.querySelector('.login-btn');
    //const signUpLink = document.querySelector('.register-btn');
    const profileMenu = document.querySelector('.profile-menu');
    const manageUsersLink = document.getElementById('manage-users');

    // Check if user is signed in based on presence of email in localStorage
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');

    if (userEmail) {
        // User is signed in, hide sign-in and sign-up links, show profile menu
        signInLink.style.display = 'none';
        //signUpLink.style.display = 'none';
        profileMenu.style.display = 'block';

        // Show or hide "Manage users" link based on user role
        if (userRole === 'admin') {
            manageUsersLink.style.display = 'block';
        } else {
            manageUsersLink.style.display = 'none';
        }
    } else {
        // User is signed out, show sign-in and sign-up links, hide profile menu
        signInLink.style.display = 'block';
        //signUpLink.style.display = 'block';
        profileMenu.style.display = 'none';
        manageUsersLink.style.display = 'none';
    }
});
