const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategoryBySlug,
} = require('../controllers/categoryController');

// GET /api/categories - Get all categories
router.get('/', getCategories);

// GET /api/categories/:slug - Get category by slug
router.get('/:slug', getCategoryBySlug);

module.exports = router;
