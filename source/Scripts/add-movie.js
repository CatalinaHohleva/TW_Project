document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('platform').textContent = '';
    document.getElementById('title').textContent = '';
    document.getElementById('type').textContent = '';
    document.getElementById('director').textContent = '';
    document.getElementById('country').textContent = '';
    document.getElementById('cast').textContent = '';
    document.getElementById('releaseYear').textContent = '';
    document.getElementById('rating').textContent = '';
    document.getElementById('duration').textContent = '';
    document.getElementById('listedIn').textContent = '';
    document.getElementById('description').textContent = '';

    document.getElementById('add_movie_form').addEventListener('submit', function(event) {
        event.preventDefault();

        const platform =  document.getElementById('platform').textContent;
        const title = document.getElementById('title').textContent;
        const type = document.getElementById('type').textContent;
        const director = document.getElementById('director').textContent;
        const country = document.getElementById('country').textContent;
        const cast = document.getElementById('cast').textContent;
        const releaseYear = document.getElementById('releaseYear').textContent;
        const rating = document.getElementById('rating').textContent;
        const duration = document.getElementById('duration').textContent;
        const listedIn = document.getElementById('listedIn').textContent;
        const description = document.getElementById('description').textContent;
        const dateAdded = formatDate(new Date());

        fetch('/add_movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                platform: platform,
                title: title,
                type: type,
                director: director,
                country: country,
                cast: cast,
                dateAdded : dateAdded,
                releaseYear: releaseYear,
                rating: rating,
                duration: duration,
                listedIn: listedIn,
                description: description
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Data added successfully in database');
            } else {
                console.log('Error adding data in database: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });

        window.location.href = 'home.html';
    });

    document.getElementById('import').addEventListener('click', function (e) {
        e.preventDefault();
    
        const csvFileInput = document.getElementById('csvFile');
        const csvFile = csvFileInput.files[0];
    
        if (!csvFile) {
            console.error('Error: No file selected!');
            return;
        }
    
        const reader = new FileReader();
    
        reader.onload = function (event) {
            const csvContent = event.target.result;
            //console.log('CSV Content:', csvContent);
    
            //split CSV content into rows
            const rows = csvContent.split(/\r?\n/);
    
            const platforms = [];
            const titles = [];
            const types = [];
            const directors = [];
            const countries = [];
            const casts = [];
            const releaseYears = [];
            const ratings = [];
            const durations = [];
            const listedIns = [];
            const descriptions = [];
    
            rows.forEach((row, index) => {
    
                const columns = row.split(':');

                if (index > 0 && columns.length >= 11 && columns[0]) { 
                    platforms.push(columns[0].trim());
                    types.push(columns[1].trim());
                    titles.push(columns[2].trim());
                    directors.push(columns[3].trim());
                    casts.push(columns[4].trim());
                    countries.push(columns[5].trim());
                    releaseYears.push(columns[6].trim());
                    ratings.push(columns[7].trim());
                    durations.push(columns[8].trim());
                    listedIns.push(columns[9].trim());
                    descriptions.push(columns[10].trim());
                }
            });

            for (let i = 0; i < platforms.length; i++) {
                console.log(`Row ${i + 1}:`);
                console.log(`Platform: ${platforms[i]}`);
                console.log(`Title: ${titles[i]}`);
                console.log(`Type: ${types[i]}`);
                console.log(`Director: ${directors[i]}`);
                console.log(`Country: ${countries[i]}`);
                console.log(`Cast: ${casts[i]}`);
                console.log(`Release Year: ${releaseYears[i]}`);
                console.log(`Rating: ${ratings[i]}`);
                console.log(`Duration: ${durations[i]}`);
                console.log(`Listed In: ${listedIns[i]}`);
                console.log(`Description: ${descriptions[i]}`);
                console.log(''); // Empty line for separation

                const dateAdded = formatDate(new Date());

                fetch('/add_movie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        platform: platforms[i],
                        title: titles[i],
                        type: types[i],
                        director: directors[i],
                        country: countries[i],
                        cast: casts[i],
                        dateAdded : dateAdded,
                        releaseYear: releaseYears[i],
                        rating: ratings[i],
                        duration: durations[i],
                        listedIn: listedIns[i],
                        description: descriptions[i]
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Data added successfully in database');
                    } else {
                        console.log('Error adding data in database: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    console.log('An unexpected error occurred');
                });
            }
        };
    
        reader.readAsText(csvFile);
       // window.location.href = 'home.html';
    });
    

});

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}
/*
function toggleEditCSV() {
    const csvDisplay = document.getElementById('csv');
    const editInput = document.getElementById('editCSVInput');
    const editBtn = document.querySelector('.editCSV-btn');
    const saveBtn = document.querySelector('.saveCSV-btn');
    const cancelBtn = document.querySelector('.cancelCSV-btn');

    csvDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = csvDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}*/

