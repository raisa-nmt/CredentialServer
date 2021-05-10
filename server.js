"use strict"

require('dotenv').config();
const express = require('express');
const app     = express();

const pageController = require('./controllers/PageController');

app.set('view engine', 'ejs');

app.get('/', pageController.index);

app.listen(process.env.PORT, function() { 
    console.log("App Started!!");
});