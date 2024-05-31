http = require('http');
const { getNetflixDb, getDisneyDb } = require('C:\\Users\\anaun\\OneDrive\\Desktop\\WEB\\database');

const hostname = '127.0.0.1';
const port = 8081;

const server = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'OPTIONS') {
        // Preflight request, respond with 200
        res.writeHead(200);
        res.end();
        return;
    }

    res.setHeader('Content-Type', 'application/json');
        if (req.method === 'GET' && req.url === '/netflix/movies') {
            const client = getNetflixDb();
            try {
                await client.connect();
                console.log(`Connected to the Netflix database successfully.`);

                const result = await client.query('SELECT title, release_year FROM netflix WHERE TRIM(type) = $1', ['Movie']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Netflix database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else if (req.method === 'GET' && req.url === '/netflix/movies_desc') {
            const client = getNetflixDb();
            try {
                await client.connect();
                console.log(`Connected to the Netflix database successfully.`);
    
                const result = await client.query('SELECT title, release_year FROM netflix WHERE TRIM(type) = $1 ORDER BY release_year DESC', ['Movie']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Netflix database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else if (req.method === 'GET' && req.url === '/disney/movies') {
            const client = getDisneyDb();
            try {
                await client.connect();
                console.log(`Connected to the Disney Plus database successfully.`);
    
                const result = await client.query('SELECT title, release_year FROM disney_plus WHERE TRIM(type) = $1', ['Movie']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Disney Plus database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else if (req.method === 'GET' && req.url === '/disney/movies_desc') {
            const client = getDisneyDb();
            try {
                await client.connect();
                console.log(`Connected to the Disney Plus database successfully.`);
        
                const result = await client.query('SELECT title, release_year FROM disney_plus WHERE TRIM(type) = $1 ORDER BY release_year DESC', ['Movie']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Disney Plus database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else if (req.method === 'GET' && req.url === '/netflix/tvShows') {
            const client = getNetflixDb();
            try {
                await client.connect();
                console.log(`Connected to the Netflix database successfully.`);

                const result = await client.query('SELECT title, release_year FROM netflix WHERE TRIM(type) = $1', ['TV Show']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Netflix database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else if (req.method === 'GET' && req.url === '/netflix/tvShows_desc') {
            const client = getNetflixDb();
            try {
                await client.connect();
                console.log(`Connected to the Netflix database successfully.`);
    
                const result = await client.query('SELECT title, release_year FROM netflix WHERE TRIM(type) = $1 ORDER BY release_year DESC', ['TV Show']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Netflix database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else if (req.method === 'GET' && req.url === '/disney/tvShows') {
            const client = getDisneyDb();
            try {
                await client.connect();
                console.log(`Connected to the Disney Plus database successfully.`);
    
                const result = await client.query('SELECT title, release_year FROM disney_plus WHERE TRIM(type) = $1', ['TV Show']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Disney Plus database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else if (req.method === 'GET' && req.url === '/disney/tvShows_desc') {
            const client = getDisneyDb();
            try {
                await client.connect();
                console.log(`Connected to the Disney Plus database successfully.`);
        
                const result = await client.query('SELECT title, release_year FROM disney_plus WHERE TRIM(type) = $1 ORDER BY release_year DESC', ['TV Show']);
                res.writeHead(200);
                res.end(JSON.stringify(result.rows));
            } catch (error) {
                console.error('Error fetching data from Disney Plus database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } finally {
                await client.end();
            }
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
