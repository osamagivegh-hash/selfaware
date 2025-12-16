import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, formatDate } from '@/lib/dictionaries';
import type { Language } from '@/types';
import styles from '../../awareness/[slug]/page.module.css';

interface PageProps {
    params: { lang: string; slug: string };
}

// Generate static params for SSG
export async function generateStaticParams() {
    return [
        { lang: 'ar', slug: 'morning-habits-transform-life' },
        { lang: 'en', slug: 'morning-habits-transform-life' },
    ];
}

// Sample article data - replace with API call
const getArticle = async (slug: string, lang: Language) => {
    const articles: Record<string, any> = {
        'morning-habits-transform-life': {
            title: {
                ar: 'عادات صباحية تغير حياتك',
                en: 'Morning Habits That Transform Your Life',
            },
            excerpt: {
                ar: 'اكتشف مجموعة من العادات الصباحية البسيطة',
                en: 'Discover a set of simple morning habits',
            },
            content: {
                ar: `
          <h2>قوة الروتين الصباحي</h2>
          <p>كيف تبدأ يومك يحدد مسار يومك بأكمله. الروتين الصباحي الجيد يمكن أن يعزز طاقتك وتركيزك ومزاجك.</p>
          
          <h2>عادات بسيطة لتبدأ بها</h2>
          <ul>
            <li>استيقظ قبل الآخرين بساعة</li>
            <li>اشرب كوباً من الماء</li>
            <li>مارس التأمل لـ 5 دقائق</li>
            <li>اكتب 3 أشياء تشعر بالامتنان لها</li>
          </ul>
          
          <blockquote>الصباح هو بوابة اليوم. كيف تستقبله يحدد كيف تعيش يومك.</blockquote>
          
          <h2>ابدأ تدريجياً</h2>
          <p>لا تحاول تغيير كل شيء دفعة واحدة. ابدأ بعادة واحدة وأضف عادات جديدة تدريجياً كل أسبوع.</p>
        `,
                en: `
          <h2>The Power of Morning Routine</h2>
          <p>How you start your day determines the course of your entire day. A good morning routine can boost your energy, focus, and mood.</p>
          
          <h2>Simple Habits to Start With</h2>
          <ul>
            <li>Wake up an hour before others</li>
            <li>Drink a glass of water</li>
            <li>Practice meditation for 5 minutes</li>
            <li>Write down 3 things you are grateful for</li>
          </ul>
          
          <blockquote>The morning is the gateway to your day. How you greet it determines how you live it.</blockquote>
          
          <h2>Start Gradually</h2>
          <p>Don't try to change everything at once. Start with one habit and gradually add new ones each week.</p>
        `,
            },
            category: 'self-development',
            author: {
                name: { ar: 'فريق سيلف أكتشوال', en: 'SelfActual Team' },
                bio: { ar: 'فريق متخصص في المحتوى التثقيفي', en: 'Team specialized in educational content' },
            },
            readingTime: { ar: 6, en: 5 },
            publishedAt: '2024-12-14T10:00:00Z',
        },
    };

    return articles[slug] || null;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const article = await getArticle(params.slug, lang);

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
    const article = await getArticle(params.slug, lang);

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
                            {dict.article.writtenBy} {article.author.name[lang]}
                        </span>
                        <span className={styles.separator}>•</span>
                        <time dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt, lang)}
                        </time>
                        <span className={styles.separator}>•</span>
                        <span>
                            {article.readingTime[lang]} {dict.sections.minuteRead}
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
