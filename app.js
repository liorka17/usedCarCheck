const express = require('express');
const path = require('path');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/cars', carRoutes);
app.use('/', carRoutes);

module.exports = app;
