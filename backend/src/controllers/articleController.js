const Article = require('../models/Article');
const Category = require('../models/Category');

/**
 * Article Controller
 * Handles all article-related business logic
 */

// @desc    Get all published articles with pagination
// @route   GET /api/articles
// @access  Public
exports.getArticles = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50); // Max 50
        const skip = (page - 1) * limit;

        // Build query
        const query = { status: 'published' };

        // Filter by category
        if (req.query.category) {
            const category = await Category.findOne({ slug: req.query.category });
            if (category) {
                query.category = category._id;
            }
        }

        // Execute query
        const [articles, total] = await Promise.all([
            Article.find(query)
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('category', 'slug name')
                .populate('author', 'name bio image'),
            Article.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: articles,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get article by slug
// @route   GET /api/articles/slug/:slug
// @access  Public
exports.getArticleBySlug = async (req, res, next) => {
    try {
        const article = await Article.findOne({
            slug: req.params.slug,
            status: 'published',
        })
            .populate('category', 'slug name description')
            .populate('author', 'name bio image credentials');

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found',
            });
        }

        // Increment view count
        article.views += 1;
        await article.save();

        res.status(200).json({
            success: true,
            data: article,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get editor's picks
// @route   GET /api/articles/editors-picks
// @access  Public
exports.getEditorsPicks = async (req, res, next) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 3, 10);

        const articles = await Article.getEditorsPicks(limit);

        res.status(200).json({
            success: true,
            data: articles,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get latest articles
// @route   GET /api/articles/latest
// @access  Public
exports.getLatestArticles = async (req, res, next) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 6, 20);

        const articles = await Article.find({ status: 'published' })
            .sort({ publishedAt: -1 })
            .limit(limit)
            .populate('category', 'slug name')
            .populate('author', 'name bio image');

        res.status(200).json({
            success: true,
            data: articles,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get articles by category
// @route   GET /api/articles/category/:categorySlug
// @access  Public
exports.getArticlesByCategory = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
        const skip = (page - 1) * limit;

        // Find category
        const category = await Category.findOne({ slug: req.params.categorySlug });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        // Get articles
        const query = { category: category._id, status: 'published' };

        const [articles, total] = await Promise.all([
            Article.find(query)
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('category', 'slug name')
                .populate('author', 'name bio image'),
            Article.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: articles,
            category: category,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get related articles
// @route   GET /api/articles/:id/related
// @access  Public
exports.getRelatedArticles = async (req, res, next) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 3, 10);

        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found',
            });
        }

        // Find related articles (same category, different article)
        const related = await Article.find({
            _id: { $ne: article._id },
            category: article.category,
            status: 'published',
        })
            .sort({ publishedAt: -1 })
            .limit(limit)
            .populate('category', 'slug name')
            .populate('author', 'name bio image');

        res.status(200).json({
            success: true,
            data: related,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all article slugs (for SSG)
// @route   GET /api/articles/slugs
// @access  Public
exports.getAllSlugs = async (req, res, next) => {
    try {
        const articles = await Article.find({ status: 'published' })
            .select('slug updatedAt category')
            .populate('category', 'slug');

        const slugs = articles.map(article => ({
            slug: article.slug,
            category: article.category?.slug,
            updatedAt: article.updatedAt,
        }));

        res.status(200).json({
            success: true,
            data: slugs,
        });
    } catch (error) {
        next(error);
    }
};
