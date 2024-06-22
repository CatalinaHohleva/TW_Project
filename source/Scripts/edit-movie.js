document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let titleUrl = urlParams.get('title');

    const encodedTitle = encodeURIComponent(titleUrl);

    const URL = `http://127.0.0.1:8081/movieInfo?title=${encodedTitle}`;

    try {
        const res = await fetch(URL);
        const data = await res.json();

        console.log(data);
        
        const { platform, type, title, director, cast, country, date_added, release_year, rating, duration, listed_in, description } = data;

        console.log(platform);
        document.getElementById('platform').textContent = platform;
        document.getElementById('title').textContent = title;
        document.getElementById('type').textContent = type;
        document.getElementById('director').textContent = director;
        document.getElementById('country').textContent = country;
        document.getElementById('cast').textContent = cast;
        document.getElementById('releaseYear').textContent = release_year;
        document.getElementById('rating').textContent = rating;
        document.getElementById('duration').textContent = duration;
        document.getElementById('listedIn').textContent = listed_in;
        document.getElementById('description').textContent = description;

    } catch (err) {
        console.error('error:' + err);
    }

    document.getElementById('edit_movie_form').addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = 'home.html';
    });
});

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

function saveTitle() {
    const newTitle = document.getElementById(`editTitleInput`).value;
    const platform = document.getElementById('platform').textContent;
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
        const updatedTitle = document.getElementById('title').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let titleUrl = urlParams.get('title');

        fetch('/edit_title', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newTitle: updatedTitle, platform: platform, oldTitle: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Title updated successfully');
            } else {
                console.log('Error updating title: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
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
        const updatedType = document.getElementById('type').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let typeUrl = urlParams.get('type');
        let titleUrl = urlParams.get('title');

        fetch('/edit_type', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newType: updatedType, platform: platform, oldType: typeUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Type updated successfully');
            } else {
                console.log('Error updating type: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
    }

    cancelEditType();
}

function savePlatform() {
    const newPlatform = document.getElementById(`editPlatformInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const platformRegex = /^(Netflix|Disney Plus)$/;
    if (!platformRegex.test(newPlatform)) {
        errorBox.textContent = 'Platform must be Netflix or Disney Plus';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newPlatform) {
        document.getElementById('platform').textContent = newPlatform;
        const updatedPlatform = document.getElementById('platform').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let titleUrl = urlParams.get('title');

        fetch('/edit_platform', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPlatform: updatedPlatform, platform: platform, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Platform updated successfully');
            } else {
                console.log('Error updating platform: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
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
        const updatedDirector = document.getElementById('director').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let directorUrl = urlParams.get('director');
        let titleUrl = urlParams.get('title');

        fetch('/edit_director', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newDirector: updatedDirector, platform: platform, oldDirector: directorUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Director updated successfully');
            } else {
                console.log('Error updating director: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
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
        const updatedCountry = document.getElementById('country').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let countryUrl = urlParams.get('country');
        let titleUrl = urlParams.get('title');

        fetch('/edit_country', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newCountry: updatedCountry, platform: platform, oldCountry: countryUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Country updated successfully');
            } else {
                console.log('Error updating country: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
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
        const updatedCast = document.getElementById('cast').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let castUrl = urlParams.get('cast');
        let titleUrl = urlParams.get('title');

        fetch('/edit_cast', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newCast: updatedCast, platform: platform, oldCast: castUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Cast updated successfully');
            } else {
                console.log('Error updating cast: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
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
        const updatedReleaseYear = document.getElementById('releaseYear').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let releaseYearUrl = urlParams.get('releaseYear');
        let titleUrl = urlParams.get('title');

        fetch('/edit_releaseYear', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newReleaseYear: updatedReleaseYear, platform: platform, oldReleaseYear: releaseYearUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Release year updated successfully');
            } else {
                console.log('Error updating release year: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
    }

    cancelEditReleaseYear();
}

function saveRating() {
    const newRating = document.getElementById(`editRatingInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const ratingRegex = /^[A-Za-z0-9\s-]{1,20}$/;
    if (!ratingRegex.test(newRating)) {
        errorBox.textContent = 'Rating must contain only letters, spaces, "-" and be 1-20 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newRating) {
        document.getElementById('rating').textContent = newRating;
        const updatedRating = document.getElementById('rating').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let ratingUrl = urlParams.get('rating');
        let titleUrl = urlParams.get('title');

        fetch('/edit_rating', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newRating: updatedRating, platform: platform, oldRating: ratingUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Rating updated successfully');
            } else {
                console.log('Error updating rating: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
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
        const updatedDuration = document.getElementById('duration').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let durationUrl = urlParams.get('duration');
        let titleUrl = urlParams.get('title');

        fetch('/edit_duration', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newDuration: updatedDuration, platform: platform, oldDuration: durationUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Duration updated successfully');
            } else {
                console.log('Error updating duration: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
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
        const updatedListedIn = document.getElementById('listedIn').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let listedInUrl = urlParams.get('listedIn');
        let titleUrl = urlParams.get('title');

        fetch('/edit_listedIn', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newListedIn: updatedListedIn, platform: platform, oldListedIn: listedInUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Genres updated successfully');
            } else {
                console.log('Error updating genres: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
    }

    cancelEditListedIn();
}

function saveDescription() {
    const newDescription = document.getElementById(`editDescriptionInput`).value;
    const platform = document.getElementById('platform').textContent;
    const errorBox = document.getElementById('error-box');

    const descriptionRegex =  /^[A-Za-z1-9\s,.'"\-]{1,1000}$/;
    if (!descriptionRegex.test(newDescription)) {
        errorBox.textContent = 'Description must contain only letters, spaces, ",", "-", "." and be 1-1000 characters long';
        errorBox.style.display = 'block';
        return;
    }

    errorBox.textContent = '';
    errorBox.style.display = 'none';

    if (newDescription) {
        document.getElementById('description').textContent = newDescription;
        const updatedDescription = document.getElementById('description').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        let descriptionUrl = urlParams.get('description');
        let titleUrl = urlParams.get('title');

        fetch('/edit_description', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newDescription: updatedDescription, platform: platform, oldDescription: descriptionUrl, title: titleUrl })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Description updated successfully');
            } else {
                console.log('Error updating description: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An unexpected error occurred');
        });
    }

    cancelEditDescription();
}

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
