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

    // ================== For multiple search  query =====================
    // input query: http://localhost:5000/api/v1/product?status=out-of-stock&limit=1&page=3&sort=1

    let filters = { ...req.query };
    // sort, page, limit -> exclude (when only needed only status field)
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // ================== advance filtering with operators: using regex===============

    //Required: { price:{ $gt: 100}}
    //input search: http://localhost:5000/api/v1/product?price[gt]=180  clg:{ price: { gt: '180' } }
    // gt,lt, gte, lte, ne
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte|ne| in)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString); //then we get: { price: { '$lte': '180' } }

    // ------ Right use of filters: Query by sort or field or limit of -------
    const queries = {};
    if (req.query.sort) {
      // search query: sort=name,quantity --> output: sortBy: "name quantity"
      const sortBy = req.query.sort.split(",").join("  ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    //================7.7 Paigination: ========================
    // 50 product
    // each page 10 product
    // page 1--> 1-10
    // page 2--> 11-20
    // page 3--> 21-30   --> page 3 -> skip 1-20   -> skip kora lagbe =(3-1)= 2*10=20
    // page 4--> 31-40   --> page 4 -> skip 1-30
    // page 5--> 41-50
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query; // input page: "5", limit: "10"

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductsService(filters, queries); //Business Logic
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

// file upload
exports.fileUpload = async (req, res) => {
  try {
    // res.status(200).json(req.file); // for single image upload
    res.status(200).json(req.files); // for multiple image upload
  } catch (error) {
    
  }
}