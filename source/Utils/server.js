const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { getNetflixDb, getDisneyDb } = require('./database');


const hostname = '127.0.0.1';
const port = 8081;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'myapp',
    password: 'password',
    port: 5432,
});

let netflixClient = null;
let disneyClient = null;

const connectNetflixDb = async () => {
    if (!netflixClient) {
        netflixClient = getNetflixDb();
        await netflixClient.connect();
        console.log('Connected to the Netflix database successfully.');
    }
};

const connectDisneyDb = async () => {
    if (!disneyClient) {
        disneyClient = getDisneyDb();
        await disneyClient.connect();
        console.log('Connected to the Disney Plus database successfully.');
    }
};

const disconnectNetflixDb = async () => {
    if (netflixClient) {
        await netflixClient.end();
        netflixClient = null;
        console.log('Disconnected from the Netflix database successfully.');
    }
};

const disconnectDisneyDb = async () => {
    if (disneyClient) {
        await disneyClient.end();
        disneyClient = null;
        console.log('Disconnected from the Disney Plus database successfully.');
    }
};

const staticFiles = {
    '/': { path: 'home.html', contentType: 'text/html' },
    '/background1.jpg': { path: 'background1.jpg', contentType: 'image/jpeg' },
    '/background2.jpg': { path: 'background2.jpg', contentType: 'image/jpeg' },
    '/background3.jpg': { path: 'background3.jpg', contentType: 'image/jpeg' },
    '/background4.jpg': { path: 'background4.jpg', contentType: 'image/jpeg' },
    '/film-reel.jpg': { path: 'film-reel.jpg', contentType: 'image/jpeg' },
    '/AboutUs.html': { path: 'AboutUs.html', contentType: 'text/html' },
    '/add-movie.html': { path: 'add-movie.html', contentType: 'text/html' },
    '/admin_users_list.html': { path: 'admin_users_list.html', contentType: 'text/html' },
    '/change_email.html': { path: 'change_email.html', contentType: 'text/html' },
    '/change_password.html': { path: 'change_password.html', contentType: 'text/html' },
    '/ContactUs.html': { path: 'ContactUs.html', contentType: 'text/html' },
    '/delete_account.html': { path: 'delete_account.html', contentType: 'text/html' },
    '/delete-movie.html': { path: 'delete-movie.html', contentType: 'text/html' },
    '/descriptionPage.html': { path: 'descriptionPage.html', contentType: 'text/html' },
    '/edit_account.html': { path: 'edit_account.html', contentType: 'text/html' },
    '/edit-movie.html': { path: 'edit-movie.html', contentType: 'text/html' },
    '/forgot_your_password.html': { path: 'forgot_your_password.html', contentType: 'text/html' },
    '/home.html': { path: 'home.html', contentType: 'text/html' },
    '/Movies.html': { path: 'Movies.html', contentType: 'text/html' },
    '/register.html': { path: 'register.html', contentType: 'text/html' },
    '/reset_password.html': { path: 'reset_password.html', contentType: 'text/html' },
    '/SearchPage.html': { path: 'SearchPage.html', contentType: 'text/html' },
    '/sign_in.html': { path: 'sign_in.html', contentType: 'text/html' },
    '/Statistics.html': { path: 'Statistics.html', contentType: 'text/html' },
    '/TvShows.html': { path: 'TvShows.html', contentType: 'text/html' },
    '/verify_email.html': { path: 'verify_email.html', contentType: 'text/html' },
    '/verify_email_password_reset.html': { path: 'verify_email_password_reset.html', contentType: 'text/html' },
    '/verify_new_email.html': { path: 'verify_new_email.html', contentType: 'text/html' },
    '/watchlist.html': { path: 'watchlist.html', contentType: 'text/html' },
    '/admin_users_list.css': { path: 'admin_users_list.css', contentType: 'text/css' },
    '/content.css': { path: 'content.css', contentType: 'text/css' },
    '/content_About_us.css': { path: 'content_About_us.css', contentType: 'text/css' },
    '/content_TvShows_Movies.css': { path: 'content_TvShows_Movies.css', contentType: 'text/css' },
    '/delete_account.css': { path: 'delete_account.css', contentType: 'text/css' },
    '/description_page.css': { path: 'description_page.css', contentType: 'text/css' },
    '/edit_account.css': { path: 'edit_account.css', contentType: 'text/css' },
    '/footer.css': { path: 'footer.css', contentType: 'text/css' },
    '/header.css': { path: 'header.css', contentType: 'text/css' },
    '/registration_process.css': { path: 'registration_process.css', contentType: 'text/css' },
    '/admin_users_list.js': { path: 'admin_users_list.js', contentType: 'application/javascript'},
    '/add-movie.js': { path: 'add-movie.js', contentType: 'application/javascript'},
    '/change_email.js': { path: 'change_email.js', contentType: 'application/javascript'},
    '/change_password.js': { path: 'change_password.js', contentType: 'application/javascript'},
    '/database.js': { path: 'database.js', contentType: 'application/javascript'},
    '/delete_account.js': { path: 'delete_account.js', contentType: 'application/javascript'},
    '/delete-movie.js': { path: 'delete-movie.js', contentType: 'application/javascript'},
    '/description-page-script.js': { path: 'description-page-script.js', contentType: 'application/javascript'},
    '/edit_account.js': { path: 'edit_account.js', contentType: 'application/javascript'},
    '/edit-movie.js': { path: 'edit-movie.js', contentType: 'application/javascript'},
    '/filter-script.js': { path: 'filter-script.js', contentType: 'application/javascript'},
    '/forgot_your_password.js': { path: 'forgot_your_password.js', contentType: 'application/javascript'},
    '/header_visibility.js': { path: 'header_visibility.js', contentType: 'application/javascript'},
    '/index.js': { path: 'index.js', contentType: 'application/javascript'},
    '/package.js': { path: 'package.js', contentType: 'application/javascript'},
    '/register.js': { path: 'register.js', contentType: 'application/javascript'},
    '/remember_me.js': { path: 'remember_me.js', contentType: 'application/javascript'},
    '/reset_password.js': { path: 'reset_password.js', contentType: 'application/javascript'},
    '/script-home.js': { path: 'script-home.js', contentType: 'application/javascript'},
    '/search-script.js': { path: 'search-script.js', contentType: 'application/javascript'},
    '/sign_in.js': { path: 'sign_in.js', contentType: 'application/javascript'},
    '/sign_out.js': { path: 'sign_out.js', contentType: 'application/javascript'},
    '/small-search-script.js': { path: 'small-search-script.js', contentType: 'application/javascript'},
    '/statistics-script.js': { path: 'statistics-script.js', contentType: 'application/javascript'},
    '/timer.js': { path: 'timer.js', contentType: 'application/javascript'},
    '/toggle_password.js': { path: 'toggle_password.js', contentType: 'application/javascript'},
    '/user_profile.js': { path: 'user_profile.js', contentType: 'application/javascript'},
    '/verify_email.js': { path: 'verify_email.js', contentType: 'application/javascript'},
    '/verify_email_password_reset.js': { path: 'verify_email_password_reset.js', contentType: 'application/javascript'},
    '/verify_new_email.js': { path: 'verify_new_email.js', contentType: 'application/javascript'}
};

