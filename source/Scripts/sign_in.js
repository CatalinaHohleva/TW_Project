document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorBox = document.getElementById('error-box');
    errorBox.style.display = 'none';
    errorBox.textContent = '';

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
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);
            
            const rememberMe = document.getElementById("remember-me").checked;
            console.log("Remember me checked:", rememberMe);
            if (rememberMe) {
                localStorage.setItem("stored_email", email);
                localStorage.setItem("stored_password", password);
                localStorage.setItem("remember-me", 'true');
            } else {
                localStorage.setItem("remember-me", 'false');
                localStorage.removeItem('stored_email');
                localStorage.removeItem('stored_password');
            }

            window.location.href = 'home.html';
        } else {
            errorBox.textContent = data.message;
            errorBox.style.display = 'block';
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorBox.textContent = 'An unexpected error occurred. Please try again later';
        errorBox.style.display = 'block';
    });
});