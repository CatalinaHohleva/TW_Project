const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
const BACKGROUND_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const PROFILE_BASE_URL = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
const VIDEO_BASE_URL = 'https://www.youtube.com/embed/';
const IMAGE_MOVIE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
const API_KEY = 'c22daecb5ce9b93cd32db50478e6e0b5';
const container = document.querySelector(".container");
const backgroundPoster = document.getElementById("background-poster");
const movieCast = document.getElementById("movie-cast");
const movieRecomandations = document.getElementById("movie-recomandations");
const videoGallery = document.getElementById("video-gallery");
const castTitle = document.getElementById("cast-title");
const recomandationTitle = document.getElementById("recomandations-title");

function setBackground(imageUrl) {
    document.querySelector('.background-poster').style.backgroundImage = `url('${imageUrl}')`;
}

async function getMovieOrTvShowInfo(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        await showMovieOrTvShowInfo(data);
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

async function fetchBackgroundPath(title, type) {
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
        if (data.results && data.results.length > 0 && data.results[0].backdrop_path) {
            return BACKGROUND_IMAGE_BASE_URL + data.results[0].backdrop_path;
        }
    } catch (err) {
        console.error(`Error fetching background path for "${title}": ${err}`);
        return '';
    }
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


async function fetchMovieId(title, type) {
    const formattedTitle = encodeURIComponent(title);
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
        if (data.results && data.results.length > 0 && data.results[0].id) {
            return data.results[0].id;
        }
    } catch (err) {
        console.error(`Error fetching movie id "${title}": ${err}`);
        return '';
    }
}

async function fetchMovieTrailer(id, type) {
    const url = `https://api.themoviedb.org/3/${type === "Movie" ? "movie" : "tv"}/${id}?&append_to_response=videos&api_key=${API_KEY}`;
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
        if (data.videos && data.videos.results && data.videos.results.length > 0) {
            return VIDEO_BASE_URL + data.videos.results[0].key;
        }
    } catch (err) {
        console.error(`Error fetching video path for "${id}": ${err}`);
        return '';
    }
}

async function fetchMovieImages(id, type) {
    const url = `https://api.themoviedb.org/3/${type === "Movie" ? "movie" : "tv"}/${id}?&append_to_response=images&api_key=${API_KEY}`;
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
        if (data.images && data.images.backdrops && data.images.backdrops.length > 0) {
            return data.images.backdrops.map(image => IMAGE_MOVIE_BASE_URL + image.file_path);
        }
    } catch (err) {
        console.error(`Error fetching video path for "${id}": ${err}`);
        return '';
    }
}

