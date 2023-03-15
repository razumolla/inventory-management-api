const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

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
