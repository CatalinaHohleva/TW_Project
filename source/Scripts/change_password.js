document.addEventListener('DOMContentLoaded', () => {
    const errorBox = document.getElementById('error-box');
    const form = document.getElementById('change-password-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const password = document.getElementById('password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        const oldPassword = localStorage.getItem('password');
        if (password !== oldPassword) {
            displayError('Current password is incorrect');
            return;
        }

        /*const passwordRegex = /^.{4,50}$/;
        if (!passwordRegex.test(newPassword)) {
            displayError('Password must be 4-50 characters long');
            return;
        }*/

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,50}$/;
        
        if (!passwordRegex.test(password)) {
            errorBox.textContent = 'Password must be 8-50 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';
            errorBox.style.display = 'block';
            return;
        }

        if (newPassword !== confirmPassword) {
            displayError('Passwords do not match');
            return;
        }

        const email = localStorage.getItem('email');

        const data = {email, newPassword };
        fetch('/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                localStorage.setItem('password', newPassword);
                window.location.href = 'edit_account.html';
            } else {
                displayError(result.message || 'Failed to change password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayError('Failed to change password');
        });
    });

    function displayError(message) {
        errorBox.textContent = message;
        errorBox.style.display = 'block';
    }
});
