const express = require('express');
const router = express.Router();
const {
    getArticles,
    getArticleBySlug,
    getEditorsPicks,
    getLatestArticles,
    getArticlesByCategory,
    getRelatedArticles,
    getAllSlugs,
} = require('../controllers/articleController');

// Public routes

// GET /api/articles - Get all published articles with pagination
router.get('/', getArticles);

// GET /api/articles/editors-picks - Get editor's picks
router.get('/editors-picks', getEditorsPicks);

// GET /api/articles/latest - Get latest articles
router.get('/latest', getLatestArticles);

// GET /api/articles/slugs - Get all article slugs (for SSG)
router.get('/slugs', getAllSlugs);

// GET /api/articles/slug/:slug - Get article by slug
router.get('/slug/:slug', getArticleBySlug);

// GET /api/articles/category/:categorySlug - Get articles by category
router.get('/category/:categorySlug', getArticlesByCategory);

// GET /api/articles/:id/related - Get related articles
router.get('/:id/related', getRelatedArticles);

module.exports = router;
