const NETFLIX_MOVIES_DESC_URL = 'http://127.0.0.1:8081/netflix/movies_desc';
const DISNEY_MOVIES_DESC_URL = 'http://127.0.0.1:8081/disney/movies_desc';
const NETFLIX_TVSHOWS_DESC_URL = 'http://127.0.0.1:8081/netflix/tvShows_desc';
const DISNEY_TVSHOWS_DESC_URL = 'http://127.0.0.1:8081/disney/tvShows_desc';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
const API_KEY = 'c22daecb5ce9b93cd32db50478e6e0b5';
const container = document.querySelector(".container");
const movieList1 = document.getElementById("movie-list1");
const movieList2 = document.getElementById("movie-list2");
const movieList3 = document.getElementById("movie-list3");
const movieList4 = document.getElementById("movie-list4");

async function getMoviesOrTvShows(url, movieList) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMoviesOrTvShows(data, movieList);
    } catch (err) {
        console.error('error:' + err);
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
        return '';
    }
}

async function showMoviesOrTvShows(data, movieList) {
    movieList.innerHTML = ''; // Clean the list
    for (const movie of data) {
        const { title, type, release_year } = movie;
        const posterPath = await fetchPosterPath(title, type);

        const encodedTitle = encodeURIComponent(title); // Codifică titlul pentru a-l include în URL

        // Construiește elementul de film
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <a href="/descriptionPage.html?title=${encodedTitle}" target="_blank">
                <img src="${posterPath}" alt="${title}">
                <h2>${title}</h2>
                <p>${release_year}</p>
            </a>`;
        
        // Adaugă elementul de film în lista de filme
        movieList.appendChild(movieElement);
    }
}

getMoviesOrTvShows(NETFLIX_MOVIES_DESC_URL, movieList1);
getMoviesOrTvShows(DISNEY_MOVIES_DESC_URL, movieList2);
getMoviesOrTvShows(NETFLIX_TVSHOWS_DESC_URL, movieList3);
getMoviesOrTvShows(DISNEY_TVSHOWS_DESC_URL, movieList4);
