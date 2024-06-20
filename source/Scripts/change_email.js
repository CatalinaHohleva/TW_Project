document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('change_email_form');
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorBox.textContent = 'Please enter a valid email address';
            errorBox.style.display = 'block';
            return;
        }

        const currentEmail = localStorage.getItem('email');

        if (email == currentEmail) {
          errorBox.textContent = 'This email is already associated with your page. Try a different one.';
          errorBox.style.display = 'block';
          return;
        }

        fetch('/change_email', {
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
                localStorage.setItem('new_email', email);
                window.location.href = 'verify_new_email.html';
            }
          })
          .catch(error => {
            console.error('Error during the process:', error);
            errorBox.textContent = 'An unexpected error occurred. Please try again later.';
            errorBox.style.display = 'block';
          });
    });
});


    