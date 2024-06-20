document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (username && email) {
        document.getElementById('username').textContent = username;
        document.getElementById('email').textContent = email;
    }

    document.getElementById('edit_account_form').addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = 'home.html';
    });
});

function toggleEdit() {
    const usernameDisplay = document.getElementById('username');
    const editInput = document.getElementById('editNameInput');
    const editBtn = document.querySelector('.edit-btn');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    usernameDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = usernameDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function saveName() {
    const newName = document.getElementById('editNameInput').value;
    const errorBox = document.getElementById('error-box');

    const usernameRegex = /^.{1,50}$/;
    if (!usernameRegex.test(newName)) {
        errorBox.textContent = 'Username must be 1-50 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newName) {
        document.getElementById('username').textContent = newName;
        const updatedUsername = document.getElementById('username').textContent;
        const email = document.getElementById('email').textContent;

        localStorage.setItem('username', updatedUsername);
        
        cancelEdit();

        fetch('/edit_username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, newName: updatedUsername })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Name updated successfully');
                cancelEdit();
            } else {
                console.log('Error updating name: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
    }
}

function cancelEdit() {
    const usernameDisplay = document.getElementById('username');
    const editInput = document.getElementById('editNameInput');
    const editBtn = document.querySelector('.edit-btn');
    const saveBtn = document.querySelector('.save-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    usernameDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function editEmail() {
    window.location.href = 'change_email.html';
}

function editPassword() {
    window.location.href = 'change_password.html';
}
