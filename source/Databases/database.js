const { Client } = require('pg');
const fs = require('fs');//modul built-in Node.js care oferă funcționalități pentru a lucra cu sistemul de fișiere
const csv = require('csv-parser');
/*pg (node-postgres): Permite conectarea și interacționarea cu baza de date PostgreSQL.
fs (File System): Permite citirea fișierelor de pe disc, în special fișierul CSV.
csv-parser: Permite parsarea fișierului CSV și transformarea rândurilor CSV în obiecte JavaScript.*/

const netflixClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'netflix',
  password: 'password',
  port: 5432,
});

const disneyClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'disney_plus',
  password: 'password',
  port: 5432,
});

//async and await !!!!!!!!!!!!!!!!!!!!
async function executeInitialSchema(client, dbName) {
  try {
      await client.connect();
      console.log(`Connected to the ${dbName} database successfully.`);

      // Drop the table if it exists
      await client.query('DROP TABLE IF EXISTS content');

      // Create the table if it doesn't exist
      await client.query(`
          CREATE TABLE IF NOT EXISTS ${dbName} (
              id SERIAL PRIMARY KEY,
              type TEXT,
              title TEXT,
              director TEXT,
              "cast" TEXT,
              country TEXT,
              date_added TEXT,
              release_year TEXT,
              rating TEXT,
              duration TEXT,
              listed_in TEXT,
              description TEXT
          )
      `);

      // Read and parse the CSV file
      const readStream = fs.createReadStream(`C:\\Users\\anaun\\OneDrive\\Desktop\\WEB\\${dbName}_titles.csv`);
      const csvParser = csv();

      const insertPromises = [];

      readStream.pipe(csvParser)
          .on('data', (row) => {
              const insertPromise = client.query(
                  `INSERT INTO ${dbName} (type, title, director, "cast", country, date_added, release_year, rating, duration, listed_in, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                  [row.type, row.title, row.director, row.cast, row.country, row.date_added, row.release_year, row.rating, row.duration, row.listed_in, row.description]
              ).catch(err => {
                  console.error('Error inserting row:', err);
              });

              insertPromises.push(insertPromise);
          })
          .on('end', async () => {
              try {
                  await Promise.all(insertPromises);
                  console.log(`Data insertion for ${dbName} complete.`);
              } finally {
                  await client.end();
                  console.log(`Database connection for ${dbName} closed.`);
              }
          });
  } catch (error) {
      console.error(`Error setting up database schema for ${dbName}:`, error);
      await client.end();
  }
}

function getNetflixDb() {
  return netflixClient;
}

function getDisneyDb() {
  return disneyClient;
}

module.exports = { executeInitialSchema, getNetflixDb, getDisneyDb };
