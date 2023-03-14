const Product = require("../models/Product");

exports.getProductsService = async (limit) => {
  const products = await Product.find({}).limit(+limit);
  return products;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductService = async (productId, data) => {
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $set: data },
  //   {
  //     runValidators: true,
  //   }
  // );

  // 2nd option for updating product data
  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};
