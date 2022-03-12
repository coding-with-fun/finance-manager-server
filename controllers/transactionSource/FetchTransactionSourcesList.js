const TransactionSource = require("../../models/TransactionSource");

/**
 * @description Route to fetch transaction sources list.
 * @type        GET
 * @route       /api/v1/transaction-source/fetch
 * @access      Private
 *
 * @param       {String} userID
 * @param       {Number} [pageNumber=1]
 * @param       {Number} [perPage=10]
 * @param       {String} [sortField="_id"]
 * @param       {String} [sortType="asc"|"desc"]
 */
const FetchTransactionSourcesList = async (req, res) => {
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

        const transactionSourcesList = await TransactionSource.find({
            userID,
        })
            .sort({
                [sortField]: sortType,
            })
            .skip(pageNumber - 1)
            .limit(perPage);

        return res.status(200).json({
            success: true,
            message: "Transaction sources list fetched successfully.",
            data: {
                transactionSources: transactionSourcesList,
                pageNumber,
                perPage,
                sortField,
                sortType,
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

module.exports = FetchTransactionSourcesList;
