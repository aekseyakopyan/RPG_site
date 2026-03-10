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
            name: 'slug',
            title: 'Slug (ID)',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'type',
            title: 'Тип',
            type: 'string',
            description: 'Например: Основная услуга, Entry point, Обучение',
        },
        {
            name: 'metaphor',
            title: 'Метафора',
            type: 'string',
            description: 'Короткая фраза (например: Точечный удар)',
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
            name: 'results',
            title: 'Результаты',
            type: 'array',
            of: [{ type: 'string' }],
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
            name: 'comparisonValues',
            title: 'Данные для сравнения',
            type: 'object',
            fields: [
                { name: 'duration', title: 'Срок', type: 'string' },
                { name: 'price', title: 'Цена', type: 'string' },
                { name: 'target', title: 'Для кого', type: 'string' },
                { name: 'format', title: 'Формат', type: 'string' },
                { name: 'result', title: 'Результат', type: 'string' },
            ],
            options: { collapsible: true }
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
                        { name: 'answer', title: 'Ответ', type: 'text', rows: 3 },
                    ],
                },
            ],
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
            name: 'color',
            title: 'Цвет градиента',
            type: 'string',
            options: {
                list: [
                    { title: 'Золотой → Оранжевый', value: 'from-rpg-gold to-orange-400' },
                    { title: 'Синий → Голубой', value: 'from-blue-400 to-cyan-400' },
                    { title: 'Фиолетовый → Розовый', value: 'from-purple-400 to-pink-400' },
                    { title: 'Зелёный → Изумрудный', value: 'from-green-400 to-emerald-400' },
                    { title: 'Красный → Розовый', value: 'from-red-400 to-rose-400' },
                ],
            },
        },
        {
            name: 'stats',
            title: 'RPG Характеристики',
            type: 'object',
            fields: [
                { name: 'damage', title: 'Damage (0-100)', type: 'number' },
                { name: 'speed', title: 'Speed (0-100)', type: 'number' },
                { name: 'control', title: 'Control (0-100)', type: 'number' },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            }
        },
        {
            name: 'order',
            title: 'Порядок',
            type: 'number',
            description: 'Порядок отображения на странице',
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
