const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
//  Protecting Routes
module.exports = catchAsync(async (req, res, next) => {
  // 1- get the token check if exist
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return next(new AppError("you are unauthorize to access this page", 401));

    // 2- validate the token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3- check user exits
    if (!decode) return next(new AppError("This user does not exists ", 401));
    req.user = decode;
    next();
  } catch (error) {
    return next(new AppError(error, 401));
  }
});
