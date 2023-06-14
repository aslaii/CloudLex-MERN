// controllers/CategoriesController.js

const Categories = require("../models/Category"); // your category model

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Categories.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createCategory: async (req, res) => {
    const category = new Categories({ name: req.body.name });

    try {
      const newCategory = await category.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Categories.findById(req.params.id);
      if (category == null) {
        return res.status(404).json({ message: "Category not found" });
      }

      const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
      res.json(deletedCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
};
