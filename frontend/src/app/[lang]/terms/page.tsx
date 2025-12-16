import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import type { Language } from '@/types';
import styles from '../privacy/page.module.css';

interface PageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return {
        title: dict.footer.terms,
        description: lang === 'ar'
            ? 'شروط استخدام موقع سيلف أكتشوال'
            : 'Terms of Use for SelfActual website',
    };
}

export default async function TermsPage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>{dict.footer.terms}</h1>
                <p className={styles.lastUpdated}>
                    {lang === 'ar' ? 'آخر تحديث: ديسمبر 2024' : 'Last updated: December 2024'}
                </p>

                <div className={styles.content}>
                    {lang === 'ar' ? (
                        <>
                            <section>
                                <h2>القبول بالشروط</h2>
                                <p>باستخدام موقع سيلف أكتشوال، فإنك توافق على هذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع.</p>
                            </section>

                            <section>
                                <h2>طبيعة المحتوى</h2>
                                <p>المحتوى المقدم على هذا الموقع تثقيفي وتوعوي فقط، وليس:</p>
                                <ul>
                                    <li>علاجاً نفسياً أو طبياً</li>
                                    <li>تشخيصاً لأي حالة صحية</li>
                                    <li>بديلاً عن الاستشارة المتخصصة</li>
                                </ul>
                            </section>

                            <section>
                                <h2>الاستخدام المقبول</h2>
                                <p>يجب عليك استخدام الموقع للأغراض المشروعة فقط. يُحظر:</p>
                                <ul>
                                    <li>نسخ أو إعادة نشر المحتوى دون إذن</li>
                                    <li>استخدام الموقع لأغراض تجارية دون موافقة</li>
                                    <li>محاولة اختراق أو الإضرار بالموقع</li>
                                </ul>
                            </section>

                            <section>
                                <h2>الملكية الفكرية</h2>
                                <p>جميع المحتويات على هذا الموقع محمية بموجب قوانين حقوق النشر والملكية الفكرية.</p>
                            </section>

                            <section>
                                <h2>إخلاء المسؤولية</h2>
                                <p>نقدم المحتوى "كما هو" دون أي ضمانات. لسنا مسؤولين عن أي قرارات تتخذها بناءً على محتوى الموقع.</p>
                            </section>

                            <section>
                                <h2>التعديلات</h2>
                                <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التحديثات على هذه الصفحة.</p>
                            </section>

                            <section>
                                <h2>التواصل</h2>
                                <p>لأي استفسارات حول هذه الشروط، تواصل معنا عبر: hello@selfactual.com</p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <h2>Acceptance of Terms</h2>
                                <p>By using SelfActual website, you agree to these terms. If you do not agree to any part of these terms, please do not use the site.</p>
                            </section>

                            <section>
                                <h2>Nature of Content</h2>
                                <p>The content provided on this website is educational and awareness-focused only, and is NOT:</p>
                                <ul>
                                    <li>Psychological or medical treatment</li>
                                    <li>Diagnosis of any health condition</li>
                                    <li>A substitute for professional consultation</li>
                                </ul>
                            </section>

                            <section>
                                <h2>Acceptable Use</h2>
                                <p>You must use the site for lawful purposes only. The following is prohibited:</p>
                                <ul>
                                    <li>Copying or republishing content without permission</li>
                                    <li>Using the site for commercial purposes without consent</li>
                                    <li>Attempting to hack or harm the site</li>
                                </ul>
                            </section>

                            <section>
                                <h2>Intellectual Property</h2>
                                <p>All content on this website is protected by copyright and intellectual property laws.</p>
                            </section>

                            <section>
                                <h2>Disclaimer</h2>
                                <p>We provide content "as is" without any warranties. We are not responsible for any decisions you make based on site content.</p>
                            </section>

                            <section>
                                <h2>Modifications</h2>
                                <p>We reserve the right to modify these terms at any time. Updates will be posted on this page.</p>
                            </section>

                            <section>
                                <h2>Contact</h2>
                                <p>For any questions about these terms, contact us at: hello@selfactual.com</p>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
