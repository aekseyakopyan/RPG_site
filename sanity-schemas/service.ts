// Service Schema
export default {
    name: 'service',
    title: 'Услуги',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Название',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'type',
            title: 'Тип',
            type: 'string',
            description: 'Например: Основная услуга, Entry point, Обучение',
        },
        {
            name: 'emoji',
            title: 'Эмодзи',
            type: 'string',
            description: 'Например: 🗡️',
        },
        {
            name: 'metaphor',
            title: 'Метафора',
            type: 'string',
            description: 'Например: Огненный меч продаж',
        },
        {
            name: 'anchor',
            title: 'Якорь (ID)',
            type: 'slug',
            description: 'Для навигации по странице (например: performance)',
            options: { source: 'name' }
        },
        {
            name: 'description',
            title: 'Описание',
            type: 'text',
            rows: 3,
        },
        {
            name: 'includes',
            title: 'Что входит',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'result',
            title: 'Результат',
            type: 'string',
        },
        {
            name: 'timeline',
            title: 'Срок',
            type: 'string',
            description: 'Например: 2 недели на запуск',
        },
        {
            name: 'price',
            title: 'Цена',
            type: 'string',
            description: 'Например: от 80K₽/мес',
        },
        {
            name: 'faqs',
            title: 'FAQ',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Вопрос', type: 'string' },
                        { name: 'answer', title: 'Ответ', type: 'text' },
                    ]
                }
            ]
        },
        {
            name: 'comparisonValues',
            title: 'Значения для сравнения',
            type: 'object',
            fields: [
                { name: 'duration', title: 'Срок (для таблицы)', type: 'string' },
                { name: 'price', title: 'Цена (для таблицы)', type: 'string' },
                { name: 'target', title: 'Для кого (для таблицы)', type: 'string' },
                { name: 'format', title: 'Формат (для таблицы)', type: 'string' },
                { name: 'result', title: 'Результат (для таблицы)', type: 'string' },
            ]
        },
        {
            name: 'icon',
            title: 'Иконка (Lucide)',
            type: 'string',
            options: {
                list: [
                    { title: 'Меч', value: 'Sword' },
                    { title: 'Поиск', value: 'Search' },
                    { title: 'Книга', value: 'BookOpen' },
                    { title: 'Колба', value: 'FlaskConical' },
                    { title: 'Рост', value: 'TrendingUp' },
                    { title: 'Цель', value: 'Target' },
                    { title: 'Лампочка', value: 'Lightbulb' },
                    { title: 'Ракета', value: 'Rocket' },
                ],
            },
        },
        {
            name: 'color',
            title: 'Цвет градиента',
            type: 'string',
            options: {
                list: [
                    { title: 'Красный → Оранжевый', value: 'from-red-400 to-orange-400' },
                    { title: 'Синий → Голубой', value: 'from-blue-400 to-cyan-400' },
                    { title: 'Фиолетовый → Розовый', value: 'from-purple-400 to-pink-400' },
                    { title: 'Зелёный → Изумрудный', value: 'from-green-400 to-emerald-400' },
                ],
            },
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
            title: 'name',
            subtitle: 'type',
        },
    },
}
