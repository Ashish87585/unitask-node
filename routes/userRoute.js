const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  viewProfile,
  getJoke
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);
router.route("/users/logout").get(logoutUser);
router.route("/users/profile/:id").get( isAuthenticatedUser, viewProfile);
router.route("/random-joke").get( isAuthenticatedUser, getJoke);

module.exports = router;