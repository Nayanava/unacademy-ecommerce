const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { validateAddOrUpdateProductRequest } = require('../requestValidator/requestValidator');

router.post("/create", validateAddOrUpdateProductRequest, productController.createProduct);
router.get("/productByName/:name", productController.fetchProuctsByName);
router.get("/productByCategoryId/:categoryId", productController.fetchProuctsByCategoryId);
module.exports = router;