async function showMovieOrTvShowInfo(data) {
    backgroundPoster.innerHTML=``;
    
    console.log(data);
    const { platform, type, title, director, cast, country, date_added, release_year, rating, duration, listed_in, description} = data;
    const posterPath = await fetchPosterPath(title, type);
    const backgroundPath = await fetchBackgroundPath(title, type);

    setBackground(backgroundPath);
    backgroundPoster.innerHTML=`
        <img class="poster" src=${posterPath} alt=${title} id="poster">`;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    if(title) {
        movieElement.innerHTML += `<li><h1>${title}</h1></li>`;
    }

    if(duration) {
        movieElement.innerHTML += `<li><p>Duration: ${duration}</p></li>`;
    }

    if(country) {
        movieElement.innerHTML += `<li><p>Country: ${country}</p></li>`;
    }

    if(release_year) {
        movieElement.innerHTML += `<li><p>Release year: ${release_year}</p></li>`;
    }

    if(listed_in) {
        movieElement.innerHTML += `<li><p>Genres: ${listed_in}</p></li>`;
    }

    if(description) {
        movieElement.innerHTML += `<li><p>Overview: ${description}</p></li>`;
    }

    if(cast) {
        movieElement.innerHTML += `<li><p>Leading actors: ${cast}</p></li>`;
    }

    if(director) {
        movieElement.innerHTML += `<li><p>Director: ${director}</p></li>`;
    }

    if(rating) {
        movieElement.innerHTML += `<li><p>Rating: ${rating}</p></li>`;
    }

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('movie-buttons');

    const email = localStorage.getItem('email');

    const watchlistKey = `watchlist_${title}_${email}`;
    const isInWatchlist = localStorage.getItem(watchlistKey) === 'true';

    buttonsContainer.innerHTML = `
        <div class="apply-btn" id="apply-btn">
            <i class="${isInWatchlist ? 'ri-add-circle-fill' : 'ri-add-circle-line'} apply-icon"></i>
        </div>`;

    const role = localStorage.getItem('role');

    if (role === 'admin') {
        buttonsContainer.innerHTML += `<button type="submit" class="edit-btn" id="edit-btn">Edit</button>`;
        buttonsContainer.innerHTML += `
            <div class="delete-btn" id="delete-btn">
                <i class="ri-delete-bin-line delete-icon" ></i>
            </div>`;
    }

    movieElement.appendChild(buttonsContainer);
    backgroundPoster.appendChild(movieElement);

    await showVideoGallery(title, type);

    await showActors(cast);

    await showRecomandations(listed_in, title);

    document.getElementById('apply-btn').addEventListener('click', async function () {
        const email = localStorage.getItem('email');
        console.log(email);

        const watchlistKey = `watchlist_${title}_${email}`;
        const isInWatchlist = localStorage.getItem(watchlistKey) === 'true';

        if(isInWatchlist === false) {
            fetch('/addToWatchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email , title })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log(result.message);
    
                    document.querySelector('#apply-btn .apply-icon').classList.remove('ri-add-circle-line');
                    document.querySelector('#apply-btn .apply-icon').classList.add('ri-add-circle-fill');
    
                    localStorage.setItem(watchlistKey, 'true');
                } else {
                    console.log('Failed to add title in watchlist: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error adding title in watchlist:', error);
                console.log('Failed to add title in watchlist.');
            });
        } else {
            fetch('/delete_movie_watchlist', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email , title })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log(result.message);
    
                    document.querySelector('#apply-btn .apply-icon').classList.remove('ri-add-circle-fill');
                    document.querySelector('#apply-btn .apply-icon').classList.add('ri-add-circle-line');
    
                    localStorage.setItem(watchlistKey, 'false');
                } else {
                    console.log('Failed to delete title from watchlist: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error deleting title from watchlist:', error);
                console.log('Failed to delete title from watchlist.');
            });
        }

    });

    document.getElementById('edit-btn').addEventListener('click', async function(event) {
        event.preventDefault();

        const encodedTitle = encodeURIComponent(title);
        const encodedType = encodeURIComponent(type);
        const encodedDirector = encodeURIComponent(director);
        const encodedCountry = encodeURIComponent(country);
        const encodedCast = encodeURIComponent(cast);
        const encodedReleaseYear = encodeURIComponent(release_year);
        const encodedRating = encodeURIComponent(rating);
        const encodedDuration = encodeURIComponent(duration);
        const encodedListedIn = encodeURIComponent(listed_in);
        const encodedDescription = encodeURIComponent(description);

        window.location.href = `edit-movie.html?title=${encodedTitle}&type=${encodedType}&director=${encodedDirector}&country=${encodedCountry}&cast=${encodedCast}&releaseYear=${encodedReleaseYear}&rating=${encodedRating}&duration=${encodedDuration}&listedIn=${encodedListedIn}&description=${encodedDescription}`;
    });

    document.getElementById('delete-btn').addEventListener('click', async function(event) {
        event.preventDefault();

        const encodedTitle = encodeURIComponent(title);
        const encodedPlatform = encodeURIComponent(platform);

        window.location.href = `delete-movie.html?title=${encodedTitle}&platform=${encodedPlatform}`;
    });
}

async function showRecomandations(listed_in, title) {
    movieRecomandations.innerHTML = ``;

    if (listed_in) {
        recomandationTitle.innerHTML = `<h1>You may also like</h1>`;
    }

    const response = await fetch(`/get_recommendations?listed_in=${encodeURIComponent(listed_in)}&title=${encodeURIComponent(title)}`);
    const data = await response.json();

    if (data.success) {
        const recommendations = data.recommendations;

        for (const record of recommendations) {
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

            movieRecomandations.appendChild(movieElement);
        }
    } else {
        console.error('Failed to fetch recommendations:', data.error);
    }
}

async function showActors(cast) {
    movieCast.innerHTML = ``;

    if(cast) {
        castTitle.innerHTML = `<h1>Main Cast</h1>`;
    }

    const actors = cast.split(',').map(actor => actor.trim());
    for (const actor of actors) {
        const profilePath = await fetchProfilePath(actor);
    
        const encodedActor = encodeURIComponent(actor);

        const actorElement = document.createElement('div');
        actorElement.classList.add('actor');
        actorElement.innerHTML = `
            <a href="/actorPage.html?actor=${encodedActor}" target="_blank">
                <img src="${profilePath}" alt="${actor}">
            <h2>${actor}</h2> </a>`;
        movieCast.appendChild(actorElement);
    }
}

async function showVideoGallery(title, type) {
    videoGallery.innerHTML = ``;

    const id = await fetchMovieId(title, type);
    console.log(id);

    const trailer = await fetchMovieTrailer(id, type);
    console.log(trailer);

    if(trailer) {
        const movieElement = document.createElement('div');
        movieElement.classList.add('video');
        movieElement.innerHTML = `
            <iframe src='${trailer}'></iframe>`;
        
        videoGallery.appendChild(movieElement);
    }

    const images = await fetchMovieImages(id, type);
    console.log(images);

    if (images && images.length > 0) {
        images.forEach(imageUrl => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('movie-shot');
            imageElement.innerHTML = `<img src="${imageUrl}" alt="${title}">`;
            videoGallery.appendChild(imageElement);
        });
    }
}

const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
console.log(title);
const encodedTitle = encodeURIComponent(title);
document.title = `${title}`;
getMovieOrTvShowInfo(`http://127.0.0.1:8081/movieInfo?title=${encodedTitle}`);
