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
    tags: ['Ідея', 'Сценарій', 'Зйомка', 'Монтаж', 'Колір', 'Звук', 'Субтитри'],
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
      'Продакшн',
      'Дистрибуція',
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
      description: 'Разова стратегічна або маркетингова задача навколо бренду.',
      deliverables: [
        'Стратегія',
        'Позиціонування',
        'Контент-напрям',
        'Рекламний запуск',
        'Оптимізація',
      ],
    },
    {
      price: {
        kind: 'from',
        amount: '1,000',
        currency: '$',
        period: 'project',
      },
      description: 'Разовий продакшн під конкретну задачу або серію контенту.',
      deliverables: [
        'Концепція',
        'Сценарій',
        'Зйомка',
        'Монтаж',
        'Адаптація під платформу',
      ],
    },
    {
      price: { kind: 'request' },
      description:
        'Комплексна робота, коли стратегія, контент і просування збираються в одну систему.',
      supporting:
        'Scope, команда та бюджет формуються після короткого брифу і знайомства із задачею.',
      deliverables: [
        'Стратегія',
        'Серія reels',
        'Запуск і дистрибуція',
        'Аналітика та висновки',
        'Подальший цикл',
      ],
    },
  ],
  monthly: [
    {
      price: { kind: 'from', amount: '1,000', currency: '$', period: 'month' },
      description: 'Постійна маркетингова робота навколо задач бренду.',
      deliverables: [
        'Оновлення стратегії',
        'Контент-напрям',
        'Управління кампаніями',
        'Дистрибуція',
        'Аналітика та оптимізація',
      ],
    },
    {
      price: { kind: 'from', amount: '2,000', currency: '$', period: 'month' },
      description:
        'Регулярний продакшн і монтаж контенту для системної присутності бренду.',
      deliverables: [
        'Контент-планування',
        'Production',
        'Знімальні дні',
        'Монтаж',
        'Підготовка матеріалів',
        'Ітерації',
      ],
    },
    {
      price: { kind: 'from', amount: '2,500', currency: '$', period: 'month' },
      description:
        'Повний щомісячний цикл: стратегія, контент, просування й оптимізація.',
      supporting:
        'Фінальний scope і бюджет залежать від кількості контенту, production-обсягу, рекламної активності та задач бренду.',
      deliverables: [
        'Стратегія',
        'Контент-система',
        'Production',
        'Запуск кампаній',
        'Дистрибуція',
        'Аналітика та оптимізація',
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
