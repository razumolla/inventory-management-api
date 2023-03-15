const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    // const products=await Product.find({ status:{ $ne: "out-of-stock"}}); //return all 'in-stock' pd
    // const products=await Product.find({ quantity:{ $gt: 100}}); // quantity>100
    // const products=await Product.find({ quantity:{ $gte: 100}}); // quantity >= 100
    // const products=await Product.find({ name:{ $in: ["Chal","Dhal"]}}); // return chal or dhal
    // const products=await Product.find({}, 'name quantity'); // all pd with only name and quantity
    // const products=await Product.find({}, '-name -quantity'); // without name and quantity
    // const products=await Product.find({}).limit(1);
    // const products=await Product.find({}).sort({ quantity: -1}); // 5,4,3,2,1
    // const products=await Product.find({}).select({name: 1}); // return only name with id

    // find data by chaining
    // const products=await Product
    //   .where("name").equals("Chal")
    //   .where("quantity").gt(100).lt(600)
    //   .limit(2).sort({ quantity: -1});

    //Get data-> findById
    //const products=await Product.findById("6405d8f345e836b74021a6e1")

    const queryObject = { ...req.query };
    // sort, page, limit -> exclude (when only needed only status field)
    const excludeFields = ["sort", "page", "limit"];

    excludeFields.forEach((field) => delete queryObject[field]);

    // console.log("original", req.query);
    // console.log("after query", queryObject);

    const products = await getProductsService(queryObject); //Business Logic
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "faild",
      message: "Can't get data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    //  (create:) or save
    // const result = await Product.create(req.body)
    const result = await createProductService(req.body);
    result.logger();

    // create or (save:)

    // const product = new Product(req.body)
    // instnce creation --> Do something --> save()
    // if(product.quantity ==0){
    // product.status= 'out-of-stock';
    // }
    // const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

// Update one product
exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Product update successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't update the product",
      error: error.message,
    });
  }
};

// Multiple/ bulk-update operations
exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Multiple Product update successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't update the product",
      error: error.message,
    });
  }
};

// delete single product By Id
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // check this id from databse by find operation
    const isProductExist = await Product.exists({ _id: id });
    if (!isProductExist) {
      return res.status(400).json({
        status: "failed",
        error: "Product does not exist",
      });
    }

    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failed",
        error: "Could't delete the product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product delete successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't delete the product",
      error: error.message,
    });
  }
};

// Multiple/bulk-delete operations
exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the given products",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't delete the given products",
      error: error.message,
    });
  }
};
