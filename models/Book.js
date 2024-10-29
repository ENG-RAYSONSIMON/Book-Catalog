const mongoose = require("mongoose");

// DATABASE CONNECTION OPERATIONS
mongoose.connect("mongodb://localhost:27017/books-catalogDB");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
});

module.exports = mongoose.model("Book", bookSchema);
