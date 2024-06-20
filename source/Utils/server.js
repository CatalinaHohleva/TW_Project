const http = require('http');
const url = require('url');
const { getNetflixDb, getDisneyDb } = require('C:\\Users\\anaun\\OneDrive\\Desktop\\WEB\\database');

const hostname = '127.0.0.1';
const port = 8081;

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

            const disneyQuery = await disneyClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE title LIKE $1', [`${title}`]);

            const netflixQuery = await netflixClient.query('SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE title LIKE $1', [`${title}`]);

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

        } else if (req.method === 'GET' && req.url.startsWith('filter/tvShows')) {
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
                queryNetflix = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM netflix WHERE TRIM(type) = 'TV Show'`;
            }

            if (useDisney) {
                queryDisney = `SELECT type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description FROM disney_plus WHERE TRIM(type) = 'TV Show'`;
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
        } else if (req.method === 'GET' && req.url.startsWith('filter/movies')) {
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
        } else if (req.method === 'GET' && req.url.startsWith('/filter')) {
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
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not Found' }));
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
