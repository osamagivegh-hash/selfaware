const validator = require('validator');

/**
 * Input Validation Middleware
 * Sanitizes and validates incoming request data
 */

// Sanitize string input
const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return validator.escape(validator.trim(str));
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

// Validate slug format
const isValidSlug = (slug) => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

// Middleware to validate article slug parameter
const validateSlug = (req, res, next) => {
    const { slug } = req.params;

    if (!slug || !isValidSlug(slug)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid slug format',
        });
    }

    req.params.slug = sanitizeString(slug);
    next();
};

// Middleware to validate ObjectId parameter
const validateObjectId = (paramName = 'id') => {
    return (req, res, next) => {
        const id = req.params[paramName];

        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid ${paramName} format`,
            });
        }

        next();
    };
};

// Middleware to validate pagination query params
const validatePagination = (req, res, next) => {
    let { page, limit } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (page && (isNaN(page) || page < 1)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid page number',
        });
    }

    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid limit (must be 1-100)',
        });
    }

    next();
};

module.exports = {
    sanitizeString,
    isValidObjectId,
    isValidSlug,
    validateSlug,
    validateObjectId,
    validatePagination,
};
