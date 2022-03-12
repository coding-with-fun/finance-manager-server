const TransactionSource = require("../../models/TransactionSource");
const User = require("../../models/User");

/**
 * @description Route to add new transaction source.
 * @type        POST
 * @route       /api/v1/transaction-source/add
 * @access      Private
 *
 * @param       {String} userID
 * @param       {String} name
 * @param       {Number} balance
 */
const AddTransactionSource = async (req, res) => {
    try {
        const userID = req.auth;

        const options = {
            new: true,
        };

        if (!userID) {
            return res.status(200).json({
                success: false,
                message: "Please enter the ID of user to be found.",
            });
        }

        const { name, balance, type } = req.body;

        const newTransactionSource = new TransactionSource({
            name,
            balance,
            type,
            userID,
        });
        await newTransactionSource.save();

        const existingUser = await User.findByIdAndUpdate(
            userID,
            {
                $push: {
                    transactionSources: newTransactionSource,
                },
            },
            options
        );

        if (!existingUser) {
            await TransactionSource.findByIdAndDelete(newTransactionSource);

            return res.status(200).json({
                success: false,
                message: "User not found. Please check credentials.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "New transaction source added successfully.",
            data: {
                transactionSource: newTransactionSource,
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

module.exports = AddTransactionSource;
