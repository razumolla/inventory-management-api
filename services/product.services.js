const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.getProductsService = async (filters, queries) => {
  // const products = await Product.find({}).limit(+limit);
  // const products = await Product.find(query)
  console.log( 'aa',filters, queries);
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, products };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);

  // step-1: _id, brand
  const { _id:productId, brand } = product;

  //step-2: update brand
  const res= await Brand.updateOne(
    { _id: brand.id },
    {$push: {products: productId}}
  )
  // console.log(res.modifiedCount);


  return product;
};

// Update product By id
exports.updateProductByIdService = async (productId, data) => {
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

// Multiple/bulk update by multiple id
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

// delete By id
exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

// Multiple/bulk delete products
exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({});

  return result;
};
