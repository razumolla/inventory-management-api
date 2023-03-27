const express = require('express');
const router = express.Router();

const storeController =require('../controllers/store.controller')
router
    .route('/')
    .get(storeController.getStore)
    .post(storeController.createStore);

router
    .route('/:id')
    .get(storeController.getStoreById)
    .patch(storeController.updateStoreById)

module.exports = router;