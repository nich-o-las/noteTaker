var express = require("express");
var app = express();
const fs = require("fs");
const PORT = 5000;

// serve the index file
const indexPath = __dirname + '/index.html'

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

// serve the notes file
const notesPath = __dirname + '/notes.html';

app.get("/notes", (req, res) => {
  res.sendFile(notesPath);
});

// serve the api

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  fs.appendFile('notes.txt', newNote, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

app.get('/api/notes', (req,res)=>{
  fs.readFile('notes.txt', (err, data)=>{
    if (err) throw err;
    res.send(data); 
  });
})

// Serve static assets 
app.use(express.static(__dirname + '/'))


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });