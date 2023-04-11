const express = require('express');
 
const appNotes = require('./appnotes');

const app = express();

app.use('/appnotes', appNotes);

module.exports = app;