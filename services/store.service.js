const Store = require("../models/Store");

exports.createStoreService = async (data) => {
    const result = await Store.create(data);
    return result;
}

exports.getStoreService = async () => {
    const result = await Store.find({});
    return result;
}