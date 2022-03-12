const mongoose = require("mongoose");
const { TransactionSourceTypes } = require("../utils/enum");

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

        type: {
            type: String,
            trim: true,
            required: true,
            enum: TransactionSourceTypes,
            default: TransactionSourceTypes[0],
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
