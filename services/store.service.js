const Store = require("../models/Store");

exports.createStoreService = async (data) => {
    const result = await Store.create(data);
    return result;
}

exports.getStoreService = async () => {
    const result = await Store.find({});
    return result;
}

exports.getStoreByIdService = async (id) => {
    const store = await Store.find({_id:id});
    return store;
}

exports.updateStoreByIdService = async (id, data) => {
    const result = await Store.updateOne({ _id: id }, data, {
        runValidators:true
    });
    return result;
}