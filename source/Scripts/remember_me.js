document.addEventListener("DOMContentLoaded", function() {

    const rememberMe = localStorage.getItem('remember-me') === 'true';
    const storedEmail = localStorage.getItem("stored_email");
    const storedPassword = localStorage.getItem("stored_password");

    if (rememberMe) {
        document.getElementById("email").value = storedEmail;
        document.getElementById("password").value = storedPassword;
        document.getElementById("remember-me").checked = true;
    }
});
