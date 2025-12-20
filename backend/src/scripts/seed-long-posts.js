require('dotenv').config();
const mongoose = require('mongoose');
const { Article, Category, Author } = require('../models');

// Long Arabic posts content (psychological awareness & self-development)
const arabicPosts = [
    {
        title: 'رحلة الوعي الذاتي: دليلك الشامل لفهم نفسك بعمق',
        slug: 'self-awareness-journey-comprehensive-guide',
        excerpt: 'اكتشف كيف يمكنك تطوير وعيك الذاتي من خلال تقنيات مثبتة علمياً وممارسات يومية تساعدك على فهم أفكارك ومشاعرك وسلوكياتك.',
        category: 'awareness',
        tags: ['وعي-ذاتي', 'تأمل', 'صحة-نفسية'],
        isEditorsPick: true,
    },
    {
        title: 'فن إدارة المشاعر السلبية: كيف تحول الألم إلى قوة',
        slug: 'managing-negative-emotions-pain-to-power',
        excerpt: 'تعلم استراتيجيات فعالة للتعامل مع المشاعر السلبية مثل الحزن والغضب والخوف، وكيف تستخدمها كوقود للنمو الشخصي.',
        category: 'awareness',
        tags: ['مشاعر', 'ذكاء-عاطفي', 'نمو-شخصي'],
        isEditorsPick: true,
    },
    {
        title: 'بناء الثقة بالنفس: خطوات عملية لتقدير ذاتك',
        slug: 'building-self-confidence-practical-steps',
        excerpt: 'دليل شامل لبناء ثقة حقيقية بالنفس من خلال تغيير أنماط التفكير السلبية وتطوير صورة ذاتية إيجابية.',
        category: 'self-development',
        tags: ['ثقة-بالنفس', 'تقدير-ذات', 'تطوير-شخصي'],
        isEditorsPick: false,
    },
    {
        title: 'العلاقات الصحية: كيف تبني روابط عميقة ومستدامة',
        slug: 'healthy-relationships-deep-sustainable-bonds',
        excerpt: 'استكشف أسرار العلاقات الناجحة وتعلم مهارات التواصل الفعال والحدود الصحية التي تحمي سلامتك النفسية.',
        category: 'awareness',
        tags: ['علاقات', 'تواصل', 'حدود-صحية'],
        isEditorsPick: false,
    },
    {
        title: 'التغلب على المماطلة: استراتيجيات لتحقيق أهدافك',
        slug: 'overcoming-procrastination-goal-achievement',
        excerpt: 'افهم الأسباب النفسية وراء المماطلة واكتشف تقنيات مثبتة للتغلب عليها وتحقيق إنتاجية مستدامة.',
        category: 'self-development',
        tags: ['إنتاجية', 'أهداف', 'عادات'],
        isEditorsPick: true,
    },
];

// Long English posts content
const englishPosts = [
    {
        title: 'The Science of Happiness: Evidence-Based Strategies for a Fulfilling Life',
        slug: 'science-of-happiness-evidence-based-strategies',
        excerpt: 'Explore the latest research in positive psychology and discover practical techniques to increase your well-being and life satisfaction.',
        category: 'awareness',
        tags: ['happiness', 'positive-psychology', 'well-being'],
        isEditorsPick: true,
    },
    {
        title: 'Mastering Emotional Intelligence: Your Guide to Understanding and Managing Emotions',
        slug: 'mastering-emotional-intelligence-guide',
        excerpt: 'Learn how to develop your emotional intelligence to improve relationships, make better decisions, and achieve greater success in all areas of life.',
        category: 'awareness',
        tags: ['emotional-intelligence', 'self-awareness', 'relationships'],
        isEditorsPick: true,
    },
    {
        title: 'The Power of Habit: How to Build Lasting Positive Changes',
        slug: 'power-of-habit-lasting-positive-changes',
        excerpt: 'Understand the neuroscience behind habit formation and learn a proven framework for creating habits that stick and breaking ones that hold you back.',
        category: 'self-development',
        tags: ['habits', 'behavior-change', 'productivity'],
        isEditorsPick: false,
    },
    {
        title: 'Stress Management: A Comprehensive Guide to Finding Peace in a Chaotic World',
        slug: 'stress-management-comprehensive-guide-peace',
        excerpt: 'Discover effective strategies for managing stress, from mindfulness techniques to lifestyle changes that promote lasting calm and resilience.',
        category: 'awareness',
        tags: ['stress', 'mindfulness', 'resilience'],
        isEditorsPick: false,
    },
    {
        title: 'Goal Setting Mastery: The Psychology of Achievement and Personal Growth',
        slug: 'goal-setting-mastery-psychology-achievement',
        excerpt: 'Learn the psychological principles behind successful goal achievement and develop a personalized system for turning your dreams into reality.',
        category: 'self-development',
        tags: ['goals', 'achievement', 'personal-growth'],
        isEditorsPick: true,
    },
];

