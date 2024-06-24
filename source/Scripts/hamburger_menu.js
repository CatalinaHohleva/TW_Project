document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    container.addEventListener('click', function() {
        toggleMenu(this);
    });

    const role = localStorage.getItem('role');
    setMenu(role);
});

function toggleMenu(x) {
    x.classList.toggle("change");
    var menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function setMenu(role) {
    var menu = document.getElementById('menu');
    if (role === 'admin') {
        menu.innerHTML = `
            <ul>
                <li><a href="home.html">Home</a></li>
                <li><a href="admin_users_list.html">Manage users</a></li>
                <li><a href="add-movie.html">Add Movie/TV Show</a></li>
                <li><a href="edit_account.html">Edit account</a></li>
                <li><a href="delete_account.html">Delete account</a></li>
                <li><a href="sign_out.html">Sign out</a></li>
            </ul>
        `;
    } else {
        menu.innerHTML = `
            <ul>
                <li><a href="home.html">Home</a></li>
                <li><a href="edit_account.html">Edit account</a></li>
                <li><a href="delete_account.html">Delete account</a></li>
                <li><a href="sign_out.html">Sign out</a></li>
            </ul>
        `;
    }
}