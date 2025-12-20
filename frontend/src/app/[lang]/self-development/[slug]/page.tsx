import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, formatDate } from '@/lib/dictionaries';
import api from '@/lib/api';
import type { Language, Article } from '@/types';
import styles from '../../awareness/[slug]/page.module.css';

// Force dynamic rendering to avoid build-time API timeout
export const dynamic = 'force-dynamic';

interface PageProps {
    params: { lang: string; slug: string };
}

// Fetch article from API
const getArticle = async (slug: string): Promise<Article | null> => {
    try {
        const response = await api.getArticleBySlug(slug);
        return response.data || null;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const article = await getArticle(params.slug);

    if (!article) return {};

    const title = article.title[lang];
    const description = article.excerpt[lang];

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
        },
    };
}

export default async function SelfDevelopmentArticlePage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);
    const article = await getArticle(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <article className={styles.article}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.container}>
                    <a href={`/${lang}/self-development`} className={styles.breadcrumb}>
                        ← {lang === 'ar' ? 'تطوير الذات' : 'Self Development'}
                    </a>
                    <h1 className={styles.title}>{article.title[lang]}</h1>
                    <div className={styles.meta}>
                        <span className={styles.author}>
                            {dict.article.writtenBy} {typeof article.author === 'object' ? article.author.name?.[lang] : 'SelfActual Team'}
                        </span>
                        <span className={styles.separator}>•</span>
                        <time dateTime={article.publishedAt || ''}>
                            {formatDate(article.publishedAt || new Date().toISOString(), lang)}
                        </time>
                        <span className={styles.separator}>•</span>
                        <span>
                            {article.readingTime?.[lang] || 5} {dict.sections.minuteRead}
                        </span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.container}>
                    <div
                        className={styles.articleContent}
                        dangerouslySetInnerHTML={{ __html: article.content[lang] }}
                    />
                </div>
            </div>

            {/* Disclaimer */}
            <div className={styles.disclaimer}>
                <div className={styles.container}>
                    <p>
                        {lang === 'ar'
                            ? '⚠️ هذا المحتوى تثقيفي فقط. النتائج تختلف من شخص لآخر. استمر في التجربة واكتشف ما يناسبك.'
                            : '⚠️ This content is educational only. Results vary from person to person. Keep experimenting and discover what works for you.'}
                    </p>
                </div>
            </div>
        </article>
    );
}