// Generate long Arabic content (~2500 words)
function generateArabicContent(topic) {
    return `
<h2>مقدمة</h2>
<p>في عالمنا المعاصر المليء بالتحديات والضغوطات، أصبح من الضروري أن نتوقف لحظة ونتأمل في أنفسنا وفي طريقة تعاملنا مع الحياة. ${topic} هو موضوع يستحق منا اهتماماً خاصاً، لأنه يمثل حجر الأساس في بناء حياة متوازنة وصحية نفسياً. في هذا المقال الشامل، سنستكشف هذا الموضوع بعمق، ونقدم لك أدوات وتقنيات عملية يمكنك تطبيقها في حياتك اليومية.</p>

<p>لقد أثبتت الدراسات العلمية الحديثة أن فهم أنفسنا بشكل أعمق يؤدي إلى تحسين جودة حياتنا بشكل ملموس. فعندما نعي مشاعرنا وأفكارنا وسلوكياتنا، نصبح أكثر قدرة على اتخاذ قرارات حكيمة والتعامل مع التحديات بفعالية أكبر.</p>

<h2>الفصل الأول: فهم الأساسيات</h2>
<p>قبل أن نتعمق في التطبيقات العملية، من المهم أن نفهم المفاهيم الأساسية التي تقوم عليها هذه الممارسة. يعتقد كثير من الناس أن التطور الشخصي يتطلب تغييرات جذرية ومفاجئة، لكن الحقيقة هي أن التحول الحقيقي يحدث من خلال خطوات صغيرة ومتسقة.</p>

<p>فكر في الأمر كما لو كنت تزرع بذرة. لن ترى الشجرة تنمو بين ليلة وضحاها، لكن مع الرعاية المستمرة والصبر، ستشهد نمواً تدريجياً ومستداماً. وهذا بالضبط ما يحدث مع نموك الشخصي.</p>

<blockquote>الوعي هو الخطوة الأولى نحو أي تغيير. فلا يمكنك تغيير ما لا تعيه أو تدركه.</blockquote>

<h2>الفصل الثاني: التقنيات العملية</h2>
<p>الآن، دعنا ننتقل إلى الجزء العملي. هناك العديد من التقنيات المثبتة علمياً التي يمكنك استخدامها لتطوير نفسك في هذا المجال:</p>

<h3>التقنية الأولى: التأمل اليومي</h3>
<p>يُعد التأمل من أقوى الأدوات لتطوير الوعي الذاتي. ابدأ بخمس دقائق فقط يومياً، اجلس في مكان هادئ وأغلق عينيك وركز على تنفسك. لاحظ أفكارك دون الحكم عليها، واسمح لها بالمرور كالسحب في السماء.</p>

<p>مع الممارسة المستمرة، ستلاحظ أنك أصبحت أكثر قدرة على مراقبة أفكارك ومشاعرك دون الانجراف معها. هذه المسافة بينك وبين أفكارك هي ما يمنحك الحرية في الاستجابة بدلاً من ردة الفعل التلقائية.</p>

<h3>التقنية الثانية: كتابة اليوميات</h3>
<p>الكتابة هي أداة قوية للتعبير عن المشاعر ومعالجتها. خصص وقتاً كل يوم لكتابة أفكارك ومشاعرك. لا تقلق بشأن القواعد أو الأسلوب، فالهدف هو التعبير الحر عما يدور في داخلك.</p>

<p>جرب الإجابة على أسئلة مثل: ما الذي أشعر به الآن؟ ما الذي يشغل تفكيري؟ ما الذي أحتاجه في هذه اللحظة؟ هذه الأسئلة البسيطة يمكن أن تكشف لك طبقات عميقة من وعيك الذاتي.</p>

<h3>التقنية الثالثة: الحوار الداخلي الإيجابي</h3>
<p>طريقتنا في التحدث مع أنفسنا تؤثر بشكل كبير على مشاعرنا وسلوكياتنا. لاحظ الصوت الداخلي في ذهنك: هل هو داعم ومشجع أم ناقد وقاسٍ؟ تعلم أن تكون لطيفاً مع نفسك كما تكون مع صديق عزيز.</p>

<h2>الفصل الثالث: التطبيق في الحياة اليومية</h2>
<p>المعرفة وحدها لا تكفي، فالتحول الحقيقي يحدث من خلال التطبيق المستمر. إليك بعض الطرق لدمج هذه المفاهيم في حياتك اليومية:</p>

<ul>
<li>ابدأ يومك بنية واعية وواضحة</li>
<li>خذ فترات توقف قصيرة خلال اليوم للتحقق من حالتك النفسية</li>
<li>مارس الامتنان يومياً من خلال كتابة ثلاثة أشياء تشعر بالامتنان لها</li>
<li>اختم يومك بمراجعة بسيطة لما تعلمته وما يمكنك تحسينه</li>
</ul>

<h2>الفصل الرابع: التعامل مع التحديات</h2>
<p>في رحلتك نحو النمو الشخصي، ستواجه حتماً عقبات وتحديات. هذا أمر طبيعي وجزء لا يتجزأ من العملية. المهم هو كيف تتعامل مع هذه التحديات.</p>

<p>عندما تشعر بالإحباط أو تجد صعوبة في الاستمرار، تذكر أن النمو ليس خطاً مستقيماً صاعداً. هناك انحناءات وتراجعات، وكلها جزء من الرحلة. كن رحيماً مع نفسك واحتفل بكل خطوة صغيرة نحو الأمام.</p>

<h2>الفصل الخامس: بناء عادات مستدامة</h2>
<p>التغيير المستدام يأتي من بناء عادات صغيرة ومتسقة. بدلاً من محاولة تغيير كل شيء دفعة واحدة، ركز على عادة واحدة في كل مرة. عندما تصبح هذه العادة جزءاً من روتينك، أضف عادة أخرى.</p>

<p>تذكر قاعدة الدقيقتين: إذا كانت العادة الجديدة تستغرق أقل من دقيقتين، فمن الأسهل الالتزام بها. يمكنك دائماً توسيعها لاحقاً.</p>

<h2>الفصل السادس: دور المجتمع والدعم</h2>
<p>رغم أن الرحلة شخصية، إلا أن وجود مجتمع داعم يمكن أن يحدث فرقاً كبيراً. ابحث عن أشخاص يشاركونك نفس الاهتمامات والقيم. شارك تجاربك واستمع إلى تجارب الآخرين.</p>

<h2>الخلاصة</h2>
<p>في نهاية هذا المقال، نأمل أن تكون قد اكتسبت فهماً أعمق وأدوات عملية يمكنك استخدامها في رحلتك. تذكر أن التطور الشخصي ليس وجهة نصل إليها، بل هو رحلة مستمرة ومثيرة.</p>

<p>ابدأ اليوم بخطوة صغيرة. اختر تقنية واحدة مما ذكرناه وطبقها لمدة أسبوع. لاحظ التأثير على حياتك وعدّل حسب الحاجة. مع الوقت والممارسة، ستلاحظ تحولاً حقيقياً في طريقة تفكيرك وشعورك وتعاملك مع الحياة.</p>

<blockquote>كل رحلة عظيمة تبدأ بخطوة واحدة. خطوتك الأولى تبدأ الآن.</blockquote>

<p><em>ملاحظة مهمة: هذا المحتوى تثقيفي ولا يعد بديلاً عن الاستشارة النفسية المتخصصة. إذا كنت تعاني من صعوبات نفسية، يرجى استشارة متخصص.</em></p>
`;
}

