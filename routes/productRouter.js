const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { validateToken, validateAdmin } = require('../middlewares/auth.middlewares/authorization.middleware');
const { validateAddOrUpdateProductRequest } = require('../middlewares/validation.middlewares/requestValidator');

router.post("/create", [validateToken, validateAdmin, validateAddOrUpdateProductRequest], productController.createProduct);
router.get("/productByName/:name", productController.fetchProuctsByName);
router.get("/productByCategoryId/:categoryId", productController.fetchProuctsByCategoryId);
router.get("/search", productController.search);
module.exports = router;