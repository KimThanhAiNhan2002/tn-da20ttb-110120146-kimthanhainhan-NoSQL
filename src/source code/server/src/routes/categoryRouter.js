const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categoryController');

// Route to create a new category
router.post('/', createCategory);

// Route to get all categories
router.get('/', getAllCategories);

// Route to get a specific category by ID
router.get('/:id', getCategoryById);

// Route to update a specific category by ID
router.put('/:id', updateCategoryById);

// Route to delete a specific category by ID
router.delete('/:id', deleteCategoryById);

module.exports = router;
