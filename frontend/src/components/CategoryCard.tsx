import Link from 'next/link';
import type { Language } from '@/types';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
    slug: string;
    title: string;
    description: string;
    lang: Language;
    icon?: string;
}

const defaultIcons: Record<string, string> = {
    'awareness': '🧠',
    'self-development': '🌱',
};

export default function CategoryCard({
    slug,
    title,
    description,
    lang,
    icon
}: CategoryCardProps) {
    const displayIcon = icon || defaultIcons[slug] || '✦';

    return (
        <Link href={`/${lang}/${slug}`} className={styles.card}>
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{displayIcon}</span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.arrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
