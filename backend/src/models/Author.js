const mongoose = require('mongoose');

/**
 * Author Schema
 * 
 * Design Decisions:
 * 1. Bilingual name and bio
 * 2. Credentials field for showing qualifications (educational content credibility)
 * 3. Social links for author profiles
 * 4. Active status for soft delete
 */

const AuthorSchema = new mongoose.Schema({
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

    // Bilingual bio
    bio: {
        ar: {
            type: String,
            trim: true,
            maxlength: [1000, 'Bio cannot exceed 1000 characters'],
        },
        en: {
            type: String,
            trim: true,
            maxlength: [1000, 'Bio cannot exceed 1000 characters'],
        },
    },

    // Profile image URL
    image: {
        type: String,
        trim: true,
    },

    // Credentials (for educational content credibility)
    credentials: {
        ar: {
            type: String,
            trim: true,
            maxlength: [200, 'Credentials cannot exceed 200 characters'],
        },
        en: {
            type: String,
            trim: true,
            maxlength: [200, 'Credentials cannot exceed 200 characters'],
        },
    },

    // Social links
    socialLinks: {
        twitter: {
            type: String,
            trim: true,
        },
        linkedin: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
    },

    // Email (not displayed publicly)
    email: {
        type: String,
        trim: true,
        lowercase: true,
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
AuthorSchema.virtual('articleCount', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'author',
    count: true,
});

module.exports = mongoose.model('Author', AuthorSchema);
