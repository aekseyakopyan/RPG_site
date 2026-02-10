// Quest Schema
export default {
    name: 'quest',
    title: 'Квесты (Квиз)',
    type: 'document',
    fields: [
        {
            name: 'stepId',
            title: 'ID шага',
            type: 'number',
            validation: (Rule: any) => Rule.required().integer(),
        },
        {
            name: 'type',
            title: 'Тип шага',
            type: 'string',
            options: {
                list: [
                    { title: 'Выбор (Choice)', value: 'choice' },
                    { title: 'Форма (Form)', value: 'form' },
                ],
            },
            initialValue: 'choice',
        },
        {
            name: 'title',
            title: 'Заголовок (например: КЛАСС ГЕРОЯ)',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Подзаголовок (например: Выберите вашу специализацию)',
            type: 'string',
        },
        {
            name: 'question',
            title: 'Вопрос',
            type: 'text',
            rows: 2,
        },
        {
            name: 'icon',
            title: 'Иконка шага',
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
            name: 'options',
            title: 'Варианты ответов',
            type: 'array',
            hidden: ({ document }: any) => document?.type === 'form',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Текст ответа', type: 'string' },
                        { name: 'subtext', title: 'Подтекст', type: 'string' },
                        { name: 'value', title: 'Значение (ID)', type: 'string' },
                        { name: 'xp', title: 'XP за выбор', type: 'number' },
                        {
                            name: 'icon',
                            title: 'Иконка',
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
                    ],
                },
            ],
        },
    ],
    orderings: [
        {
            title: 'По порядку',
            name: 'stepIdAsc',
            by: [{ field: 'stepId', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'question',
        },
    },
}
