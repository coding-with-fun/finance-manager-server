const jwt = require("jsonwebtoken");

const User = require("../../models/User");

/**
 * @description Route for user Sign Up.
 * @author      Harrsh Patel <dev@harrsh.com>
 * @type        POST
 * @route       /api/v1/auth/signup
 * @access      Public
 *
 * @param       {String} username
 * @param       {String} firstName
 * @param       {String} lastName
 * @param       {String} email
 * @param       {String} password
 * @param       {String} confirmationPassword
 */
const UserSignUp = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [
                {
                    email,
                },
                {
                    username,
                },
            ],
        });

        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already exists.",
            });
        }

        let newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password,
        });
        await newUser.save();

        newUser = newUser.toJSON();
        delete newUser.salt;
        delete newUser.encryptedPassword;
        delete newUser.transactions;
        delete newUser.transactionSources;

        const token = jwt.sign(
            {
                _id: newUser._id,
            },
            process.env.SECRET
        );

        return res.status(200).json({
            success: true,
            message: "User signed up successfully.",
            data: {
                token,
                user: newUser,
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

module.exports = UserSignUp;
