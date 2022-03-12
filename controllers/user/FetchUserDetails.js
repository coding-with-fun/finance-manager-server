const User = require("../../models/User");

/**
 * @description Route to fetch user details.
 * @type        GET
 * @route       /api/v1/user
 * @access      Private
 *
 * @param       {String} userID
 */
const FetchUserDetails = async (req, res) => {
    try {
        const userID = req.auth;

        if (!userID) {
            return res.status(200).json({
                success: false,
                message: "Please enter the ID of user to be found.",
            });
        }

        const user = await User.findById(userID);

        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            data: {
                user,
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

module.exports = FetchUserDetails;
