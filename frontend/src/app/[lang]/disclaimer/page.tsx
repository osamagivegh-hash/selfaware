import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import type { Language } from '@/types';
import styles from '../privacy/page.module.css';

// Force dynamic rendering to avoid build-time timeout
export const dynamic = 'force-dynamic';

interface PageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return {
        title: dict.footer.disclaimer,
        description: lang === 'ar'
            ? 'إخلاء المسؤولية - المحتوى تثقيفي ولا يعد بديلاً عن الاستشارة المتخصصة'
            : 'Disclaimer - Content is educational and not a substitute for professional consultation',
    };
}

export default async function DisclaimerPage({ params }: PageProps) {
    const lang = params.lang as Language;
    const dict = await getDictionary(lang);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>{dict.footer.disclaimer}</h1>
                <p className={styles.lastUpdated}>
                    {lang === 'ar' ? 'آخر تحديث: ديسمبر 2024' : 'Last updated: December 2024'}
                </p>

                <div className={styles.content}>
                    {lang === 'ar' ? (
                        <>
                            <section>
                                <h2>طبيعة المحتوى</h2>
                                <p>المحتوى المقدم على موقع سيلف أكتشوال هو محتوى <strong>تثقيفي وتوعوي فقط</strong>. نهدف إلى نشر الوعي النفسي ومساعدتك في رحلة تطوير الذات من خلال مقالات ومعلومات مفيدة.</p>
                            </section>

                            <section>
                                <h2>ليس علاجاً نفسياً</h2>
                                <p>المحتوى المقدم هنا <strong>لا يُعد</strong>:</p>
                                <ul>
                                    <li>علاجاً نفسياً أو طبياً</li>
                                    <li>تشخيصاً لأي حالة نفسية أو صحية</li>
                                    <li>بديلاً عن الاستشارة المهنية المتخصصة</li>
                                    <li>نصيحة طبية أو نفسية فردية</li>
                                </ul>
                            </section>

                            <section>
                                <h2>متى تستشير متخصصاً</h2>
                                <p>إذا كنت تعاني من:</p>
                                <ul>
                                    <li>أعراض اكتئاب أو قلق شديدة</li>
                                    <li>أفكار إيذاء النفس</li>
                                    <li>صعوبات نفسية تؤثر على حياتك اليومية</li>
                                    <li>أي مشكلة صحية نفسية</li>
                                </ul>
                                <p><strong>يرجى استشارة طبيب نفسي أو معالج نفسي مرخص فوراً.</strong></p>
                            </section>

                            <section>
                                <h2>المسؤولية</h2>
                                <p>سيلف أكتشوال وفريقه لا يتحملون أي مسؤولية عن:</p>
                                <ul>
                                    <li>قرارات تتخذها بناءً على محتوى الموقع</li>
                                    <li>نتائج تطبيق المعلومات المقدمة</li>
                                    <li>تفسيرات خاطئة للمحتوى</li>
                                </ul>
                            </section>

                            <section>
                                <h2>دقة المعلومات</h2>
                                <p>نحرص على تقديم معلومات دقيقة ومحدثة، لكننا لا نضمن خلو المحتوى من الأخطاء. المعلومات المقدمة للأغراض التثقيفية العامة فقط.</p>
                            </section>

                            <section>
                                <h2>خط المساعدة</h2>
                                <p>إذا كنت في أزمة نفسية، يرجى التواصل مع خط مساعدة الصحة النفسية في بلدك أو التوجه لأقرب مركز طوارئ.</p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <h2>Nature of Content</h2>
                                <p>The content provided on SelfActual is <strong>educational and awareness-focused only</strong>. We aim to spread psychological awareness and help you on your self-development journey through helpful articles and information.</p>
                            </section>

                            <section>
                                <h2>Not Psychological Treatment</h2>
                                <p>The content provided here is <strong>NOT</strong>:</p>
                                <ul>
                                    <li>Psychological or medical treatment</li>
                                    <li>A diagnosis of any psychological or health condition</li>
                                    <li>A substitute for professional specialized consultation</li>
                                    <li>Individual medical or psychological advice</li>
                                </ul>
                            </section>

                            <section>
                                <h2>When to Consult a Professional</h2>
                                <p>If you are experiencing:</p>
                                <ul>
                                    <li>Severe depression or anxiety symptoms</li>
                                    <li>Thoughts of self-harm</li>
                                    <li>Psychological difficulties affecting your daily life</li>
                                    <li>Any mental health issue</li>
                                </ul>
                                <p><strong>Please consult a licensed psychiatrist or therapist immediately.</strong></p>
                            </section>

                            <section>
                                <h2>Liability</h2>
                                <p>SelfActual and its team are not responsible for:</p>
                                <ul>
                                    <li>Decisions you make based on site content</li>
                                    <li>Results of applying the information provided</li>
                                    <li>Misinterpretations of the content</li>
                                </ul>
                            </section>

                            <section>
                                <h2>Accuracy of Information</h2>
                                <p>We strive to provide accurate and up-to-date information, but we do not guarantee the content is error-free. Information is provided for general educational purposes only.</p>
                            </section>

                            <section>
                                <h2>Crisis Helpline</h2>
                                <p>If you are in a mental health crisis, please contact your country's mental health helpline or go to the nearest emergency center.</p>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
