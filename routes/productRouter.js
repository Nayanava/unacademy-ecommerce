const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { validateUserPermissions } = require('../middlewares/auth.middlewares/authorization.middleware');
const { validateAddOrUpdateProductRequest } = require('../middlewares/validation.middlewares/requestValidator');

router.post("/create", validateUserPermissions, validateAddOrUpdateProductRequest, productController.createProduct);
router.get("/productByName/:name", productController.fetchProuctsByName);
router.get("/productByCategoryId/:categoryId", productController.fetchProuctsByCategoryId);
router.get("/search", productController.search);
module.exports = router;