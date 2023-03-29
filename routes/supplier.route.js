const express = require('express');
const router = express.Router();

const supplierController = require('../controllers/supplier.controller');


router
    .route('/')
    .post(supplierController.createSupplier)
    .get(supplierController.getSuppliers);

    router.route("/:id")
      .get(supplierController.getSupplierById)
      .patch(supplierController.updateSupplierById);

module.exports = router;