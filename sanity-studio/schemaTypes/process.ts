// Process Schema
export default {
    name: 'processStep',
    title: 'Этапы процесса',
    type: 'document',
    fields: [
        {
            name: 'order',
            title: 'Порядок',
            type: 'number',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'title',
            title: 'Название этапа',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Подзаголовок (Level)',
            type: 'string',
        },
        {
            name: 'metaphor',
            title: 'Метафора (RPG описание)',
            type: 'text',
            rows: 2,
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
            description: 'Например: from-blue-500 to-indigo-500',
        },
        {
            name: 'details',
            title: 'Детали (список)',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'result',
            title: 'Результат',
            type: 'string',
        },
        {
            name: 'xp',
            title: 'Очки опыта (XP)',
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
            title: 'title',
            subtitle: 'subtitle',
        },
    },
}
