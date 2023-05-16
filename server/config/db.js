// mongo connection

const mongoose = require('mongoose');
const { connect, connection } = mongoose;

mongoose.set('strictQuery', false);
require('dotenv').config();

connect(process.env.DB_URL);

connection.on('connected', () => console.log('Successfully connected to DB'));
connection.on('error', (err) => console.log('error occurred', err));

module.exports = connection;