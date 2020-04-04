const express = require("express");
const fs = require("fs");
const path = require("path");
const notesJSON = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// saving new notes in the db file and displaying them
app.post("/api/notes", function (req, res) {
  let noteList = notesJSON.length.toString();
  req.body.id = noteList;
  notesJSON.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(notesJSON));
  res.json(true);
});
// getting the routes for writing and pulling saved notes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes/", function (req, res) {
  res.json(notesJSON);
});
app.get("/api/notes/:id", function (req, res) {
  let saveNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(saveNote[Number(req.params.id)]);
});
// delete function for notes you don't want
app.delete("/api/notes/:id", function(req, res){
    let notesJSON = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let ID = req.params.id;
    let deltedID = 0;
    notesJSON = notesJSON.filter((current) => {
        return current.id !=ID;
    });
for (current of notesJSON) {
    current.id = deltedID.toString();
    deltedID++;
}
fs.writeFileSync("./db/db.json", JSON.stringify(notesJSON));
res.json(notesJSON);
});