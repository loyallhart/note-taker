const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {readFromFile, 
    readAndAppend,
     writeToFile,
} = require('../helpers/fsUtils');

// GET Route for the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    // console.log(`Raw data in db is: ${data}`);
    res.json(JSON.parse(data));
  })
});

// GET Route - specific note
notes.get('/:id', (req, res) => {
  const generatedId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === generatedId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID found');
    });
});

// DELETE Route - specific note
notes.delete('/:id', (req, res) => {
  const generatedId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array notes other than the one with the ID provided in URL
      const result = json.filter((note) => note.id !== generatedId);

      // Save array to fs
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${generatedId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;