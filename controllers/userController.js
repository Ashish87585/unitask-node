const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const axios = require("axios");

exports.registerUser = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;

    if (!email) return res.json({ message: "email is required" });
    if (!password) return res.json({ message: "password is required" });
    if (!username) return res.json({ message: "username is required" });

    const user = new User({
      email,
      password,
      username,
    });

    const userData = await user.save();

    sendToken(userData, 201, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(404).json({
        message: "password required",
      });
    }

    let user;
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email }).select("+password");

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
    } else {
      return res.status(404).json({
        message: "Please valid credentials",
      });
    }

    console.log(user);

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(404).json({
        message: "Password not match",
      });
    }

    sendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    await res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
};

exports.viewProfile = async (req, res) => {
  try {
    let userId = req.params.id;

    let user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      body: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
};

exports.getJoke = async (req, res) => {
  try {
    const jokes = await axios.get("https://api.chucknorris.io/jokes/random")

      res.status(200).json({
        success: true,
        body: jokes.data,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
};
