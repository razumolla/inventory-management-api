const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require('../middleware/uploader');// for file upload system

// router.post("/file-upload", uploader.single("image"), productController.fileUpload)
router.post("/file-upload", uploader.array("image"), productController.fileUpload)

//  <input type="file" name="avatar" /> 
// const formData = new FormData();
// formData.append("image", formData);

router.route("/bulk-update").patch(productController.bulkUpdateProduct); // multiple data update
router.route("/bulk-delete").delete(productController.bulkDeleteProduct); // multiple data delete

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
