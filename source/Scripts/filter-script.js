document.addEventListener('DOMContentLoaded', function() {
    const optionMenu = document.querySelector(".select-menu");
    const selectButton = optionMenu.querySelector(".select-btn");
    const options = optionMenu.querySelectorAll(".option");
    const selectButtonText = optionMenu.querySelector(".sBtn-text");

    selectButton.addEventListener("click", () => optionMenu.classList.toggle("active"));

    let selectedOption;
    options.forEach(option => {
        option.addEventListener("click", () => {
            selectedOption = option.querySelector(".option-text").innerText;
            selectButtonText.innerText = selectedOption;
            optionMenu.classList.remove("active");
        });
    });

    const page = window.location.pathname.split('/').pop();
    let optionType = '';
    let selectButtonTextType = '';
    let selectedOptionType = '';
    let selectButtonType = '';
    let optionsType = '';

    if(page === 'SearchPage.html' || page === 'watchlist.html') {
        optionType = document.querySelector(".select-type");
        selectButtonType = optionType.querySelector(".select-btn");
        optionsType = optionType.querySelectorAll(".option");
        selectButtonTextType = optionType.querySelector(".sBtn-text");

        selectButtonType.addEventListener("click", () => optionType.classList.toggle("active"));

        optionsType.forEach(option => {
            option.addEventListener("click", () => {
                selectedOptionType = option.querySelector(".option-text").innerText;
                selectButtonTextType.innerText = selectedOptionType;
                optionType.classList.remove("active");
            });
        });

        document.querySelector('.select-watch').style.margin = '270px 7px';
        document.querySelector('.select-type').style.margin = '190px 7px';
        document.querySelector('.select-year').style.margin = '350px 7px';
        document.querySelector('.select-genre').style.margin = '430px 7px';
    }

    const optionWatch = document.querySelector(".select-watch");
    const selectButtonWatch = optionWatch.querySelector(".select-btn");
    const optionsWatch = optionWatch.querySelectorAll(".option");
    const selectButtonTextWatch = optionWatch.querySelector(".sBtn-text");

    selectButtonWatch.addEventListener("click", () => optionWatch.classList.toggle("active"));

    let selectedOptionWatch;
    optionsWatch.forEach(option => {
        option.addEventListener("click", () => {
            selectedOptionWatch = option.querySelector(".option-text").innerText;
            selectButtonTextWatch.innerText = selectedOptionWatch;
            optionWatch.classList.remove("active");
        });
    });

    const optionGenre = document.querySelector(".select-genre");
    const selectButtonGenre = optionGenre.querySelector(".select-btn");
    const optionsGenre = optionGenre.querySelectorAll(".option-genre");
    const selectButtonTextGenre = optionGenre.querySelector(".sBtn-text");

    selectButtonGenre.addEventListener("click", () => optionGenre.classList.toggle("active"));

    let selectedOptionGenre;
    optionsGenre.forEach(option => {
        option.addEventListener("click", () => {
            selectedOptionGenre = option.querySelector(".option-text").innerText;
            selectButtonTextGenre.innerText = selectedOptionGenre;
            optionGenre.classList.remove("active");
        });
    });

    const optionYear = document.querySelector(".select-year");
    const selectButtonYear = optionYear.querySelector(".select-btn");
    const optionsYear = optionYear.querySelectorAll(".option-year");
    const selectButtonTextYear = optionYear.querySelector(".sBtn-text");

    selectButtonYear.addEventListener("click", () => optionYear.classList.toggle("active"));

    const yearInput1 = document.getElementById('year1');
    const yearInput2 = document.getElementById('year2');

    yearInput1.addEventListener('input', updateYearButtonText);
    yearInput2.addEventListener('input', updateYearButtonText);

    let selectedYear1;
    let selectedYear2;

    function updateYearButtonText() {
        selectedYear1 = yearInput1.value;
        selectedYear2 = yearInput2.value;
        selectButtonTextYear.innerText = `${selectedYear1} - ${selectedYear2}`;
    }

    let currentPage;
    
    const searchButton = document.getElementById('search-button');
    const smallSearchButton = document.getElementById('small-search-button');
    const searchInput = document.querySelector('.search_input');
    const movieList = document.getElementById('movie-list');
    
    searchButton.addEventListener('click', function(event) {
        event.preventDefault();

        currentPage = window.location.pathname.split('/').pop();

        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            window.location.href = `${currentPage}?term=${encodeURIComponent(searchTerm)}`;
        }
    });

    smallSearchButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = `SearchPage.html`;
    });


    const applyButton = document.getElementById('apply-btn');

    if (applyButton) {
        applyButton.addEventListener('click', () => {
            currentPage = window.location.pathname.split('/').pop();

            if(page === 'SearchPage.html' || page === 'watchlist.html') {
                window.location.href = `${currentPage}?sort=${encodeURIComponent(selectedOption)}&watch=${encodeURIComponent(selectedOptionWatch)}&genre=${encodeURIComponent(selectedOptionGenre)}&year1=${encodeURIComponent(selectedYear1)}&year2=${encodeURIComponent(selectedYear2)}&type=${encodeURIComponent(selectedOptionType)}`;
            } else {
                window.location.href = `${currentPage}?sort=${encodeURIComponent(selectedOption)}&watch=${encodeURIComponent(selectedOptionWatch)}&genre=${encodeURIComponent(selectedOptionGenre)}&year1=${encodeURIComponent(selectedYear1)}&year2=${encodeURIComponent(selectedYear2)}`;
            }
        });
    } else {
        console.error('Apply button not found!');
    }

    async function getMoviesOrTvShows(url, movieList) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const dataArray = Array.isArray(data) ? data : [data];

            showMoviesOrTvShows(dataArray, movieList);
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
    
    async function showMoviesOrTvShows(data) {
        movieList.innerHTML = '';// Clear the movie list

        if (data.length === 0) {
            const noResultsElement = document.createElement('div');
            noResultsElement.classList.add('no-results');
            noResultsElement.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
            movieList.appendChild(noResultsElement);

            document.querySelector('.footer').style.marginTop = '700px';
            document.querySelector('.footer').style.width = '105%';
        } else {
            for (const movie of data) {
                const { title, type, release_year } = movie;
                const posterPath = await fetchPosterPath(title, type); // Wait for poster path

                const encodedTitle = encodeURIComponent(title);
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                <a href="/descriptionPage.html?title=${encodedTitle}" target="_blank">
                    <img src="${posterPath}" alt="${title}">
                    <h2>${title}</h2>
                    <p>${release_year}</p>
                </a>`;

                document.querySelector('.footer').style.marginTop = '200px';

                movieList.appendChild(movieElement);
            }
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    let searchTerm = urlParams.get('term');
    let sortOption = urlParams.get('sort');
    let watchOption = urlParams.get('watch');
    let genreOption = urlParams.get('genre');
    let year1Option = urlParams.get('year1');
    let year2Option = urlParams.get('year2');
    let typeOption = 'undefined';
    if(page === 'SearchPage.html' || page === 'watchlist.html') {
        typeOption = urlParams.get('type');
    }

    console.log(year1Option);
    console.log(year2Option);

    let filteredUrl = 'http://127.0.0.1:8081/filter';

    currentPage = window.location.pathname.split('/').pop();
    const currentPageBefore = currentPage;
    currentPage = currentPage.replace('.html', ''); // Elimină extensia .html

    if (currentPage.length > 0) {
        currentPage = currentPage.charAt(0).toLowerCase() + currentPage.slice(1);
    }

    const email = localStorage.getItem('email');
    console.log(email);

    let ALL_MOVIES_TVSHOWS_URL;
    let SEARCH_URL;
    if(currentPage === 'searchPage') {
        ALL_MOVIES_TVSHOWS_URL = `http://127.0.0.1:8081/all`;
        SEARCH_URL = `http://127.0.0.1:8081/search?term=${encodeURIComponent(searchTerm)}`;
    } else {
        SEARCH_URL = `http://127.0.0.1:8081/search/${currentPage}?email=${encodeURIComponent(email)}&term=${encodeURIComponent(searchTerm)}`;
        filteredUrl += `/${currentPage}?email=${encodeURIComponent(email)}`;
    }

    let hasOptions = false;

    if (sortOption !== null && sortOption !== 'undefined') {
        if(hasOptions === false && currentPage !== 'searchPage') {
            hasOptions = true;
            filteredUrl += `&`;
        } else if(currentPage === 'searchPage' && hasOptions === false){
            hasOptions = true;
            filteredUrl += `?`;
        }

        filteredUrl += `sort=${encodeURIComponent(sortOption)}&`;
    }
    if (watchOption !== null && watchOption !== 'undefined') {
        if(hasOptions === false && currentPage !== 'searchPage') {
            hasOptions = true;
            filteredUrl += `&`;
        } else if(currentPage === 'searchPage' && hasOptions === false){
            hasOptions = true;
            filteredUrl += `?`;
        }

        filteredUrl += `watch=${encodeURIComponent(watchOption)}&`;
    }
    if (genreOption !== null && genreOption !== 'undefined') {
        if(hasOptions === false && currentPage !== 'searchPage') {
            hasOptions = true;
            filteredUrl += `&`;
        } else if(currentPage === 'searchPage' && hasOptions === false){
            hasOptions = true;
            filteredUrl += `?`;
        }

        filteredUrl += `genre=${encodeURIComponent(genreOption)}&`;
    }
    if (year1Option !== null && year1Option !== 'undefined') {
        if(hasOptions === false && currentPage !== 'searchPage') {
            hasOptions = true;
            filteredUrl += `&`;
        } else if(currentPage === 'searchPage' && hasOptions === false){
            hasOptions = true;
            filteredUrl += `?`;
        }

        filteredUrl += `year1=${encodeURIComponent(year1Option)}&`;
    }
    if (year2Option !== null && year2Option !== 'undefined') {
        if(hasOptions === false && currentPage !== 'searchPage') {
            hasOptions = true;
            filteredUrl += `&`;
        } else if(currentPage === 'searchPage' && hasOptions === false){
            hasOptions = true;
            filteredUrl += `?`;
        }

        filteredUrl += `year2=${encodeURIComponent(year2Option)}&`;
    }
    if (typeOption && typeOption !== 'undefined') {
        if(hasOptions === false && currentPage !== 'searchPage') {
            hasOptions = true;
            filteredUrl += `&`;
        } else if(currentPage === 'searchPage' && hasOptions === false){
            hasOptions = true;
            filteredUrl += `?`;
        }
        
        filteredUrl += `type=${encodeURIComponent(typeOption)}&`;
    }

    if(hasOptions === true) {
        // Elimină ultimul '&' din URL, dacă există
        filteredUrl = filteredUrl.slice(0, -1);
    }

    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    const API_KEY = 'c22daecb5ce9b93cd32db50478e6e0b5';

    console.log(filteredUrl);

    if(searchTerm !== null && searchTerm !== 'undefined') {
        getMoviesOrTvShows(SEARCH_URL, movieList);
        document.title = `Search for "${searchTerm}"`;
    } else {
        getMoviesOrTvShows(filteredUrl, movieList);
    }

});