function toggleEditTitle() {
    const titleDisplay = document.getElementById('title');
    const editInput = document.getElementById('editTitleInput');
    const editBtn = document.querySelector('.editTitle-btn');
    const saveBtn = document.querySelector('.saveTitle-btn');
    const cancelBtn = document.querySelector('.cancelTitle-btn');

    titleDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = titleDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditType() {
    const typeDisplay = document.getElementById('type');
    const editInput = document.getElementById('editTypeInput');
    const editBtn = document.querySelector('.editType-btn');
    const saveBtn = document.querySelector('.saveType-btn');
    const cancelBtn = document.querySelector('.cancelType-btn');

    typeDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = typeDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditPlatform() {
    const platformDisplay = document.getElementById('platform');
    const editInput = document.getElementById('editPlatformInput');
    const editBtn = document.querySelector('.editPlatform-btn');
    const saveBtn = document.querySelector('.savePlatform-btn');
    const cancelBtn = document.querySelector('.cancelPlatform-btn');

    platformDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = platformDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditDirector() {
    const directorDisplay = document.getElementById('director');
    const editInput = document.getElementById('editDirectorInput');
    const editBtn = document.querySelector('.editDirector-btn');
    const saveBtn = document.querySelector('.saveDirector-btn');
    const cancelBtn = document.querySelector('.cancelDirector-btn');

    directorDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = directorDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditCountry() {
    const countryDisplay = document.getElementById('country');
    const editInput = document.getElementById('editCountryInput');
    const editBtn = document.querySelector('.editCountry-btn');
    const saveBtn = document.querySelector('.saveCountry-btn');
    const cancelBtn = document.querySelector('.cancelCountry-btn');

    countryDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = countryDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditCast() {
    const castDisplay = document.getElementById('cast');
    const editInput = document.getElementById('editCastInput');
    const editBtn = document.querySelector('.editCast-btn');
    const saveBtn = document.querySelector('.saveCast-btn');
    const cancelBtn = document.querySelector('.cancelCast-btn');

    castDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = castDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditReleaseYear() {
    const releaseYearDisplay = document.getElementById('releaseYear');
    const editInput = document.getElementById('editReleaseYearInput');
    const editBtn = document.querySelector('.editReleaseYear-btn');
    const saveBtn = document.querySelector('.saveReleaseYear-btn');
    const cancelBtn = document.querySelector('.cancelReleaseYear-btn');

    releaseYearDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = releaseYearDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditRating() {
    const ratingDisplay = document.getElementById('rating');
    const editInput = document.getElementById('editRatingInput');
    const editBtn = document.querySelector('.editRating-btn');
    const saveBtn = document.querySelector('.saveRating-btn');
    const cancelBtn = document.querySelector('.cancelRating-btn');

    ratingDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = ratingDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditDuration() {
    const durationDisplay = document.getElementById('duration');
    const editInput = document.getElementById('editDurationInput');
    const editBtn = document.querySelector('.editDuration-btn');
    const saveBtn = document.querySelector('.saveDuration-btn');
    const cancelBtn = document.querySelector('.cancelDuration-btn');

    durationDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = durationDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditListedIn() {
    const listedInDisplay = document.getElementById('listedIn');
    const editInput = document.getElementById('editListedInInput');
    const editBtn = document.querySelector('.editListedIn-btn');
    const saveBtn = document.querySelector('.saveListedIn-btn');
    const cancelBtn = document.querySelector('.cancelListedIn-btn');

    listedInDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = listedInDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}

function toggleEditDescription() {
    const descriptionDisplay = document.getElementById('description');
    const editInput = document.getElementById('editDescriptionInput');
    const editBtn = document.querySelector('.editDescription-btn');
    const saveBtn = document.querySelector('.saveDescription-btn');
    const cancelBtn = document.querySelector('.cancelDescription-btn');

    descriptionDisplay.style.display = 'none';
    editInput.style.display = 'inline-block';
    editInput.value = descriptionDisplay.textContent;

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
}
/*
function saveCSV() {
    const newCSV = document.getElementById(`editCSVInput`).value;
    const errorBox = document.getElementById('error-box');
 
    const csvRegex = /^[A-Za-z0-9\-_]{1,30}\.csv$/;
    if (!csvRegex.test(newCSV)) {
        errorBox.textContent = 'CSV file name must contain only letters, numbers, "_", "-" and be 1-50 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newCSV) {
        document.getElementById('csv').textContent = newCSV;
    }

    cancelEditCSV();
}
*/
function saveTitle() {
    const newTitle = document.getElementById(`editTitleInput`).value;
    const errorBox = document.getElementById('error-box');

    const titleRegex = /^.{1,50}$/;
    if (!titleRegex.test(newTitle)) {
        errorBox.textContent = 'Title must be 1-50 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newTitle) {
        document.getElementById('title').textContent = newTitle;
    }

    cancelEditTitle();
}


function saveType() {
    const newType = document.getElementById(`editTypeInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const typeRegex = /^(TV Show|Movie)$/;
    if (!typeRegex.test(newType)) {
        errorBox.textContent = 'Type must TV Show or Movie';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newType) {
        document.getElementById('type').textContent = newType;
    }

    cancelEditType();
}

function savePlatform() {
    const newPlatform = document.getElementById(`editPlatformInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const platformRegex = /^(Netflix|Disney Plus)$/;
    if (!platformRegex.test(newPlatform)) {
        errorBox.textContent = 'Platform must Netflix or Disney Plus';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newPlatform) {
        document.getElementById('platform').textContent = newPlatform;
    }

    cancelEditPlatform();
}

function saveDirector() {
    const newDirector = document.getElementById(`editDirectorInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const directorRegex = /^[A-Za-z\s,-]{1,50}$/;
    
    if (!directorRegex.test(newDirector)) {
        errorBox.textContent = 'Director must contain only letters, spaces, , ",", "-" and be 1-50 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newDirector) {
        document.getElementById('director').textContent = newDirector;
    }

    cancelEditDirector();
}

function saveCountry() {
    const newCountry = document.getElementById(`editCountryInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const countryRegex = /^.{1,30}$/;
    if (!countryRegex.test(newCountry)) {
        errorBox.textContent = 'Country must must contain only letters and spaces and be 1-30 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newCountry) {
        document.getElementById('country').textContent = newCountry;
    }

    cancelEditCountry();
}

function saveCast() {
    const newCast = document.getElementById(`editCastInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const castRegex =  /^[A-Za-z\s,-]{1,400}$/;
    if (!castRegex.test(newCast)) {
        errorBox.textContent = 'Cast must contain only letters, spaces, ",", "-" and be 1-400 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newCast) {
        document.getElementById('cast').textContent = newCast;
    }

    cancelEditCast();
}

function saveReleaseYear() {
    const newReleaseYear = document.getElementById(`editReleaseYearInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const releaseYearRegex = /^\d{4}$/;
    const currentYear = new Date().getFullYear();

    if (!releaseYearRegex.test(newReleaseYear) || newReleaseYear < 1800 || newReleaseYear > currentYear) {
        errorBox.textContent = `Release year must be a valid year between 1800 and ${currentYear}`;
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newReleaseYear) {
        document.getElementById('releaseYear').textContent = newReleaseYear;
    }

    cancelEditReleaseYear();
}

function saveRating() {
    const newRating = document.getElementById(`editRatingInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const ratingRegex = /^[A-Za-z0-9\s-]{1,20}$/;
    if (!ratingRegex.test(newRating)) {
        errorBox.textContent = 'Rating must contain only letters, spaces, numbers, "-" and be 1-20 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newRating) {
        document.getElementById('rating').textContent = newRating;
    }

    cancelEditRating();
}

function saveDuration() {
    const newDuration = document.getElementById(`editDurationInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const durationRegex = /^(?:[1-9][0-9]{0,2}|1000)\s?(min|s)$/;
    if (!durationRegex.test(newDuration)) {
        errorBox.textContent = 'Duration must be between 1 and 1000, followed by "min" or "s"';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newDuration) {
        document.getElementById('duration').textContent = newDuration;
    }

    cancelEditDuration();
}

function saveListedIn() {
    const newListedIn = document.getElementById(`editListedInInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const listedInRegex =  /^[A-Za-z\s,-]{1,400}$/;
    if (!listedInRegex.test(newListedIn)) {
        errorBox.textContent = 'Genres must contain only letters, spaces, ",", "-" and be 1-400 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newListedIn) {
        document.getElementById('listedIn').textContent = newListedIn;
    }

    cancelEditListedIn();
}

function saveDescription() {
    const newDescription = document.getElementById(`editDescriptionInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const descriptionRegex =  /^[A-Za-z\s,.'"\-]{1,1000}$/;
    if (!descriptionRegex.test(newDescription)) {
        errorBox.textContent = 'Description must contain only letters, spaces, ",", "-", "." and be 1-1000 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newDescription) {
        document.getElementById('description').textContent = newDescription;
    }

    cancelEditDescription();
}
/*
function cancelEditCSV() {
    const csvDisplay = document.getElementById('csv');
    const editInput = document.getElementById('editCSVInput');
    const editBtn = document.querySelector('.editCSV-btn');
    const saveBtn = document.querySelector('.saveCSV-btn');
    const cancelBtn = document.querySelector('.cancelCSV-btn');

    csvDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}
*/

function cancelEditTitle() {
    const titleDisplay = document.getElementById('title');
    const editInput = document.getElementById('editTitleInput');
    const editBtn = document.querySelector('.editTitle-btn');
    const saveBtn = document.querySelector('.saveTitle-btn');
    const cancelBtn = document.querySelector('.cancelTitle-btn');

    titleDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}


function cancelEditType() {
    const typeDisplay = document.getElementById('type');
    const editInput = document.getElementById('editTypeInput');
    const editBtn = document.querySelector('.editType-btn');
    const saveBtn = document.querySelector('.saveType-btn');
    const cancelBtn = document.querySelector('.cancelType-btn');

    typeDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditPlatform() {
    const platformDisplay = document.getElementById('platform');
    const editInput = document.getElementById('editPlatformInput');
    const editBtn = document.querySelector('.editPlatform-btn');
    const saveBtn = document.querySelector('.savePlatform-btn');
    const cancelBtn = document.querySelector('.cancelPlatform-btn');

    platformDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditDirector() {
    const directorDisplay = document.getElementById('director');
    const editInput = document.getElementById('editDirectorInput');
    const editBtn = document.querySelector('.editDirector-btn');
    const saveBtn = document.querySelector('.saveDirector-btn');
    const cancelBtn = document.querySelector('.cancelDirector-btn');

    directorDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditCountry() {
    const countryDisplay = document.getElementById('country');
    const editInput = document.getElementById('editCountryInput');
    const editBtn = document.querySelector('.editCountry-btn');
    const saveBtn = document.querySelector('.saveCountry-btn');
    const cancelBtn = document.querySelector('.cancelCountry-btn');

    countryDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditCast() {
    const castDisplay = document.getElementById('cast');
    const editInput = document.getElementById('editCastInput');
    const editBtn = document.querySelector('.editCast-btn');
    const saveBtn = document.querySelector('.saveCast-btn');
    const cancelBtn = document.querySelector('.cancelCast-btn');

    castDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditReleaseYear() {
    const releaseYearDisplay = document.getElementById('releaseYear');
    const editInput = document.getElementById('editReleaseYearInput');
    const editBtn = document.querySelector('.editReleaseYear-btn');
    const saveBtn = document.querySelector('.saveReleaseYear-btn');
    const cancelBtn = document.querySelector('.cancelReleaseYear-btn');

    releaseYearDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditRating() {
    const ratingDisplay = document.getElementById('rating');
    const editInput = document.getElementById('editRatingInput');
    const editBtn = document.querySelector('.editRating-btn');
    const saveBtn = document.querySelector('.saveRating-btn');
    const cancelBtn = document.querySelector('.cancelRating-btn');

    ratingDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditDuration() {
    const durationDisplay = document.getElementById('duration');
    const editInput = document.getElementById('editDurationInput');
    const editBtn = document.querySelector('.editDuration-btn');
    const saveBtn = document.querySelector('.saveDuration-btn');
    const cancelBtn = document.querySelector('.cancelDuration-btn');

    durationDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditListedIn() {
    const listedInDisplay = document.getElementById('listedIn');
    const editInput = document.getElementById('editListedInInput');
    const editBtn = document.querySelector('.editListedIn-btn');
    const saveBtn = document.querySelector('.saveListedIn-btn');
    const cancelBtn = document.querySelector('.cancelListedIn-btn');

    listedInDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

function cancelEditDescription() {
    const descriptionDisplay = document.getElementById('description');
    const editInput = document.getElementById('editDescriptionInput');
    const editBtn = document.querySelector('.editDescription-btn');
    const saveBtn = document.querySelector('.saveDescription-btn');
    const cancelBtn = document.querySelector('.cancelDescription-btn');

    descriptionDisplay.style.display = 'inline-block';
    editInput.style.display = 'none';

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}
