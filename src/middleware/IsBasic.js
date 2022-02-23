const Movie = require("../movies/moviesModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports = catchAsync(async (req, res, next) => {
  try {
    const {
      user: { role, userId },
    } = req;

    const IsUser = await Movie.findOne({ userId: userId });

    if (!IsUser) {
      next();
    } else {
      if (role === "basic") {
        const d = new Date();
        let month = d.getMonth() + 1;

        const finduser = await Movie.find({
          from: { $eq: [{ $month: "$createdAt" }, month] },
          userId: userId,
        });

        if (finduser.length === 5)
          return next(
            new AppError(
              "You Can not create more than five movies per month, Please upgrade to premium",
              400
            )
          );

        next();
      } else {
        next();
      }
    }
  } catch (error) {
    return next(new AppError(error, 401));
  }
});
