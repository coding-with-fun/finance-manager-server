const TransactionSource = require("../../models/TransactionSource");

/**
 * @description Route to fetch one transactionSource source.
 * @type        GET
 * @route       /api/v1/transaction-source/fetch/:id
 * @access      Private
 *
 * @param       {String} userID
 * @param       {String} id - Transaction source ID
 */
const FetchTransactionSource = async (req, res) => {
    try {
        const userID = req.auth;

        if (!userID) {
            return res.status(200).json({
                success: false,
                message: "Please enter the ID of user to be found.",
            });
        }

        const { id } = req.params;

        const transactionSource = await TransactionSource.findOne({
            userID,
            _id: id,
        });

        if (!transactionSource) {
            return res.status(200).json({
                success: false,
                message: "Transaction source not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaction source fetched successfully.",
            data: {
                transactionSource,
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

module.exports = FetchTransactionSource;
