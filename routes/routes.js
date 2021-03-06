const express = require("express");
const authenticateToken = require("../middleware/auth");
const AuthRoute = require("./auth.routes");
const Transaction = require("./transaction.routes");
const TransactionSource = require("./transactionSource.routes");
const User = require("./user.routes");

/**
 * @description Index route.
 * @author      Harrsh Patel <dev@harrsh.com>
 * @route       /api/v1/*
 */
const routes = express();

routes.use("/auth", AuthRoute);
routes.use("/transaction", authenticateToken(), Transaction);
routes.use("/transaction-source", authenticateToken(), TransactionSource);
routes.use("/user", authenticateToken(), User);

module.exports = routes;
