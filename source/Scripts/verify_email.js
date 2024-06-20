document.getElementById('verify-email-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const otp = document.getElementById('otp').value;
    const email = localStorage.getItem('email_register');
    const username = localStorage.getItem('username_register');
    const password = localStorage.getItem('password_register');
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  
    fetch('/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp, username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        errorBox.textContent = data.message;
        errorBox.style.display = 'block';
      } else {
        localStorage.removeItem("email_register");
        localStorage.removeItem("username_register");
        localStorage.removeItem("password_register");
        window.location.href = 'sign_in.html';
      }
    })
    .catch(error => {
      console.error('Error during OTP verification:', error);
      errorBox.textContent = 'An unexpected error occurred. Please try again later.';
      errorBox.style.display = 'block';
    });
});
  