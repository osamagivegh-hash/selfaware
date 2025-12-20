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
        title: dict.footer.privacy,
        description: lang === 'ar'
            ? 'سياسة الخصوصية لموقع سيلف أكتشوال - كيف نحمي بياناتك ونحترم خصوصيتك'
            : 'Privacy Policy for SelfActual - How we protect your data and respect your privacy',
    };
}

export default async function PrivacyPage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>{dict.footer.privacy}</h1>
                <p className={styles.lastUpdated}>
                    {lang === 'ar' ? 'آخر تحديث: ديسمبر 2024' : 'Last updated: December 2024'}
                </p>

                <div className={styles.content}>
                    {lang === 'ar' ? (
                        <>
                            <section>
                                <h2>مقدمة</h2>
                                <p>نحن في سيلف أكتشوال نقدر خصوصيتك ونلتزم بحمايتها. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.</p>
                            </section>

                            <section>
                                <h2>المعلومات التي نجمعها</h2>
                                <p>نجمع فقط المعلومات الضرورية لتقديم خدماتنا:</p>
                                <ul>
                                    <li>معلومات التصفح الأساسية (نوع المتصفح، نوع الجهاز)</li>
                                    <li>الصفحات التي تزورها على موقعنا</li>
                                    <li>البريد الإلكتروني (إذا قمت بالتواصل معنا)</li>
                                </ul>
                            </section>

                            <section>
                                <h2>كيف نستخدم معلوماتك</h2>
                                <ul>
                                    <li>تحسين تجربة المستخدم على الموقع</li>
                                    <li>تحليل أداء الموقع</li>
                                    <li>الرد على استفساراتك</li>
                                </ul>
                            </section>

                            <section>
                                <h2>ملفات تعريف الارتباط (Cookies)</h2>
                                <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.</p>
                            </section>

                            <section>
                                <h2>مشاركة المعلومات</h2>
                                <p>لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة، إلا إذا كان ذلك ضرورياً لتقديم خدماتنا أو مطلوباً قانونياً.</p>
                            </section>

                            <section>
                                <h2>حقوقك</h2>
                                <p>لديك الحق في:</p>
                                <ul>
                                    <li>الوصول إلى بياناتك الشخصية</li>
                                    <li>طلب تصحيح بياناتك</li>
                                    <li>طلب حذف بياناتك</li>
                                    <li>الانسحاب من أي اتصالات تسويقية</li>
                                </ul>
                            </section>

                            <section>
                                <h2>تواصل معنا</h2>
                                <p>لأي استفسارات حول سياسة الخصوصية، يرجى التواصل معنا عبر: hello@selfactual.com</p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <h2>Introduction</h2>
                                <p>At SelfActual, we value your privacy and are committed to protecting it. This policy explains how we collect, use, and protect your personal information.</p>
                            </section>

                            <section>
                                <h2>Information We Collect</h2>
                                <p>We collect only the information necessary to provide our services:</p>
                                <ul>
                                    <li>Basic browsing information (browser type, device type)</li>
                                    <li>Pages you visit on our site</li>
                                    <li>Email address (if you contact us)</li>
                                </ul>
                            </section>

                            <section>
                                <h2>How We Use Your Information</h2>
                                <ul>
                                    <li>Improve user experience on the site</li>
                                    <li>Analyze site performance</li>
                                    <li>Respond to your inquiries</li>
                                </ul>
                            </section>

                            <section>
                                <h2>Cookies</h2>
                                <p>We use cookies to improve your experience. You can control cookie settings through your browser.</p>
                            </section>

                            <section>
                                <h2>Information Sharing</h2>
                                <p>We do not sell or share your personal information with third parties, except when necessary to provide our services or required by law.</p>
                            </section>

                            <section>
                                <h2>Your Rights</h2>
                                <p>You have the right to:</p>
                                <ul>
                                    <li>Access your personal data</li>
                                    <li>Request correction of your data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt out of any marketing communications</li>
                                </ul>
                            </section>

                            <section>
                                <h2>Contact Us</h2>
                                <p>For any questions about this privacy policy, please contact us at: hello@selfactual.com</p>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
