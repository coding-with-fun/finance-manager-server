const express = require("express");
const FetchUserDetails = require("../controllers/user/FetchUserDetails");

/**
 * @description Routes for user authentication.
 * @author      Harrsh Patel <dev@harrsh.com>
 * @route       /api/v1/user/*
 */
const User = express.Router();

User.get("/", FetchUserDetails);

module.exports = User;
