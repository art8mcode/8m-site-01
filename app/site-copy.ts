import type { BillingMode, Price } from './site-data';

export type Locale = 'uk' | 'en' | 'pl';

export const localePaths: Record<Locale, string> = {
  uk: '/',
  en: '/en',
  pl: '/pl',
};

export const localeOptions: { id: Locale; label: string; language: string }[] =
  [
    { id: 'uk', label: 'UA', language: 'Українська' },
    { id: 'en', label: 'EN', language: 'English' },
    { id: 'pl', label: 'PL', language: 'Polski' },
  ];

export type Service = {
  id: 'marketing' | 'reels' | 'combined';
  name: string;
  description: string;
  tags: string[];
  cta: string;
};

export type PricingOffer = {
  price: Price;
  description: string;
  supporting?: string;
  deliverables: string[];
  cta: string;
};

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  skills: string[];
  image: string;
  imageAlt: string;
};

export type ContactFormCopy = {
  eyebrow: string;
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  serviceLabel: string;
  servicePlaceholder: string;
  servicesAria: string;
  messageLabel: string;
  messagePlaceholder: string;
  sending: string;
  submit: string;
  privacy: string;
  successTitle: string;
  successBody: string;
  anotherIdea: string;
  errors: {
    name: string;
    email: string;
    message: string;
    send: string;
    connection: string;
  };
};

type Narrative = {
  label: string;
  note: string;
  title: string[];
  paragraphs: string[];
};

export type SiteCopy = {
  locale: Locale;
  lang: string;
  meta: { title: string; description: string };
  a11y: {
    skip: string;
    home: string;
    mainNav: string;
    mobileNav: string;
    footerNav: string;
    socialNav: string;
    language: string;
    openMenu: string;
    closeMenu: string;
  };
  nav: { name: string; id: string }[];
  headerCta: string;
  hero: {
    mediaAlt: string;
    subtitle: string;
    directions: string;
    title: string[];
    description: string[];
    workCta: string;
    note: string[];
    avatarAlt: string;
    contactEyebrow: string;
    contactTitle: string;
    contactCta: string;
    strip: string[];
  };
  narratives: {
    marketing: Narrative;
    reels: Narrative;
    combined: Narrative & { mutedLine: number; noteBody: string };
  };
  works: { direction: string; alt: string }[];
  approach: {
    label: string;
    note: string;
    title: string;
    description: string;
  };
  servicesSection: {
    label: string;
    note: string;
    title: string;
    mediaAlt: string;
  };
  pricingSection: {
    label: string;
    note: string;
    title: string[];
    description: string[];
    aria: string;
    monthly: string;
    project: string;
    meta: string;
    included: string;
    from: string;
    request: string;
    period: Record<'project' | 'month', string>;
  };
  teamSection: {
    label: string;
    note: string;
    title: [string, string];
    description: string;
    skillsLabel: string;
    cardMeta: string;
  };
  faqSection: {
    label: string;
    note: string;
    title: string[];
    description: string[];
  };
  contactSection: {
    label: string;
    note: string;
    title: string[];
    description: string[];
  };
  footer: { eyebrow: string; backToTop: string };
  form: ContactFormCopy;
  services: Service[];
  pricing: Record<BillingMode, PricingOffer[]>;
  team: TeamMember[];
  principles: [string, string][];
  faqs: [string, string][];
};

const commonPrices = {
  projectMarketing: {
    kind: 'from' as const,
    amount: '1,000',
    currency: '$',
    period: 'project' as const,
  },
  projectReels: {
    kind: 'from' as const,
    amount: '1,000',
    currency: '$',
    period: 'project' as const,
  },
  request: { kind: 'request' as const },
  monthlyMarketing: {
    kind: 'from' as const,
    amount: '1,000',
    currency: '$',
    period: 'month' as const,
  },
  monthlyReels: {
    kind: 'from' as const,
    amount: '2,000',
    currency: '$',
    period: 'month' as const,
  },
  monthlyCombined: {
    kind: 'from' as const,
    amount: '2,500',
    currency: '$',
    period: 'month' as const,
  },
};

