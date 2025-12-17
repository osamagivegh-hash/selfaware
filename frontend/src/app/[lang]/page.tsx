import { getDictionary } from '@/lib/dictionaries';
import HeroSlider from '@/components/HeroSlider';
import CategoryCard from '@/components/CategoryCard';
import ArticleCard from '@/components/ArticleCard';
import type { Language, Article } from '@/types';
import styles from './page.module.css';

interface PageProps {
    params: { lang: string };
}

// Sample data - in production, this would come from the API
const getSampleArticles = (lang: Language): Article[] => [
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

export default async function HomePage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    // Sample data - replace with API calls in production
    const articles = getSampleArticles(lang);
    const editorsPicks = articles.filter(a => a.isEditorsPick);

    const heroSlides = [
        {
            title: dict.hero.title,
            subtitle: dict.hero.subtitle,
        },
        {
            title: lang === 'ar' ? 'الوعي النفسي بداية التغيير' : 'Psychological Awareness is the Beginning of Change',
            subtitle: lang === 'ar' ? 'افهم نفسك لتفهم العالم من حولك' : 'Understand yourself to understand the world around you',
        },
        {
            title: lang === 'ar' ? 'طريقك نحو حياة أفضل' : 'Your Path to a Better Life',
            subtitle: lang === 'ar' ? 'خطوات عملية لتطوير الذات والنمو الشخصي' : 'Practical steps for self-development and personal growth',
        },
        {
            title: lang === 'ar' ? 'اكتشف قوتك الداخلية' : 'Discover Your Inner Strength',
            subtitle: lang === 'ar' ? 'كل منا يملك قوة خفية تنتظر الظهور' : 'Each of us has hidden strengths waiting to emerge',
        },
        {
            title: lang === 'ar' ? 'السلام الداخلي يبدأ هنا' : 'Inner Peace Starts Here',
            subtitle: lang === 'ar' ? 'تقنيات بسيطة لتحقيق الهدوء والتوازن' : 'Simple techniques to achieve calm and balance',
        },
    ];

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <HeroSlider
                slides={heroSlides}
                cta={dict.hero.cta}
                ctaLink={`#articles`}
            />

            {/* Mission Statement */}
            <section className={styles.mission}>
                <div className={styles.container}>
                    <div className={styles.missionContent}>
                        <h2 className={styles.missionTitle}>{dict.mission.title}</h2>
                        <p className={styles.missionText}>{dict.mission.text}</p>
                        <p className={styles.missionDisclaimer}>{dict.mission.disclaimer}</p>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className={styles.categories}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>{dict.sections.exploreCategories}</h2>
                    <div className={styles.categoriesGrid}>
                        <CategoryCard
                            slug="awareness"
                            title={dict.categories.awareness.title}
                            description={dict.categories.awareness.description}
                            lang={lang}
                            icon="🧠"
                        />
                        <CategoryCard
                            slug="self-development"
                            title={dict.categories.selfDevelopment.title}
                            description={dict.categories.selfDevelopment.description}
                            lang={lang}
                            icon="🌱"
                        />
                    </div>
                </div>
            </section>

            {/* Editor's Picks */}
            {editorsPicks.length > 0 && (
                <section className={styles.editorsPicks}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{dict.sections.editorsPicks}</h2>
                        <div className={styles.articlesGrid}>
                            {editorsPicks.map((article, index) => (
                                <ArticleCard
                                    key={article._id}
                                    article={article}
                                    lang={lang}
                                    dict={dict}
                                    featured={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Articles */}
            <section id="articles" className={styles.latestArticles}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>{dict.sections.latestArticles}</h2>
                    <div className={styles.articlesGrid}>
                        {articles.map((article) => (
                            <ArticleCard
                                key={article._id}
                                article={article}
                                lang={lang}
                                dict={dict}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
