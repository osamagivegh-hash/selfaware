import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, formatDate } from '@/lib/dictionaries';
import api from '@/lib/api';
import type { Language, Article } from '@/types';
import styles from './page.module.css';

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

export default async function AwarenessArticlePage({ params }: PageProps) {
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
                    <a href={`/${lang}/awareness`} className={styles.breadcrumb}>
                        ← {lang === 'ar' ? 'الوعي النفسي' : 'Psychological Awareness'}
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
                            ? '⚠️ هذا المحتوى تثقيفي فقط ولا يُعد بديلاً عن الاستشارة النفسية المتخصصة. إذا كنت تعاني من مشاكل نفسية، يُرجى استشارة متخصص.'
                            : '⚠️ This content is educational only and is not a substitute for professional psychological consultation. If you are experiencing mental health issues, please consult a specialist.'}
                    </p>
                </div>
            </div>
        </article>
    );
}
