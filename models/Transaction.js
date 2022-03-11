const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const TransactionSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            trim: true,
            required: true,
        },

        type: {
            type: String,
            trim: true,
            required: true,
            enum: ["income", "expense"],
            default: "expense",
        },

        description: {
            type: String,
            trim: true,
        },

        transactionSource: {
            type: ObjectId,
            ref: "TransactionSource",
            required: true,
        },

        userID: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
