document.addEventListener('DOMContentLoaded', function() {
    const smallSearchButton = document.getElementById('small-search-button');
    const searchInput = document.querySelector('.search_input');
    const movieList = document.getElementById('movie-list');

    smallSearchButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = `SearchPage.html`;
    });

    async function getMoviesOrTvShows(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            showMoviesOrTvShows(data);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    async function fetchPosterPath(title, type) {
        const formattedTitle = title.replace(" ", '+');
        const url = `https://api.themoviedb.org/3/search/${type === "Movie" ? "movie" : "tv"}?query=${formattedTitle}&api_key=${API_KEY}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjJkYWVjYjVjZTliOTNjZDMyZGI1MDQ3OGU2ZTBiNSIsInN1YiI6IjY2NTlhMmRhZGM4ZWZlZTQ2NzFkNGQwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mLvZbrfSl430P83xuziYynX0cronYOLDu3Fc4qvTlhA'
            }
        };
    
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            if (data.results && data.results.length > 0 && data.results[0].poster_path) {
                return IMAGE_BASE_URL + data.results[0].poster_path;
            }
        } catch (err) {
            console.error(`Error fetching poster path for "${title}": ${err}`);
        }
        return '';
    }

    async function showMoviesOrTvShows(data) {
        movieList.innerHTML = '';// Clear the movie list

        if (data.length === 0) {
            const noResultsElement = document.createElement('div');
            noResultsElement.classList.add('no-results');
            noResultsElement.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
            movieList.appendChild(noResultsElement);
        } else {
            for (const movie of data) {
                const { title, type, release_year } = movie;
                const posterPath = await fetchPosterPath(title, type); // Wait for poster path

                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="${posterPath}" alt="${title}">
                    <h2>${title}</h2>
                    <p>${release_year}</p>`;

                movieList.appendChild(movieElement);
            }
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('term');
    currentPage = window.location.pathname.split('/').pop();
    if(currentPage === 'SearchPage.html') {
        document.title = `Search for "${searchTerm}" - Movies and TV Shows Explorer`;
    }

    const ALL_MOVIES_TVSHOWS_URL = 'http://127.0.0.1:8081/all';

    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    const API_KEY = 'c22daecb5ce9b93cd32db50478e6e0b5';

    getMoviesOrTvShows(ALL_MOVIES_TVSHOWS_URL);
});

