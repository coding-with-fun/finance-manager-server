const TransactionSource = require("../../models/TransactionSource");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");

/**
 * @description Route to delete one transactionSource source.
 * @type        GET
 * @route       /api/v1/transaction-source/delete/:id
 * @access      Private
 *
 * @param       {String} userID
 * @param       {String} id - Transaction source ID
 */
const DeleteTransactionSource = async (req, res) => {
    try {
        const userID = req.auth;

        if (!userID) {
            return res.status(200).json({
                success: false,
                message: "Please enter the ID of user to be found.",
            });
        }

        const { id } = req.params;

        const transactionSource = await TransactionSource.findOneAndDelete({
            userID,
            _id: id,
        });

        if (!transactionSource) {
            return res.status(200).json({
                success: false,
                message: "Transaction source not found.",
            });
        }

        await User.findByIdAndUpdate(userID, {
            $pull: {
                transactionSources: id,
            },
        });

        await Transaction.deleteMany({
            transactionSource: id,
        });

        return res.status(200).json({
            success: true,
            message: "Transaction source deleted successfully.",
        });
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = DeleteTransactionSource;
