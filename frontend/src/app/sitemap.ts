import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://selfactual.com';
    const currentDate = new Date();

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/contact',
        '/privacy',
        '/disclaimer',
        '/awareness',
        '/self-development',
    ];

    const staticRoutes: MetadataRoute.Sitemap = [];

    // Generate routes for both languages
    ['ar', 'en'].forEach((lang) => {
        staticPages.forEach((page) => {
            staticRoutes.push({
                url: `${baseUrl}/${lang}${page}`,
                lastModified: currentDate,
                changeFrequency: page === '' ? 'daily' : 'monthly',
                priority: page === '' ? 1.0 : 0.8,
            });
        });
    });

    // In production, you would fetch article slugs from the API
    // and add them here dynamically

    // Example article routes (replace with API data in production):
    const articleSlugs = [
        { slug: 'understanding-emotions-guide', category: 'awareness', updated: currentDate },
        { slug: 'morning-habits-transform-life', category: 'self-development', updated: currentDate },
        { slug: 'managing-daily-anxiety', category: 'awareness', updated: currentDate },
    ];

    const articleRoutes: MetadataRoute.Sitemap = [];

    ['ar', 'en'].forEach((lang) => {
        articleSlugs.forEach((article) => {
            articleRoutes.push({
                url: `${baseUrl}/${lang}/${article.category}/${article.slug}`,
                lastModified: article.updated,
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });
    });

    return [...staticRoutes, ...articleRoutes];
}
