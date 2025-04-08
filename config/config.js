require('dotenv').config();
const path = require('path');

module.exports = {
  port: process.env.PORT || 5000,
  csvPath: path.resolve(__dirname, '..', process.env.CSV_PATH || 'data/cars.csv'),
};