const getFile = (filePath, contentType, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`, err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
    });
};

const server = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    console.log(`${req.method} ${req.url}`);

    if (staticFiles[pathname]) {
        const staticFile = staticFiles[pathname];
        const filePath = path.join(__dirname, 'public', staticFile.path);
        getFile(filePath, staticFile.contentType, res);
        return;
    }

    try {
        if (req.method === 'GET' && req.url === '/netflix/movies') {
            await connectNetflixDb();
            const result = await netflixClient.query('SELECT title, release_year FROM netflix WHERE TRIM(type) = $1', ['Movie']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url === '/netflix/movies_desc') {
            await connectNetflixDb();
            const result = await netflixClient.query('SELECT title, type, release_year FROM netflix WHERE TRIM(type) = $1 ORDER BY release_year DESC LIMIT 30', ['Movie']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url === '/disney/movies') {
            await connectDisneyDb();
            const result = await disneyClient.query('SELECT title, release_year FROM disney_plus WHERE TRIM(type) = $1', ['Movie']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url === '/disney/movies_desc') {
            await connectDisneyDb();
            const result = await disneyClient.query('SELECT title, type, release_year FROM disney_plus WHERE TRIM(type) = $1 ORDER BY release_year DESC LIMIT 30', ['Movie']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url === '/netflix/tvShows') {
            await connectNetflixDb();
            const result = await netflixClient.query('SELECT title, release_year FROM netflix WHERE TRIM(type) = $1', ['TV Show']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url === '/netflix/tvShows_desc') {
            await connectNetflixDb();
            const result = await netflixClient.query('SELECT title, type, release_year FROM netflix WHERE TRIM(type) = $1 ORDER BY release_year DESC LIMIT 30', ['TV Show']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url === '/disney/tvShows') {
            await connectDisneyDb();
            const result = await disneyClient.query('SELECT title, release_year FROM disney_plus WHERE TRIM(type) = $1', ['TV Show']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url === '/disney/tvShows_desc') {
            await connectDisneyDb();
            const result = await disneyClient.query('SELECT "title", type, release_year FROM disney_plus WHERE TRIM(type) = $1 ORDER BY release_year DESC LIMIT 30', ['TV Show']);
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } else if (req.method === 'GET' && req.url.startsWith('/movieInfo')) {
            const queryObject = url.parse(req.url, true).query;
            const title = queryObject.title;
            if (!title) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Title is required' }));
                return;
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT \'Disney Plus\' AS platform, type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE title LIKE $1', [`${title}`]);

            const netflixQuery = await netflixClient.query('SELECT \'Netflix\' AS platform, type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE title LIKE $1', [`${title}`]);

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const result = netflixResults.rows[0] || disneyResults.rows[0];

            if (!result) {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Title not found' }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(result));
            }
        } else if (req.method === 'GET' && req.url.startsWith('/search/tvShows')) {
            const queryObject = url.parse(req.url, true).query;
            const searchTerm = queryObject.term;
            if (!searchTerm) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Search term is required' }));
                return;
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE title ILIKE $1 AND TRIM(type) = $2', [`%${searchTerm}%`, 'TV Show']);

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE title ILIKE $1 AND TRIM(type) = $2', [`%${searchTerm}%`, 'TV Show']);

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const combinedResults = [...disneyResults.rows, ...netflixResults.rows];

            // Elimină duplicatele folosind un Set
            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));

        } else if (req.method === 'GET' && req.url.startsWith('/search/movies')) {
            const queryObject = url.parse(req.url, true).query;
            const searchTerm = queryObject.term;
            if (!searchTerm) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Search term is required' }));
                return;
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE title ILIKE $1 AND TRIM(type) = $2', [`%${searchTerm}%`, 'Movie']);

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE title ILIKE $1 AND TRIM(type) = $2', [`%${searchTerm}%`, 'Movie']);

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const combinedResults = [...disneyResults.rows, ...netflixResults.rows];

            // Elimină duplicatele folosind un Set
            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));

        } else if (req.method === 'GET' && req.url.startsWith('/search/watchlist')) {
            const queryObject = url.parse(req.url, true).query;
            const searchTerm = queryObject.term;
            const email = queryObject.email;
            if (!searchTerm) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Search term is required' }));
                return;
            }

            const result = await pool.query('SELECT titles FROM watchlist WHERE email = $1', [email]);

            const titlesString = result.rows[0].titles;
        
            console.log(result);
            const titlesArray = titlesString.split(',').map(title => title.trim());
        
            let combinedResults = [];
            let uniqueResults = [];
        
            for (let i = 0; i < titlesArray.length; i++) {
                const title = titlesArray[i];
        
                let queryNetflix = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE title ILIKE $1 AND title = $2`;
                let queryDisney = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE title ILIKE $1 AND title = $2`;
        
                await connectNetflixDb();
                await connectDisneyDb();
        
                const [netflixResults, disneyResults] = await Promise.all([
                    netflixClient.query(queryNetflix, [`%${searchTerm}%`, title]),
                    disneyClient.query(queryDisney, [`%${searchTerm}%`, title])
                ]);
        
                if (netflixResults.rows.length > 0) {
                    combinedResults.push(...netflixResults.rows); 
                }
        
                if (disneyResults.rows.length > 0) {
                    combinedResults.push(...disneyResults.rows);
                }
            }

            uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));
        
            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));
        } else if (req.method === 'GET' && req.url.startsWith('/search')) {
            const queryObject = url.parse(req.url, true).query;
            const searchTerm = queryObject.term;
            if (!searchTerm) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Search term is required' }));
                return;
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE title ILIKE $1', [`%${searchTerm}%`]);

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE title ILIKE $1', [`%${searchTerm}%`]);

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const combinedResults = [...disneyResults.rows, ...netflixResults.rows];

            // Elimină duplicatele folosind un Set
            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));

        } else if (req.method === 'GET' && req.url === '/all') {
            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus');

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix');

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const combinedResults = [...disneyResults.rows, ...netflixResults.rows];

            // Elimină duplicatele folosind un Set
            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));

        } else if (req.method === 'GET' && req.url === '/filter') {
            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus');

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix');

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const combinedResults = [...disneyResults.rows, ...netflixResults.rows];

            // Elimină duplicatele folosind un Set
            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));

        } else if (req.method === 'GET' && req.url === '/filter/tvShows') {
            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE TRIM(type) = $1', ['TV Show']);

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE TRIM(type) = $1', ['TV Show']);

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const combinedResults = [...disneyResults.rows, ...netflixResults.rows];

            // Elimină duplicatele folosind un Set
            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));

        } else if (req.method === 'GET' && req.url === '/filter/movies') {
            await connectNetflixDb();
            await connectDisneyDb();

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE TRIM(type) = $1', ['Movie']);

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE TRIM(type) = $1', ['Movie']);

            const [disneyResults, netflixResults] = await Promise.all([disneyQuery, netflixQuery]);

            const combinedResults = [...disneyResults.rows, ...netflixResults.rows];

            // Elimină duplicatele folosind un Set
            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));

        } else if (req.method === 'GET' && req.url.startsWith('/filter/tvShows')) {
            const queryObject = url.parse(req.url, true).query;
            const sort = queryObject.sort;
            const watch = queryObject.watch;
            const genre = queryObject.genre;
            const year1 = queryObject.year1;
            const year2 = queryObject.year2;

            let useNetflix = true;
            let useDisney = true;

            if (watch === 'Netflix') {
                useDisney = false;
            } else if (watch === 'Disney') {
                useNetflix = false;
            }

            let queryNetflix = '';
            let queryDisney = '';
            if(useNetflix) {
                queryNetflix = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE TRIM(type) = $1`;
            }

            if (useDisney) {
                queryDisney = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE TRIM(type) = $1`;
            }

            if (genre) {
                if(useNetflix) {
                    queryNetflix += ` AND listed_in ILIKE '%${genre}%'`;
                }

                if(useDisney) {
                    queryDisney += ` AND listed_in ILIKE '%${genre}%'`;
                }
            }
            
            if (year1 && year2) {
                const yearCondition = `CAST(release_year AS INTEGER) BETWEEN ${year1} AND ${year2}`;
        
                if (useNetflix) {
                    queryNetflix += ` AND ${yearCondition}`;
                }
        
                if (useDisney) {
                    queryDisney += ` AND ${yearCondition}`;
                }
            } else if (year1) {
                const yearCondition = `CAST(release_year AS INTEGER) >= ${year1}`;
        
                if (useNetflix) {
                    queryNetflix += ` AND ${yearCondition}`;
                }
        
                if (useDisney) {
                    queryDisney += ` AND ${yearCondition}`;
                }
            } else if(year2) {
                const yearCondition = `CAST(release_year AS INTEGER) <= ${year2}`;
        
                if (useNetflix) {
                    queryNetflix += ` AND ${yearCondition}`;
                }
        
                if (useDisney) {
                    queryDisney += ` AND ${yearCondition}`;
                }
            }

            let sortCondition = '';
            if (sort) {
                if (sort === 'Release Date Descending') {
                    sortCondition =` ORDER BY release_year DESC`;
                } else if (sort === 'Release Date Ascending') {
                    sortCondition = ` ORDER BY release_year ASC`;
                } else if (sort === 'Title (A-Z)') {
                    sortCondition = ` ORDER BY title ASC`;
                } else if (sort === 'Title (Z-A)') {
                    sortCondition = ` ORDER BY title DESC`;
                }

                if (useNetflix) {
                    queryNetflix += `${sortCondition}`;
                }

                if (useDisney) {
                    queryDisney += `${sortCondition}`;
                }
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const [netflixResults, disneyResults] = await Promise.all([
                netflixClient.query(queryNetflix, ['TV Show']),
                disneyClient.query(queryDisney, ['TV Show'])
            ]);

            let combinedResults = '';
            if (useNetflix && useDisney) {
                combinedResults = [...netflixResults.rows, ...disneyResults.rows];
            } else if (useNetflix) {
                combinedResults = netflixResults.rows;
            } else {
                combinedResults = disneyResults.rows;
            }

            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));
        } else if (req.method === 'GET' && req.url.startsWith('/filter/movies')) {
            const queryObject = url.parse(req.url, true).query;
            const sort = queryObject.sort;
            const watch = queryObject.watch;
            const genre = queryObject.genre;
            const year1 = queryObject.year1;
            const year2 = queryObject.year2;

            let useNetflix = true;
            let useDisney = true;

            if (watch === 'Netflix') {
                useDisney = false;
            } else if (watch === 'Disney') {
                useNetflix = false;
            }

            let queryNetflix = '';
            let queryDisney = '';
            if(useNetflix) {
                queryNetflix = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE TRIM(type) = 'Movie'`;
            }

            if (useDisney) {
                queryDisney = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE TRIM(type) = 'Movie'`;
            }

            if (genre) {
                if(useNetflix) {
                    queryNetflix += ` AND listed_in ILIKE '%${genre}%'`;
                }

                if(useDisney) {
                    queryDisney += ` AND listed_in ILIKE '%${genre}%'`;
                }
            }
            
            if (year1 && year2) {
                const yearCondition = `CAST(release_year AS INTEGER) BETWEEN ${year1} AND ${year2}`;
        
                if (useNetflix) {
                    queryNetflix += ` AND ${yearCondition}`;
                }
        
                if (useDisney) {
                    queryDisney += ` AND ${yearCondition}`;
                }
            } else if (year1) {
                const yearCondition = `CAST(release_year AS INTEGER) >= ${year1}`;
        
                if (useNetflix) {
                    queryNetflix += ` AND ${yearCondition}`;
                }
        
                if (useDisney) {
                    queryDisney += ` AND ${yearCondition}`;
                }
            } else if(year2) {
                const yearCondition = `CAST(release_year AS INTEGER) <= ${year2}`;
        
                if (useNetflix) {
                    queryNetflix += ` AND ${yearCondition}`;
                }
        
                if (useDisney) {
                    queryDisney += ` AND ${yearCondition}`;
                }
            }

            let sortCondition = '';
            if (sort) {
                if (sort === 'Release Date Descending') {
                    sortCondition =` ORDER BY release_year DESC`;
                } else if (sort === 'Release Date Ascending') {
                    sortCondition = ` ORDER BY release_year ASC`;
                } else if (sort === 'Title (A-Z)') {
                    sortCondition = ` ORDER BY title ASC`;
                } else if (sort === 'Title (Z-A)') {
                    sortCondition = ` ORDER BY title DESC`;
                }

                if (useNetflix) {
                    queryNetflix += `${sortCondition}`;
                }

                if (useDisney) {
                    queryDisney += `${sortCondition}`;
                }
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const [netflixResults, disneyResults] = await Promise.all([
                netflixClient.query(queryNetflix),
                disneyClient.query(queryDisney)
            ]);

            let combinedResults = '';
            if (useNetflix && useDisney) {
                combinedResults = [...netflixResults.rows, ...disneyResults.rows];
            } else if (useNetflix) {
                combinedResults = netflixResults.rows;
            } else {
                combinedResults = disneyResults.rows;
            }

            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));
        } else if (req.method === 'GET' && req.url.startsWith('/filter/watchlist')) {
            const queryObject = url.parse(req.url, true).query;
            const email = queryObject.email;
            const type = queryObject.type;
            const sort = queryObject.sort;
            const watch = queryObject.watch;
            const genre = queryObject.genre;
            const year1 = queryObject.year1;
            const year2 = queryObject.year2;
        
            let useNetflix = true;
            let useDisney = true;
        
            if (watch === 'Netflix') {
                useDisney = false;
            } else if (watch === 'Disney') {
                useNetflix = false;
            }
        
            const result = await pool.query('SELECT titles FROM watchlist WHERE email = $1', [email]);
            const titlesString = result.rows[0].titles;
        
            console.log(result);
            const titlesArray = titlesString.split(',').map(title => title.trim());
        
            let combinedResults = [];
            let uniqueResults = [];
        
            for (let i = 0; i < titlesArray.length; i++) {
                const title = titlesArray[i];
        
                let queryNetflix = '';
                let queryDisney = '';
        
                if (useNetflix) {
                    queryNetflix = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE TRIM(title) = $1`;
                }
        
                if (useDisney) {
                    queryDisney = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE TRIM(title) = $1`;
                }

                if(type) {
                    if (useNetflix) {
                        queryNetflix += ` AND TRIM(type) ILIKE '%${type}%'`;
                    }
        
                    if (useDisney) {
                        queryDisney += ` AND TRIM(type) ILIKE '%${type}%'`;
                    } 
                }
        
                if (genre) {
                    if (useNetflix) {
                        queryNetflix += ` AND listed_in ILIKE '%${genre}%'`;
                    }
        
                    if (useDisney) {
                        queryDisney += ` AND listed_in ILIKE '%${genre}%'`;
                    }
                }
        
                if (year1 && year2) {
                    const yearCondition = `CAST(release_year AS INTEGER) BETWEEN ${year1} AND ${year2}`;
        
                    if (useNetflix) {
                        queryNetflix += ` AND ${yearCondition}`;
                    }
        
                    if (useDisney) {
                        queryDisney += ` AND ${yearCondition}`;
                    }
                } else if (year1) {
                    const yearCondition = `CAST(release_year AS INTEGER) >= ${year1}`;
        
                    if (useNetflix) {
                        queryNetflix += ` AND ${yearCondition}`;
                    }
        
                    if (useDisney) {
                        queryDisney += ` AND ${yearCondition}`;
                    }
                } else if (year2) {
                    const yearCondition = `CAST(release_year AS INTEGER) <= ${year2}`;
        
                    if (useNetflix) {
                        queryNetflix += ` AND ${yearCondition}`;
                    }
        
                    if (useDisney) {
                        queryDisney += ` AND ${yearCondition}`;
                    }
                }
        
                let sortCondition = '';
                if (sort) {
                    if (sort === 'Release Date Descending') {
                        sortCondition = ` ORDER BY release_year DESC`;
                    } else if (sort === 'Release Date Ascending') {
                        sortCondition = ' ORDER BY release_year ASC';
                    } else if (sort === 'Title (A-Z)') {
                        sortCondition = ' ORDER BY title ASC';
                    } else if (sort === 'Title (Z-A)') {
                        sortCondition = ' ORDER BY title DESC';
                    }
        
                    if (useNetflix) {
                        queryNetflix += `${sortCondition}`;
                    }
        
                    if (useDisney) {
                        queryDisney += `${sortCondition}`;
                    }
                }
        
                await connectNetflixDb();
                await connectDisneyDb();
        
                const [netflixResults, disneyResults] = await Promise.all([
                    netflixClient.query(queryNetflix, [title]),
                    disneyClient.query(queryDisney, [title])
                ]);
        
                if (useNetflix && netflixResults.rows.length > 0) {
                    combinedResults.push(...netflixResults.rows); 
                }
        
                if (useDisney && disneyResults.rows.length > 0) {
                    combinedResults.push(...disneyResults.rows);
                }
            }

            uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));
        
            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));
        } else if (req.method === 'GET' && req.url.startsWith('/filter')) {
            const queryObject = url.parse(req.url, true).query;
            const sort = queryObject.sort;
            const watch = queryObject.watch;
            const genre = queryObject.genre;
            const year1 = queryObject.year1;
            const year2 = queryObject.year2;
            const type = queryObject.type;

            let useNetflix = true;
            let useDisney = true;

            if (watch === 'Netflix') {
                useDisney = false;
            } else if (watch === 'Disney') {
                useNetflix = false;
            }

            let queryNetflix = '';
            let queryDisney = '';
            if(useNetflix) {
                queryNetflix = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix`;
            }

            if (useDisney) {
                queryDisney = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus`;
            }

            let useGenre = false;
            if (genre) {
                if(useNetflix) {
                    queryNetflix += ` WHERE listed_in ILIKE '%${genre}%'`;
                }

                if(useDisney) {
                    queryDisney += ` WHERE listed_in ILIKE '%${genre}%'`;
                }

                useGenre = true;
            }

            if(type) {
                if (useGenre) {
                    if (useNetflix) {
                        queryNetflix += ` AND TRIM(type) ILIKE '%${type}%'`;
                    }
    
                    if (useDisney) {
                        queryDisney += ` AND TRIM(type) ILIKE '%${type}%'`;
                    } 
                } else {
                    if (useNetflix) {
                        queryNetflix += ` WHERE TRIM(type) ILIKE '%${type}%'`;
                    }
    
                    if (useDisney) {
                        queryDisney += ` WHERE TRIM(type) ILIKE '%${type}%'`;
                    } 
                }
            }

            if (year1 && year2) {
                const yearCondition = `CAST(release_year AS INTEGER) BETWEEN ${year1} AND ${year2}`;
        
                if (useGenre) {
                    if (useNetflix) {
                        queryNetflix += ` AND ${yearCondition}`;
                    }
            
                    if (useDisney) {
                        queryDisney += ` AND ${yearCondition}`;
                    }
                } else {
                    if (useNetflix) {
                        queryNetflix += ` WHERE ${yearCondition}`;
                    }
                    
                    if (useDisney) {
                        queryDisney += ` WHERE ${yearCondition}`;
                    }
                }
            } else if (year1) {
                const yearCondition = `CAST(release_year AS INTEGER) >= ${year1}`;
        
                if (useGenre) {
                    if (useNetflix) {
                        queryNetflix += ` AND ${yearCondition}`;
                    }

                    if (useDisney) {
                        queryDisney += ` AND ${yearCondition}`;
                    }
                } else {
                    if (useNetflix) {
                        queryNetflix += ` WHERE ${yearCondition}`;
                    }

                    if (useDisney) {
                        queryDisney += ` WHERE ${yearCondition}`;
                    }
                }
            } else if(year2) {
                const yearCondition = `CAST(release_year AS INTEGER) <= ${year2}`;
        
                if (useGenre) {
                    if (useNetflix) {
                        queryNetflix += ` AND ${yearCondition}`;
                    }

                    if (useDisney) {
                        queryDisney += ` AND ${yearCondition}`;
                    }
                } else {
                    if (useNetflix) {
                        queryNetflix += ` WHERE ${yearCondition}`;
                    }

                    if (useDisney) {
                        queryDisney += ` WHERE ${yearCondition}`;
                    }
                }
            }

            let sortCondition = '';
            if (sort) {
                if (sort === 'Release Date Descending') {
                    sortCondition =` ORDER BY release_year DESC`;
                } else if (sort === 'Release Date Ascending') {
                    sortCondition = ' ORDER BY release_year ASC';
                } else if (sort === 'Title (A-Z)') {
                    sortCondition = ' ORDER BY title ASC';
                } else if (sort === 'Title (Z-A)') {
                    sortCondition = ' ORDER BY title DESC';
                }

                if (useNetflix) {
                    queryNetflix += `${sortCondition}`;
                }

                if (useDisney) {
                    queryDisney += `${sortCondition}`;
                }
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const [netflixResults, disneyResults] = await Promise.all([
                netflixClient.query(queryNetflix),
                disneyClient.query(queryDisney)
            ]);

            let combinedResults = '';
            if (useNetflix && useDisney) {
                combinedResults = [...netflixResults.rows, ...disneyResults.rows];
            } else if (useNetflix) {
                combinedResults = netflixResults.rows;
            } else {
                combinedResults = disneyResults.rows;
            }

            const uniqueResults = Array.from(new Set(combinedResults.map(item => item.title)))
                .map(title => combinedResults.find(item => item.title === title));

            res.writeHead(200);
            res.end(JSON.stringify(uniqueResults));
        } else if (req.method === 'POST' && req.url === '/addToWatchlist') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const { email, title } = JSON.parse(body);
        
                    console.log(title);
                    console.log(email);
        
                    pool.query('SELECT titles FROM watchlist WHERE email = $1', [email], (err, result) => {
                        if (err) {
                            console.error('Database query error:', err);
                            res.statusCode = 404;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: false, message: 'Database error' }));
                            return;
                        }
        
                        let currentTitles = '';
                        if (result.rows.length > 0) {
                            currentTitles = result.rows[0].titles;
                        }
        
                        if (currentTitles.includes(title)) {
                            console.log('Title already exists in watchlist');
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: false, message: 'Title already exists in watchlist' }));
                            return;
                        }
        
                        pool.query(`INSERT INTO watchlist (email, titles) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET titles = CASE 
                            WHEN watchlist.titles = '' THEN $2 ELSE CONCAT(watchlist.titles, ', ', $2) END`, [email, title], (err, result) => {
                            if (err) {
                                console.error('Database query error:', err);
                                res.statusCode = 404;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: false, message: 'Database error' }));
                                return;
                            }
        
                            console.log('Title added to watchlist');
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true, message: 'Title added to watchlist' }));
                        });
                    });
        
                } catch (err) {
                    console.error('Error parsing JSON:', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_title') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newTitle, platform, oldTitle } = JSON.parse(body);

                    console.log(newTitle);
                    console.log(platform);
                    console.log(oldTitle);
        
                    await connectNetflixDb();
                    await connectDisneyDb();

                    /*const existingNetflixRecord = netflixClient.query(`SELECT * FROM netflix WHERE TRIM(title) = $1`, [newTitle]);
                    const existingDisneyRecord = netflixClient.query(`SELECT * FROM disney_plus WHERE TRIM(title) = $1`, [newTitle]);
        
                    if(existingDisneyRecord.rows.length > 0 || existingNetflixRecord.rows.length > 0) {
                        res.statusCode = 400;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Title already in database!' }));
                        return;
                    }*/

                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET title = $1 WHERE TRIM(title) = $2';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET title = $1 WHERE TRIM(title) = $2';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    
        
                    const result = await client.query(updateQuery, [newTitle, oldTitle]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Title not found or not updated' }));
                    } else {
                        console.log('Title updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Title updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Title):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Title)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_type') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newType, platform, oldType, title } = JSON.parse(body);

                    console.log(newType);
                    console.log(platform);
                    console.log(oldType);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET type = $1 WHERE TRIM(type) = $2 AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET type = $1 WHERE TRIM(type) = $2 AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newType, oldType, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Type not found or not updated' }));
                    } else {
                        console.log('Type updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Type updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Type):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Type)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_platform') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
        
            req.on('end', async () => {
                try {
                    const { newPlatform, platform, title } = JSON.parse(body);
        
                    console.log(newPlatform);
                    console.log(platform);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let selectQuery = '', insertQuery = '', deleteQuery = '', sourceClient = '', targetClient = '';

                    if (platform === 'Netflix' && newPlatform === 'Disney Plus') {
                        selectQuery = 'SELECT * FROM netflix WHERE TRIM(title) = $1';
                        insertQuery = `INSERT INTO disney_plus (type, title, director, country, cast, date_added, release_year, rating, duration, listed_in, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
                        deleteQuery = 'DELETE FROM netflix WHERE TRIM(title) = $1';
                        sourceClient = netflixClient;
                        targetClient = disneyClient;
                    } else if (platform === 'Disney Plus' && newPlatform === 'Netflix') {
                        selectQuery = 'SELECT * FROM disney_plus WHERE TRIM(title) = $1';
                        insertQuery = `INSERT INTO netflix (type, title, director, country, cast, date_added, release_year, rating, duration, listed_in, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
                        deleteQuery = 'DELETE FROM disney_plus WHERE TRIM(title) = $1';
                        sourceClient = disneyClient;
                        targetClient = netflixClient;
                    } else {
                        throw new Error('Invalid platform specified or no change needed');
                    }
        
                    const selectResult = await sourceClient.query(selectQuery, [title]);
        
                    if (selectResult.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Record not found' }));
                        return;
                    }
        
                    const record = selectResult.rows[0];

                    fetch('/add_movie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            platform: newPlatform,
                            title: record.title,
                            type: record.type,
                            director: record.director,
                            country: record.country,
                            cast: record.cast,
                            dateAdded : record.date_added,
                            releaseYear: record.releasse_year,
                            rating: record.rating,
                            duration: record.duration,
                            listedIn: record.listed_in,
                            description: record.description
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

                    const deleteResult = await sourceClient.query(deleteQuery, [title]);
        
                    if (deleteResult.rowCount === 0) {
                        throw new Error('Failed to delete record from source platform');
                    }
        
                    console.log('Record moved successfully!');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, message: 'Record moved successfully!' }));
        
                } catch (err) {
                    console.error('Error processing request:', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Error processing request' }));
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_director') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newDirector, platform, oldDirector, title } = JSON.parse(body);

                    console.log(newDirector);
                    console.log(platform);
                    console.log(oldDirector);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET director = $1 WHERE (director IS NULL OR TRIM(director) = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET director = $1 WHERE (director IS NULL OR TRIM(director) = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newDirector, oldDirector, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Director not found or not updated' }));
                    } else {
                        console.log('Director updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Director updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Director):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Director)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_country') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newCountry, platform, oldCountry, title } = JSON.parse(body);

                    console.log(newCountry);
                    console.log(platform);
                    console.log(oldCountry);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET country = $1 WHERE (country IS NULL OR TRIM(country) = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET country = $1 WHERE (country IS NULL OR TRIM(country) = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newCountry, oldCountry, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Country not found or not updated' }));
                    } else {
                        console.log('Country updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Country updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Country):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Country)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_cast') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newCast, platform, oldCast, title } = JSON.parse(body);

                    console.log(newCast);
                    console.log(platform);
                    console.log(oldCast);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET "cast" = $1 WHERE ("cast" IS NULL OR TRIM("cast") = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET "cast" = $1 WHERE ("cast" IS NULL OR TRIM("cast") = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newCast, oldCast, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Cast not found or not updated' }));
                    } else {
                        console.log('Cast updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Cast updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Cast):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Cast)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_releaseYear') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newReleaseYear, platform, oldReleaseYear, title } = JSON.parse(body);

                    console.log(newReleaseYear);
                    console.log(platform);
                    console.log(oldReleaseYear);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET release_year = $1 WHERE (release_year IS NULL OR TRIM(release_year) = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET release_year = $1 WHERE (release_year IS NULL OR TRIM(release_year) = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newReleaseYear, oldReleaseYear, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Release year not found or not updated' }));
                    } else {
                        console.log('Release year updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Release year updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(ReleaseYear):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(ReleaseYear)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_rating') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newRating, platform, oldRating, title } = JSON.parse(body);

                    console.log(newRating);
                    console.log(platform);
                    console.log(oldRating);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET rating = $1 WHERE (rating IS NULL OR TRIM(rating) = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET rating = $1 WHERE (rating IS NULL OR TRIM(rating) = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newRating, oldRating, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Rating not found or not updated' }));
                    } else {
                        console.log('Rating updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Rating updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Rating):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Rating)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_duration') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newDuration, platform, oldDuration, title } = JSON.parse(body);

                    console.log(newDuration);
                    console.log(platform);
                    console.log(oldDuration);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET duration = $1 WHERE (duration IS NULL OR TRIM(duration) = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET duration = $1 WHERE (duration IS NULL OR TRIM(duration) = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newDuration, oldDuration, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Duration not found or not updated' }));
                    } else {
                        console.log('Release year updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Duration updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Duration)):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Duration)'}));
                   
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_listedIn') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newListedIn, platform, oldListedIn, title } = JSON.parse(body);

                    console.log(newListedIn);
                    console.log(platform);
                    console.log(oldListedIn);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET listed_in = $1 WHERE (listed_in IS NULL OR TRIM(listed_in) = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET listed_in = $1 WHERE (listed_in IS NULL OR TRIM(listed_in) = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newListedIn, oldListedIn, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Listed in not found or not updated' }));
                    } else {
                        console.log('Release year updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Listed in updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(ListedIn):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(ListedIn)'}));
                }
            });
        } else if (req.method === 'PUT' && req.url === '/edit_description') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { newDescription, platform, oldDescription, title } = JSON.parse(body);

                    console.log(newDescription);
                    console.log(platform);
                    console.log(oldDescription);
                    console.log(title);
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    let updateQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        updateQuery = 'UPDATE netflix SET description = $1 WHERE (description IS NULL OR TRIM(description) = $2 OR description = $2) AND TRIM(title) = $3';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        updateQuery = 'UPDATE disney_plus SET description = $1 WHERE (description IS NULL OR TRIM(description) = $2 OR description = $2) AND TRIM(title) = $3';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    const result = await client.query(updateQuery, [newDescription, oldDescription, title]);

                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Description not found or not updated' }));
                    } else {
                        console.log('Release year updated!');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'Description updated!' }));
                    }
        
                } catch (err) {
                    console.error('Error parsing JSON(Description):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(Description)'}));
                   
                }
            });
        } else if (req.method === 'POST' && req.url === '/add_movie') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { platform, title, type, director, country, cast, dateAdded, releaseYear, rating, duration, listedIn, description } = JSON.parse(body);
        
                    console.log(platform);
                    console.log(title);
                    console.log(type);
                    console.log(director);
                    console.log(cast);
                    console.log(dateAdded);
                    console.log(country);
                    console.log(releaseYear);
                    console.log(rating);
                    console.log(listedIn);
                    console.log(description);
        
                    if (platform === '') {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'No platform given' }));
                        return;
                    }
        
                    if (title === '') {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'No title given' }));
                        return; 
                    }
        
                    if (type === '') {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'No type given' }));
                        return;
                    }
        
                    await connectNetflixDb();
                    await connectDisneyDb();
        
                    const existingNetflixRecord = await netflixClient.query('SELECT * FROM netflix WHERE TRIM(title) = $1', [title]);
                    const existingDisneyRecord = await disneyClient.query('SELECT * FROM disney_plus WHERE TRIM(title) = $1', [title]);
        
                    if (existingNetflixRecord.rows.length > 0 || existingDisneyRecord.rows.length > 0) {
                        res.statusCode = 409;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Data with same title existing already in database!' }));
                        return; // Ieși din funcție după ce trimiti răspunsul
                    }
        
                    let insertQuery;
                    let client;
        
                    if (platform === 'Netflix') {
                        insertQuery = 'INSERT INTO netflix (title, type, director, country, "cast", date_added, release_year, rating, duration, listed_in, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
                        client = netflixClient;
                    } else if (platform === 'Disney Plus') {
                        insertQuery = 'INSERT INTO disney_plus (title, type, director, country, "cast", date_added, release_year, rating, duration, listed_in, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
                        client = disneyClient;
                    } else {
                        throw new Error('Invalid platform specified');
                    }
        
                    await client.query(insertQuery, [title, type, director, country, cast, dateAdded, releaseYear, rating, duration, listedIn, description]);
        
                    console.log('Movie/Tv Show added!');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, message: 'Movie/Tv Show added!' }));
        
                } catch (err) {
                    console.error('Error parsing JSON(AddMovie):', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON(AddMovie)' }));
                }
            });
        } else if (req.method === 'DELETE' && req.url === '/delete_movie') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
        
            req.on('end', async () => {
              const { platform, title } = JSON.parse(body);
        
              try {
                const deleteQuery = `
                  DELETE FROM ${platform.toLowerCase().replace(' ', '_')}
                  WHERE title = $1
                `;

                let client = '';
                if(platform.toLowerCase().replace(' ', '_') === 'Netflix') {
                    client = netflixClient;
                } else {
                    client = disneyClient;
                }
                const result = await client.query(deleteQuery, [title]);
        
                if (result.rowCount > 0) {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Movie/TV show deleted successfully.' }));
                } else {
                  res.writeHead(404, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, message: 'Movie/TV show not found.' }));
                }
              } catch (error) {
                console.error('Error deleting movie/TV show:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Failed to delete movie/TV show.' }));
              }
            });
        } else if (req.method === 'DELETE' && req.url === '/delete_movie_watchlist') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
    
            req.on('end', async () => {
                const { email, title } = JSON.parse(body);
    
                try {
                    const result = await pool.query('SELECT titles FROM watchlist WHERE email = $1', [email]);
    
                    if (result.rows.length === 0) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, message: 'Watchlist not found for the given email.' }));
                        return;
                    }
    
                    const titlesString = result.rows[0].titles;
                    const titlesArray = titlesString.split(',').map(t => t.trim());
    
                    // Step 2: Remove the specified title
                    const updatedTitlesArray = titlesArray.filter(t => t !== title);
                    const updatedTitlesString = updatedTitlesArray.join(', ');
    
                    // Step 3: Update the database
                    const updateQuery = `
                        UPDATE watchlist
                        SET titles = $1
                        WHERE email = $2
                    `;
                    await pool.query(updateQuery, [updatedTitlesString, email]);
    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: 'Movie/TV show deleted from watchlist successfully.' }));
                } catch (error) {
                    console.error('Error deleting movie/TV show from watchlist:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Failed to delete movie/TV show from watchlist.' }));
                }
            });
        } else if (req.method === 'GET' && req.url.startsWith('/get_recommendations')) {
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            const urlParams = new URLSearchParams(req.url.split('?')[1]);
            const title = urlParams.get('title');
            const genres = urlParams.get('listed_in').split(',').map(genre => genre.trim());
        
            try {
                await connectNetflixDb();
                await connectDisneyDb();
        
                let recommendations = [];
                
                for (const genre of genres) {
                    const netflixQuery = 'SELECT title, type, release_year FROM netflix WHERE $1 = ANY(string_to_array(listed_in, \', \')) AND TRIM(title) != $2 LIMIT 8';
                    const disneyQuery = 'SELECT title, type, release_year FROM disney_plus WHERE $1 = ANY(string_to_array(listed_in, \', \')) AND TRIM(title) != $2 LIMIT 8';
                    
                    const netflixResult = await netflixClient.query(netflixQuery, [genre, title]);
                    const disneyResult = await disneyClient.query(disneyQuery, [genre, title]);
                    
                    recommendations = recommendations.concat(netflixResult.rows, disneyResult.rows);
                }
        
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, recommendations }));
        
            } catch (err) {
                console.error('Error processing request:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Error processing request' }));
            }
        } else if (req.method === 'GET' && req.url.startsWith('/statisticsByYear')) {
            const queryObject = url.parse(req.url, true).query;
            const year = queryObject.year;

            if (!year) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Year is required' }));
                return;
            }

            await connectNetflixDb();
            await connectDisneyDb();

            const netflixMoviesQuery = await netflixClient.query('SELECT COUNT(*) AS count FROM netflix WHERE TRIM(type) = $1 AND TRIM(release_year) = $2', ['Movie', year]);
            const netflixTvShowsQuery = await netflixClient.query('SELECT COUNT(*) AS count FROM netflix WHERE TRIM(type) = $1 AND TRIM(release_year) = $2', ['TV Show', year]);

            const disneyMoviesQuery = await disneyClient.query('SELECT COUNT(*) AS count FROM disney_plus WHERE TRIM(type) = $1 AND TRIM(release_year) = $2', ['Movie', year]);
            const disneyTvShowsQuery = await disneyClient.query('SELECT COUNT(*) AS count FROM disney_plus WHERE TRIM(type) = $1 AND TRIM(release_year) = $2', ['TV Show', year]);

            const netflixMoviesCount = netflixMoviesQuery.rows[0].count;
            const netflixTvShowsCount = netflixTvShowsQuery.rows[0].count;

            const disneyMoviesCount = disneyMoviesQuery.rows[0].count;
            const disneyTvShowsCount = disneyTvShowsQuery.rows[0].count;

            const statistics = {
                netflix: {
                    movies: netflixMoviesCount,
                    tvShows: netflixTvShowsCount
                },
                disney: {
                    movies: disneyMoviesCount,
                    tvShows: disneyTvShowsCount
                }
            };

            res.writeHead(200);
            res.end(JSON.stringify(statistics));

        } else if (req.method === 'GET' && req.url.startsWith('/statisticsByPlatformAndYear')) {
            const queryObject = url.parse(req.url, true).query;
            const platform = queryObject.platform;
            const year = queryObject.year;

            if (!platform) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Platform is required' }));
                return;
            }

            if (!year) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Year is required' }));
                return;
            }

            await connectNetflixDb();
            await connectDisneyDb();

            let statistics = {};

            if (platform === 'Netflix') {
                const netflixMoviesQuery = await netflixClient.query('SELECT COUNT(*) AS count FROM netflix WHERE TRIM(type) = $1 AND CAST(release_year AS INTEGER) = $2',['Movie', `${year}`]);
                const netflixTvShowsQuery = await netflixClient.query('SELECT COUNT(*) AS count FROM netflix WHERE TRIM(type) = $1 AND CAST(release_year AS INTEGER) = $2', ['TV Show', `${year}`]);

                const netflixMoviesCount = netflixMoviesQuery.rows[0].count;
                const netflixTvShowsCount = netflixTvShowsQuery.rows[0].count;

                statistics = {
                    platform: 'Netflix',
                    movies: netflixMoviesCount,
                    tvShows: netflixTvShowsCount
                };
            } else if (platform === 'Disney') {
                const disneyMoviesQuery = await disneyClient.query('SELECT COUNT(*) AS count FROM disney_plus WHERE TRIM(type) = $1 AND CAST(release_year AS INTEGER) = $2', ['Movie', `${year}`]);
                const disneyTvShowsQuery = await disneyClient.query('SELECT COUNT(*) AS count FROM disney_plus WHERE TRIM(type) = $1 AND CAST(release_year AS INTEGER) = $2', ['TV Show', `${year}`]);

                const disneyMoviesCount = disneyMoviesQuery.rows[0].count;
                const disneyTvShowsCount = disneyTvShowsQuery.rows[0].count;

                statistics = {
                    platform: 'Disney Plus',
                    movies: disneyMoviesCount,
                    tvShows: disneyTvShowsCount
                };
            }

            res.writeHead(200);
            res.end(JSON.stringify(statistics));
        } else if (req.method === 'GET' && req.url.startsWith('/statisticsByPlatform')) {
            const queryObject = url.parse(req.url, true).query;
            const platform = queryObject.platform;

            if (!platform) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Platform is required' }));
                return;
            }
            await connectNetflixDb();
            await connectDisneyDb();

            let statistics = {};

            if (platform === 'Netflix') {
                const netflixMoviesQuery = await netflixClient.query('SELECT COUNT(*) AS count FROM netflix WHERE TRIM(type) = $1', ['Movie']);
                const netflixTvShowsQuery = await netflixClient.query('SELECT COUNT(*) AS count FROM netflix WHERE TRIM(type) = $1', ['TV Show']);

                const netflixMoviesCount = netflixMoviesQuery.rows[0].count;
                const netflixTvShowsCount = netflixTvShowsQuery.rows[0].count;

                statistics = {
                    platform: 'Netflix',
                    movies: netflixMoviesCount,
                    tvShows: netflixTvShowsCount
                };
            } else if (platform === 'Disney') {
                const disneyMoviesQuery = await disneyClient.query('SELECT COUNT(*) AS count FROM disney_plus WHERE TRIM(type) = $1', ['Movie']);
                const disneyTvShowsQuery = await disneyClient.query('SELECT COUNT(*) AS count FROM disney_plus WHERE TRIM(type) = $1', ['TV Show']);

                const disneyMoviesCount = disneyMoviesQuery.rows[0].count;
                const disneyTvShowsCount = disneyTvShowsQuery.rows[0].count;

                statistics = {
                    platform: 'Disney Plus',
                    movies: disneyMoviesCount,
                    tvShows: disneyTvShowsCount
                };
            }

            res.writeHead(200);
            res.end(JSON.stringify(statistics));
        } else  if (req.method === 'POST' && req.url === '/users') {
            const query = 'SELECT username, email FROM users WHERE role = $1';
            const params = ['user'];
        
            pool.query(query, params, (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                }
        
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result.rows));
            });
        } else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
            const userEmail = decodeURIComponent(req.url.substring('/users/'.length)); 
            const query = 'DELETE FROM users WHERE email = $1';
        
            pool.query(query, [userEmail], (err, result) => {
                if (err) {
                    console.error('Error deleting user:', err);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'Error deleting user' }));
                    return;
                }
        
                if (result.rowCount === 0) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'User not found' }));
                    return;
                }
        
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'User deleted successfully' }));
            });
        } else if (req.method === 'DELETE' && req.url === '/delete_account') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { email } = JSON.parse(body);
                const query = 'DELETE FROM users WHERE email = $1';
                pool.query(query, [email], (err, result) => {
                    if (err) {
                        console.error('Error deleting user:', err);
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'Error deleting user' }));
                        return;
                    }
                    if (result.rowCount === 0) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: false, message: 'User not found or cannot delete admin' }));
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, message: 'User deleted successfully' }));
                });
            });
        } else if (req.method === 'POST' && req.url === '/login') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { email, password } = JSON.parse(body);
                console.log('Received email:', email);
        
                const query = 'SELECT * FROM users WHERE email = $1';
        
                pool.query(query, [email], (err, result) => {
                  if (err) {
                    console.error('Database query error:', err);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'Database error' }));
                    return;
                  }
                  if (result.rows.length === 0) {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'No user with such Email' }));
                    return;
                  }
        
                  const user = result.rows[0];
                  bcrypt.compare(password, user.password_hash, (err, match) => {
                    if (err) {
                      console.error('Error comparing passwords:', err);
                      res.statusCode = 500;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ success: false, message: 'Error comparing passwords' }));
                      return;
                    }
        
                    if (match) {
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({
                        success: true,
                        message: user.role === 'admin' ? 'Admin login successful' : 'User login successful',
                        username: user.username, 
                        email: user.email, 
                        role: user.role
                      }));
                    } 
                    else {
                      res.statusCode = 401;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ success: false, message: 'Wrong Password' }));
                    }
                  });
                });
              } catch (err) {
                console.error('Error parsing JSON:', err);
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
              }
            });
        } else if (req.method === 'POST' && req.url === '/register') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const { email } = JSON.parse(body);
        
                    // Check if an account with the given email already exists
                    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
                        if (err) {
                            console.error('Database query error:', err);
                            res.statusCode = 404;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: false, message: 'Database error' }));
                            return;
                        }
        
                        if (result.rows.length > 0) {
                            res.statusCode = 409; 
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: false, message: 'An account with this email already exists' }));
                            return;
                           
                        }
        
                        const otp = Math.floor(100000 + Math.random() * 900000).toString();
                        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // OTP valid for 5 minutes
        
                        pool.query(
                          'INSERT INTO otps (email, otp, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = $3', 
                          [email, otp, expiresAt], (err) => {
                            if (err) {
                                console.error('Error inserting OTP into database:', err);
                                res.statusCode = 500;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: false, message: 'Error saving OTP' }));
                                return;
                            }
        
                            dotenv.config();
        
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL_USER,
                                    pass: process.env.EMAIL_PASS
                                }
                            });
        
                            const mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: email,
                                subject: 'Your OTP Code',
                                text: `Your OTP code is ${otp}`
                            };
        
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.error('Error sending email:', error);
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.end(JSON.stringify({ success: false, message: 'Error sending OTP' }));
                                    return;
                                }
                                else {
                                  console.log('Email sent:', info.response);
                                  res.statusCode = 200;
                                  res.setHeader('Content-Type', 'application/json');
                                  res.end(JSON.stringify({ success: true, message: 'OTP sent successfully' }))
                                }
                            });
                        });
                    });
                } catch (err) {
                    console.error('Error parsing JSON:', err);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
                }
            });
        }
        else if (req.method === 'POST' && req.url === '/verify-otp') {
          let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              try {
                  const { email, otp, username, password } = JSON.parse(body);
                  const currentTime = new Date().toISOString();
        
                  pool.query('SELECT * FROM otps WHERE email = $1 AND otp = $2 AND expires_at > $3', 
                  [email, otp, currentTime], (err, result) => {
                      if (err) {
                          console.error('Database error:', err);
                          res.statusCode = 500;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'Database error' }));
                          return;
                      }
        
                      if (result.rows.length === 0) {
                          res.statusCode = 400;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'Invalid OTP' })); //'Invalid or expired OTP'
                          return;
                      }
        
                      bcrypt.hash(password, 10, (err, hash) => {
                          if (err) {
                              console.error('Error hashing password:', err);
                              res.statusCode = 500;
                              res.setHeader('Content-Type', 'application/json');
                              res.end(JSON.stringify({ success: false, message: 'Error hashing password' }));
                              return;
                          }
        
                          const currentTime = new Date().toISOString();
        
                          pool.query('INSERT INTO users (email, username, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', 
                          [email, username, hash, currentTime, currentTime], (err) => {
                              if (err) {
                                  console.error('Error inserting user into database:', err);
                                  res.statusCode = 500;
                                  res.setHeader('Content-Type', 'application/json');
                                  res.end(JSON.stringify({ success: false, message: 'Error inserting user into database' }));
                                  return;
                              }
                              
                              // Delete the used OTP
                              pool.query('DELETE FROM otps WHERE email = $1', [email], (err) => {
                                if (err) {
                                  console.error('Error deleting OTP from database:', err);
                                  res.statusCode = 500;
                                  res.setHeader('Content-Type', 'application/json');
                                  res.end(JSON.stringify({ success: false, message: 'Error deleting OTP' }));
                                  return;
                                }
                                res.statusCode = 201; 
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: true, message: 'Registration successful' }));
                              });
                          });
                      });
                  });
              } catch (err) {
                  console.error('Error parsing JSON:', err);
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
              }
          });
        }
        else if (req.method === 'POST' && req.url === '/forgot_your_password') {
          let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              try {
                  const { email } = JSON.parse(body);
        
                  // Check if an account with the given email already exists
                  pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
                      if (err) {
                          console.error('Database query error:', err);
                          res.statusCode = 500;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'Database error' }));
                          return;
                      }
        
                      if (result.rows.length == 0) {
                          res.statusCode = 409; 
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'An account with this email does not exist' }));
                          return;
                      }
        
                      const otp = Math.floor(100000 + Math.random() * 900000).toString();
                      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // OTP valid for 5 minutes
        
                      pool.query(
                        'INSERT INTO otps2 (email, otp, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = $3', 
                        [email, otp, expiresAt], (err) => {
                          if (err) {
                              console.error('Error inserting OTP into database:', err);
                              res.statusCode = 500;
                              res.setHeader('Content-Type', 'application/json');
                              res.end(JSON.stringify({ success: false, message: 'Error saving OTP' }));
                              return;
                          }
        
                          dotenv.config();
        
                          const transporter = nodemailer.createTransport({
                              service: 'gmail',
                              auth: {
                                  user: process.env.EMAIL_USER, 
                                  pass: process.env.EMAIL_PASS 
                              }
                          });
        
                          const mailOptions = {
                              from: process.env.EMAIL_USER, 
                              to: email,                    
                              subject: 'Your OTP Code',
                              text: `Your OTP code is ${otp}`
                          };
        
                          transporter.sendMail(mailOptions, (error, info) => {
                              if (error) {
                                  console.error('Error sending email:', error);
                                  res.statusCode = 500;
                                  res.setHeader('Content-Type', 'application/json');
                                  res.end(JSON.stringify({ success: false, message: 'Error sending OTP' }));
                                  return;
                              }
                              else {
                                console.log('Email sent:', info.response);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: true, message: 'OTP sent successfully' }));
                              }
                          });
                      });
                  });
              } catch (err) {
                  console.error('Error parsing JSON:', err);
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
              }
          });
        }
        else if (req.method === 'POST' && req.url === '/verify-otp-password-reset') {
          let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              try {
                  const { email, otp } = JSON.parse(body);
                  const currentTime = new Date().toISOString();
        
                  pool.query('SELECT * FROM otps2 WHERE email = $1 AND otp = $2 AND expires_at > $3', 
                  [email, otp, currentTime], (err, result) => {
                      if (err) {
                          console.error('Database error:', err);
                          res.statusCode = 500;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'Database error' }));
                          return;
                      }
        
                      if (result.rows.length === 0) {
                          res.statusCode = 400;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'Invalid OTP' })); //'Invalid or expired OTP'
                          return;
                      }
                      
                      // OTP is valid, now we delete it
                      pool.query('DELETE FROM otps2 WHERE email = $1', [email], (err) => {
                        if (err) {
                          console.error('Error deleting OTP from database:', err);
                          res.statusCode = 500;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'Error deleting OTP' }));
                          return;
                        }
                        
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, message: 'OTP is correct' }));
                      }); 
                  });
              } catch (err) {
                  console.error('Error parsing JSON:', err);
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
              }
          });
        }
        // Endpoint to handle new password submission
        else if (req.method === 'POST' && req.url === '/reset-password') {
          let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              try {
                  const { email, newPassword } = JSON.parse(body);
        
                  bcrypt.hash(newPassword, 10, (err, hash) => {
                      if (err) {
                          console.error('Error hashing password:', err);
                          res.statusCode = 500;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: false, message: 'Error hashing password' }));
                          return;
                      }
        
                      const updatedAt = new Date().toISOString();
        
                      pool.query('UPDATE users SET password_hash = $1, updated_at = $2 WHERE email = $3', 
                      [hash, updatedAt, email], (err) => {
                          if (err) {
                              console.error('Error updating password in database:', err);
                              res.statusCode = 500;
                              res.setHeader('Content-Type', 'application/json');
                              res.end(JSON.stringify({ success: false, message: 'Error updating password in database' }));
                              return;
                          }
        
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify({ success: true, message: 'Password reset successful' }));
                      });
                  });
              } catch (err) {
                  console.error('Error parsing JSON:', err);
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
              }
          });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Page not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Ensure clients are disconnected on process exit
process.on('exit', async () => {
    await disconnectNetflixDb();
    await disconnectDisneyDb();
});
process.on('SIGINT', async () => {
    await disconnectNetflixDb();
    await disconnectDisneyDb();
    process.exit();
});
process.on('SIGTERM', async () => {
    await disconnectNetflixDb();
    await disconnectDisneyDb();
    process.exit();
});