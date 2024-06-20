const { executeInitialSchema, getNetflixDb, getDisneyDb } = require('./database');
// Execute the schema setup
const netflixClient = getNetflixDb();
executeInitialSchema(netflixClient, 'netflix');

const disneyClient = getDisneyDb();
executeInitialSchema(disneyClient, 'disney_plus');