const {
    createBrandService,
    getBrandService,
    getBrandByIdService,
    updateBrandByIdService
} = require("../services/brand.service")

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);

        res.status(200).json({
            status: "success",
            message: "Brand Create Successful",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "can't create the brand"
        })
    }
}

exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandService();

        res.status(200).json({
            status: "success",
            data: brands
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "can't get the brand"
        })
    }
}

exports.getBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await getBrandByIdService(id);

        if (!brand) {
            return res.status(400).json({
                status: "fail",
                error: "can't find a brand by this id"
            })
        }
        res.status(200).json({
            status: "success",
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "can't get the brand"
        })
    }
}

exports.updateBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateBrandByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "failed ",
                error: "Couldn't update the brand with this id",
            });
        }
        res.status(200).json({
            status: "successfully update the brand",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "can't update the brand"
        })
    }
}