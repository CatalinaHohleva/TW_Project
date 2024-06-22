document.getElementById('delete_movie_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const platform = urlParams.get('platform');

    fetch('/delete_movie', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ platform: platform, title: title })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log('Movie/tv show deleted successfully.');
            window.location.href = 'home.html';
        } else {
            console.log('Failed to delete movie/tv show: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Error deleting movie/tv show:', error);
        console.log('Failed to delete movie/tv show.');
    });
});

