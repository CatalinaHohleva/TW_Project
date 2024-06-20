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
                fetchUsers(); // Fetch and render updated users list
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
