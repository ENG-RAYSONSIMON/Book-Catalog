const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Book = require("./models/Book");

const app = express();

// middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", async function (req, res) {
  const books = await Book.find({});

  res.render("index", { books });
});

app.get("/add", async function (req, res) {
  res.render("add");
});

app.get("/edit/:id", async function (req, res) {
  const read = await Book.findById(req.params.id);
  res.render("edit", { read });
});

app.post("/add", async function (req, res) {
  const { title, author, genre } = req.body;
  await Book.create({ title, author, genre });
  res.redirect("/");
});
// Route to update book details
app.post("/edit/:id", async function (req, res) {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  await Book.findByIdAndUpdate(id, { title, author, genre });
  res.redirect("/");
});

//route to delete data
app.post("/delete/:id", async function (req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// SERVER ON PORT 3000
app.listen(3000, function () {
  console.log("Server is Running On localhost: 3000");
});
