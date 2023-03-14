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

  // *** update with (increase) operation
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $inc: data },
  //   {
  //     runValidators: true,
  //   }
  // );

  //*** 2nd option for updating product data
  const product = await Product.findById(productId);
  const result = await product.set(data).save();

  return result;
};

// Multiple/bulk update

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  // multiple update with different value: using promise.all 
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);

  return result;
};
