document.getElementById('verify-new-email-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const otp = document.getElementById('otp').value;
    const email = localStorage.getItem('email');
    const newEmail = localStorage.getItem('new_email');
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  
    fetch('/verify-otp-change-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, newEmail, otp })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        errorBox.textContent = data.message;
        errorBox.style.display = 'block';
      } else {
        localStorage.setItem('email', newEmail);
        localStorage.removeItem('new_email');
        window.location.href = 'edit_account.html';
      }
    })
    .catch(error => {
      console.error('Error during OTP verification:', error);
      errorBox.textContent = 'An unexpected error occurred. Please try again later.';
      errorBox.style.display = 'block';
    });
  });
  