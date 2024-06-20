document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('bx-lock');
    this.classList.toggle('bx-lock-open');
});

document.getElementById('toggle-confirm-password').addEventListener('click', function() {
    const passwordField = document.getElementById('confirm-password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('bx-lock');
    this.classList.toggle('bx-lock-open');
});

document.getElementById('toggle-new-password').addEventListener('click', function() {
    const passwordField = document.getElementById('new-password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('bx-lock');
    this.classList.toggle('bx-lock-open');
});
