const {
    createStoreService,
    getStoreService,
    getStoreByIdService,
    updateStoreByIdService
} = require("../services/store.service");

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
exports.getStore = async (req, res, next) => {
    try {
        const store = await getStoreService();

        res.status(200).json({
            message: "success",
            error: " successfully get store data",
            data: store
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: "can't get store data"
        });
    }
}

exports.getStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getStoreByIdService(id);

        res.status(200).json({
            message: "success",
            error: " successfully get store",
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: " can't get store by it ID "
        });
    }
}

exports.updateStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStoreByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "failed ",
                error: "Can't update the Store Info",
            });
        }
        res.status(200).json({
            message: "success",
            error: " successfully update Store",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: " can't update store data "
        });
    }
}