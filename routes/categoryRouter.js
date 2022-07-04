const express = require('express');
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { validateAddOrUpdateCategoryRequest } = require('../requestValidator/requestValidator');

router.post("/create", validateAddOrUpdateCategoryRequest, categoryController.addCategory);
router.get("/categories", categoryController.fetchAllCategories);
router.get("/:categoryId", categoryController.fetchCategoryByID);
router.get("/categoryByName/:name", categoryController.fetchCategoryByName);
module.exports = router;