// Language types
export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

// Category types
export type CategorySlug = 'awareness' | 'self-development';

export interface Category {
    _id: string;
    slug: CategorySlug;
    name: {
        ar: string;
        en: string;
    };
    description: {
        ar: string;
        en: string;
    };
    icon?: string;
    createdAt: string;
    updatedAt: string;
}

// Author types
export interface Author {
    _id: string;
    name: {
        ar: string;
        en: string;
    };
    bio: {
        ar: string;
        en: string;
    };
    image?: string;
    credentials?: {
        ar: string;
        en: string;
    };
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
    createdAt: string;
    updatedAt: string;
}

// Article types
export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Article {
    _id: string;
    title: {
        ar: string;
        en: string;
    };
    slug: string;
    excerpt: {
        ar: string;
        en: string;
    };
    content: {
        ar: string;
        en: string;
    };
    category: Category | string;
    author: Author | string;
    featuredImage?: string;
    tags: string[];
    status: ArticleStatus;
    isEditorsPick: boolean;
    readingTime: {
        ar: number;
        en: number;
    };
    seo: {
        title: {
            ar: string;
            en: string;
        };
        description: {
            ar: string;
            en: string;
        };
        keywords: string[];
    };
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// Dictionary types for i18n
export interface Dictionary {
    meta: {
        siteName: string;
        siteDescription: string;
    };
    nav: {
        home: string;
        awareness: string;
        selfDevelopment: string;
        about: string;
        contact: string;
    };
    hero: {
        title: string;
        subtitle: string;
        cta: string;
    };
    sections: {
        editorsPicks: string;
        latestArticles: string;
        exploreCategories: string;
        readMore: string;
        minuteRead: string;
    };
    footer: {
        about: string;
        quickLinks: string;
        legal: string;
        privacy: string;
        disclaimer: string;
        terms: string;
        contact: string;
        copyright: string;
        madeWith: string;
    };
    article: {
        writtenBy: string;
        publishedOn: string;
        readingTime: string;
        shareArticle: string;
        relatedArticles: string;
        backToHome: string;
    };
    errors: {
        notFound: string;
        serverError: string;
        goHome: string;
    };
}

// Page props types
export interface PageParams {
    lang: Language;
}

export interface ArticlePageParams extends PageParams {
    slug: string;
}

// Component props
export interface LayoutProps {
    children: React.ReactNode;
    params: PageParams;
}
