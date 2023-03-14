const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
  updateProductService,
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
    const products = await getProductsService(req.query.limit); //Business Logic
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
    //  (create) or save
    // const result = await Product.create(req.body)
    const result = await createProductService(req.body);
    result.logger();

    // create or (save)
    //   const product = new Product(req.body)
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

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

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
