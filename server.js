const express = require("express");
const fs = require("fs");
const path = require("path");
let notesJSON = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3000;
// funtion to randomise the db ids
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 + new Date().getTime | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// saving new notes in the db file and displaying them
app.post("/api/notes", function (req, res) {
  let noteList = notesJSON.length.toString();
  req.body.id = uuidv4();
  notesJSON.push(req.body);
  console.log(notesJSON);
  fs.writeFile("./db/db.json", JSON.stringify(notesJSON), () => {
    res.json(true);
  });
});
// getting the routes for writing and pulling saved notes
app.get("/api/notes/", function (req, res) {
  res.json(notesJSON);
});
app.get("/api/notes/:id", function (req, res) {
  let saveNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(saveNote[Number(req.params.id)]);
});
// delete function for notes you don't want
app.delete("/api/notes/:id", function (req, res) {
  let currentNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let ID = req.params.id;
  notesJSON = currentNotes.filter((current) => {
    return current.id != ID;
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(notesJSON));
  res.json(notesJSON);
});
// grabing the html file to display
app.use(express.static(__dirname + '/public', {extensions:["html","js","css"]}));
// listening for the server
app.listen(PORT, () => {
    console.log(`App is up on http://localhost:${PORT}`);
  });