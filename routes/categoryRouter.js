const express = require('express');
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post("/create", categoryController.create);
router.get("/categories", categoryController.fetchAllCategories);
router.get("/:categoryId", categoryController.fetchCategoryByID);

module.exports = router;