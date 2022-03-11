const Transaction = require("../../models/Transaction");
const TransactionSource = require("../../models/TransactionSource");
const User = require("../../models/User");

/**
 * @description Route to add new transaction.
 * @type        POST
 * @route       /api/v1/transaction/add
 * @access      Private
 *
 * @param       {String} userID
 * @param       {Number} amount
 * @param       {String} type
 * @param       {String} description
 * @param       {String} transactionSource
 */
const AddTransaction = async (req, res) => {
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

        const { amount, type, description, transactionSourceID } = req.body;

        const transactionSource = await TransactionSource.findOne({
            _id: transactionSourceID,
            userID,
        });

        if (!transactionSource) {
            return res.status(200).json({
                success: false,
                message: "Transaction source not found.",
            });
        }

        const newTransaction = new Transaction({
            amount,
            type,
            description,
            transactionSource,
            userID,
        });
        await newTransaction.save();

        const existingUser = await User.findByIdAndUpdate(
            userID,
            {
                $push: {
                    transactions: newTransaction,
                },
            },
            options
        );

        if (!existingUser) {
            await Transaction.findByIdAndDelete(newTransaction);

            return res.status(200).json({
                success: false,
                message: "User not found. Please check credentials.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaction added successfully.",
            data: {
                transaction: newTransaction,
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

module.exports = AddTransaction;
