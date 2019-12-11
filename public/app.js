var express = require("express");
var app = express();
const fs = require("fs");
const path = require("path");
const PORT = 5000;
// serve the index file
const indexPath = __dirname + '/index.html';

const notes = [];

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

// serve the notes file
const notesPath = __dirname + '/notes.html';

app.get("/notes", (req, res) => {
  res.sendFile(notesPath);
});

// serve the api
app.use(express.urlencoded({extended: true}));
app.post("/api/notes", (req, res) => {
  newNote = JSON.stringify(req.body);
  notes[notes.length] = newNote;
  console.log(notes);
  res.send('saved!')
});

app.get('/api/notes', (req,res)=>{
  res.send(notes);
});

// Serve static assets 
app.use(express.static(__dirname + '/'))


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });