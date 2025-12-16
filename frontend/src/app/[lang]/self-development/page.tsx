import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import ArticleCard from '@/components/ArticleCard';
import type { Language, Article } from '@/types';
import styles from '../awareness/page.module.css';

interface PageProps {
    params: { lang: string };
}

// Sample articles - replace with API call in production
const getSelfDevArticles = (lang: Language): Article[] => [
    {
        _id: '2',
        title: {
            ar: 'عادات صباحية تغير حياتك',
            en: 'Morning Habits That Transform Your Life',
        },
        slug: 'morning-habits-transform-life',
        excerpt: {
            ar: 'اكتشف مجموعة من العادات الصباحية البسيطة التي يمكن أن تحدث فرقاً كبيراً في إنتاجيتك وسعادتك.',
            en: 'Discover a set of simple morning habits that can make a big difference in your productivity and happiness.',
        },
        content: { ar: '', en: '' },
        category: { _id: 'c2', slug: 'self-development', name: { ar: 'تطوير الذات', en: 'Self Development' }, description: { ar: '', en: '' }, createdAt: '', updatedAt: '' },
        author: 'a1',
        tags: ['habits', 'productivity'],
        status: 'published',
        isEditorsPick: true,
        readingTime: { ar: 6, en: 5 },
        seo: { title: { ar: '', en: '' }, description: { ar: '', en: '' }, keywords: [] },
        publishedAt: '2024-12-14T10:00:00Z',
        createdAt: '2024-12-14T10:00:00Z',
        updatedAt: '2024-12-14T10:00:00Z',
    },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return {
        title: dict.categories.selfDevelopment.title,
        description: dict.categories.selfDevelopment.description,
    };
}

export default async function SelfDevelopmentCategoryPage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);
    const articles = getSelfDevArticles(lang);

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.container}>
                    <span className={styles.icon}>🌱</span>
                    <h1 className={styles.title}>{dict.categories.selfDevelopment.title}</h1>
                    <p className={styles.description}>{dict.categories.selfDevelopment.description}</p>
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
