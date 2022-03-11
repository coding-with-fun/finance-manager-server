const express = require("express");
const UserSignIn = require("../controllers/auth/SignIn");
const UserSignUp = require("../controllers/auth/SignUp");

/**
 * @description Routes for user authentication.
 * @author      Harrsh Patel <dev@harrsh.com>
 * @route       /api/v1/auth/*
 */
const AuthRoute = express.Router();

AuthRoute.post("/signin", UserSignIn);
AuthRoute.post("/signup", UserSignUp);

module.exports = AuthRoute;
