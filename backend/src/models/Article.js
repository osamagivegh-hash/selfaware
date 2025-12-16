const mongoose = require('mongoose');
const slugify = require('slugify');

/**
 * Article Schema
 * 
 * Design Decisions:
 * 1. Bilingual fields (ar/en) stored as nested objects for easy expansion
 * 2. Category and Author as references for data normalization
 * 3. Slug is unique and used for SEO-friendly URLs
 * 4. Status field allows for draft/published/archived workflows
 * 5. isEditorsPick for featured content on homepage
 * 6. Separate SEO fields for fine-tuned control over meta tags
 */

const ArticleSchema = new mongoose.Schema({
    // Bilingual title
    title: {
        ar: {
            type: String,
            required: [true, 'Arabic title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        en: {
            type: String,
            required: [true, 'English title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
    },

    // URL-friendly slug (unique across all articles)
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    // Short description for cards/previews
    excerpt: {
        ar: {
            type: String,
            required: [true, 'Arabic excerpt is required'],
            trim: true,
            maxlength: [500, 'Excerpt cannot exceed 500 characters'],
        },
        en: {
            type: String,
            required: [true, 'English excerpt is required'],
            trim: true,
            maxlength: [500, 'Excerpt cannot exceed 500 characters'],
        },
    },

    // Full article content (HTML supported)
    content: {
        ar: {
            type: String,
            required: [true, 'Arabic content is required'],
        },
        en: {
            type: String,
            required: [true, 'English content is required'],
        },
    },

    // Reference to Category
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required'],
        index: true,
    },

    // Reference to Author
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, 'Author is required'],
    },

    // Featured image URL (Cloudinary or similar)
    featuredImage: {
        type: String,
        trim: true,
    },

    // Tags for filtering and related content
    tags: [{
        type: String,
        trim: true,
        lowercase: true,
    }],

    // Article status
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
        index: true,
    },

    // Featured on homepage
    isEditorsPick: {
        type: Boolean,
        default: false,
        index: true,
    },

    // Estimated reading time in minutes
    readingTime: {
        ar: {
            type: Number,
            default: 5,
            min: 1,
        },
        en: {
            type: Number,
            default: 5,
            min: 1,
        },
    },

    // SEO metadata (allows different from title/excerpt)
    seo: {
        title: {
            ar: { type: String, trim: true },
            en: { type: String, trim: true },
        },
        description: {
            ar: { type: String, trim: true },
            en: { type: String, trim: true },
        },
        keywords: [{
            type: String,
            trim: true,
        }],
    },

    // Publication date (separate from createdAt)
    publishedAt: {
        type: Date,
        index: true,
    },

    // View count for analytics
    views: {
        type: Number,
        default: 0,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// ============================================
// Indexes for Performance
// ============================================

// Compound index for common queries
ArticleSchema.index({ status: 1, publishedAt: -1 });
ArticleSchema.index({ category: 1, status: 1, publishedAt: -1 });
ArticleSchema.index({ isEditorsPick: 1, status: 1, publishedAt: -1 });

// Text search index for both languages
ArticleSchema.index({
    'title.ar': 'text',
    'title.en': 'text',
    'content.ar': 'text',
    'content.en': 'text',
    tags: 'text',
});

// ============================================
// Pre-save Middleware
// ============================================

ArticleSchema.pre('save', function (next) {
    // Generate slug from English title if not provided
    if (!this.slug) {
        this.slug = slugify(this.title.en, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });
    }

    // Set publishedAt when status changes to published
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const calculateReadingTime = (text) => {
        if (!text) return 5;
        const wordCount = text.split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / 200));
    };

    if (this.isModified('content.ar')) {
        this.readingTime.ar = calculateReadingTime(this.content.ar);
    }
    if (this.isModified('content.en')) {
        this.readingTime.en = calculateReadingTime(this.content.en);
    }

    next();
});

// ============================================
// Static Methods
// ============================================

// Get published articles
ArticleSchema.statics.getPublished = function (query = {}) {
    return this.find({ ...query, status: 'published' })
        .sort({ publishedAt: -1 })
        .populate('category', 'slug name')
        .populate('author', 'name bio image');
};

// Get editor's picks
ArticleSchema.statics.getEditorsPicks = function (limit = 3) {
    return this.find({ status: 'published', isEditorsPick: true })
        .sort({ publishedAt: -1 })
        .limit(limit)
        .populate('category', 'slug name')
        .populate('author', 'name bio image');
};

module.exports = mongoose.model('Article', ArticleSchema);