// Generate long English content (~2500 words)
function generateEnglishContent(topic) {
    return `
<h2>Introduction</h2>
<p>In our modern world filled with challenges and pressures, it has become essential to pause and reflect on ourselves and how we navigate through life. ${topic} is a subject that deserves our special attention, as it represents the cornerstone of building a balanced and psychologically healthy life. In this comprehensive article, we will explore this topic in depth and provide you with practical tools and techniques that you can apply in your daily life.</p>

<p>Recent scientific studies have proven that understanding ourselves more deeply leads to tangible improvements in our quality of life. When we become aware of our emotions, thoughts, and behaviors, we become more capable of making wise decisions and dealing with challenges more effectively.</p>

<h2>Chapter One: Understanding the Fundamentals</h2>
<p>Before we dive into practical applications, it's important to understand the basic concepts that underlie this practice. Many people believe that personal development requires drastic and sudden changes, but the truth is that real transformation occurs through small and consistent steps.</p>

<p>Think of it as planting a seed. You won't see the tree grow overnight, but with continuous care and patience, you will witness gradual and sustainable growth. This is exactly what happens with your personal development.</p>

<blockquote>Awareness is the first step toward any change. You cannot change what you are not aware of or do not recognize.</blockquote>

<h2>Chapter Two: Practical Techniques</h2>
<p>Now, let's move on to the practical part. There are many scientifically proven techniques you can use to develop yourself in this area:</p>

<h3>Technique One: Daily Meditation</h3>
<p>Meditation is one of the most powerful tools for developing self-awareness. Start with just five minutes a day, sit in a quiet place, close your eyes, and focus on your breathing. Notice your thoughts without judging them, and allow them to pass like clouds in the sky.</p>

<p>With continuous practice, you will notice that you have become more able to observe your thoughts and feelings without being swept away by them. This distance between you and your thoughts is what gives you the freedom to respond rather than react automatically.</p>

<h3>Technique Two: Journaling</h3>
<p>Writing is a powerful tool for expressing and processing emotions. Set aside time each day to write your thoughts and feelings. Don't worry about rules or style, the goal is free expression of what's going on inside you.</p>

<p>Try answering questions like: What am I feeling right now? What's on my mind? What do I need at this moment? These simple questions can reveal deep layers of your self-awareness.</p>

<h3>Technique Three: Positive Self-Talk</h3>
<p>The way we talk to ourselves significantly affects our feelings and behaviors. Notice the inner voice in your mind: Is it supportive and encouraging or critical and harsh? Learn to be kind to yourself as you would be with a dear friend.</p>

<h2>Chapter Three: Application in Daily Life</h2>
<p>Knowledge alone is not enough, real transformation occurs through continuous application. Here are some ways to integrate these concepts into your daily life:</p>

<ul>
<li>Start your day with a conscious and clear intention</li>
<li>Take short pauses during the day to check on your psychological state</li>
<li>Practice gratitude daily by writing three things you are grateful for</li>
<li>End your day with a simple review of what you learned and what you can improve</li>
</ul>

<h2>Chapter Four: Dealing with Challenges</h2>
<p>On your journey toward personal growth, you will inevitably face obstacles and challenges. This is natural and an integral part of the process. What matters is how you deal with these challenges.</p>

<p>When you feel frustrated or find it difficult to continue, remember that growth is not a straight upward line. There are curves and setbacks, and they are all part of the journey. Be compassionate with yourself and celebrate every small step forward.</p>

<h2>Chapter Five: Building Sustainable Habits</h2>
<p>Sustainable change comes from building small and consistent habits. Instead of trying to change everything at once, focus on one habit at a time. When this habit becomes part of your routine, add another habit.</p>

<p>Remember the two-minute rule: if the new habit takes less than two minutes, it's easier to commit to it. You can always expand it later.</p>

<h2>Chapter Six: The Role of Community and Support</h2>
<p>Although the journey is personal, having a supportive community can make a big difference. Look for people who share your interests and values. Share your experiences and listen to others' experiences.</p>

<h2>Conclusion</h2>
<p>At the end of this article, we hope you have gained a deeper understanding and practical tools you can use on your journey. Remember that personal development is not a destination we reach, but a continuous and exciting journey.</p>

<p>Start today with a small step. Choose one technique from what we mentioned and apply it for a week. Notice the impact on your life and adjust as needed. With time and practice, you will notice a real transformation in the way you think, feel, and deal with life.</p>

<blockquote>Every great journey begins with a single step. Your first step starts now.</blockquote>

<p><em>Important Note: This content is educational and is not a substitute for professional psychological consultation. If you are experiencing psychological difficulties, please consult a specialist.</em></p>
`;
}

