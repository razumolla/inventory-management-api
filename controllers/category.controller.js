const {
    createCategoryService,
    getCategoryService,
    updateCategoryByIdService
} = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);

        res.status(200).json({
            message: "success",
            error: " successfully created category",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: "catagory can't created "
        });
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const category = await getCategoryService();

        res.status(200).json({
            message: "success",
            error: " successfully get category",
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: " can't get category data "
        });
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateCategoryByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "failed ",
                error: "Couldn't update the brand with this id",
            });
        }
        res.status(200).json({
            message: "success",
            error: " successfully update category",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error: " can't update category data "
        });
    }
}