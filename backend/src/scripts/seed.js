require('dotenv').config();
const mongoose = require('mongoose');
const { Article, Category, Author } = require('../models');

/**
 * Database Seeding Script
 * 
 * Run with: npm run seed
 * 
 * This script populates the database with:
 * - 2 Categories (Awareness, Self-Development)
 * - 1 Default Author
 * - 3 Sample Articles
 */

const seedData = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data (BE CAREFUL in production!)
        if (process.env.NODE_ENV !== 'production') {
            await Article.deleteMany({});
            await Category.deleteMany({});
            await Author.deleteMany({});
            console.log('🗑️ Cleared existing data');
        }

        // Create Categories
        const categories = await Category.insertMany([
            {
                slug: 'awareness',
                name: {
                    ar: 'الوعي النفسي',
                    en: 'Psychological Awareness',
                },
                description: {
                    ar: 'مقالات تساعدك على فهم مشاعرك وأفكارك والتعامل معها بحكمة',
                    en: 'Articles to help you understand your emotions and thoughts, and handle them wisely',
                },
                icon: '🧠',
                order: 1,
            },
            {
                slug: 'self-development',
                name: {
                    ar: 'تطوير الذات',
                    en: 'Self Development',
                },
                description: {
                    ar: 'أدوات ونصائح عملية لتحسين حياتك الشخصية والمهنية',
                    en: 'Practical tools and tips to improve your personal and professional life',
                },
                icon: '🌱',
                order: 2,
            },
        ]);
        console.log('✅ Categories created');

        // Create Author
        const author = await Author.create({
            name: {
                ar: 'فريق سيلف أكتشوال',
                en: 'SelfActual Team',
            },
            bio: {
                ar: 'فريق متخصص في إنشاء محتوى تثقيفي موثوق حول الوعي النفسي وتطوير الذات',
                en: 'A team specialized in creating trusted educational content about psychological awareness and self-development',
            },
            credentials: {
                ar: 'كُتّاب ومحررون متخصصون في المحتوى التثقيفي',
                en: 'Writers and editors specialized in educational content',
            },
        });
        console.log('✅ Author created');

        // Create Sample Articles
        await Article.insertMany([
            {
                title: {
                    ar: 'فهم مشاعرك: دليل للوعي العاطفي',
                    en: 'Understanding Your Emotions: A Guide to Emotional Awareness',
                },
                slug: 'understanding-emotions-guide',
                excerpt: {
                    ar: 'تعلم كيف تتعرف على مشاعرك وتفهمها بشكل أفضل لتحقيق توازن نفسي أفضل في حياتك اليومية.',
                    en: 'Learn how to recognize and understand your emotions better to achieve a healthier psychological balance in your daily life.',
                },
                content: {
                    ar: '<h2>لماذا الوعي العاطفي مهم؟</h2><p>الوعي العاطفي هو القدرة على التعرف على مشاعرك وفهمها والتعبير عنها بطريقة صحية. هذه المهارة أساسية للصحة النفسية والعلاقات الجيدة.</p><h2>خطوات لتطوير وعيك العاطفي</h2><p>ابدأ بتخصيص وقت يومي للتأمل في مشاعرك. اسأل نفسك: ما الذي أشعر به الآن؟ لماذا أشعر بهذه الطريقة؟</p><blockquote>المشاعر ليست جيدة أو سيئة، إنها رسائل تخبرنا بشيء مهم عن أنفسنا واحتياجاتنا.</blockquote>',
                    en: '<h2>Why is Emotional Awareness Important?</h2><p>Emotional awareness is the ability to recognize, understand, and express your feelings in a healthy way. This skill is fundamental for mental health and good relationships.</p><h2>Steps to Develop Your Emotional Awareness</h2><p>Start by dedicating daily time to reflect on your feelings. Ask yourself: What am I feeling right now? Why am I feeling this way?</p><blockquote>Emotions are neither good nor bad - they are messages telling us something important about ourselves and our needs.</blockquote>',
                },
                category: categories[0]._id, // awareness
                author: author._id,
                tags: ['emotions', 'awareness', 'mental-health'],
                status: 'published',
                isEditorsPick: true,
                publishedAt: new Date('2024-12-15'),
            },
            {
                title: {
                    ar: 'عادات صباحية تغير حياتك',
                    en: 'Morning Habits That Transform Your Life',
                },
                slug: 'morning-habits-transform-life',
                excerpt: {
                    ar: 'اكتشف مجموعة من العادات الصباحية البسيطة التي يمكن أن تحدث فرقاً كبيراً في إنتاجيتك وسعادتك.',
                    en: 'Discover a set of simple morning habits that can make a big difference in your productivity and happiness.',
                },
                content: {
                    ar: '<h2>قوة الروتين الصباحي</h2><p>كيف تبدأ يومك يحدد مسار يومك بأكمله. الروتين الصباحي الجيد يمكن أن يعزز طاقتك وتركيزك ومزاجك.</p><h2>عادات بسيطة لتبدأ بها</h2><ul><li>استيقظ قبل الآخرين بساعة</li><li>اشرب كوباً من الماء</li><li>مارس التأمل لـ 5 دقائق</li><li>اكتب 3 أشياء تشعر بالامتنان لها</li></ul>',
                    en: '<h2>The Power of Morning Routine</h2><p>How you start your day determines the course of your entire day. A good morning routine can boost your energy, focus, and mood.</p><h2>Simple Habits to Start With</h2><ul><li>Wake up an hour before others</li><li>Drink a glass of water</li><li>Practice meditation for 5 minutes</li><li>Write down 3 things you are grateful for</li></ul>',
                },
                category: categories[1]._id, // self-development
                author: author._id,
                tags: ['habits', 'productivity', 'morning-routine'],
                status: 'published',
                isEditorsPick: true,
                publishedAt: new Date('2024-12-14'),
            },
            {
                title: {
                    ar: 'التعامل مع القلق في الحياة اليومية',
                    en: 'Managing Anxiety in Daily Life',
                },
                slug: 'managing-daily-anxiety',
                excerpt: {
                    ar: 'نصائح عملية للتعامل مع مشاعر القلق اليومية والحفاظ على هدوئك النفسي.',
                    en: 'Practical tips for dealing with daily anxiety and maintaining your psychological calm.',
                },
                content: {
                    ar: '<h2>فهم القلق</h2><p>القلق شعور طبيعي يختبره الجميع. لكن عندما يصبح مفرطاً، يمكن أن يؤثر على حياتنا اليومية.</p><h2>تقنيات للتهدئة</h2><ul><li>تمارين التنفس العميق</li><li>التأريض الحسي (5-4-3-2-1)</li><li>المشي في الطبيعة</li><li>الكتابة التعبيرية</li></ul><blockquote>تذكر: القلق ليس عدوك، إنه نظام إنذار يحاول حمايتك. تعلم أن تستمع إليه دون أن تدعه يتحكم بك.</blockquote>',
                    en: '<h2>Understanding Anxiety</h2><p>Anxiety is a natural feeling everyone experiences. But when it becomes excessive, it can affect our daily lives.</p><h2>Calming Techniques</h2><ul><li>Deep breathing exercises</li><li>Sensory grounding (5-4-3-2-1)</li><li>Walking in nature</li><li>Expressive writing</li></ul><blockquote>Remember: Anxiety is not your enemy - it is an alarm system trying to protect you. Learn to listen to it without letting it control you.</blockquote>',
                },
                category: categories[0]._id, // awareness
                author: author._id,
                tags: ['anxiety', 'mental-health', 'coping'],
                status: 'published',
                isEditorsPick: false,
                publishedAt: new Date('2024-12-13'),
            },
        ]);
        console.log('✅ Articles created');

        console.log('\n🎉 Database seeded successfully!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedData();
