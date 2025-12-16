import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import ArticleCard from '@/components/ArticleCard';
import type { Language, Article } from '@/types';
import styles from './page.module.css';

interface PageProps {
    params: { lang: string };
}

// Sample articles - replace with API call in production
const getAwarenessArticles = (lang: Language): Article[] => [
    {
        _id: '1',
        title: {
            ar: 'فهم مشاعرك: دليل للوعي العاطفي',
            en: 'Understanding Your Emotions: A Guide to Emotional Awareness',
        },
        slug: 'understanding-emotions-guide',
        excerpt: {
            ar: 'تعلم كيف تتعرف على مشاعرك وتفهمها بشكل أفضل لتحقيق توازن نفسي أفضل في حياتك اليومية.',
            en: 'Learn how to recognize and understand your emotions better to achieve a healthier psychological balance in your daily life.',
        },
        content: { ar: '', en: '' },
        category: { _id: 'c1', slug: 'awareness', name: { ar: 'الوعي النفسي', en: 'Psychological Awareness' }, description: { ar: '', en: '' }, createdAt: '', updatedAt: '' },
        author: 'a1',
        tags: ['emotions', 'awareness'],
        status: 'published',
        isEditorsPick: true,
        readingTime: { ar: 8, en: 7 },
        seo: { title: { ar: '', en: '' }, description: { ar: '', en: '' }, keywords: [] },
        publishedAt: '2024-12-15T10:00:00Z',
        createdAt: '2024-12-15T10:00:00Z',
        updatedAt: '2024-12-15T10:00:00Z',
    },
    {
        _id: '3',
        title: {
            ar: 'التعامل مع القلق في الحياة اليومية',
            en: 'Managing Anxiety in Daily Life',
        },
        slug: 'managing-daily-anxiety',
        excerpt: {
            ar: 'نصائح عملية للتعامل مع مشاعر القلق اليومية والحفاظ على هدوئك النفسي.',
            en: 'Practical tips for dealing with daily anxiety and maintaining your psychological calm.',
        },
        content: { ar: '', en: '' },
        category: { _id: 'c1', slug: 'awareness', name: { ar: 'الوعي النفسي', en: 'Psychological Awareness' }, description: { ar: '', en: '' }, createdAt: '', updatedAt: '' },
        author: 'a1',
        tags: ['anxiety', 'mental-health'],
        status: 'published',
        isEditorsPick: false,
        readingTime: { ar: 10, en: 9 },
        seo: { title: { ar: '', en: '' }, description: { ar: '', en: '' }, keywords: [] },
        publishedAt: '2024-12-13T10:00:00Z',
        createdAt: '2024-12-13T10:00:00Z',
        updatedAt: '2024-12-13T10:00:00Z',
    },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return {
        title: dict.categories.awareness.title,
        description: dict.categories.awareness.description,
    };
}

export default async function AwarenessCategoryPage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);
    const articles = getAwarenessArticles(lang);

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.container}>
                    <span className={styles.icon}>🧠</span>
                    <h1 className={styles.title}>{dict.categories.awareness.title}</h1>
                    <p className={styles.description}>{dict.categories.awareness.description}</p>
                </div>
            </header>

            {/* Articles Grid */}
            <section className={styles.articles}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {articles.map((article) => (
                            <ArticleCard
                                key={article._id}
                                article={article}
                                lang={lang}
                                dict={dict}
                            />
                        ))}
                    </div>

                    {articles.length === 0 && (
                        <div className={styles.empty}>
                            <p>
                                {lang === 'ar'
                                    ? 'لا توجد مقالات حالياً. ترقبوا المزيد قريباً!'
                                    : 'No articles available yet. Stay tuned for more!'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
