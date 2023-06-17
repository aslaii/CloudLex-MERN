// routes/categories.js

const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/categories");

// Routes related to categories
router.get("/categories", CategoriesController.getAllCategories);
router.post("/categories", CategoriesController.createCategory);
router.delete("/categories/:id", CategoriesController.deleteCategory);

module.exports = router;
