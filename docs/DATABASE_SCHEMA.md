# Database Schema Documentation

This document explains the MongoDB schema design for SelfActual.

---

## Schema Overview

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   Article     │────►│   Category    │     │    Author     │
│               │     │               │     │               │
│ - title (i18n)│     │ - slug        │◄────│ - name (i18n) │
│ - slug        │     │ - name (i18n) │     │ - bio (i18n)  │
│ - content     │     │ - description │     │ - credentials │
│ - category    │     │ - icon        │     │ - socialLinks │
│ - author      │────►│               │     │               │
│ - tags        │     └───────────────┘     └───────────────┘
│ - seo         │
│ - status      │
└───────────────┘
```

---

## Why This Design?

### 1. Bilingual Fields as Nested Objects

```javascript
title: {
  ar: "العنوان بالعربية",
  en: "Title in English"
}
```

**Rationale:**
- ✓ Single document contains all language versions
- ✓ Easy to add more languages later (e.g., `fr`, `de`)
- ✓ Atomic updates for all languages together
- ✓ No need for duplicate documents per language

**Alternative considered:** Separate collections per language (rejected due to sync complexity)

### 2. References for Category and Author

```javascript
category: { type: ObjectId, ref: 'Category' }
author: { type: ObjectId, ref: 'Author' }
```

**Rationale:**
- ✓ Normalized data (update once, reflects everywhere)
- ✓ Category/Author info can change without updating every article
- ✓ Efficient for queries like "all articles by author"
- ✓ Populate on demand for detail views

### 3. Separate SEO Fields

```javascript
seo: {
  title: { ar: "...", en: "..." },
  description: { ar: "...", en: "..." },
  keywords: ["..."]
}
```

**Rationale:**
- ✓ SEO metadata may differ from main title/excerpt
- ✓ Fine-grained control for search optimization
- ✓ Falls back to main title/excerpt if empty

### 4. Status Enum for Workflow

```javascript
status: { type: String, enum: ['draft', 'published', 'archived'] }
```

**Rationale:**
- ✓ Clear content lifecycle
- ✓ Draft: Work in progress, not public
- ✓ Published: Live on the site
- ✓ Archived: Removed from view but retained

---

## Collections

### 1. Article Collection

```javascript
{
  _id: ObjectId,
  
  // Bilingual content
  title: { ar: String, en: String },
  slug: String (unique),
  excerpt: { ar: String, en: String },
  content: { ar: String, en: String }, // HTML content
  
  // References
  category: ObjectId → Category,
  author: ObjectId → Author,
  
  // Metadata
  featuredImage: String (URL),
  tags: [String],
  status: "draft" | "published" | "archived",
  isEditorsPick: Boolean,
  readingTime: { ar: Number, en: Number },
  
  // SEO (optional, falls back to title/excerpt)
  seo: {
    title: { ar: String, en: String },
    description: { ar: String, en: String },
    keywords: [String]
  },
  
  // Timestamps
  publishedAt: Date,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `slug` (unique)
- `status + publishedAt` (compound for listing)
- `category + status + publishedAt` (compound for category pages)
- `isEditorsPick + status + publishedAt` (compound for editor picks)
- Text index on titles and content for search

### 2. Category Collection

```javascript
{
  _id: ObjectId,
  
  slug: String (unique, enum: ["awareness", "self-development"]),
  name: { ar: String, en: String },
  description: { ar: String, en: String },
  icon: String (emoji),
  order: Number,
  isActive: Boolean,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Notes:**
- Fixed categories for now (awareness, self-development)
- Can be extended to support subcategories later
- `order` field for display sorting
- Virtual `articleCount` for display

### 3. Author Collection

```javascript
{
  _id: ObjectId,
  
  name: { ar: String, en: String },
  bio: { ar: String, en: String },
  image: String (URL),
  credentials: { ar: String, en: String },
  
  socialLinks: {
    twitter: String,
    linkedin: String,
    website: String
  },
  
  email: String (private),
  isActive: Boolean,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Notes:**
- `credentials` field enhances content credibility
- Social links for author pages
- Email is private (not exposed in API)

---

## Handling Multilingual Content

### Query Strategy

When fetching articles, the API returns all language versions:

```javascript
// API returns:
{
  title: { ar: "...", en: "..." },
  content: { ar: "...", en: "..." }
}

// Frontend selects based on current language:
const title = article.title[currentLang];
```

### Benefits:
1. Single API call fetches all languages
2. Language can be switched without new API call
3. Easier caching and SSG
4. Consistent data structure

### Expansion to More Languages

Adding a new language (e.g., French) requires:

1. **No schema changes** - just add `fr` field
2. Update articles:
```javascript
article.title.fr = "Titre en français";
article.content.fr = "<h2>...</h2>";
```
3. Add frontend dictionary (`fr.json`)
4. Add language to routing

---

## Performance Considerations

### Indexing Strategy

| Query | Index |
|-------|-------|
| Get published articles | `{ status: 1, publishedAt: -1 }` |
| Get by category | `{ category: 1, status: 1, publishedAt: -1 }` |
| Get editor's picks | `{ isEditorsPick: 1, status: 1, publishedAt: -1 }` |
| Get by slug | `{ slug: 1 }` (unique) |
| Full-text search | Text index on titles/content |

### Caching Recommendations

| Endpoint | Cache Duration | Reason |
|----------|----------------|--------|
| `/articles/latest` | 5 minutes | Changes frequently |
| `/articles/slug/:slug` | 1 hour | Content changes rarely |
| `/categories` | 24 hours | Almost never changes |
| `/authors` | 24 hours | Changes rarely |

---

## Future Expansion Possibilities

### 1. User Accounts (Phase 2)
```javascript
// User collection for saved articles, preferences
{
  _id: ObjectId,
  email: String,
  savedArticles: [ObjectId → Article],
  preferredLanguage: "ar" | "en",
  preferences: { ... }
}
```

### 2. Comments (Phase 2)
```javascript
// Comment collection
{
  _id: ObjectId,
  article: ObjectId → Article,
  user: ObjectId → User,
  content: String,
  status: "pending" | "approved" | "rejected",
  createdAt: Date
}
```

### 3. Analytics (Phase 2)
```javascript
// PageView collection for detailed analytics
{
  _id: ObjectId,
  article: ObjectId → Article,
  timestamp: Date,
  language: "ar" | "en",
  device: "mobile" | "desktop",
  referrer: String
}
```

### 4. Newsletter (Phase 2)
```javascript
// Subscriber collection
{
  _id: ObjectId,
  email: String,
  preferredLanguage: "ar" | "en",
  subscribedAt: Date,
  isActive: Boolean
}
```

---

## Migration from Shared Cluster

Since MongoDB Atlas is shared with another project (Mawaddah):

### Best Practices:
1. **Use separate database name:** `selfactual` (not `mawaddah`)
2. **Prefix collections if needed:** `sa_articles`, `sa_categories`
3. **Separate database user** with specific database access
4. **Monitor storage** to stay within cluster limits

### Connection String:
```
mongodb+srv://[user]:[password]@mawaddah.lh79hv8.mongodb.net/selfactual
```

The `/selfactual` at the end specifies the database, keeping it separate from other databases in the cluster.
