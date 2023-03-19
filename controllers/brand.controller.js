const { createBrandService, getBrandService, getBrandByIdService } = require("../services/brand.service")

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
            error: "can't create the brand"
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
            error: "can't create the brand"
        })
    }
}