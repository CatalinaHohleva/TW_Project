const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',   // my PostgreSQL username ('postgres' - the default username)
    host: 'localhost',  // the host where the PostgreSQL server is running 
    database: 'myapp',  // the name of the database to connect to
    password: 'qwerty', // the password for my PostgreSQL user
    port: 5432,         // the port on which the PostgreSQL server is listening (5432 - the default port)
});

const email = 'hohlevac@gmail.com';
const username = 'admin';
const password = 'admin';
const role = 'admin';

const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      pool.end();
      return;
    }
  
    const currentTime = new Date().toISOString();

    pool.query(
      'INSERT INTO users (email, username, password_hash, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [email, username, hashedPassword, role, currentTime, currentTime],
      (err) => {
      if (err) {
        console.error('Error inserting admin:', err);
      } else {
        console.log('Admin added successfully');
      }
      pool.end();
    });
});
