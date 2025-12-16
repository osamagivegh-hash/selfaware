import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import type { Language } from '@/types';
import styles from '../about/page.module.css';

interface PageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return {
        title: dict.nav.contact,
        description: lang === 'ar'
            ? 'تواصل معنا - نسعد بسماع آرائكم واقتراحاتكم'
            : 'Contact Us - We would love to hear your thoughts and suggestions',
    };
}

export default async function ContactPage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{dict.contact.title}</h1>
                    <p className={styles.subtitle}>{dict.contact.subtitle}</p>
                </div>
            </section>

            {/* Content */}
            <section className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.grid} style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {/* Contact Card */}
                        <div className={styles.card} style={{ gridColumn: 'span 2' }}>
                            <div className={styles.cardIcon}>📧</div>
                            <h2 className={styles.cardTitle}>
                                {lang === 'ar' ? 'راسلنا' : 'Email Us'}
                            </h2>
                            <p className={styles.cardText}>
                                {lang === 'ar'
                                    ? 'لأي استفسارات أو اقتراحات أو ملاحظات، يمكنك التواصل معنا عبر البريد الإلكتروني:'
                                    : 'For any inquiries, suggestions, or feedback, you can reach us via email:'}
                            </p>
                            <a
                                href="mailto:hello@selfactual.com"
                                style={{
                                    display: 'inline-block',
                                    marginTop: '1rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                                    color: 'white',
                                    borderRadius: 'var(--radius-full)',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                            >
                                hello@selfactual.com
                            </a>
                        </div>

                        {/* Response Time */}
                        <div className={styles.card}>
                            <div className={styles.cardIcon}>⏱️</div>
                            <h2 className={styles.cardTitle}>
                                {lang === 'ar' ? 'وقت الرد' : 'Response Time'}
                            </h2>
                            <p className={styles.cardText}>
                                {lang === 'ar'
                                    ? 'نحرص على الرد خلال 24-48 ساعة عمل'
                                    : 'We aim to respond within 24-48 business hours'}
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className={styles.card}>
                            <div className={styles.cardIcon}>🌐</div>
                            <h2 className={styles.cardTitle}>
                                {lang === 'ar' ? 'تابعنا' : 'Follow Us'}
                            </h2>
                            <p className={styles.cardText}>
                                {lang === 'ar'
                                    ? 'تابعنا على وسائل التواصل الاجتماعي للمزيد من المحتوى'
                                    : 'Follow us on social media for more content'}
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                <a href="#" aria-label="Twitter" style={{ color: 'var(--color-dark-gray)' }}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="LinkedIn" style={{ color: 'var(--color-dark-gray)' }}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div style={{
                        maxWidth: '600px',
                        margin: '3rem auto 0',
                        padding: '1.5rem',
                        background: 'rgba(212, 165, 116, 0.1)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                    }}>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-secondary-dark)', margin: 0 }}>
                            {lang === 'ar'
                                ? '⚠️ ملاحظة: سيلف أكتشوال منصة تثقيفية فقط. لا يمكننا تقديم استشارات نفسية أو علاج. إذا كنت بحاجة لمساعدة متخصصة، يرجى التواصل مع متخصص مرخص.'
                                : '⚠️ Note: SelfActual is an educational platform only. We cannot provide psychological counseling or treatment. If you need specialized help, please contact a licensed professional.'}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
