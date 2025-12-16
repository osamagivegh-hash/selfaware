const Author = require('../models/Author');

/**
 * Author Controller
 * Handles all author-related business logic
 */

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
exports.getAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find({ isActive: true })
            .sort({ createdAt: -1 })
            .populate('articleCount');

        res.status(200).json({
            success: true,
            data: authors,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single author by ID
// @route   GET /api/authors/:id
// @access  Public
exports.getAuthorById = async (req, res, next) => {
    try {
        const author = await Author.findOne({
            _id: req.params.id,
            isActive: true,
        }).populate('articleCount');

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found',
            });
        }

        res.status(200).json({
            success: true,
            data: author,
        });
    } catch (error) {
        next(error);
    }
};
