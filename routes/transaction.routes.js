const express = require("express");
const AddTransaction = require("../controllers/transaction/AddTransaction");
const FetchTransaction = require("../controllers/transaction/FetchTransaction");
const FetchTransactionsList = require("../controllers/transaction/FetchTransactionsList");

/**
 * @description Routes for user authentication.
 * @author      Harrsh Patel <dev@harrsh.com>
 * @route       /api/v1/transaction/*
 */
const Transaction = express.Router();

Transaction.post("/add", AddTransaction);
Transaction.get("/fetch", FetchTransactionsList);
Transaction.get("/fetch/:id", FetchTransaction);

module.exports = Transaction;
