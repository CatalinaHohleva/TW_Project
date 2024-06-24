document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';
    
    const usernameRegex = /^.{1,50}$/;
    if (!usernameRegex.test(username)) {
        errorBox.textContent = 'Username must be 1-50 characters long';
        errorBox.style.display = 'block';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorBox.textContent = 'Please enter a valid email address';
        errorBox.style.display = 'block';
        return;
    }

    /*const passwordRegex = /^.{4,50}$/;
    if (!passwordRegex.test(password)) {
        errorBox.textContent = 'Password must be 4-50 characters long';
        errorBox.style.display = 'block';
        return;
    }*/

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,50}$/;

    if (!passwordRegex.test(password)) {
        errorBox.textContent = 'Password must be 8-50 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        errorBox.style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        errorBox.textContent = 'Passwords do not match';
        errorBox.style.display = 'block';
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('username_register', username);
            localStorage.setItem('password_register', password);
            localStorage.setItem('email_register', email);
            window.location.href = 'verify_email.html';
        } else {
            console.error('Registration failed:', data.message);
            errorBox.textContent = data.message;
            errorBox.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        errorBox.textContent = 'An unexpected error occurred. Please try again later.';
        errorBox.style.display = 'block';
    });
});
