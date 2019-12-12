var express = require("express");
var app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 5000;
// serve the index file
const indexPath = __dirname + '/index.html';

// serve the basic page
app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

// serve the notes file
const notesPath = __dirname + '/notes.html';

app.get("/notes", (req, res) => {
  res.sendFile(notesPath);
});

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// post api
let noteId = 0;
app.post("/api/notes", (req, res) => {
  const rawdata = fs.readFileSync('notes.json', 'utf8');
  const parsedata = JSON.parse(rawdata);
  const newObj = parsedata.concat(req.body);
  const string = JSON.stringify(newObj);
  fs.writeFile('notes.json', string, (err)=>{
    if(err) console.log(err);
    res.json(string);
  })
});

// get api
app.get('/api/notes', (req,res)=>{
  fs.readFile('notes.json','utf8', (err,jsonString)=>{
    if(err) {
      console.log(err);
      return
    };
    res.json(JSON.parse(jsonString))
  })
});

// delete api
app.delete('/api/notes/:title', (req,res)=>{
  const rawData = fs.readFileSync('notes.json', 'utf-8');
  const parseData = JSON.parse(rawData);
  const { title } = req.params;
  console.log(title)
  const newData = parseData.filter(o => o.title !== title);
  console.log(newData)
  fs.writeFile('notes.json', JSON.stringify(newData), (err)=>{
    if(err) console.log(err);
    res.json(newData);
  })
})

// Serve static assets 
app.use(express.static(__dirname + '/'))


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });