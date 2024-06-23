const PROFILE_BASE_URL = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
const API_KEY = 'c22daecb5ce9b93cd32db50478e6e0b5';
const container = document.querySelector(".container");
const backgroundPoster = document.getElementById("background-poster");

async function getActorInfo(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        await showActorInfo(data);
    } catch (err) {
        console.error('error:' + err);
    }
}

function setBackground(imageUrl) {
    document.querySelector('.background-poster').style.backgroundImage = `url('${imageUrl}')`;
}

async function fetchProfilePath(name) {
    const formattedName = encodeURIComponent(name);
    const url = `https://api.themoviedb.org/3/search/person?query=${formattedName}&api_key=${API_KEY}`;
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
        if (data.results && data.results.length > 0 && data.results[0].profile_path) {
            return PROFILE_BASE_URL + data.results[0].profile_path;
        }
    } catch (err) {
        console.error(`Error fetching profile path for "${name}": ${err}`);
        return '';
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


async function showActorInfo(data) {
    backgroundPoster.innerHTML=``;
    
    console.log(data);
    const { name, known_for_department, original_name, popularity} = data.results[0];
    const profilePath = await fetchProfilePath(name);

    document.querySelector('.footer').style.marginTop = '100px';
    document.querySelector('.footer').style.width = '105%';

    setBackground('./actorBackground.jpg');

    backgroundPoster.innerHTML=`
        <img class="profile" src=${profilePath} alt=${name} id="profile">`;

    const actorElement = document.createElement('div');
    actorElement.classList.add('actor-info');
    if(name) {
        actorElement.innerHTML += `<li><h1>${name}</h1></li>`;
    }

    if(known_for_department) {
        actorElement.innerHTML += `<li><p>Known for department: ${known_for_department}</p></li>`;
    }

    if(original_name) {
        actorElement.innerHTML += `<li><p>Original name: ${original_name}</p></li>`;
    }

    if(popularity) {
        actorElement.innerHTML += `<li><p>Popularity: ${popularity}</p></li>`;
    }

    backgroundPoster.appendChild(actorElement);

    await showMovieList(name);
}

async function showMovieList(name) {
    const movieListContainer = document.getElementById('movie-actor-list');
    movieListContainer.innerHTML = ``;

    const movieTitle = document.getElementById('movie-list-title'); 

    if (name) {
        movieTitle.innerHTML = `<h1>Known for</h1>`;
    }

    const response = await fetch(`/get_movie_list?name=${encodeURIComponent(name)}`);
    const data = await response.json();

    if (data.success) {
        const movieList = data.movieList;

        for (const record of movieList) {
            const { title, type, release_year } = record;
            const posterPath = await fetchPosterPath(title, type);

            const encodedTitle = encodeURIComponent(title);

            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <a href="/descriptionPage.html?title=${encodedTitle}" target="_blank">
                    <img src="${posterPath}" alt="${title}">
                    <h2>${title}</h2>
                    <p>${release_year}</p>
                </a>`;

            movieListContainer.appendChild(movieElement); 
        }
    } else {
        console.error('Failed to fetch movie list:', data.error);
    }
}


const urlParams = new URLSearchParams(window.location.search);
const actor = urlParams.get('actor');
const encodedActor = encodeURIComponent(actor);
document.title = `${actor}`;
getActorInfo(`https://api.themoviedb.org/3/search/person?query=${encodedActor}&api_key=${API_KEY}`);