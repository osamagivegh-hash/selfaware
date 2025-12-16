const mongoose = require('mongoose');

/**
 * Category Schema
 * 
 * Design Decisions:
 * 1. Fixed slugs (awareness, self-development) for predictable routing
 * 2. Bilingual name and description
 * 3. Icon field for UI display
 * 4. Simple structure - can be expanded with parent/child relationships later
 */

const CategorySchema = new mongoose.Schema({
    // URL-friendly identifier
    slug: {
        type: String,
        required: [true, 'Category slug is required'],
        unique: true,
        lowercase: true,
        trim: true,
        enum: ['awareness', 'self-development'], // Fixed categories for now
        index: true,
    },

    // Bilingual name
    name: {
        ar: {
            type: String,
            required: [true, 'Arabic name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        en: {
            type: String,
            required: [true, 'English name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
    },

    // Bilingual description
    description: {
        ar: {
            type: String,
            required: [true, 'Arabic description is required'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        en: {
            type: String,
            required: [true, 'English description is required'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
    },

    // Emoji or icon identifier
    icon: {
        type: String,
        default: '✦',
        trim: true,
    },

    // Display order
    order: {
        type: Number,
        default: 0,
    },

    // Active status
    isActive: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Virtual for article count
CategorySchema.virtual('articleCount', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'category',
    count: true,
});

module.exports = mongoose.model('Category', CategorySchema);
