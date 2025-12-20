import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import type { Language } from '@/types';
import styles from './page.module.css';

// Force dynamic rendering to avoid build-time timeout
export const dynamic = 'force-dynamic';

interface PageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return {
        title: dict.nav.about,
        description: lang === 'ar'
            ? 'تعرف على سيلف أكتشوال - منصة تثقيفية للوعي النفسي وتطوير الذات'
            : 'Learn about SelfActual - An educational platform for psychological awareness and self-development',
    };
}

export default async function AboutPage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        {lang === 'ar' ? 'من نحن' : 'About Us'}
                    </h1>
                    <p className={styles.subtitle}>
                        {lang === 'ar'
                            ? 'نؤمن بأن الوعي النفسي حق للجميع'
                            : 'We believe psychological awareness is a right for everyone'}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Mission */}
                        <div className={styles.card}>
                            <div className={styles.cardIcon}>🎯</div>
                            <h2 className={styles.cardTitle}>
                                {lang === 'ar' ? 'رسالتنا' : 'Our Mission'}
                            </h2>
                            <p className={styles.cardText}>
                                {lang === 'ar'
                                    ? 'نسعى لنشر الوعي النفسي وتقديم محتوى تثقيفي موثوق يساعد الأفراد على فهم أنفسهم والآخرين بشكل أفضل، مما يؤدي لحياة أكثر توازناً وسعادة.'
                                    : 'We strive to spread psychological awareness and provide trusted educational content that helps individuals understand themselves and others better, leading to a more balanced and fulfilling life.'}
                            </p>
                        </div>

                        {/* Vision */}
                        <div className={styles.card}>
                            <div className={styles.cardIcon}>👁️</div>
                            <h2 className={styles.cardTitle}>
                                {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                            </h2>
                            <p className={styles.cardText}>
                                {lang === 'ar'
                                    ? 'عالم يمتلك فيه كل شخص الأدوات والمعرفة اللازمة لفهم صحته النفسية والعناية بها، دون وصمة أو خجل.'
                                    : 'A world where everyone has the tools and knowledge to understand and care for their mental health, without stigma or shame.'}
                            </p>
                        </div>

                        {/* Values */}
                        <div className={styles.card}>
                            <div className={styles.cardIcon}>💎</div>
                            <h2 className={styles.cardTitle}>
                                {lang === 'ar' ? 'قيمنا' : 'Our Values'}
                            </h2>
                            <ul className={styles.valuesList}>
                                <li>{lang === 'ar' ? 'الموثوقية: نقدم معلومات دقيقة ومدروسة' : 'Reliability: We provide accurate, researched information'}</li>
                                <li>{lang === 'ar' ? 'الإنسانية: نتحدث بلغة بشرية دافئة' : 'Humanity: We speak in warm, human language'}</li>
                                <li>{lang === 'ar' ? 'الشمولية: محتوانا للجميع' : 'Inclusivity: Our content is for everyone'}</li>
                                <li>{lang === 'ar' ? 'المسؤولية: نشجع على طلب المساعدة المتخصصة' : 'Responsibility: We encourage seeking professional help'}</li>
                            </ul>
                        </div>

                        {/* What We're Not */}
                        <div className={`${styles.card} ${styles.cardWarning}`}>
                            <div className={styles.cardIcon}>⚠️</div>
                            <h2 className={styles.cardTitle}>
                                {lang === 'ar' ? 'ملاحظة مهمة' : 'Important Note'}
                            </h2>
                            <p className={styles.cardText}>
                                {lang === 'ar'
                                    ? 'سيلف أكتشوال منصة تثقيفية فقط. نحن لا نقدم علاجاً نفسياً أو تشخيصاً طبياً. إذا كنت تعاني من مشاكل نفسية، يرجى استشارة متخصص مرخص.'
                                    : 'SelfActual is an educational platform only. We do not provide psychological treatment or medical diagnosis. If you are experiencing mental health issues, please consult a licensed specialist.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