const seedLongPosts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get existing categories and author
        const awarenessCategory = await Category.findOne({ slug: 'awareness' });
        const selfDevCategory = await Category.findOne({ slug: 'self-development' });
        const author = await Author.findOne({});

        if (!awarenessCategory || !selfDevCategory || !author) {
            console.error('❌ Categories or Author not found. Run the main seed script first.');
            process.exit(1);
        }

        console.log('📝 Creating 10 long posts...');

        // Create Arabic posts
        for (const post of arabicPosts) {
            const category = post.category === 'awareness' ? awarenessCategory._id : selfDevCategory._id;
            await Article.create({
                title: { ar: post.title, en: `${post.title} (Arabic)` },
                slug: post.slug,
                excerpt: { ar: post.excerpt, en: post.excerpt },
                content: { ar: generateArabicContent(post.title), en: generateEnglishContent(post.title) },
                category: category,
                author: author._id,
                tags: post.tags,
                status: 'published',
                isEditorsPick: post.isEditorsPick,
                publishedAt: new Date(),
            });
            console.log(`✅ Created: ${post.title}`);
        }

        // Create English posts
        for (const post of englishPosts) {
            const category = post.category === 'awareness' ? awarenessCategory._id : selfDevCategory._id;
            await Article.create({
                title: { ar: `${post.title} (English)`, en: post.title },
                slug: post.slug,
                excerpt: { ar: post.excerpt, en: post.excerpt },
                content: { ar: generateArabicContent(post.title), en: generateEnglishContent(post.title) },
                category: category,
                author: author._id,
                tags: post.tags,
                status: 'published',
                isEditorsPick: post.isEditorsPick,
                publishedAt: new Date(),
            });
            console.log(`✅ Created: ${post.title}`);
        }

        console.log('\n🎉 10 long posts created successfully!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedLongPosts();
