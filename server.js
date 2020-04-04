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
