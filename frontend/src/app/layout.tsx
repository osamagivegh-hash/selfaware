import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
});

export const metadata: Metadata = {
    title: {
        default: 'SelfActual | سيلف أكتشوال - Psychological Awareness & Self Development',
        template: '%s | SelfActual',
    },
    description: 'An educational platform for psychological awareness and self-development. محتوى تثقيفي للوعي النفسي وتطوير الذات.',
    keywords: ['psychological awareness', 'self development', 'mental wellness', 'الوعي النفسي', 'تطوير الذات', 'الصحة النفسية'],
    authors: [{ name: 'SelfActual Team' }],
    creator: 'SelfActual',
    publisher: 'SelfActual',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'ar_SA',
        alternateLocale: 'en_US',
        siteName: 'SelfActual',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@selfactual',
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <head>
                {/* Google Fonts for Arabic */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={`${inter.variable} ${outfit.variable}`}>
                {children}
            </body>
        </html>
    );
}
