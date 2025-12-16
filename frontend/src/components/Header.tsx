'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Language } from '@/types';
import { getOppositeLanguage, languageNames } from '@/lib/dictionaries';
import styles from './Header.module.css';

interface HeaderProps {
    lang: Language;
    dict: any;
}

export default function Header({ lang, dict }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const oppositeLanguage = getOppositeLanguage(lang);

    const getLocalizedPath = (targetLang: Language) => {
        const path = pathname.replace(`/${lang}`, `/${targetLang}`);
        return path || `/${targetLang}`;
    };

    const navLinks = [
        { href: `/${lang}`, label: dict.nav.home },
        { href: `/${lang}/awareness`, label: dict.nav.awareness },
        { href: `/${lang}/self-development`, label: dict.nav.selfDevelopment },
        { href: `/${lang}/about`, label: dict.nav.about },
        { href: `/${lang}/contact`, label: dict.nav.contact },
    ];

    const isActive = (href: string) => {
        if (href === `/${lang}`) {
            return pathname === `/${lang}` || pathname === `/${lang}/`;
        }
        return pathname.startsWith(href);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href={`/${lang}`} className={styles.logo}>
                    <span className={styles.logoIcon}>✦</span>
                    <span className={styles.logoText}>
                        {lang === 'ar' ? 'سيلف أكتشوال' : 'SelfActual'}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Actions */}
                <div className={styles.actions}>
                    {/* Language Switcher */}
                    <Link
                        href={getLocalizedPath(oppositeLanguage)}
                        className={styles.langSwitch}
                        title={`Switch to ${languageNames[oppositeLanguage]}`}
                    >
                        <span className={styles.langIcon}>🌐</span>
                        <span className={styles.langText}>{languageNames[oppositeLanguage]}</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
                <nav>
                    <ul className={styles.mobileNavList}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.active : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
