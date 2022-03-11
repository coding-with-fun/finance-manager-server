const express = require("express");
const AddTransactionSource = require("../controllers/transactionSource/AddTransactionSource");
const DeleteTransactionSource = require("../controllers/transactionSource/DeleteTransactionSource");
const FetchTransactionSource = require("../controllers/transactionSource/FetchTransactionSource");
const FetchTransactionSourcesList = require("../controllers/transactionSource/FetchTransactionSourcesList");

/**
 * @description Routes for user authentication.
 * @author      Harrsh Patel <dev@harrsh.com>
 * @route       /api/v1/transaction-source/*
 */
const TransactionSource = express.Router();

TransactionSource.post("/add", AddTransactionSource);
TransactionSource.get("/fetch", FetchTransactionSourcesList);
TransactionSource.get("/fetch/:id", FetchTransactionSource);
TransactionSource.delete("/delete/:id", DeleteTransactionSource);

module.exports = TransactionSource;
