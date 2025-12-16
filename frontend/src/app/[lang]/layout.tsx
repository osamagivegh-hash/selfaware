import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, getDirection, languages } from '@/lib/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Language } from '@/types';
import styles from './layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
    params: { lang: string };
}

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
    params,
}: {
    params: { lang: string };
}): Promise<Metadata> {
    const lang = params.lang as Language;

    if (!languages.includes(lang)) {
        return {};
    }

    const dict = await getDictionary(lang);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://selfactual.com';

    return {
        title: {
            default: dict.meta.siteName,
            template: `%s | ${dict.meta.siteName}`,
        },
        description: dict.meta.siteDescription,
        alternates: {
            canonical: `${siteUrl}/${lang}`,
            languages: {
                'ar': `${siteUrl}/ar`,
                'en': `${siteUrl}/en`,
            },
        },
        openGraph: {
            title: dict.meta.siteName,
            description: dict.meta.siteDescription,
            url: `${siteUrl}/${lang}`,
            locale: lang === 'ar' ? 'ar_SA' : 'en_US',
        },
    };
}

export default async function LangLayout({ children, params }: LayoutProps) {
    const lang = params.lang as Language;

    // Validate language
    if (!languages.includes(lang)) {
        notFound();
    }

    const dict = await getDictionary(lang);
    const dir = getDirection(lang);

    return (
        <html lang={lang} dir={dir}>
            <body>
                <div className={styles.wrapper}>
                    <Header lang={lang} dict={dict} />
                    <main className={styles.main}>{children}</main>
                    <Footer lang={lang} dict={dict} />
                </div>
            </body>
        </html>
    );
}
