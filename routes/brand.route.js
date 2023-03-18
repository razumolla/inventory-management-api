const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand.controller');


router
    .route('/')
    .post(brandController.createBrand)
    .get(brandController.getBrands);

    router.route("/:id")
      .get(brandController.getBrandById)
      .patch(brandController.updateBrand);

module.exports = router;