const Category = require("../models/Category")

exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
}