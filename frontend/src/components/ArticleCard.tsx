import Link from 'next/link';
import Image from 'next/image';
import type { Article, Language } from '@/types';
import { formatDate } from '@/lib/dictionaries';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
    article: Article;
    lang: Language;
    featured?: boolean;
    dict: any;
}

export default function ArticleCard({ article, lang, featured = false, dict }: ArticleCardProps) {
    const title = article.title[lang] || article.title.ar || article.title.en;
    const excerpt = article.excerpt[lang] || article.excerpt.ar || article.excerpt.en;
    const readingTime = article.readingTime[lang] || article.readingTime.ar || 5;

    const category = typeof article.category === 'object'
        ? article.category.slug
        : article.category;

    const categoryName = typeof article.category === 'object'
        ? article.category.name[lang]
        : category;

    const articleUrl = `/${lang}/${category}/${article.slug}`;

    return (
        <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
            {/* Image */}
            <Link href={articleUrl} className={styles.imageWrapper}>
                {article.featuredImage ? (
                    <Image
                        src={article.featuredImage}
                        alt={title}
                        fill
                        className={styles.image}
                        sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                    />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <span>✦</span>
                    </div>
                )}
                <div className={styles.imageOverlay} />
            </Link>

            {/* Content */}
            <div className={styles.content}>
                {/* Category Badge */}
                <Link
                    href={`/${lang}/${category}`}
                    className={styles.category}
                >
                    {categoryName}
                </Link>

                {/* Title */}
                <h3 className={styles.title}>
                    <Link href={articleUrl}>{title}</Link>
                </h3>

                {/* Excerpt */}
                <p className={styles.excerpt}>{excerpt}</p>

                {/* Meta */}
                <div className={styles.meta}>
                    {article.publishedAt && (
                        <time className={styles.date} dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt, lang)}
                        </time>
                    )}
                    <span className={styles.separator}>•</span>
                    <span className={styles.readTime}>
                        {readingTime} {dict.sections.minuteRead}
                    </span>
                </div>
            </div>
        </article>
    );
}
