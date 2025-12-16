import Link from 'next/link';
import type { Language } from '@/types';
import styles from './Footer.module.css';

interface FooterProps {
    lang: Language;
    dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: `/${lang}`, label: dict.nav.home },
        { href: `/${lang}/awareness`, label: dict.nav.awareness },
        { href: `/${lang}/self-development`, label: dict.nav.selfDevelopment },
        { href: `/${lang}/about`, label: dict.nav.about },
        { href: `/${lang}/contact`, label: dict.nav.contact },
    ];

    const legalLinks = [
        { href: `/${lang}/privacy`, label: dict.footer.privacy },
        { href: `/${lang}/disclaimer`, label: dict.footer.disclaimer },
        { href: `/${lang}/terms`, label: dict.footer.terms },
    ];

    return (
        <footer className={styles.footer}>
            {/* Main Footer */}
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* About Section */}
                    <div className={styles.section}>
                        <div className={styles.logo}>
                            <span className={styles.logoIcon}>✦</span>
                            <span className={styles.logoText}>
                                {lang === 'ar' ? 'سيلف أكتشوال' : 'SelfActual'}
                            </span>
                        </div>
                        <p className={styles.aboutText}>
                            {dict.footer.aboutText}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>{dict.footer.quickLinks}</h3>
                        <ul className={styles.linkList}>
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>{dict.footer.legal}</h3>
                        <ul className={styles.linkList}>
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>{dict.footer.contact}</h3>
                        <p className={styles.contactText}>
                            <a href="mailto:hello@selfactual.com" className={styles.contactLink}>
                                hello@selfactual.com
                            </a>
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className={styles.copyright}>
                <div className={styles.copyrightInner}>
                    <p>
                        © {currentYear} SelfActual. {dict.footer.copyright}
                    </p>
                    <p className={styles.madeWith}>{dict.footer.madeWith}</p>
                </div>
            </div>
        </footer>
    );
}
