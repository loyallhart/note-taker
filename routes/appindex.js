const express = require('express').Router;
 
const appNotes = require('./appnotes');

const app = express();

app.use('/notes', appNotes);

module.exports = app;