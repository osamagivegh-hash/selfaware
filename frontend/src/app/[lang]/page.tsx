import { getDictionary } from '@/lib/dictionaries';
import HeroSlider from '@/components/HeroSlider';
import CategoryCard from '@/components/CategoryCard';
import ArticleCard from '@/components/ArticleCard';
import api from '@/lib/api';
import type { Language, Article } from '@/types';
import styles from './page.module.css';

interface PageProps {
    params: { lang: string };
}

// Fetch articles from API
async function getArticles(): Promise<Article[]> {
    try {
        const response = await api.getArticles({ limit: 10 });
        return response.data || [];
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

// Fetch editor's picks from API
async function getEditorsPicks(): Promise<Article[]> {
    try {
        const response = await api.getEditorsPicks(4);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching editor picks:', error);
        return [];
    }
}

export default async function HomePage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    // Fetch real data from API
    const [articles, editorsPicks] = await Promise.all([
        getArticles(),
        getEditorsPicks()
    ]);

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
