document.getElementById('reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = localStorage.getItem('email_for_password_reset');
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    const passwordRegex = /^.{4,50}$/;
    if (!passwordRegex.test(password)) {
        errorBox.textContent = 'Password must be 4-50 characters long';
        errorBox.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorBox.textContent = 'Passwords do not match';
        errorBox.style.display = 'block';
        return;
    }

    fetch('/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword: password })
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          errorBox.textContent = 'Password reset failed: ' + data.message;
          errorBox.style.display = 'block';
        } 
        else {
          localStorage.removeItem('email_for_password_reset');
          window.location.href = 'sign_in.html';
        }
      })
      .catch(error => {
        console.error('Error during password reset:', error);
        errorBox.textContent = 'An unexpected error occurred. Please try again later.';
        errorBox.style.display = 'block';
      });
});
