const jwt = require("jsonwebtoken");

const Transaction = require("../../models/Transaction");
const TransactionSource = require("../../models/TransactionSource");
const User = require("../../models/User");

/**
 * @description Route for user Sign In.
 * @author      Harrsh Patel <dev@harrsh.com>
 * @type        POST
 * @route       /api/v1/auth/signin
 * @access      Public
 *
 * @param       {String} email
 * @param       {String} password
 */
const UserSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        let existingUser = await User.findOne({
            email,
        });

        if (!existingUser || !existingUser.authenticate(password)) {
            return res.status(200).json({
                success: false,
                message: "User not found. Please check credentials.",
            });
        }

        existingUser = existingUser.toJSON();
        delete existingUser.salt;
        delete existingUser.encryptedPassword;
        delete existingUser.transactions;
        delete existingUser.transactionSources;

        const token = jwt.sign(
            {
                _id: existingUser._id,
            },
            process.env.SECRET
        );

        return res.status(200).json({
            success: true,
            message: "User signed in successfully.",
            data: {
                token,
                user: existingUser,
            },
        });
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = UserSignIn;
