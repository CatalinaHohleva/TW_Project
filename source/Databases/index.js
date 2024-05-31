const { executeInitialSchema, getNetflixDb, getDisneyDb } = require('C:\\Users\\anaun\\OneDrive\\Desktop\\WEB\\database');
const { getMovies } = require('C:\\Users\\anaun\\OneDrive\\Desktop\\WEB\\script-home.js');

// Execute the schema setup
const netflixClient = getNetflixDb();
executeInitialSchema(netflixClient, 'netflix');

const disneyClient = getDisneyDb();
executeInitialSchema(disneyClient, 'disney_plus');
