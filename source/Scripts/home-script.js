const NETFLIX_MOVIES_DESC_URL = 'http://127.0.0.1:8081/netflix/movies_desc';
const DISNEY_MOVIES_DESC_URL = 'http://127.0.0.1:8081/disney/movies_desc';
const NETFLIX_TVSHOWS_DESC_URL = 'http://127.0.0.1:8081/netflix/tvShows_desc';
const DISNEY_TVSHOWS_DESC_URL = 'http://127.0.0.1:8081/disney/tvShows_desc';
const IMAGE_URL = 'https://media.themoviedb.org/t/p/w220_and_h330_bestv2/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg';
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
    
async function showMoviesOrTvShows(data, movieList) {
    movieList.innerHTML = ''; // Clean the list
    data.forEach(movie => {
        const {title, release_year} = movie;
        
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMAGE_URL}" alt="${title}">
            <h2>${title}</h2>
            <p>${release_year}</p>`;
        
        movieList.appendChild(movieElement);
    });
}

getMoviesOrTvShows(NETFLIX_MOVIES_DESC_URL, movieList1);
getMoviesOrTvShows(DISNEY_MOVIES_DESC_URL, movieList2);
//getMoviesOrTvShows(NETFLIX_TVSHOWS_DESC_URL, movieList3);
//getMoviesOrTvShows(DISNEY_TVSHOWS_DESC_URL, movieList4);
