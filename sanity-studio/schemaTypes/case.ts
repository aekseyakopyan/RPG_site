// Case Schema
export default {
    name: 'case',
    title: 'Кейсы',
    type: 'document',
    fields: [
        {
            name: 'enemy',
            title: 'Враг (Босс)',
            type: 'string',
            description: 'Например: ДОРОГОЙ ЛИД',
        },
        {
            name: 'slug',
            title: 'Slug (ID)',
            type: 'slug',
            options: {
                source: 'client',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'client',
            title: 'Клиент',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'niche',
            title: 'Ниша',
            type: 'string',
            description: 'Например: E-commerce, EdTech, B2B SaaS',
        },
        {
            name: 'shortDescription',
            title: 'Краткое описание',
            type: 'text',
            rows: 2,
            description: 'Для карточки в списке',
        },
        {
            name: 'icon',
            title: 'Иконка (Pixel)',
            type: 'string',
            options: {
                list: [
                    { title: 'Меч (Sword)', value: 'sword' },
                    { title: 'Щит (Shield)', value: 'shield' },
                    { title: 'Свиток (Scroll)', value: 'scroll' },
                    { title: 'Сундук (Chest)', value: 'chest' },
                    { title: 'Зелье (Potion)', value: 'potion' },
                    { title: 'Шляпа (Hat)', value: 'hat' },
                    { title: 'Мишень (Target)', value: 'target' },
                    { title: 'Молния (Lightning)', value: 'lightning' },
                    { title: 'Кубок (Trophy)', value: 'trophy' },
                    { title: 'Пузырь (Bubble)', value: 'bubble' },
                    { title: 'Карта (Map)', value: 'map' },
                    { title: 'Монеты (Coins)', value: 'coins' },
                ],
            },
        },
        {
            name: 'iconColor',
            title: 'Цвет иконки',
            type: 'string',
            options: {
                list: [
                    { title: 'Розовый', value: 'bg-pink-100 text-pink-600' },
                    { title: 'Синий', value: 'bg-blue-100 text-blue-600' },
                    { title: 'Фиолетовый', value: 'bg-purple-100 text-purple-600' },
                    { title: 'Зелёный', value: 'bg-green-100 text-green-600' },
                    { title: 'Оранжевый', value: 'bg-orange-100 text-orange-600' },
                ],
            },
        },
        {
            name: 'color',
            title: 'Цвет градиента',
            type: 'string',
            description: 'Например: from-pink-500 to-rose-500',
        },
        {
            name: 'mainMetrics',
            title: 'Главные метрики (для карточки)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Метрика', type: 'string' },
                        { name: 'value', title: 'Значение', type: 'string' },
                        { name: 'growth', title: 'Рост', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'challenge',
            title: 'Челлендж',
            type: 'text',
            rows: 2,
            description: 'Какая была проблема у клиента',
        },
        {
            name: 'solution',
            title: 'Решение (Путь к победе)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Название этапа', type: 'string' },
                        { name: 'steps', title: 'Шаги', type: 'array', of: [{ type: 'string' }] },
                    ],
                },
            ],
            description: 'Этапы решения (например: Аудит, Настройка, Масштабирование)',
        },
        {
            name: 'results',
            title: 'Результаты',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Метрика', type: 'string' },
                        { name: 'before', title: 'До', type: 'string' },
                        { name: 'after', title: 'После', type: 'string' },
                        {
                            name: 'icon',
                            title: 'Иконка',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Рост ↑', value: 'TrendingUp' },
                                    { title: 'Падение ↓', value: 'TrendingDown' },
                                ],
                            },
                        },
                        { name: 'improvement', title: 'Улучшение (например: +45%)', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'numbers',
            title: 'Цифры',
            type: 'string',
            description: 'Итоговые цифры проекта',
        },
        {
            name: 'tools',
            title: 'Инструменты',
            type: 'string',
            description: 'Какие инструменты использовались',
        },
        {
            name: 'duration',
            title: 'Длительность',
            type: 'string',
            description: 'Сколько времени занял проект',
        },
        {
            name: 'image',
            title: 'Изображение',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'order',
            title: 'Порядок',
            type: 'number',
        },
        {
            name: 'testimonial',
            title: 'Отзыв клиента',
            type: 'object',
            fields: [
                { name: 'text', title: 'Текст отзыва', type: 'text', rows: 4 },
                { name: 'author', title: 'Автор (Имя)', type: 'string' },
                { name: 'position', title: 'Должность', type: 'string' },
            ],
        },
    ],
    orderings: [
        {
            title: 'По порядку',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'client',
            subtitle: 'niche',
            media: 'image',
        },
    },
}
