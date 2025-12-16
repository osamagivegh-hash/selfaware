const express = require('express');
const router = express.Router();
const {
    getAuthors,
    getAuthorById,
} = require('../controllers/authorController');

// GET /api/authors - Get all authors
router.get('/', getAuthors);

// GET /api/authors/:id - Get author by ID
router.get('/:id', getAuthorById);

module.exports = router;
