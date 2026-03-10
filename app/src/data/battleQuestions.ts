export type Priority = 'critical' | 'important' | 'basic';
export type Category = 'business' | 'marketing' | 'sales';
export type DifficultyMode = 'quick' | 'standard' | 'full';

export interface Explanation {
    title: string;
    why: string;
    pros?: string[];
    risks?: string[];
    realCase?: string;
    howToImprove?: string;
    actionable?: string;
    resources?: string[];
    savings?: string;
}

export interface Option {
    id: string;
    text: string;
    points: number;
    explanation: Explanation;
}

export interface Question {
    id: string;
    category: Category;
    priority: Priority;
    text: string;
    options: Option[];
    inQuickTest: boolean;
    inStandardTest: boolean;
    inFullTest: boolean;
    hint?: string;
}

export const questionBank: Question[] = [
    // --- BUSINESS CATEGORY ---
    {
        id: 'b1',
        category: 'business',
        priority: 'critical',
        text: 'Ты знаешь свой Customer Acquisition Cost (CAC)?',
        hint: 'Это стоимость привлечения одного платящего клиента.',
        inQuickTest: true,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: 'Да, отслеживаю ежедневно',
                points: 15,
                explanation: {
                    title: 'ОТЛИЧНО! +15 баллов',
                    why: 'Ежедневное отслеживание CAC — это признак зрелого data-driven подхода.',
                    pros: [
                        'Быстро замечаешь изменения',
                        'Можешь оперативно корректировать бюджет',
                        'Видишь аномалии сразу',
                        'Принимаешь решения на основе данных'
                    ],
                    actionable: 'Убедись, что учитываешь ВСЕ затраты: Прямые расходы на рекламу, Зарплата маркетологов (пропорционально), Инструменты и сервисы, Комиссии площадок.',
                    resources: ['Шаблон расчёта CAC', 'Видео "Глубокая аналитика CAC"']
                }
            },
            {
                id: 'B',
                text: 'Примерно знаю, считаю раз в месяц',
                points: 10,
                explanation: {
                    title: 'ХОРОШО! +10 баллов',
                    why: 'Ты понимаешь важность CAC и считаешь его. Это уже ставит тебя выше 70% бизнесов.',
                    pros: ['Отслеживаешь ключевую метрику', 'Можешь видеть месячные тренды', 'Понимаешь стоимость клиента'],
                    risks: ['Месяц — большой период для коррекций', 'Можешь слить лишние 20-30K за месяц', 'Не видишь аномалии сразу'],
                    howToImprove: '1. Настрой автоматический дашборд. 2. Проверяй CAC минимум еженедельно. 3. Установи алерты на аномалии.',
                    savings: 'Переход с месячного на недельный контроль может сэкономить 15-25% бюджета.'
                }
            },
            {
                id: 'C',
                text: 'Слышал термин, но не считал',
                points: -5,
                explanation: {
                    title: 'НЕВЕРНО. -5 баллов',
                    why: 'Знать термин, но не использовать его — всё равно что иметь карту сокровищ, но не искать клад.',
                    risks: ['Сливаешь 40-60% бюджета впустую', 'Масштабируешь НЕработающие каналы', 'Упускаешь прибыльные возможности', 'Принимаешь решения "на глаз"'],
                    realCase: 'Клиент сливал 140К из 200К в месяц в минус, потому что Директ давал CAC 4500₽ при LTV 8000₽ (убыток).',
                    actionable: 'Создай таблицу в Excel: Месяц | Расходы | Клиенты | CAC. Начни заполнять хотя бы раз в неделю.',
                    resources: ['Шаблон для расчёта CAC (бесплатно)']
                }
            },
            {
                id: 'D',
                text: 'Не знаю, что это',
                points: -10,
                explanation: {
                    title: 'КРИТИЧНО! -10 баллов',
                    why: 'CAC — самая важная метрика. Не знать её — как водить машину с закрытыми глазами.',
                    risks: ['Деньги на неэффективной рекламе', 'Время на "слепое" тестирование', 'Невозможность масштабироваться', 'Конкуренты выигрывают'],
                    actionable: '1. Останови все кампании, где не знаешь окупаемость. 2. Посмотри видео "Как считать CAC". 3. Начни считать ПРЯМО СЕЙЧАС.',
                    resources: ['Видео-инструкция по CAC', 'Персональные рекомендации']
                }
            }
        ]
    },
    {
        id: 'b2',
        category: 'business',
        priority: 'critical',
        text: 'Какой у тебя LTV (Lifetime Value) клиента?',
        inQuickTest: true,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: 'Знаю точно, есть когортный анализ',
                points: 15,
                explanation: {
                    title: 'СУПЕР! +15 баллов',
                    why: 'Когортный анализ LTV — это высший пилотаж. Ты видишь, как меняется качество клиентов со временем.',
                    pros: ['Понимаешь реальную ценность клиента', 'Можешь прогнозировать выручку', 'Видишь эффективность удержания'],
                    actionable: 'Используй LTV для сегментации VIP-клиентов и создания для них особых предложений.'
                }
            },
            {
                id: 'B',
                text: 'Считал средний, примерно знаю',
                points: 10,
                explanation: {
                    title: 'НЕПЛОХО. +10 баллов',
                    why: 'Средний LTV лучше, чем ничего, но "средняя температура по больнице" может скрывать проблемы.',
                    risks: ['Не видишь оттока в конкретных каналах', 'Усреднение скрывает убыточные сегменты'],
                    howToImprove: 'Попробуй разделить LTV хотя бы по каналам привлечения (LTV с SEO vs LTV с рекламы).'
                }
            },
            {
                id: 'C',
                text: 'Не считал, но могу прикинуть',
                points: -5,
                explanation: {
                    title: 'ОШИБКА. -5 баллов',
                    why: 'Прикидки в бизнесе обычно ошибаются в 2-3 раза. Ты, скорее всего, переоцениваешь лояльность.',
                    risks: ['Завышаешь допустимый CAC', 'Теряешь деньги на привлечении убыточных клиентов'],
                    actionable: 'Посчитай: (Средний чек) × (Среднее кол-во покупок за жизнь клиента).'
                }
            },
            {
                id: 'D',
                text: 'Понятия не имею',
                points: -10,
                explanation: {
                    title: 'ОПАСНО. -10 баллов',
                    why: 'Без LTV ты не знаешь, сколько МАКСИМУМ можешь заплатить за клиента, чтобы остаться в плюсе.',
                    risks: ['Работа в убыток на длинной дистанции', 'Непонимание "потолка" стоимости лида'],
                    actionable: 'Начни с простого: сколько денег один клиент приносит за год? Это будет твоим ориентиром LTV (1 year).'
                }
            }
        ]
    },
    {
        id: 'b3',
        category: 'business',
        priority: 'important',
        text: 'Как ты планируешь финансовую модель?',
        inQuickTest: false,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: 'Есть P&L, Cashflow и план-факт',
                points: 10,
                explanation: {
                    title: 'ПРОФЕССИОНАЛЬНО! +10 баллов',
                    why: 'Полный набор финансовых отчетов дает полный контроль над пульсом бизнеса.',
                    pros: ['Нет кассовых разрывов', 'Понятная рентабельность', 'Прозрачные расходы']
                }
            },
            {
                id: 'B',
                text: 'Только доходы и расходы (Cashflow)',
                points: 5,
                explanation: {
                    title: 'БАЗА ЕСТЬ. +5 баллов',
                    why: 'Движение денег (DDS) важно, но оно не показывает прибыль (P&L).',
                    risks: ['Можно быть прибыльным "на бумаге", но без денег', 'Или с деньгами, но в убытке (на авансах)'],
                    howToImprove: 'Внедрить отчет о Прибылях и Убытках (P&L) по методу начисления.'
                }
            },
            {
                id: 'C',
                text: 'Смотрю остаток на счете',
                points: -5,
                explanation: {
                    title: 'ПЛОХО. -5 баллов',
                    why: 'Остаток на счете — это иллюзия. Это могут быть чужие деньги (предоплаты, долги).',
                    risks: ['Кассовый разрыв внезапно', 'Трата оборотных средств на личные нужды'],
                    actionable: 'Срочно начни вести учет всех поступлений и выплат по статьям.'
                }
            }
        ]
    },

    // --- MARKETING CATEGORY ---
    {
        id: 'm1',
        category: 'marketing',
        priority: 'important',
        text: 'Сколько креативов нужно тестировать одновременно для A/B теста?',
        inQuickTest: true,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'C',
                text: '3-5 креативов (мультитест)',
                points: 10,
                explanation: {
                    title: 'ИДЕАЛЬНО! +10 баллов',
                    why: '3-5 креативов — золотая середина. Достаточно для статистики, но не размывает бюджет.',
                    pros: ['Статистическая значимость', 'Разнообразие подходов', 'Управляемость'],
                    actionable: 'Меняй только одну переменную за раз (или визуал, или оффер, или заголовок).'
                }
            },
            {
                id: 'B',
                text: '2 креатива (классический A/B)',
                points: 5,
                explanation: {
                    title: 'ПРИЕМЛЕМО. +5 баллов',
                    why: 'Классика, но ты ограничиваешь себя выбором "лучшего из двух", упуская потенциальные хиты.',
                    risks: ['Оба варианта могут быть средними', 'Дольше ищешь связку-чемпиона'],
                    howToImprove: 'Добавь третий вариант — кардинально другой подход (например, видео вместо фото).'
                }
            },
            {
                id: 'A',
                text: '1 креатив (зачем больше?)',
                points: -8,
                explanation: {
                    title: 'НЕВЕРНО. -8 баллов',
                    why: 'Запуск одного креатива — это лотерея. Если он "не зайдет", ты решишь, что реклама не работает вообще.',
                    risks: ['Слив бюджета впустую', 'Ложные выводы о канале'],
                    realCase: 'Креатив #1 давал CPA 2800р, а Креатив #3 в том же запуске — 850р. Разница в 3 раза!',
                    actionable: 'Всегда запускай минимум 2-3 варианта.'
                }
            },
            {
                id: 'D',
                text: '10+ креативов (всё подряд)',
                points: -3,
                explanation: {
                    title: 'СЛИШКОМ МНОГО. -3 балла',
                    why: 'Если бюджет не огромен, 10 креативов "размажут" его тонким слоем. Данных не хватит для выводов.',
                    risks: ['Долгий сбор статистики', 'Сложный анализ', 'Дорогое производство'],
                    howToImprove: 'Лучше тестируй итерациями: 5 креативов -> отбор топ-2 -> еще 5 креативов.'
                }
            }
        ]
    },
    {
        id: 'm2',
        category: 'marketing',
        priority: 'critical',
        text: 'Какая конверсия лендинга считается ХОРОШЕЙ?',
        inQuickTest: true,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: 'Больше 10%',
                points: 10,
                explanation: {
                    title: 'ОТЛИЧНО! +10 баллов',
                    why: 'Конверсия выше 10% (в заявку/регистрацию) для холодного трафика — это топ-уровень.',
                    pros: ['Высокая рентабельность', 'Качественный оффер', 'Попадание в ЦА']
                }
            },
            {
                id: 'B',
                text: '5-10%',
                points: 7,
                explanation: {
                    title: 'ХОРОШО. +7 баллов',
                    why: 'Это стандарт для большинства ниш и качественных сайтов. Есть куда расти, но бизнес уже работает.',
                    actionable: 'Попробуй усилить оффер или упростить форму заявки для роста до 10%+.'
                }
            },
            {
                id: 'C',
                text: '2-5%',
                points: 3,
                explanation: {
                    title: 'СРЕДНЕ. +3 балла',
                    why: 'Для интернет-магазина это норм, но для лендинга услуг — маловато. Реклама может быть на грани окупаемости.',
                    actionable: 'Проверь первый экран сайта: понятен ли заголовок за 3 секунды? Видна ли кнопка?'
                }
            },
            {
                id: 'D',
                text: 'Меньше 2%',
                points: -3,
                explanation: {
                    title: 'ПРОБЛЕМА. -3 балла',
                    why: 'С такой конверсией крайне сложно окупить платный трафик.',
                    actionable: 'Не масштабируй рекламу! Сначала переделай посадочную страницу. Проблема в ней, а не в трафике.'
                }
            }
        ]
    },
    {
        id: 'm3',
        category: 'marketing',
        priority: 'basic',
        text: 'Формула ROI (Return on Investment) — это?',
        inQuickTest: false,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: '(Прибыль − Затраты) / Затраты × 100%',
                points: 15,
                explanation: {
                    title: 'ВЕРНО! +15 баллов',
                    why: 'Это классическая формула. Она показывает, сколько рублей прибыли приносит каждый вложенный рубль.',
                    pros: ['Понимаешь реальную эффективность инвестиций']
                }
            },
            {
                id: 'B',
                text: 'Выручка / Затраты × 100%',
                points: -5,
                explanation: {
                    title: 'ОШИБКА. -5 баллов',
                    why: 'Это формула ROAS (Return on Ad Spend) или ДРР (в другой вариации). Она не учитывает себестоимость и маржу.',
                    risks: ['Можно иметь высокий ROAS, но отрицательный ROI (если маржа низкая)']
                }
            },
            {
                id: 'C',
                text: '(Выручка − Затраты) / Выручка',
                points: -5,
                explanation: {
                    title: 'НЕТ. -5 баллов',
                    why: 'Это формула Маржинальности (Margin). Показывает долю прибыли в выручке, а не возврат инвестиций.'
                }
            },
            {
                id: 'D',
                text: 'Не знаю',
                points: -10,
                explanation: {
                    title: 'ПЛОХО. -10 баллов',
                    why: 'ROI — король метрик. Не зная его, ты инвестируешь вслепую.',
                    actionable: 'Выучи: (Доход с рекламы - Расход на рекламу) / Расход на рекламу * 100%.'
                }
            }
        ]
    },

    // --- SALES CATEGORY ---
    {
        id: 's1',
        category: 'sales',
        priority: 'critical',
        text: 'Как быстро нужно перезвонить по входящей заявке?',
        inQuickTest: true,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: 'В течение 5-15 минут',
                points: 15,
                explanation: {
                    title: 'ИДЕАЛЬНО! +15 баллов',
                    why: 'Speed to Lead — критический фактор. Вероятность дозвониться через 5 мин в 100 раз выше, чем через 30 мин.',
                    pros: ['Клиент еще "горячий"', 'Не успел уйти к конкурентам', 'Вау-эффект от скорости']
                }
            },
            {
                id: 'B',
                text: 'В течение часа',
                points: 5,
                explanation: {
                    title: 'НОРМАЛЬНО. +5 баллов',
                    why: 'Приемлемо, но ты уже теряешь около 30-50% конверсии в диалог.',
                    actionable: 'Постарайся сократить до 15 минут.'
                }
            },
            {
                id: 'C',
                text: 'В течение дня',
                points: -5,
                explanation: {
                    title: 'ПЛОХО. -5 баллов',
                    why: 'К вечеру клиент уже может забыть, что оставлял заявку, или купить у конкурента.',
                    risks: ['Низкая конверсия', 'Клиент "остыл"', 'Негатив ("зачем вы мне звоните?")']
                }
            },
            {
                id: 'D',
                text: 'Как освобожусь (1-2 дня)',
                points: -10,
                explanation: {
                    title: 'УЖАСНО. -10 баллов',
                    why: 'Через день заявка "протухает". Конверсия падает практически до нуля.',
                    actionable: 'Если не успеваешь — найми менеджера или настрой автоответ "Перезвоним в удобное время".'
                }
            }
        ]
    },
    {
        id: 's2',
        category: 'sales',
        priority: 'important',
        text: 'Используешь ли ты CRM-систему?',
        inQuickTest: true,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: 'Да, все сделки ведутся там',
                points: 10,
                explanation: {
                    title: 'ОТЛИЧНО! +10 баллов',
                    why: 'CRM — это "вторая память" бизнеса. Ты контролируешь воронку и не теряешь клиентов.',
                    pros: ['История общения', 'Напоминания', 'Аналитика причин отказа']
                }
            },
            {
                id: 'B',
                text: 'Записываю в Excel/Google Sheets',
                points: 0,
                explanation: {
                    title: 'ТЕРПИМО. 0 баллов',
                    why: 'Лучше, чем блокнот, но нет автоматизации, напоминаний и записи звонков.',
                    risks: ['Человеческий фактор (забыл внести)', 'Сложно строить отчеты', 'Нет интеграции с телефонией'],
                    actionable: 'Переходи на CRM (AmoCRM, Bitrix24). Есть бесплатные тарифы для старта.'
                }
            },
            {
                id: 'C',
                text: 'Блокнот / Стикеры / Память',
                points: -10,
                explanation: {
                    title: 'ПЛОХО. -10 баллов',
                    why: 'Память подводит. Блокнот теряется. Клиенты забываются.',
                    risks: ['Потеря лидов', 'Отсутствие базы для рассылок', 'Невозможность делегировать продажи'],
                    actionable: 'Внедрение CRM повышает продажи на 20-30% просто за счет порядка.'
                }
            }
        ]
    },
    {
        id: 's3',
        category: 'sales',
        priority: 'basic',
        text: 'Что такое "Квалификация лида"?',
        inQuickTest: false,
        inStandardTest: true,
        inFullTest: true,
        options: [
            {
                id: 'A',
                text: 'Оценка, подходит ли нам клиент (бюджет, ЛПР, сроки)',
                points: 10,
                explanation: {
                    title: 'ВЕРНО! +10 баллов',
                    why: 'Квалификация (например, по BANT) экономит время, отсеивая нецелевых клиентов.',
                    pros: ['Фокус на тех, кто купит', 'Экономия времени сейлза']
                }
            },
            {
                id: 'B',
                text: 'Проверка контактов клиента',
                points: -2,
                explanation: {
                    title: 'НЕ СОВСЕМ. -2 балла',
                    why: 'Проверка контактов — это верификация, а не квалификация.',
                    actionable: 'Изучи методологию BANT (Budget, Authority, Need, Time).'
                }
            },
            {
                id: 'C',
                text: 'Убеждение клиента купить',
                points: -5,
                explanation: {
                    title: 'ОШИБКА. -5 баллов',
                    why: 'Это "закрытие" или презентация. Квалификация идет ДО презентации.',
                    risks: ['Тратишь время на презентацию тому, у кого нет денег']
                }
            }
        ]
    }
];

// Shuffle helper
export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function selectQuestions(mode: DifficultyMode): Question[] {
    // For 'quick', select 10 questions total (prioritizing critical)
    // Since our bank is small now, we might need to reuse.
    // In a real scenario, we filter by tags. Here I will mock the selection logic
    // based on the provided JSON structure which has 'inQuickTest', etc.

    const relevantQuestions = questionBank.filter(q => {
        if (mode === 'quick') return q.inQuickTest;
        if (mode === 'standard') return q.inStandardTest;
        return q.inFullTest;
    });

    // If we have fewer questions than the mode requires, return all relevant.
    // In a full implementation, we would ensure the bank is large enough.
    // Current bank is small (~9 questions), so we return all we have for now.

    return shuffleArray(relevantQuestions);
}
