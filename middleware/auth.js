const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please login first", 401));
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decodedData.id);
    
    next();
  } catch (error) {
    console.log(error);
  }
};