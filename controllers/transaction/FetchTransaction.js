const Transaction = require("../../models/Transaction");

/**
 * @description Route to fetch one transaction.
 * @type        GET
 * @route       /api/v1/transaction/fetch/:id
 * @access      Private
 *
 * @param       {String} userID
 * @param       {String} id - Transaction ID
 */
const FetchTransaction = async (req, res) => {
    try {
        const userID = req.auth;

        if (!userID) {
            return res.status(200).json({
                success: false,
                message: "Please enter the ID of user to be found.",
            });
        }

        const { id } = req.params;

        const transaction = await Transaction.findOne({
            userID,
            _id: id,
        });

        if (!transaction) {
            return res.status(200).json({
                success: false,
                message: "Transaction not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaction fetched successfully.",
            data: {
                transaction,
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

module.exports = FetchTransaction;
