export type Price =
  | { kind: 'request' }
  | {
      kind: 'fixed' | 'from';
      amount: string;
      currency: string;
      period: 'project' | 'month';
    };
export type BillingMode = 'project' | 'monthly';
export const contact = {
  email: '',
  socials: [] as { label: string; href: string }[],
};
export const services = [
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
      'Концепція',
      'Сценарій',
      'Зйомка',
      'Монтаж',
      'Колір',
      'Звук',
      'Фінальна підготовка',
    ],
    cta: 'Обговорити Reels Production',
  },
  {
    id: 'combined',
    name: 'Marketing + Reels Production',
    description:
      'Єдина система, де стратегія, production і просування працюють разом — від планування контенту до запуску й наступної оптимізації.',
    tags: [
      'Стратегія',
      'Контент-система',
      'Production',
      'Distribution',
      'Запуск кампаній',
      'Аналітика',
    ],
    cta: 'Обговорити комплексну роботу',
  },
] as const;
export const pricing: Record<
  BillingMode,
  {
    price: Price;
    description: string;
    supporting?: string;
    deliverables: string[];
  }[]
> = {
  project: [
    {
      price: {
        kind: 'from',
        amount: '1,000',
        currency: '$',
        period: 'project',
      },
      description: 'Стратегічна або маркетингова робота під конкретну задачу.',
      deliverables: [
        'Strategy',
        'Positioning',
        'Campaign structure',
        'Content direction',
        'Launch plan',
      ],
    },
    {
      price: {
        kind: 'from',
        amount: '1,000',
        currency: '$',
        period: 'project',
      },
      description: 'Разова production-задача або серія коротких відео.',
      deliverables: [
        'Creative concept',
        'Pre-production',
        'Shooting',
        'Editing',
        'Color & sound',
        'Final delivery',
      ],
    },
    {
      price: { kind: 'request' },
      description:
        'Комплексний запуск, де маркетинг і production будуються як одна система.',
      supporting:
        'Scope, команда та бюджет формуються після короткого брифу і знайомства із задачею.',
      deliverables: [],
    },
  ],
  monthly: [
    {
      price: { kind: 'from', amount: '1,000', currency: '$', period: 'month' },
      description: 'Постійна маркетингова робота навколо задач бренду.',
      deliverables: [
        'Strategy updates',
        'Content direction',
        'Campaign management',
        'Distribution',
        'Analytics & optimization',
      ],
    },
    {
      price: { kind: 'from', amount: '2,000', currency: '$', period: 'month' },
      description: 'Регулярний production короткого відеоконтенту.',
      deliverables: [
        'Content planning',
        'Production',
        'Shooting days',
        'Editing',
        'Delivery',
        'Iterations',
      ],
    },
    {
      price: { kind: 'from', amount: '2,500', currency: '$', period: 'month' },
      description:
        'Стратегія, production і просування в одному регулярному циклі.',
      supporting:
        'Фінальний scope і бюджет залежать від кількості контенту, production-обсягу, рекламної активності та задач бренду.',
      deliverables: [
        'Strategy',
        'Content system',
        'Production',
        'Campaign launch',
        'Distribution',
        'Analytics & optimization',
      ],
    },
  ],
};
export type Work = {
  id: string;
  category: string;
  direction: string;
  orientation: 'portrait' | 'landscape';
  media: { type: 'image' | 'video'; src: string; poster: string; alt: string };
  href?: string;
};
export const works: Work[] = [
  {
    id: 'product',
    category: 'REELS PRODUCTION',
    direction: 'Product / Visual Storytelling',
    orientation: 'portrait',
    media: {
      type: 'video',
      src: '/media/clip-2.mp4',
      poster: '/media/clip-2.jpg',
      alt: 'Деталі одягу та типографіка у відеоконтенті',
    },
  },
  {
    id: 'lifestyle',
    category: 'REELS PRODUCTION',
    direction: 'Lifestyle / Dynamic Edit',
    orientation: 'landscape',
    media: {
      type: 'video',
      src: '/media/clip-3.mp4',
      poster: '/media/clip-3.jpg',
      alt: 'Динамічний монтаж міських вулиць',
    },
  },
  {
    id: 'motion',
    category: 'REELS PRODUCTION',
    direction: 'Motion / Sport',
    orientation: 'landscape',
    media: {
      type: 'video',
      src: '/media/clip-4.mp4',
      poster: '/media/clip-4.jpg',
      alt: 'Рух велосипеда в міському просторі',
    },
  },
  {
    id: 'office',
    category: 'REELS PRODUCTION',
    direction: 'Office / Corporate Visuals',
    orientation: 'landscape',
    media: {
      type: 'video',
      src: '/media/clip-5.mp4',
      poster: '/media/clip-5.jpg',
      alt: 'Відеоприклад корпоративного середовища',
    },
  },
  {
    id: 'design',
    category: 'REELS PRODUCTION',
    direction: 'Design / Brand Visuals',
    orientation: 'landscape',
    media: {
      type: 'video',
      src: '/media/clip-7.mp4',
      poster: '/media/clip-7.jpg',
      alt: 'Відеоприклад дизайну та візуальної мови бренду',
    },
  },
];
export const principles = [
  [
    'Бриф і задача',
    'Починаємо із короткого знайомства: визначаємо ціль, контекст, очікуваний результат і формат роботи.',
  ],
  [
    'Напрям і формат',
    'Формуємо підхід, scope, етапи, терміни та оптимальний формат співпраці під вашу задачу.',
  ],
  [
    'Реалізація',
    'Переходимо до стратегії, production або комплексної роботи — залежно від обраного формату.',
  ],
  [
    'Запуск і наступний крок',
    'Запускаємо, аналізуємо результат і визначаємо, що робити далі — завершувати проєкт або переходити в системну співпрацю.',
  ],
];
export const faqs = [
  [
    'З чого починається робота?',
    'З короткого знайомства із задачею. Визначаємо ціль, формат, очікуваний результат і необхідний обсяг роботи. Після цього фіксуємо scope, терміни та бюджет.',
  ],
  [
    'Чи можна замовити тільки Marketing?',
    'Так. Marketing працює як окремий напрям і не вимагає обов’язкового production-пакета.',
  ],
  [
    'Чи можна замовити тільки Reels Production?',
    'Так. Можемо взяти окрему production-задачу — від конкретної зйомки до серії коротких відео.',
  ],
  [
    'Чим комплексна робота відрізняється від окремої послуги?',
    'У комплексному форматі стратегія, контент, production і просування плануються як одна система. Це дозволяє створювати контент не ізольовано, а навколо конкретної маркетингової задачі.',
  ],
  [
    'Що означає ціна «від»?',
    'Це стартова вартість формату. Фінальний бюджет залежить від обсягу роботи, production-складності, кількості контенту, команди та необхідних каналів просування.',
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
    'Чи можна почати з одного проєкту і перейти на monthly?',
    'Так. Це нормальний сценарій: почати з конкретної задачі, перевірити формат роботи і за потреби перейти до регулярної співпраці.',
  ],
];
