import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, formatDate } from '@/lib/dictionaries';
import type { Language } from '@/types';
import styles from './page.module.css';

interface PageProps {
    params: { lang: string; slug: string };
}

// Generate static params for SSG
export async function generateStaticParams() {
    // In production, fetch all article slugs from API
    return [
        { lang: 'ar', slug: 'understanding-emotions-guide' },
        { lang: 'en', slug: 'understanding-emotions-guide' },
        { lang: 'ar', slug: 'managing-daily-anxiety' },
        { lang: 'en', slug: 'managing-daily-anxiety' },
    ];
}

// Sample article data - replace with API call
const getArticle = async (slug: string, lang: Language) => {
    // In production: return api.getArticleBySlug(slug);
    const articles: Record<string, any> = {
        'understanding-emotions-guide': {
            title: {
                ar: 'فهم مشاعرك: دليل للوعي العاطفي',
                en: 'Understanding Your Emotions: A Guide to Emotional Awareness',
            },
            excerpt: {
                ar: 'تعلم كيف تتعرف على مشاعرك وتفهمها بشكل أفضل',
                en: 'Learn how to recognize and understand your emotions better',
            },
            content: {
                ar: `
          <h2>لماذا الوعي العاطفي مهم؟</h2>
          <p>الوعي العاطفي هو القدرة على التعرف على مشاعرك وفهمها والتعبير عنها بطريقة صحية. هذه المهارة أساسية للصحة النفسية والعلاقات الجيدة.</p>
          
          <h2>خطوات لتطوير وعيك العاطفي</h2>
          <p>ابدأ بتخصيص وقت يومي للتأمل في مشاعرك. اسأل نفسك: ما الذي أشعر به الآن؟ لماذا أشعر بهذه الطريقة؟</p>
          
          <blockquote>المشاعر ليست جيدة أو سيئة، إنها رسائل تخبرنا بشيء مهم عن أنفسنا واحتياجاتنا.</blockquote>
          
          <h2>نصائح عملية</h2>
          <ul>
            <li>احتفظ بمذكرة للمشاعر</li>
            <li>تعلم أسماء المشاعر المختلفة</li>
            <li>لاحظ الأحاسيس الجسدية المرتبطة بالمشاعر</li>
            <li>تحدث عن مشاعرك مع شخص تثق به</li>
          </ul>
        `,
                en: `
          <h2>Why is Emotional Awareness Important?</h2>
          <p>Emotional awareness is the ability to recognize, understand, and express your feelings in a healthy way. This skill is fundamental for mental health and good relationships.</p>
          
          <h2>Steps to Develop Your Emotional Awareness</h2>
          <p>Start by dedicating daily time to reflect on your feelings. Ask yourself: What am I feeling right now? Why am I feeling this way?</p>
          
          <blockquote>Emotions are neither good nor bad - they are messages telling us something important about ourselves and our needs.</blockquote>
          
          <h2>Practical Tips</h2>
          <ul>
            <li>Keep an emotions journal</li>
            <li>Learn the names of different emotions</li>
            <li>Notice the physical sensations associated with emotions</li>
            <li>Talk about your feelings with someone you trust</li>
          </ul>
        `,
            },
            category: 'awareness',
            author: {
                name: { ar: 'فريق سيلف أكتشوال', en: 'SelfActual Team' },
                bio: { ar: 'فريق متخصص في المحتوى التثقيفي', en: 'Team specialized in educational content' },
            },
            readingTime: { ar: 8, en: 7 },
            publishedAt: '2024-12-15T10:00:00Z',
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

export default async function AwarenessArticlePage({ params }: PageProps) {
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
                    <a href={`/${lang}/awareness`} className={styles.breadcrumb}>
                        ← {lang === 'ar' ? 'الوعي النفسي' : 'Psychological Awareness'}
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
                            ? '⚠️ هذا المحتوى تثقيفي فقط ولا يُعد بديلاً عن الاستشارة النفسية المتخصصة. إذا كنت تعاني من مشاكل نفسية، يُرجى استشارة متخصص.'
                            : '⚠️ This content is educational only and is not a substitute for professional psychological consultation. If you are experiencing mental health issues, please consult a specialist.'}
                    </p>
                </div>
            </div>
        </article>
    );
}
