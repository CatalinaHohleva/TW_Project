document.getElementById('forgot_your_password_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorBox.textContent = 'Please enter a valid email address';
        errorBox.style.display = 'block';
        return;
    }

    fetch('/forgot_your_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          errorBox.textContent = data.message;;
          errorBox.style.display = 'block';
        } else {
            localStorage.setItem('email_for_password_reset', email);
            window.location.href = 'verify_email_password_reset.html';
        }
      })
      .catch(error => {
        console.error('Error during the process:', error);
        errorBox.textContent = 'An unexpected error occurred. Please try again later.';
        errorBox.style.display = 'block';
      });
});