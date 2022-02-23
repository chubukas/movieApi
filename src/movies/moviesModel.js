const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: [true, "UserId is required"],
    },
    Title: {
      type: String,
      require: [true, "Title is required"],
    },
    Released: {
      type: Date,
    },
    Genre: {
      type: String,
    },
    Director: {
      type: String,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
