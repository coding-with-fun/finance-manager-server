const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuid } = require("uuid");

const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },

        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        encryptedPassword: {
            type: String,
            trim: true,
            required: true,
        },

        salt: {
            type: String,
        },

        transactions: [
            {
                type: ObjectId,
                ref: "Transaction",
            },
        ],

        transactionSources: [
            {
                type: ObjectId,
                ref: "TransactionSource",
            },
        ],
    },
    {
        timestamps: true,
    }
);

UserSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuid();
        this.encryptedPassword = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    authenticate(plainPassword) {
        return this.securePassword(plainPassword) === this.encryptedPassword;
    },

    securePassword(plainPassword) {
        if (plainPassword) {
            try {
                return crypto
                    .createHmac("sha256", this.salt)
                    .update(plainPassword)
                    .digest("hex");
            } catch (error) {
                console.error("Error while hashing password!!");
                return "";
            }
        } else {
            console.error("No password found!!");
            return "";
        }
    },
};

module.exports = mongoose.model("User", UserSchema);
