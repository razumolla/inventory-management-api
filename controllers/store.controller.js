const { createStoreService } = require("../services/store.service");

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body);

        res.status(200).json({
            message: "success",
            error: " successfully created store",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: "store can't created "
        });
    }
}