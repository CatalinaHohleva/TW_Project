document.getElementById('delete_account_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = localStorage.getItem('email');
    
    fetch('/delete_account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log('Account deleted successfully.');

            // Clear local storage
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.setItem("remember-me", 'false');
            localStorage.removeItem('stored_email');
            localStorage.removeItem('stored_password');
            console.log("Stored credentials removed from localStorage.");
            
            // Optionally, clear all local storage items
            // localStorage.clear();
                
            window.location.href = 'home.html';
        } else {
            console.log('Failed to delete account: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Error deleting account:', error);
        console.log('Failed to delete account.');
    });
});

