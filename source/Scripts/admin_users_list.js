document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

function fetchUsers() {
    fetch('/users', {
        method: 'POST'
    })
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = ''; // Clear current list
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="admin-btn" onclick="makeAdmin('${user.email}')">Make admin</button>
                        <button class="delete-btn" onclick="deleteUser('${user.email}')">Delete</button>
                    </td>
                `;
                usersList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/users/${encodeURIComponent(email)}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                fetchUsers();
            } else {
                alert('Failed to delete user');
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        });
    }
}

function makeAdmin(email) {
    if (confirm('Are you sure you want to make this user an admin?')) {
        fetch(`/users/makeAdmin/${encodeURIComponent(email)}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('User has been made an admin');
                fetchUsers();
            } else {
                alert('Failed to make user an admin');
            }
        })
        .catch(error => {
            console.error('Error making user an admin:', error);
            alert('Failed to make user an admin');
        });
    }
}