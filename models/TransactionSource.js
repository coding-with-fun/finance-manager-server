const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const TransactionSourceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },

        balance: {
            type: Number,
            trim: true,
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

module.exports = mongoose.model("TransactionSource", TransactionSourceSchema);