export const siteCopy: Record<Locale, SiteCopy> = {
  uk: {
    locale: 'uk',
    lang: 'uk',
    meta: {
      title: '8m — Маркетинг & Reels-продакшн',
      description:
        '8m — маркетингове просування та професійний Reels-продакшн. Перегляньте портфоліо, послуги та обговоріть свій проєкт.',
    },
    a11y: {
      skip: 'До основного вмісту',
      home: '8M Studio — головна',
      mainNav: 'Головна навігація',
      mobileNav: 'Мобільна навігація',
      footerNav: 'Навігація в підвалі',
      socialNav: 'Соціальні мережі',
      language: 'Мова сайту',
      openMenu: 'Відкрити меню',
      closeMenu: 'Закрити меню',
    },
    nav: [
      { name: 'Marketing', id: 'marketing' },
      { name: 'Reels Production', id: 'reels' },
      { name: 'Marketing + Reels Production', id: 'combined' },
      { name: 'Як ми працюємо', id: 'approach' },
      { name: 'Послуги', id: 'services' },
      { name: 'Ціни', id: 'pricing' },
      { name: 'Команда', id: 'team' },
      { name: 'FAQ', id: 'faq' },
    ],
    headerCta: 'Обговорити проєкт',
    hero: {
      mediaAlt: 'Чорно-білий фрагмент руху та пластики',
      subtitle: 'marketing & production',
      directions: 'ТРИ НАПРЯМИ. ОДНА КОМАНДА.',
      title: ['Перетворюємо', 'увагу на дію.'],
      description: ['Стратегія задає напрям.', 'Продакшн надає йому форму.'],
      workCta: 'Дивитися роботи',
      note: ['ВІД ПЕРШОЇ ІДЕЇ', 'ДО ФІНАЛЬНОГО КАДРУ.'],
      avatarAlt: 'Аватар представника 8M Studio',
      contactEyebrow: 'НА ЗВ’ЯЗКУ / 8M STUDIO',
      contactTitle: 'Ваш наступний проєкт починається з розмови.',
      contactCta: 'Є ідея?',
      strip: [
        'Незалежна студія',
        'Стратегія · Контент · Просування',
        '8M STUDIO © 2026',
      ],
    },
    narratives: {
      marketing: {
        label: 'Marketing',
        note: 'СТРАТЕГІЯ ТА НАПРЯМ',
        title: ['Маркетинг', 'починається', 'з задачі.'],
        paragraphs: [
          'Спочатку визначаємо, куди має рухатися бренд: кого залучаємо, що пропонуємо, яку дію очікуємо і як будемо оцінювати результат.',
          'Далі поєднуємо позиціонування, контент, канали просування та рекламні кампанії в одну систему навколо конкретної бізнес-задачі.',
          'Працюємо як з окремими маркетинговими задачами, так і з напрямом на постійній основі — від стратегії до запуску, аналізу та наступної ітерації.',
        ],
      },
      reels: {
        label: 'Reels Production',
        note: 'REELS-ПРОДАКШН',
        title: ['Продакшн, який', 'працює на увагу.'],
        paragraphs: [
          'Розробляємо короткий відеоконтент для брендів, продуктів і сервісів — від ідеї та зйомки до монтажу, ритму, звуку й фінальної подачі.',
          'Працюємо з різними середовищами, форматами та типами руху, але завжди з однією задачею: зробити бренд помітнішим і створити кадр, який утримує увагу.',
        ],
      },
      combined: {
        label: 'Marketing + Reels Production',
        note: 'ОДНА СИСТЕМА',
        title: ['Не окремі дії.', 'Одна система.'],
        mutedLine: 1,
        paragraphs: [
          'Стратегія визначає, що говорити, кому і навіщо.',
          'Продакшн перетворює цю задачу на контент.',
          'Дистрибуція доставляє його потрібній аудиторії.',
          'Аналітика показує, що працює і що потрібно змінити в наступному циклі.',
        ],
        noteBody:
          'Такий формат підходить брендам, яким потрібні не окремі ролики або разові рекламні дії, а послідовна система роботи навколо маркетингової задачі.',
      },
    },
    works: [
      {
        direction: 'Product / Visual Storytelling',
        alt: 'Деталі одягу та типографіка у відеоконтенті',
      },
      {
        direction: 'Lifestyle / Dynamic Edit',
        alt: 'Динамічний монтаж міських вулиць',
      },
      {
        direction: 'Motion / Sport',
        alt: 'Рух велосипеда в міському просторі',
      },
      {
        direction: 'Office / Corporate Visuals',
        alt: 'Відеоприклад корпоративного середовища',
      },
      {
        direction: 'Design / Brand Visuals',
        alt: 'Відеоприклад дизайну та візуальної мови бренду',
      },
    ],
    approach: {
      label: 'Як ми працюємо',
      note: 'ЯК МИ ПРАЦЮЄМО',
      title: 'Чіткий процес.',
      description:
        'Від першого брифу до запуску — без хаосу, з ясним обсягом, ролями та наступними кроками.',
    },
    servicesSection: {
      label: 'Послуги',
      note: 'ЩО МИ РОБИМО',
      title: 'Формат під завдання.',
      mediaAlt: 'Темна рухома текстура',
    },
    pricingSection: {
      label: 'Формат співпраці',
      note: 'ОБЕРІТЬ ФОРМАТ',
      title: ['Формат', 'співпраці.'],
      description: [
        'Разовий проєкт або системна щомісячна робота.',
        'Обсяг, склад команди та фінальну вартість формуємо відповідно до задачі.',
      ],
      aria: 'Формат співпраці',
      monthly: 'Щомісяця',
      project: 'Проєктно',
      meta: 'ТРИ НАПРЯМИ · ІНДИВІДУАЛЬНИЙ РОЗРАХУНОК',
      included: 'Що входить:',
      from: 'від ',
      request: 'За запитом',
      period: { project: 'проєкт', month: 'місяць' },
    },
    teamSection: {
      label: 'Команда',
      note: 'ЛЮДИ 8M',
      title: ['Не просто команда.', 'Компетенції під задачу.'],
      description:
        'Strategy, production, automation і social content — кожен відповідає за свою частину системи.',
      skillsLabel: 'Ключові компетенції',
      cardMeta: '8M / КОМАНДА',
    },
    faqSection: {
      label: 'FAQ',
      note: 'ВАРТО ЗНАТИ',
      title: ['До початку', 'розмови.'],
      description: [
        'Кілька відповідей про процес,',
        'формат і наступні кроки.',
      ],
    },
    contactSection: {
      label: 'Контакт',
      note: 'СТВОРІМО ЦЕ',
      title: ['Є ідея?', 'Давайте', 'створимо.'],
      description: [
        'Розкажіть, що задумали.',
        'Разом визначимо наступний крок.',
      ],
    },
    footer: { eyebrow: 'ПОЧНІМО РОЗМОВУ', backToTop: 'Нагору' },
    form: {
      eyebrow: 'ПОЧНІМО З ВАШОГО ЗАВДАННЯ',
      title: 'Кілька слів про проєкт.',
      nameLabel: 'Ваше ім’я *',
      namePlaceholder: 'Як до вас звертатися?',
      emailLabel: 'Email *',
      serviceLabel: 'Що вас цікавить?',
      servicePlaceholder: 'Оберіть напрям або опишіть завдання',
      servicesAria: 'Послуги 8M',
      messageLabel: 'Про ваш проєкт *',
      messagePlaceholder: 'Ідея, завдання, бажані терміни…',
      sending: 'Надсилаємо…',
      submit: 'Надіслати заявку',
      privacy: 'Використаємо ваші дані лише для відповіді на цю заявку.',
      successTitle: 'Дякуємо за заявку.',
      successBody:
        'Ваше повідомлення отримано. Повернемося до вас, щоб обговорити наступні кроки.',
      anotherIdea: 'Ще одна ідея',
      errors: {
        name: 'Вкажіть ваше ім’я.',
        email: 'Вкажіть коректну email-адресу.',
        message: 'Розкажіть кілька слів про проєкт.',
        send: 'Не вдалося надіслати заявку. Спробуйте пізніше.',
        connection: 'Помилка з’єднання. Спробуйте ще раз.',
      },
    },
    services: [
      {
        id: 'marketing',
        name: 'Marketing',
        description:
          'Стратегія, що задає напрям. Просування, яке поєднує позиціонування, контент і рекламу навколо конкретних бізнес-задач.',
        tags: [
          'Стратегія',
          'Позиціонування',
          'Соціальні мережі',
          'Рекламні кампанії',
          'Аналітика та оптимізація',
        ],
        cta: 'Обговорити Marketing',
      },
      {
        id: 'reels',
        name: 'Reels Production',
        description:
          'Повний цикл короткого відеоконтенту — від концепції та зйомки до монтажу, кольору, звуку й фінальної адаптації під платформу.',
        tags: [
          'Ідея',
          'Сценарій',
          'Зйомка',
          'Монтаж',
          'Колір',
          'Звук',
          'Субтитри',
        ],
        cta: 'Обговорити Reels Production',
      },
      {
        id: 'combined',
        name: 'Marketing + Reels Production',
        description:
          'Єдина система, де стратегія, продакшн і просування працюють разом — від планування контенту до запуску й наступної оптимізації.',
        tags: [
          'Стратегія',
          'Контент-система',
          'Продакшн',
          'Дистрибуція',
          'Запуск кампаній',
          'Аналітика',
        ],
        cta: 'Обговорити комплексну роботу',
      },
    ],
    pricing: {
      project: [
        {
          price: commonPrices.projectMarketing,
          description:
            'Разова стратегічна або маркетингова задача навколо бренду.',
          deliverables: [
            'Стратегія',
            'Позиціонування',
            'Структура кампанії',
            'Контент-напрям',
            'План запуску',
          ],
          cta: 'Обговорити проєкт',
        },
        {
          price: commonPrices.projectReels,
          description:
            'Разовий продакшн під конкретну задачу або серію короткого контенту.',
          deliverables: [
            'Креативна концепція',
            'Пре-продакшн',
            'Зйомка',
            'Монтаж',
            'Колір і звук',
            'Фінальна передача',
          ],
          cta: 'Обговорити проєкт',
        },
        {
          price: commonPrices.request,
          description:
            'Комплексна робота, де стратегія, контент-продакшн і просування збираються в одну систему.',
          supporting:
            'Обсяг, команда та бюджет формуються після короткого брифу і знайомства із задачею.',
          deliverables: [
            'Стратегія',
            'Контент-система',
            'Продакшн',
            'Дистрибуція',
            'Запуск кампанії',
            'Аналітика',
          ],
          cta: 'Обговорити проєкт',
        },
      ],
      monthly: [
        {
          price: commonPrices.monthlyMarketing,
          description:
            'Постійна маркетингова робота навколо задач бренду. Стратегія, контент, просування та оптимізація в одному робочому циклі.',
          deliverables: [
            'Оновлення стратегії',
            'Позиціонування',
            'Контент-напрям',
            'Управління кампаніями',
            'Дистрибуція',
            'Аналітика та оптимізація',
          ],
          cta: 'Обговорити Marketing',
        },
        {
          price: commonPrices.monthlyReels,
          description:
            'Регулярний продакшн короткого відеоконтенту для системної присутності бренду.',
          deliverables: [
            'Планування контенту',
            'Креативна концепція',
            'Зйомка',
            'Монтаж',
            'Колір і звук',
            'Передача матеріалів',
            'Ітерації',
          ],
          cta: 'Обговорити Reels Production',
        },
        {
          price: commonPrices.monthlyCombined,
          description:
            'Стратегія, продакшн і просування в одному регулярному циклі.',
          supporting:
            'Фінальний обсяг і бюджет залежать від кількості контенту, продакшн-обсягу, рекламної активності та задач бренду.',
          deliverables: [
            'Стратегія',
            'Контент-система',
            'Продакшн',
            'Запуск кампанії',
            'Дистрибуція',
            'Аналітика та оптимізація',
          ],
          cta: 'Обговорити комплексну роботу',
        },
      ],
    },
    team: [
      {
        name: 'Artem',
        role: 'Marketing & Professional Production',
        description:
          'Відповідає за маркетингову стратегію, creative direction і професійний Reels Production. Будує систему просування та координує проєкт від ідеї й позиціонування до зйомки та фінальної подачі.',
        skills: [
          'Marketing Strategy',
          'Creative Direction',
          'Professional Reels Production',
          'Marketing Systems Development',
        ],
        image: '/media/team-artem.png',
        imageAlt: 'Artem — Memoji у чорній шапці, великих окулярах і з бородою',
      },
      {
        name: 'Ihor',
        role: 'Performance, Automation & Data',
        description:
          'Відповідає за paid advertising, аналітику та технічну інфраструктуру маркетингу. Працює з рекламними акаунтами, CRM і базами даних, будує автоматизації, ботів, інтеграції та web-рішення для бізнесу.',
        skills: [
          'Paid Ads',
          'Marketing Automation',
          'Analytics & Data',
          'CRM / Databases',
        ],
        image: '/media/team-performance.png',
        imageAlt: 'Ihor — Memoji з темним зачесаним волоссям і легкою щетиною',
      },
      {
        name: 'Karina',
        role: 'Social Content & SMM',
        description:
          'Відповідає за регулярний social-first контент і присутність бренду в соцмережах. Stories, mobile shooting, легкі відеоформати, CapCut-монтаж, SMM, posting і content planning підтримують систему між основними зйомками.',
        skills: [
          'Social Content',
          'Mobile Shooting',
          'Stories Production',
          'SMM',
        ],
        image: '/media/team-social.png',
        imageAlt: 'Karina — Memoji з довгим темним волоссям і прямим чубчиком',
      },
    ],
    principles: [
      [
        'Спочатку стратегія',
        'Не починаємо з формату або тренду. Спочатку визначаємо задачу, аудиторію, контекст і результат, до якого має привести робота.',
      ],
      [
        'Продакшн із метою',
        'Кожен сценарій, кадр, рух камери та монтажний прийом повинен підсилювати ідею бренду, а не існувати тільки заради ефекту.',
      ],
      [
        'Зрозумілий обсяг',
        'До старту погоджуємо задачу, формат, етапи, відповідальність і терміни. Ви розумієте, що відбувається зараз і що буде далі.',
      ],
      [
        'Одна система',
        'Поєднуємо стратегію, контент і просування в послідовну роботу однієї системи, а не в набір окремих дій.',
      ],
    ],
    faqs: [
      [
        'З чого починається робота?',
        'З короткого знайомства із задачею. Визначаємо ціль, формат, очікуваний результат і необхідний обсяг роботи. Після цього фіксуємо обсяг, терміни та бюджет.',
      ],
      [
        'Чи можна замовити тільки Marketing?',
        'Так. Marketing працює як окремий напрям і не вимагає обов’язкового продакшн-пакета.',
      ],
      [
        'Чи можна замовити тільки Reels Production?',
        'Так. Можемо взяти окрему продакшн-задачу — від конкретної зйомки до серії коротких відео.',
      ],
      [
        'Чим комплексна робота відрізняється від окремої послуги?',
        'У комплексному форматі стратегія, контент, продакшн і просування плануються як одна система. Це дозволяє створювати контент навколо конкретної маркетингової задачі.',
      ],
      [
        'Що означає ціна «від»?',
        'Це стартова вартість формату. Фінальний бюджет залежить від обсягу роботи, складності продакшну, кількості контенту, команди та потрібних каналів просування.',
      ],
      [
        'Скільки триває проєкт?',
        'Термін залежить від формату і складності задачі. Конкретний графік погоджуємо до старту роботи.',
      ],
      [
        'Чи працюєте ви на щомісячній основі?',
        'Так. Для Marketing, Reels Production та комплексного формату доступна регулярна щомісячна співпраця.',
      ],
      [
        'Чи можна почати з одного проєкту і перейти на щомісячну роботу?',
        'Так. Можна почати з конкретної задачі, перевірити формат роботи і за потреби перейти до регулярної співпраці.',
      ],
    ],
  },
  en: {
    locale: 'en',
    lang: 'en',
    meta: {
      title: '8m — Marketing & Reels Production',
      description:
        '8m combines marketing growth and professional Reels production. Explore our work, services and pricing, then tell us about your project.',
    },
    a11y: {
      skip: 'Skip to main content',
      home: '8M Studio — home',
      mainNav: 'Main navigation',
      mobileNav: 'Mobile navigation',
      footerNav: 'Footer navigation',
      socialNav: 'Social media',
      language: 'Website language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    nav: [
      { name: 'Marketing', id: 'marketing' },
      { name: 'Reels Production', id: 'reels' },
      { name: 'Marketing + Reels Production', id: 'combined' },
      { name: 'How we work', id: 'approach' },
      { name: 'Services', id: 'services' },
      { name: 'Pricing', id: 'pricing' },
      { name: 'Team', id: 'team' },
      { name: 'FAQ', id: 'faq' },
    ],
    headerCta: 'Discuss a project',
    hero: {
      mediaAlt: 'Black-and-white study of movement and form',
      subtitle: 'marketing & production',
      directions: 'THREE DIRECTIONS. ONE TEAM.',
      title: ['We turn attention', 'into action.'],
      description: [
        'Strategy sets the direction.',
        'Production gives it form.',
      ],
      workCta: 'View our work',
      note: ['FROM THE FIRST IDEA', 'TO THE FINAL FRAME.'],
      avatarAlt: '8M Studio representative',
      contactEyebrow: 'LET’S TALK / 8M STUDIO',
      contactTitle: 'Your next project starts with a conversation.',
      contactCta: 'Have an idea?',
      strip: [
        'Independent studio',
        'Strategy · Content · Growth',
        '8M STUDIO © 2026',
      ],
    },
    narratives: {
      marketing: {
        label: 'Marketing',
        note: 'STRATEGY & DIRECTION',
        title: ['Marketing', 'starts with', 'the objective.'],
        paragraphs: [
          'We first define where the brand needs to go: who we want to reach, what we offer, which action we expect and how success will be measured.',
          'Then we connect positioning, content, growth channels and campaigns into one system built around a clear business objective.',
          'We handle focused marketing projects and ongoing partnerships — from strategy and launch through analysis and the next iteration.',
        ],
      },
      reels: {
        label: 'Reels Production',
        note: 'REELS PRODUCTION',
        title: ['Production that', 'earns attention.'],
        paragraphs: [
          'We create short-form video for brands, products and services — from the idea and shoot to editing, rhythm, sound and final delivery.',
          'We work across settings, formats and styles of movement with one goal: make the brand more visible and create frames that hold attention.',
        ],
      },
      combined: {
        label: 'Marketing + Reels Production',
        note: 'ONE SYSTEM',
        title: ['Not separate actions.', 'One system.'],
        mutedLine: 1,
        paragraphs: [
          'Strategy defines what to say, to whom and why.',
          'Production turns that objective into content.',
          'Distribution brings it to the right audience.',
          'Analytics shows what works and what to improve in the next cycle.',
        ],
        noteBody:
          'This model is made for brands that need more than isolated videos or one-off campaigns: a consistent system built around a marketing objective.',
      },
    },
    works: [
      {
        direction: 'Product / Visual Storytelling',
        alt: 'Clothing details and typography in short-form video',
      },
      {
        direction: 'Lifestyle / Dynamic Edit',
        alt: 'Fast-paced edit of city streets',
      },
      {
        direction: 'Motion / Sport',
        alt: 'Bicycle movement through an urban setting',
      },
      {
        direction: 'Office / Corporate Visuals',
        alt: 'Video example from a corporate environment',
      },
      {
        direction: 'Design / Brand Visuals',
        alt: 'Video example of a brand visual language',
      },
    ],
    approach: {
      label: 'How we work',
      note: 'HOW WE WORK',
      title: 'A clear process.',
      description:
        'From the first brief to launch — with a clear scope, defined roles and visible next steps.',
    },
    servicesSection: {
      label: 'Services',
      note: 'WHAT WE DO',
      title: 'A format for the brief.',
      mediaAlt: 'Dark moving texture',
    },
    pricingSection: {
      label: 'Ways to work',
      note: 'CHOOSE YOUR FORMAT',
      title: ['Ways', 'to work.'],
      description: [
        'A focused project or an ongoing monthly partnership.',
        'Scope, team and final pricing are shaped around the brief.',
      ],
      aria: 'Engagement format',
      monthly: 'Monthly',
      project: 'Project based',
      meta: 'THREE DIRECTIONS · CUSTOM QUOTE',
      included: 'What’s included:',
      from: 'from ',
      request: 'On request',
      period: { project: 'project', month: 'month' },
    },
    teamSection: {
      label: 'Team',
      note: 'PEOPLE OF 8M',
      title: ['More than a team.', 'The right expertise for the brief.'],
      description:
        'Strategy, production, automation and social content — each person owns a distinct part of the system.',
      skillsLabel: 'Core skills',
      cardMeta: '8M / TEAM',
    },
    faqSection: {
      label: 'FAQ',
      note: 'GOOD TO KNOW',
      title: ['Before we', 'start talking.'],
      description: [
        'A few answers about the process,',
        'engagement and next steps.',
      ],
    },
    contactSection: {
      label: 'Contact',
      note: 'LET’S MAKE IT HAPPEN',
      title: ['Have an idea?', 'Let’s', 'make it.'],
      description: [
        'Tell us what you have in mind.',
        'Together, we’ll define the next step.',
      ],
    },
    footer: { eyebrow: 'START A CONVERSATION', backToTop: 'Back to top' },
    form: {
      eyebrow: 'LET’S START WITH YOUR BRIEF',
      title: 'A few words about the project.',
      nameLabel: 'Your name *',
      namePlaceholder: 'How should we address you?',
      emailLabel: 'Email *',
      serviceLabel: 'What are you interested in?',
      servicePlaceholder: 'Choose a direction or describe the brief',
      servicesAria: '8M services',
      messageLabel: 'About your project *',
      messagePlaceholder: 'Idea, objective, preferred timing…',
      sending: 'Sending…',
      submit: 'Send enquiry',
      privacy: 'We’ll use your details only to reply to this enquiry.',
      successTitle: 'Thank you for your enquiry.',
      successBody:
        'We’ve received your message and will get back to discuss the next steps.',
      anotherIdea: 'Another idea',
      errors: {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address.',
        message: 'Tell us a little about your project.',
        send: 'We couldn’t send your enquiry. Please try again later.',
        connection: 'Connection error. Please try again.',
      },
    },
    services: [
      {
        id: 'marketing',
        name: 'Marketing',
        description:
          'Strategy sets the direction. Growth connects positioning, content and advertising around clear business objectives.',
        tags: [
          'Strategy',
          'Positioning',
          'Social media',
          'Campaigns',
          'Analytics & optimization',
        ],
        cta: 'Discuss Marketing',
      },
      {
        id: 'reels',
        name: 'Reels Production',
        description:
          'End-to-end short-form video — from concept and shooting to editing, color, sound and final platform delivery.',
        tags: [
          'Idea',
          'Script',
          'Shooting',
          'Editing',
          'Color',
          'Sound',
          'Captions',
        ],
        cta: 'Discuss Reels Production',
      },
      {
        id: 'combined',
        name: 'Marketing + Reels Production',
        description:
          'One system where strategy, production and growth work together — from content planning to launch and optimization.',
        tags: [
          'Strategy',
          'Content system',
          'Production',
          'Distribution',
          'Campaign launch',
          'Analytics',
        ],
        cta: 'Discuss the full system',
      },
    ],
    pricing: {
      project: [
        {
          price: commonPrices.projectMarketing,
          description:
            'A focused strategy or marketing project built around the brand.',
          deliverables: [
            'Strategy',
            'Positioning',
            'Campaign structure',
            'Content direction',
            'Launch plan',
          ],
          cta: 'Discuss a project',
        },
        {
          price: commonPrices.projectReels,
          description:
            'A one-off production for a specific objective or short-form series.',
          deliverables: [
            'Creative concept',
            'Pre-production',
            'Shooting',
            'Editing',
            'Color & sound',
            'Final delivery',
          ],
          cta: 'Discuss a project',
        },
        {
          price: commonPrices.request,
          description:
            'An integrated engagement combining strategy, content production and growth.',
          supporting:
            'Scope, team and budget are defined after a short introduction and brief.',
          deliverables: [
            'Strategy',
            'Content system',
            'Production',
            'Distribution',
            'Campaign launch',
            'Analytics',
          ],
          cta: 'Discuss a project',
        },
      ],
      monthly: [
        {
          price: commonPrices.monthlyMarketing,
          description:
            'Ongoing marketing around the brand’s priorities. Strategy, content, growth and optimization in one working cycle.',
          deliverables: [
            'Strategy updates',
            'Positioning',
            'Content direction',
            'Campaign management',
            'Distribution',
            'Analytics & optimization',
          ],
          cta: 'Discuss Marketing',
        },
        {
          price: commonPrices.monthlyReels,
          description:
            'Ongoing short-form video production for a consistent brand presence.',
          deliverables: [
            'Content planning',
            'Creative concept',
            'Shooting',
            'Editing',
            'Color & sound',
            'Delivery',
            'Iterations',
          ],
          cta: 'Discuss Reels Production',
        },
        {
          price: commonPrices.monthlyCombined,
          description:
            'Strategy, production and growth in one continuous working cycle.',
          supporting:
            'Final scope and budget depend on content volume, production needs, campaign activity and brand objectives.',
          deliverables: [
            'Strategy',
            'Content system',
            'Production',
            'Campaign launch',
            'Distribution',
            'Analytics & optimization',
          ],
          cta: 'Discuss the full system',
        },
      ],
    },
    team: [
      {
        name: 'Artem',
        role: 'Marketing & Professional Production',
        description:
          'Leads marketing strategy, creative direction and professional Reels Production. Builds the growth system and directs each project from idea and positioning through the shoot and final delivery.',
        skills: [
          'Marketing Strategy',
          'Creative Direction',
          'Professional Reels Production',
          'Marketing Systems Development',
        ],
        image: '/media/team-artem.png',
        imageAlt:
          'Artem — Memoji wearing a black beanie, large glasses and a full beard',
      },
      {
        name: 'Ihor',
        role: 'Performance, Automation & Data',
        description:
          'Owns paid advertising, analytics and the technical marketing infrastructure. Works with ad accounts, CRM and databases, building automations, bots, integrations and web solutions for business.',
        skills: [
          'Paid Ads',
          'Marketing Automation',
          'Analytics & Data',
          'CRM / Databases',
        ],
        image: '/media/team-performance.png',
        imageAlt:
          'Ihor — Memoji with dark swept-back hair and light facial hair',
      },
      {
        name: 'Karina',
        role: 'Social Content & SMM',
        description:
          'Owns regular social-first content and the brand’s daily social presence. Stories, mobile shooting, lightweight video, CapCut editing, SMM, posting and content planning support the system between major productions.',
        skills: [
          'Social Content',
          'Mobile Shooting',
          'Stories Production',
          'SMM',
        ],
        image: '/media/team-social.png',
        imageAlt: 'Karina — Memoji with long dark hair and straight bangs',
      },
    ],
    principles: [
      [
        'Strategy first',
        'We don’t start with a format or trend. We first define the objective, audience, context and result the work needs to create.',
      ],
      [
        'Purposeful production',
        'Every script, frame, camera movement and editing choice should strengthen the brand idea, rather than exist for effect alone.',
      ],
      [
        'A clear scope',
        'Before we begin, we agree on the objective, format, stages, responsibilities and timing. You always know what is happening next.',
      ],
      [
        'One system',
        'We connect strategy, content and growth in one consistent system instead of a collection of isolated actions.',
      ],
    ],
    faqs: [
      [
        'How does the work begin?',
        'We start with a short introduction to the brief. We define the objective, format, expected outcome and required scope, then confirm timing and budget.',
      ],
      [
        'Can I book Marketing only?',
        'Yes. Marketing works as a standalone direction and does not require a production package.',
      ],
      [
        'Can I book Reels Production only?',
        'Yes. We can handle a focused production brief — from one shoot to a series of short-form videos.',
      ],
      [
        'How is the integrated format different?',
        'Strategy, content, production and growth are planned as one system, so each asset serves a clear marketing objective.',
      ],
      [
        'What does “from” mean?',
        'It is the starting price. The final budget depends on scope, production complexity, content volume, team and required growth channels.',
      ],
      [
        'How long does a project take?',
        'Timing depends on the format and complexity. We agree on a clear schedule before the work begins.',
      ],
      [
        'Do you work on a monthly basis?',
        'Yes. Ongoing monthly partnerships are available for Marketing, Reels Production and the integrated format.',
      ],
      [
        'Can we start with one project and move to monthly?',
        'Yes. You can begin with a focused project, test the working format and move to an ongoing partnership when it makes sense.',
      ],
    ],
  },
  pl: {
    locale: 'pl',
    lang: 'pl',
    meta: {
      title: '8m — Marketing i produkcja Reels',
      description:
        '8m łączy rozwój marketingowy z profesjonalną produkcją Reels. Zobacz realizacje, usługi i ceny, a następnie opowiedz nam o swoim projekcie.',
    },
    a11y: {
      skip: 'Przejdź do głównej treści',
      home: '8M Studio — strona główna',
      mainNav: 'Główna nawigacja',
      mobileNav: 'Nawigacja mobilna',
      footerNav: 'Nawigacja w stopce',
      socialNav: 'Media społecznościowe',
      language: 'Język strony',
      openMenu: 'Otwórz menu',
      closeMenu: 'Zamknij menu',
    },
    nav: [
      { name: 'Marketing', id: 'marketing' },
      { name: 'Produkcja Reels', id: 'reels' },
      { name: 'Marketing + Produkcja Reels', id: 'combined' },
      { name: 'Jak pracujemy', id: 'approach' },
      { name: 'Usługi', id: 'services' },
      { name: 'Cennik', id: 'pricing' },
      { name: 'Zespół', id: 'team' },
      { name: 'FAQ', id: 'faq' },
    ],
    headerCta: 'Omów projekt',
    hero: {
      mediaAlt: 'Czarno-białe studium ruchu i formy',
      subtitle: 'marketing & production',
      directions: 'TRZY KIERUNKI. JEDEN ZESPÓŁ.',
      title: ['Zmieniamy uwagę', 'w działanie.'],
      description: ['Strategia nadaje kierunek.', 'Produkcja nadaje mu formę.'],
      workCta: 'Zobacz realizacje',
      note: ['OD PIERWSZEGO POMYSŁU', 'DO OSTATNIEGO KADRU.'],
      avatarAlt: 'Przedstawiciel 8M Studio',
      contactEyebrow: 'POROZMAWIAJMY / 8M STUDIO',
      contactTitle: 'Twój następny projekt zaczyna się od rozmowy.',
      contactCta: 'Masz pomysł?',
      strip: [
        'Niezależne studio',
        'Strategia · Treści · Promocja',
        '8M STUDIO © 2026',
      ],
    },
    narratives: {
      marketing: {
        label: 'Marketing',
        note: 'STRATEGIA I KIERUNEK',
        title: ['Marketing', 'zaczyna się', 'od celu.'],
        paragraphs: [
          'Najpierw określamy, dokąd marka ma zmierzać: do kogo mówimy, co oferujemy, jakiej reakcji oczekujemy i jak zmierzymy efekt.',
          'Następnie łączymy pozycjonowanie, treści, kanały promocji i kampanie w jeden system zbudowany wokół konkretnego celu biznesowego.',
          'Realizujemy zarówno pojedyncze zadania marketingowe, jak i stałą współpracę — od strategii i startu po analizę oraz kolejną iterację.',
        ],
      },
      reels: {
        label: 'Produkcja Reels',
        note: 'PRODUKCJA REELS',
        title: ['Produkcja, która', 'przyciąga uwagę.'],
        paragraphs: [
          'Tworzymy krótkie wideo dla marek, produktów i usług — od pomysłu oraz zdjęć po montaż, rytm, dźwięk i finalną publikację.',
          'Pracujemy w różnych środowiskach, formatach i stylach ruchu, zawsze z jednym celem: zwiększyć widoczność marki i stworzyć kadr, który zatrzymuje uwagę.',
        ],
      },
      combined: {
        label: 'Marketing + Produkcja Reels',
        note: 'JEDEN SYSTEM',
        title: ['Nie osobne działania.', 'Jeden system.'],
        mutedLine: 1,
        paragraphs: [
          'Strategia określa, co mówić, do kogo i po co.',
          'Produkcja zamienia ten cel w treści.',
          'Dystrybucja dostarcza je właściwym odbiorcom.',
          'Analityka pokazuje, co działa i co poprawić w kolejnym cyklu.',
        ],
        noteBody:
          'Ten model jest dla marek, które potrzebują czegoś więcej niż pojedyncze rolki lub jednorazowe kampanie: spójnego systemu wokół celu marketingowego.',
      },
    },
    works: [
      {
        direction: 'Produkt / Opowieść wizualna',
        alt: 'Detale odzieży i typografia w krótkim wideo',
      },
      {
        direction: 'Lifestyle / Dynamiczny montaż',
        alt: 'Dynamiczny montaż miejskich ulic',
      },
      {
        direction: 'Ruch / Sport',
        alt: 'Ruch roweru w przestrzeni miejskiej',
      },
      {
        direction: 'Biuro / Wizerunek firmy',
        alt: 'Przykład wideo ze środowiska firmowego',
      },
      {
        direction: 'Design / Identyfikacja marki',
        alt: 'Przykład wideo pokazującego język wizualny marki',
      },
    ],
    approach: {
      label: 'Jak pracujemy',
      note: 'JAK PRACUJEMY',
      title: 'Jasny proces.',
      description:
        'Od pierwszego briefu do startu — z jasnym zakresem, określonymi rolami i widocznymi kolejnymi krokami.',
    },
    servicesSection: {
      label: 'Usługi',
      note: 'CO ROBIMY',
      title: 'Format dopasowany do celu.',
      mediaAlt: 'Ciemna, ruchoma tekstura',
    },
    pricingSection: {
      label: 'Model współpracy',
      note: 'WYBIERZ FORMAT',
      title: ['Model', 'współpracy.'],
      description: [
        'Pojedynczy projekt lub stała współpraca miesięczna.',
        'Zakres, zespół i finalną cenę dopasowujemy do zadania.',
      ],
      aria: 'Model współpracy',
      monthly: 'Miesięcznie',
      project: 'Projektowo',
      meta: 'TRZY KIERUNKI · INDYWIDUALNA WYCENA',
      included: 'W pakiecie:',
      from: 'od ',
      request: 'Na zapytanie',
      period: { project: 'projekt', month: 'mies.' },
    },
    teamSection: {
      label: 'Zespół',
      note: 'LUDZIE 8M',
      title: ['Nie tylko zespół.', 'Kompetencje dopasowane do zadania.'],
      description:
        'Strategia, produkcja, automatyzacja i social content — każdy odpowiada za swoją część systemu.',
      skillsLabel: 'Kluczowe kompetencje',
      cardMeta: '8M / ZESPÓŁ',
    },
    faqSection: {
      label: 'FAQ',
      note: 'WARTO WIEDZIEĆ',
      title: ['Zanim', 'porozmawiamy.'],
      description: [
        'Kilka odpowiedzi o procesie,',
        'współpracy i kolejnych krokach.',
      ],
    },
    contactSection: {
      label: 'Kontakt',
      note: 'ZRÓBMY TO',
      title: ['Masz pomysł?', 'Stwórzmy', 'go razem.'],
      description: [
        'Opowiedz nam, co planujesz.',
        'Wspólnie określimy kolejny krok.',
      ],
    },
    footer: { eyebrow: 'ZACZNIJMY ROZMOWĘ', backToTop: 'Do góry' },
    form: {
      eyebrow: 'ZACZNIJMY OD TWOJEGO ZADANIA',
      title: 'Kilka słów o projekcie.',
      nameLabel: 'Imię *',
      namePlaceholder: 'Jak mamy się do Ciebie zwracać?',
      emailLabel: 'Email *',
      serviceLabel: 'Czego potrzebujesz?',
      servicePlaceholder: 'Wybierz kierunek lub opisz zadanie',
      servicesAria: 'Usługi 8M',
      messageLabel: 'O projekcie *',
      messagePlaceholder: 'Pomysł, cel, preferowany termin…',
      sending: 'Wysyłamy…',
      submit: 'Wyślij zapytanie',
      privacy: 'Użyjemy Twoich danych wyłącznie do odpowiedzi na to zapytanie.',
      successTitle: 'Dziękujemy za wiadomość.',
      successBody:
        'Otrzymaliśmy Twoje zgłoszenie. Wrócimy z odpowiedzią, aby omówić kolejne kroki.',
      anotherIdea: 'Kolejny pomysł',
      errors: {
        name: 'Wpisz swoje imię.',
        email: 'Wpisz poprawny adres email.',
        message: 'Napisz kilka słów o projekcie.',
        send: 'Nie udało się wysłać zapytania. Spróbuj ponownie później.',
        connection: 'Błąd połączenia. Spróbuj ponownie.',
      },
    },
    services: [
      {
        id: 'marketing',
        name: 'Marketing',
        description:
          'Strategia nadaje kierunek. Promocja łączy pozycjonowanie, treści i reklamę wokół konkretnych celów biznesowych.',
        tags: [
          'Strategia',
          'Pozycjonowanie',
          'Social media',
          'Kampanie reklamowe',
          'Analityka i optymalizacja',
        ],
        cta: 'Omów Marketing',
      },
      {
        id: 'reels',
        name: 'Produkcja Reels',
        description:
          'Kompleksowa produkcja krótkiego wideo — od koncepcji i zdjęć po montaż, kolor, dźwięk i przygotowanie do publikacji.',
        tags: [
          'Pomysł',
          'Scenariusz',
          'Zdjęcia',
          'Montaż',
          'Kolor',
          'Dźwięk',
          'Napisy',
        ],
        cta: 'Omów Produkcję Reels',
      },
      {
        id: 'combined',
        name: 'Marketing + Produkcja Reels',
        description:
          'Jeden system, w którym strategia, produkcja i promocja działają razem — od planowania treści po start i optymalizację.',
        tags: [
          'Strategia',
          'System treści',
          'Produkcja',
          'Dystrybucja',
          'Start kampanii',
          'Analityka',
        ],
        cta: 'Omów pełną współpracę',
      },
    ],
    pricing: {
      project: [
        {
          price: commonPrices.projectMarketing,
          description:
            'Jednorazowy projekt strategiczny lub marketingowy wokół marki.',
          deliverables: [
            'Strategia',
            'Pozycjonowanie',
            'Struktura kampanii',
            'Kierunek treści',
            'Plan startu',
          ],
          cta: 'Omów projekt',
        },
        {
          price: commonPrices.projectReels,
          description:
            'Jednorazowa produkcja dla konkretnego celu lub serii krótkich materiałów.',
          deliverables: [
            'Koncepcja kreatywna',
            'Preprodukcja',
            'Zdjęcia',
            'Montaż',
            'Kolor i dźwięk',
            'Finalne materiały',
          ],
          cta: 'Omów projekt',
        },
        {
          price: commonPrices.request,
          description:
            'Kompleksowa współpraca łącząca strategię, produkcję treści i promocję.',
          supporting:
            'Zakres, zespół i budżet ustalamy po krótkiej rozmowie i poznaniu zadania.',
          deliverables: [
            'Strategia',
            'System treści',
            'Produkcja',
            'Dystrybucja',
            'Start kampanii',
            'Analityka',
          ],
          cta: 'Omów projekt',
        },
      ],
      monthly: [
        {
          price: commonPrices.monthlyMarketing,
          description:
            'Stała praca marketingowa wokół priorytetów marki. Strategia, treści, promocja i optymalizacja w jednym cyklu.',
          deliverables: [
            'Aktualizacje strategii',
            'Pozycjonowanie',
            'Kierunek treści',
            'Zarządzanie kampaniami',
            'Dystrybucja',
            'Analityka i optymalizacja',
          ],
          cta: 'Omów Marketing',
        },
        {
          price: commonPrices.monthlyReels,
          description:
            'Regularna produkcja krótkich wideo dla spójnej obecności marki.',
          deliverables: [
            'Planowanie treści',
            'Koncepcja kreatywna',
            'Zdjęcia',
            'Montaż',
            'Kolor i dźwięk',
            'Dostarczenie materiałów',
            'Iteracje',
          ],
          cta: 'Omów Produkcję Reels',
        },
        {
          price: commonPrices.monthlyCombined,
          description:
            'Strategia, produkcja i promocja w jednym regularnym cyklu.',
          supporting:
            'Finalny zakres i budżet zależą od liczby treści, potrzeb produkcyjnych, aktywności reklamowej oraz celów marki.',
          deliverables: [
            'Strategia',
            'System treści',
            'Produkcja',
            'Start kampanii',
            'Dystrybucja',
            'Analityka i optymalizacja',
          ],
          cta: 'Omów pełną współpracę',
        },
      ],
    },
    team: [
      {
        name: 'Artem',
        role: 'Marketing & Professional Production',
        description:
          'Odpowiada za strategię marketingową, creative direction i profesjonalny Reels Production. Buduje system promocji i koordynuje projekt od pomysłu i pozycjonowania po nagrania i finalną realizację.',
        skills: [
          'Marketing Strategy',
          'Creative Direction',
          'Professional Reels Production',
          'Marketing Systems Development',
        ],
        image: '/media/team-artem.png',
        imageAlt:
          'Artem — Memoji w czarnej czapce, dużych okularach i z pełną brodą',
      },
      {
        name: 'Ihor',
        role: 'Performance, Automation & Data',
        description:
          'Odpowiada za paid advertising, analitykę i techniczną infrastrukturę marketingu. Pracuje z kontami reklamowymi, CRM i bazami danych, tworząc automatyzacje, boty, integracje oraz rozwiązania webowe dla biznesu.',
        skills: [
          'Paid Ads',
          'Marketing Automation',
          'Analytics & Data',
          'CRM / Databases',
        ],
        image: '/media/team-performance.png',
        imageAlt:
          'Ihor — Memoji z ciemnymi zaczesanymi włosami i lekkim zarostem',
      },
      {
        name: 'Karina',
        role: 'Social Content & SMM',
        description:
          'Odpowiada za regularny social-first content i obecność marki w social mediach. Stories, mobile shooting, lekkie wideo, montaż w CapCut, SMM, posting i content planning wspierają system między większymi produkcjami.',
        skills: [
          'Social Content',
          'Mobile Shooting',
          'Stories Production',
          'SMM',
        ],
        image: '/media/team-social.png',
        imageAlt: 'Karina — Memoji z długimi ciemnymi włosami i prostą grzywką',
      },
    ],
    principles: [
      [
        'Najpierw strategia',
        'Nie zaczynamy od formatu ani trendu. Najpierw określamy cel, odbiorców, kontekst i rezultat, do którego ma prowadzić praca.',
      ],
      [
        'Produkcja z celem',
        'Każdy scenariusz, kadr, ruch kamery i decyzja montażowa powinny wzmacniać ideę marki, a nie istnieć wyłącznie dla efektu.',
      ],
      [
        'Jasny zakres',
        'Przed startem uzgadniamy cel, format, etapy, odpowiedzialność i terminy. Zawsze wiesz, co dzieje się teraz i co będzie dalej.',
      ],
      [
        'Jeden system',
        'Łączymy strategię, treści i promocję w jeden spójny system zamiast zbioru osobnych działań.',
      ],
    ],
    faqs: [
      [
        'Od czego zaczyna się współpraca?',
        'Od krótkiej rozmowy o zadaniu. Określamy cel, format, oczekiwany rezultat i potrzebny zakres, a następnie ustalamy terminy oraz budżet.',
      ],
      [
        'Czy mogę zamówić tylko Marketing?',
        'Tak. Marketing działa jako osobny kierunek i nie wymaga pakietu produkcyjnego.',
      ],
      [
        'Czy mogę zamówić tylko Produkcję Reels?',
        'Tak. Możemy zrealizować konkretne zadanie produkcyjne — od pojedynczego nagrania po serię krótkich wideo.',
      ],
      [
        'Czym różni się kompleksowa współpraca?',
        'Strategia, treści, produkcja i promocja są planowane jako jeden system, dzięki czemu każdy materiał realizuje konkretny cel marketingowy.',
      ],
      [
        'Co oznacza cena „od”?',
        'To cena początkowa. Finalny budżet zależy od zakresu, złożoności produkcji, liczby treści, zespołu oraz potrzebnych kanałów promocji.',
      ],
      [
        'Ile trwa projekt?',
        'Termin zależy od formatu i złożoności zadania. Konkretny harmonogram ustalamy przed rozpoczęciem pracy.',
      ],
      [
        'Czy pracujecie w modelu miesięcznym?',
        'Tak. Stała miesięczna współpraca jest dostępna dla Marketingu, Produkcji Reels oraz formatu kompleksowego.',
      ],
      [
        'Czy możemy zacząć od jednego projektu i przejść na model miesięczny?',
        'Tak. Można zacząć od konkretnego zadania, sprawdzić sposób pracy i w odpowiednim momencie przejść na stałą współpracę.',
      ],
    ],
  },
};
