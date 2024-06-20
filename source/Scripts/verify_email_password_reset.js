document.getElementById('verify-email-password-reset-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const otp = document.getElementById('otp').value;
    const email = localStorage.getItem('email_for_password_reset');
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  
    fetch('/verify-otp-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        errorBox.textContent = data.message;
        errorBox.style.display = 'block';
      } else {
        window.location.href = 'reset_password.html';
      }
    })
    .catch(error => {
      console.error('Error during OTP verification:', error);
      errorBox.textContent = 'An unexpected error occurred. Please try again later.';
      errorBox.style.display = 'block';
    });
  });
  