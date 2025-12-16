import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.icon}>✦</span>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>الصفحة غير موجودة | Page Not Found</h2>
                <p className={styles.description}>
                    عذراً، الصفحة التي تبحث عنها غير موجودة
                    <br />
                    Sorry, the page you are looking for does not exist
                </p>
                <div className={styles.actions}>
                    <Link href="/ar" className={styles.button}>
                        العودة للرئيسية (العربية)
                    </Link>
                    <Link href="/en" className={styles.buttonSecondary}>
                        Go Home (English)
                    </Link>
                </div>
            </div>
        </div>
    );
}
