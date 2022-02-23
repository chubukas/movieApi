const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const appSuccess = require("../utils/appSuccess");
const Movie = require("./moviesModel");
const getMovie = require("../utils/getMovie");

exports.search = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const {
    user: { userId },
  } = req;

  if (!title) return next(new AppError(" Title is needed ", 400));

  const movieData = await getMovie(title);

  const movie = await Movie.create({
    userId,
    Title: movieData.Title,
    Released: movieData.Released,
    Genre: movieData.Genre,
    Director: movieData.Director,
  });

  appSuccess(200, "Search successfully", res, movie);
});

exports.getAllmovies = catchAsync(async (req, res, next) => {
  // get all the business in the database
  let movies = await Movie.find({});

  if (!movies.length > 0)
    return next(new AppError("No movies in the platform", 404));

  // sends a successful message to the user
  appSuccess(200, "successful", res, movies);
});
