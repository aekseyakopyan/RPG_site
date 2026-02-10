// Case Schema
export default {
    name: 'case',
    title: 'Кейсы',
    type: 'document',
    fields: [
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
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'client' },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'emoji',
            title: 'Эмодзи',
            type: 'string',
            description: 'Например: 👗',
        },
        {
            name: 'shortDescription',
            title: 'Краткое описание',
            type: 'string',
            description: 'Для карточки в списке кейсов',
        },
        {
            name: 'challenge',
            title: 'Челлендж',
            type: 'text',
            rows: 3,
            description: 'Какая была проблема у клиента',
        },
        {
            name: 'mainMetrics',
            title: 'Основные метрики (для карточки)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Название', type: 'string' },
                        { name: 'value', title: 'Значение', type: 'string' },
                        { name: 'growth', title: 'Рост/Изменение', type: 'string' },
                    ]
                }
            ],
            validation: (Rule: any) => Rule.max(3),
        },
        {
            name: 'solution',
            title: 'Решение (детально)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Заголовок этапа', type: 'string' },
                        { name: 'steps', title: 'Шаги', type: 'array', of: [{ type: 'string' }] },
                    ]
                }
            ],
        },
        {
            name: 'results',
            title: 'Все результаты (для детальной страницы)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Метрика', type: 'string' },
                        { name: 'before', title: 'До', type: 'string' },
                        { name: 'after', title: 'После', type: 'string' },
                        { name: 'improvement', title: 'Улучшение (%)', type: 'string' },
                        {
                            name: 'icon',
                            title: 'Иконка',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Рост ↑', value: 'TrendingUp' },
                                    { title: 'Падение ↓', value: 'TrendingDown' },
                                    { title: 'График', value: 'BarChart3' },
                                    { title: 'Процент', value: 'Percent' },
                                    { title: 'Цель', value: 'Target' },
                                    { title: 'Пользователи', value: 'Users' },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'color',
            title: 'Цвет карточки (градиент)',
            type: 'string',
            options: {
                list: [
                    { title: 'Розовый → Красный', value: 'from-pink-500 to-rose-500' },
                    { title: 'Синий → Индиго', value: 'from-blue-500 to-indigo-500' },
                    { title: 'Изумрудный → Бирюзовый', value: 'from-emerald-500 to-teal-500' },
                    { title: 'Оранжевый → Желтый', value: 'from-orange-500 to-amber-500' },
                    { title: 'Фиолетовый → Пурпурный', value: 'from-violet-500 to-purple-500' },
                ],
            },
        },
        {
            name: 'testimonial',
            title: 'Отзыв клиента',
            type: 'object',
            fields: [
                { name: 'text', title: 'Текст', type: 'text' },
                { name: 'author', title: 'Автор', type: 'string' },
                { name: 'position', title: 'Должность', type: 'string' },
            ]
        },
        {
            name: 'tools',
            title: 'Инструменты',
            type: 'string',
        },
        {
            name: 'duration',
            title: 'Длительность',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Изображение / Обложка',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'order',
            title: 'Порядок',
            type: 'number',
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
