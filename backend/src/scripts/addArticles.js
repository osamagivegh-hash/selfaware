/**
 * Add 5 Additional Articles to Database
 * Run: node src/scripts/addArticles.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Article, Category, Author } = require('../models');

const MONGODB_URI = process.env.MONGODB_URI;

const newArticles = [
    {
        title: {
            ar: 'قوة التفكير الإيجابي: كيف تغير نظرتك للحياة',
            en: 'The Power of Positive Thinking: How to Change Your Life Perspective'
        },
        slug: 'power-of-positive-thinking',
        excerpt: {
            ar: 'اكتشف كيف يمكن للتفكير الإيجابي أن يحول تحدياتك إلى فرص ويفتح أبواباً جديدة في حياتك.',
            en: 'Discover how positive thinking can transform your challenges into opportunities and open new doors in your life.'
        },
        content: {
            ar: `<h2>ما هو التفكير الإيجابي؟</h2>
<p>التفكير الإيجابي ليس مجرد رؤية العالم بنظارات وردية، بل هو نهج واعٍ للتعامل مع الحياة يركز على الحلول بدلاً من المشاكل.</p>

<h2>فوائد التفكير الإيجابي</h2>
<ul>
<li>تحسين الصحة النفسية والجسدية</li>
<li>زيادة المرونة في مواجهة التحديات</li>
<li>تعزيز العلاقات الاجتماعية</li>
<li>تحسين الأداء في العمل والحياة</li>
</ul>

<h2>تقنيات لتنمية التفكير الإيجابي</h2>
<p>ابدأ يومك بالامتنان. اكتب ثلاثة أشياء تشعر بالامتنان لها كل صباح.</p>
<p>حول الأفكار السلبية. عندما تلاحظ فكرة سلبية، اسأل نفسك: ما الجانب الإيجابي في هذا الموقف؟</p>

<blockquote>تذكر: التفكير الإيجابي مهارة يمكن تعلمها وتطويرها مع الممارسة المستمرة.</blockquote>`,
            en: `<h2>What is Positive Thinking?</h2>
<p>Positive thinking isn't just seeing the world through rose-colored glasses. It's a conscious approach to life that focuses on solutions rather than problems.</p>

<h2>Benefits of Positive Thinking</h2>
<ul>
<li>Improved mental and physical health</li>
<li>Increased resilience in facing challenges</li>
<li>Enhanced social relationships</li>
<li>Better performance at work and in life</li>
</ul>

<h2>Techniques for Developing Positive Thinking</h2>
<p>Start your day with gratitude. Write three things you're grateful for every morning.</p>
<p>Transform negative thoughts. When you notice a negative thought, ask yourself: What's the positive aspect of this situation?</p>

<blockquote>Remember: Positive thinking is a skill that can be learned and developed with consistent practice.</blockquote>`
        },
        tags: ['positive-thinking', 'mindset', 'self-improvement'],
        status: 'published',
        isEditorsPick: true,
        readingTime: { ar: 7, en: 6 }
    },
    {
        title: {
            ar: 'فن الاستماع الفعال: مفتاح العلاقات الناجحة',
            en: 'The Art of Active Listening: Key to Successful Relationships'
        },
        slug: 'art-of-active-listening',
        excerpt: {
            ar: 'تعلم كيف تصبح مستمعاً أفضل وكيف يمكن لهذه المهارة أن تحول علاقاتك الشخصية والمهنية.',
            en: 'Learn how to become a better listener and how this skill can transform your personal and professional relationships.'
        },
        content: {
            ar: `<h2>لماذا الاستماع مهم؟</h2>
<p>في عالم مليء بالضوضاء والتشتت، أصبح الاستماع الحقيقي مهارة نادرة وقيمة. عندما نستمع بفعالية، نظهر للآخرين أننا نقدرهم ونحترم أفكارهم.</p>

<h2>مكونات الاستماع الفعال</h2>
<ul>
<li>التركيز الكامل على المتحدث</li>
<li>تجنب المقاطعة</li>
<li>طرح أسئلة توضيحية</li>
<li>إظهار التعاطف والتفهم</li>
</ul>

<h2>تمارين لتحسين مهارة الاستماع</h2>
<p>مارس الصمت الواعي لمدة 5 دقائق يومياً. هذا يساعدك على تطوير قدرتك على التركيز.</p>

<blockquote>أن تكون مستمعاً جيداً يعني أن تكون حاضراً بكل حواسك، لا فقط بأذنيك.</blockquote>`,
            en: `<h2>Why is Listening Important?</h2>
<p>In a world full of noise and distraction, true listening has become a rare and valuable skill. When we listen actively, we show others that we value and respect their thoughts.</p>

<h2>Components of Active Listening</h2>
<ul>
<li>Complete focus on the speaker</li>
<li>Avoiding interruption</li>
<li>Asking clarifying questions</li>
<li>Showing empathy and understanding</li>
</ul>

<h2>Exercises to Improve Listening Skills</h2>
<p>Practice conscious silence for 5 minutes daily. This helps develop your ability to focus.</p>

<blockquote>Being a good listener means being present with all your senses, not just your ears.</blockquote>`
        },
        tags: ['communication', 'relationships', 'skills'],
        status: 'published',
        isEditorsPick: false,
        readingTime: { ar: 8, en: 7 }
    },
    {
        title: {
            ar: 'التعامل مع الضغوط: استراتيجيات للحياة اليومية',
            en: 'Managing Stress: Strategies for Daily Life'
        },
        slug: 'managing-stress-strategies',
        excerpt: {
            ar: 'استراتيجيات عملية ومجربة للتعامل مع ضغوط الحياة اليومية والحفاظ على توازنك النفسي.',
            en: 'Practical and proven strategies for dealing with daily life pressures and maintaining your psychological balance.'
        },
        content: {
            ar: `<h2>فهم طبيعة الضغط</h2>
<p>الضغط جزء طبيعي من الحياة، لكن الطريقة التي نتعامل بها معه هي التي تحدد تأثيره علينا. لا يمكننا إزالة الضغوط تماماً، لكننا نستطيع تعلم كيفية إدارتها بفعالية.</p>

<h2>إشارات التحذير من الضغط المفرط</h2>
<ul>
<li>صعوبة في النوم</li>
<li>تغيرات في الشهية</li>
<li>صعوبة في التركيز</li>
<li>الشعور بالإرهاق المستمر</li>
</ul>

<h2>تقنيات للتخفيف من الضغط</h2>
<p>تنفس بعمق: خذ نفساً عميقاً لمدة 4 ثوانٍ، احبسه 4 ثوانٍ، ثم أخرجه ببطء.</p>
<p>تحرك: حتى المشي لمدة 10 دقائق يمكن أن يساعد في تخفيف التوتر.</p>

<blockquote>الراحة ليست كسلاً. إنها استثمار في صحتك وإنتاجيتك.</blockquote>`,
            en: `<h2>Understanding the Nature of Stress</h2>
<p>Stress is a natural part of life, but how we deal with it determines its impact on us. We cannot eliminate stress completely, but we can learn to manage it effectively.</p>

<h2>Warning Signs of Excessive Stress</h2>
<ul>
<li>Difficulty sleeping</li>
<li>Changes in appetite</li>
<li>Difficulty concentrating</li>
<li>Feeling constantly exhausted</li>
</ul>

<h2>Stress Relief Techniques</h2>
<p>Breathe deeply: Take a deep breath for 4 seconds, hold for 4 seconds, then exhale slowly.</p>
<p>Move: Even a 10-minute walk can help relieve tension.</p>

<blockquote>Rest is not laziness. It's an investment in your health and productivity.</blockquote>`
        },
        tags: ['stress', 'mental-health', 'self-care'],
        status: 'published',
        isEditorsPick: true,
        readingTime: { ar: 9, en: 8 }
    },
    {
        title: {
            ar: 'بناء الثقة بالنفس: رحلة من الداخل',
            en: 'Building Self-Confidence: A Journey from Within'
        },
        slug: 'building-self-confidence',
        excerpt: {
            ar: 'رحلة لاكتشاف مصادر الثقة الحقيقية بالنفس وكيفية تنميتها بطريقة صحية ومستدامة.',
            en: 'A journey to discover the true sources of self-confidence and how to develop it in a healthy and sustainable way.'
        },
        content: {
            ar: `<h2>ما هي الثقة بالنفس الحقيقية؟</h2>
<p>الثقة بالنفس ليست الغرور أو التظاهر بالكمال. إنها الإيمان الهادئ بقدراتك وقيمتك، مع القبول الكامل لنقاط ضعفك.</p>

<h2>أسس بناء الثقة بالنفس</h2>
<ul>
<li>معرفة نقاط قوتك والاحتفاء بها</li>
<li>قبول أخطائك كفرص للتعلم</li>
<li>تحديد أهداف واقعية وتحقيقها</li>
<li>الاهتمام بصحتك الجسدية والنفسية</li>
</ul>

<h2>خطوات عملية</h2>
<p>ابدأ بتحدٍ صغير: افعل شيئاً واحداً يخيفك قليلاً كل يوم. هذا يبني عضلة الشجاعة.</p>
<p>احتفِ بإنجازاتك: حتى الصغيرة منها. اكتبها في دفتر خاص.</p>

<blockquote>الثقة بالنفس لا تعني أنك لن تفشل أبداً. تعني أنك تعرف أنك ستنهض مجدداً.</blockquote>`,
            en: `<h2>What is True Self-Confidence?</h2>
<p>Self-confidence is not arrogance or pretending to be perfect. It's the quiet belief in your abilities and worth, with full acceptance of your weaknesses.</p>

<h2>Foundations of Building Self-Confidence</h2>
<ul>
<li>Knowing your strengths and celebrating them</li>
<li>Accepting your mistakes as learning opportunities</li>
<li>Setting realistic goals and achieving them</li>
<li>Taking care of your physical and mental health</li>
</ul>

<h2>Practical Steps</h2>
<p>Start with a small challenge: Do one thing that scares you a little every day. This builds the courage muscle.</p>
<p>Celebrate your achievements: Even the small ones. Write them in a special journal.</p>

<blockquote>Self-confidence doesn't mean you'll never fail. It means you know you'll rise again.</blockquote>`
        },
        tags: ['confidence', 'self-esteem', 'personal-growth'],
        status: 'published',
        isEditorsPick: false,
        readingTime: { ar: 8, en: 7 }
    },
    {
        title: {
            ar: 'الذكاء العاطفي: مهارة القرن الحادي والعشرين',
            en: 'Emotional Intelligence: The 21st Century Skill'
        },
        slug: 'emotional-intelligence-skill',
        excerpt: {
            ar: 'اكتشف أهمية الذكاء العاطفي في النجاح الشخصي والمهني وكيفية تطوير هذه المهارة الحيوية.',
            en: 'Discover the importance of emotional intelligence in personal and professional success and how to develop this vital skill.'
        },
        content: {
            ar: `<h2>ما هو الذكاء العاطفي؟</h2>
<p>الذكاء العاطفي هو القدرة على التعرف على مشاعرك ومشاعر الآخرين، وفهمها، وإدارتها بفعالية. إنه مهارة يمكن تعلمها وتطويرها.</p>

<h2>الركائز الخمس للذكاء العاطفي</h2>
<ul>
<li>الوعي الذاتي: معرفة مشاعرك وتأثيرها</li>
<li>التنظيم الذاتي: إدارة عواطفك بفعالية</li>
<li>الدافعية: الحماس للتعلم والتطور</li>
<li>التعاطف: فهم مشاعر الآخرين</li>
<li>المهارات الاجتماعية: بناء علاقات إيجابية</li>
</ul>

<h2>تطوير ذكائك العاطفي</h2>
<p>ابدأ بملاحظة مشاعرك دون حكم. اسأل نفسك: ما الذي أشعر به الآن؟ لماذا؟</p>
<p>تدرب على التعاطف: حاول رؤية المواقف من منظور الآخرين.</p>

<blockquote>الذكاء العاطفي ليس عكس الذكاء العقلي. إنهما متكاملان ويعملان معاً لتحقيق النجاح الحقيقي.</blockquote>`,
            en: `<h2>What is Emotional Intelligence?</h2>
<p>Emotional intelligence is the ability to recognize your emotions and those of others, understand them, and manage them effectively. It's a skill that can be learned and developed.</p>

<h2>The Five Pillars of Emotional Intelligence</h2>
<ul>
<li>Self-awareness: Knowing your feelings and their impact</li>
<li>Self-regulation: Managing your emotions effectively</li>
<li>Motivation: Enthusiasm for learning and growth</li>
<li>Empathy: Understanding others' feelings</li>
<li>Social skills: Building positive relationships</li>
</ul>

<h2>Developing Your Emotional Intelligence</h2>
<p>Start by observing your feelings without judgment. Ask yourself: What am I feeling right now? Why?</p>
<p>Practice empathy: Try to see situations from others' perspectives.</p>

<blockquote>Emotional intelligence is not the opposite of intellectual intelligence. They complement each other and work together for true success.</blockquote>`
        },
        tags: ['emotional-intelligence', 'eq', 'leadership'],
        status: 'published',
        isEditorsPick: true,
        readingTime: { ar: 10, en: 9 }
    }
];

async function addArticles() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get existing category and author
        const awarenessCategory = await Category.findOne({ slug: 'awareness' });
        const selfDevCategory = await Category.findOne({ slug: 'self-development' });
        const author = await Author.findOne();

        if (!awarenessCategory || !selfDevCategory || !author) {
            console.log('❌ Required data not found. Please run seed.js first.');
            process.exit(1);
        }

        // Add articles
        for (let i = 0; i < newArticles.length; i++) {
            const articleData = newArticles[i];

            // Alternate between categories
            const category = i % 2 === 0 ? awarenessCategory : selfDevCategory;

            const article = new Article({
                ...articleData,
                category: category._id,
                author: author._id,
                publishedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000) // Stagger dates
            });

            await article.save();
            console.log(`✅ Created article: ${articleData.title.en}`);
        }

        console.log('\n🎉 Successfully added 5 new articles!');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('📤 Disconnected from MongoDB');
    }
}

addArticles();
