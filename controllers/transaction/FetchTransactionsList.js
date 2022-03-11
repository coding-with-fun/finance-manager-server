const Transaction = require("../../models/Transaction");

/**
 * @description Route to fetch transactions list.
 * @type        GET
 * @route       /api/v1/transaction/fetch
 * @access      Private
 *
 * @param       {String} userID
 * @param       {Number} [pageNumber=1]
 * @param       {Number} [perPage=10]
 * @param       {String} [sortField="_id"]
 * @param       {String} [sortType="asc"|"desc"]
 */
const FetchTransactionsList = async (req, res) => {
    try {
        const userID = req.auth;

        if (!userID) {
            return res.status(200).json({
                success: false,
                message: "Please enter the ID of user to be found.",
            });
        }

        const {
            pageNumber = 1,
            perPage = 10,
            sortField = "createdAt",
            sortType = "asc",
        } = req.query;

        const transactionsList = await Transaction.find({
            userID,
        })
            .sort({
                [sortField]: sortType,
            })
            .skip(pageNumber - 1)
            .limit(perPage);

        return res.status(200).json({
            success: true,
            message: "Transactions list fetched successfully.",
            data: {
                transactions: transactionsList,
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

module.exports = FetchTransactionsList;
