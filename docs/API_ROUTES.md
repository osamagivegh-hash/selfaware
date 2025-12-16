# API Routes Documentation

Base URL: `https://your-api-domain.com/api`

---

## Health Check

### GET /api/health
Check if the API is running.

**Response:**
```json
{
  "success": true,
  "message": "SelfActual API is running",
  "timestamp": "2024-12-17T10:00:00.000Z",
  "environment": "production"
}
```

---

## Articles

### GET /api/articles
Get all published articles with pagination.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page (max 50) |
| category | string | - | Filter by category slug |

**Example:** `GET /api/articles?page=1&limit=10&category=awareness`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": { "ar": "...", "en": "..." },
      "slug": "understanding-emotions-guide",
      "excerpt": { "ar": "...", "en": "..." },
      "category": { "_id": "...", "slug": "awareness", "name": {...} },
      "author": { "_id": "...", "name": {...}, "bio": {...} },
      "readingTime": { "ar": 8, "en": 7 },
      "publishedAt": "2024-12-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

### GET /api/articles/slug/:slug
Get a single article by its URL slug.

**Example:** `GET /api/articles/slug/understanding-emotions-guide`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": { "ar": "فهم مشاعرك", "en": "Understanding Your Emotions" },
    "slug": "understanding-emotions-guide",
    "excerpt": { "ar": "...", "en": "..." },
    "content": { "ar": "<h2>...</h2><p>...</p>", "en": "<h2>...</h2><p>...</p>" },
    "category": { "_id": "...", "slug": "awareness", "name": {...}, "description": {...} },
    "author": { "_id": "...", "name": {...}, "bio": {...}, "credentials": {...} },
    "featuredImage": "https://...",
    "tags": ["emotions", "awareness"],
    "readingTime": { "ar": 8, "en": 7 },
    "seo": {
      "title": { "ar": "...", "en": "..." },
      "description": { "ar": "...", "en": "..." },
      "keywords": ["emotions", "awareness"]
    },
    "publishedAt": "2024-12-15T10:00:00.000Z",
    "views": 150
  }
}
```

---

### GET /api/articles/editors-picks
Get featured articles marked as editor's picks.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 3 | Number of articles (max 10) |

**Example:** `GET /api/articles/editors-picks?limit=3`

---

### GET /api/articles/latest
Get the most recently published articles.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 6 | Number of articles (max 20) |

**Example:** `GET /api/articles/latest?limit=6`

---

### GET /api/articles/category/:categorySlug
Get all articles in a specific category.

**Example:** `GET /api/articles/category/self-development?page=1&limit=10`

**Response includes:**
- `data`: Array of articles
- `category`: Category details
- `pagination`: Pagination info

---

### GET /api/articles/:id/related
Get articles related to a specific article (same category).

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 3 | Number of articles (max 10) |

**Example:** `GET /api/articles/507f1f77bcf86cd799439011/related?limit=3`

---

### GET /api/articles/slugs
Get all article slugs (useful for SSG/sitemap generation).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "slug": "understanding-emotions-guide",
      "category": "awareness",
      "updatedAt": "2024-12-15T10:00:00.000Z"
    },
    {
      "slug": "morning-habits-transform-life",
      "category": "self-development",
      "updatedAt": "2024-12-14T10:00:00.000Z"
    }
  ]
}
```

---

## Categories

### GET /api/categories
Get all active categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "slug": "awareness",
      "name": { "ar": "الوعي النفسي", "en": "Psychological Awareness" },
      "description": { "ar": "...", "en": "..." },
      "icon": "🧠",
      "order": 1,
      "articleCount": 15
    },
    {
      "_id": "...",
      "slug": "self-development",
      "name": { "ar": "تطوير الذات", "en": "Self Development" },
      "description": { "ar": "...", "en": "..." },
      "icon": "🌱",
      "order": 2,
      "articleCount": 12
    }
  ]
}
```

---

### GET /api/categories/:slug
Get a single category by slug.

**Example:** `GET /api/categories/awareness`

---

## Authors

### GET /api/authors
Get all active authors.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": { "ar": "فريق سيلف أكتشوال", "en": "SelfActual Team" },
      "bio": { "ar": "...", "en": "..." },
      "image": "https://...",
      "credentials": { "ar": "...", "en": "..." },
      "socialLinks": {
        "twitter": "https://twitter.com/...",
        "linkedin": "https://linkedin.com/..."
      },
      "articleCount": 27
    }
  ]
}
```

---

### GET /api/authors/:id
Get a single author by ID.

**Example:** `GET /api/authors/507f1f77bcf86cd799439011`

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

---

## Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per IP per window
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Example Article JSON (for content creation)

```json
{
  "title": {
    "ar": "عنوان المقال بالعربية",
    "en": "Article Title in English"
  },
  "slug": "article-url-slug",
  "excerpt": {
    "ar": "مقتطف قصير من المقال بالعربية (حتى 500 حرف)",
    "en": "Short excerpt from the article in English (up to 500 characters)"
  },
  "content": {
    "ar": "<h2>العنوان الفرعي</h2><p>محتوى الفقرة...</p>",
    "en": "<h2>Subheading</h2><p>Paragraph content...</p>"
  },
  "category": "awareness",
  "tags": ["tag1", "tag2", "tag3"],
  "featuredImage": "https://cloudinary-url.com/image.jpg",
  "isEditorsPick": false,
  "seo": {
    "title": {
      "ar": "عنوان SEO مخصص (اختياري)",
      "en": "Custom SEO Title (optional)"
    },
    "description": {
      "ar": "وصف SEO مخصص (اختياري)",
      "en": "Custom SEO Description (optional)"
    },
    "keywords": ["keyword1", "keyword2"]
  }
}
```
