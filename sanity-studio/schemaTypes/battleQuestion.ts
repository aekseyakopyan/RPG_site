export default {
    name: 'battleQuestion',
    title: 'Вопросы (Battle Test)',
    type: 'document',
    fields: [
        {
            name: 'text',
            title: 'Текст вопроса',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'category',
            title: 'Категория',
            type: 'string',
            options: {
                list: [
                    { title: 'Бизнес (Business)', value: 'business' },
                    { title: 'Маркетинг (Marketing)', value: 'marketing' },
                    { title: 'Продажи (Sales)', value: 'sales' },
                ],
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'priority',
            title: 'Приоритет',
            type: 'string',
            options: {
                list: [
                    { title: 'Критический (Critical)', value: 'critical' },
                    { title: 'Важный (Important)', value: 'important' },
                    { title: 'Базовый (Basic)', value: 'basic' },
                ],
            },
            initialValue: 'important',
        },
        {
            name: 'difficulty',
            title: 'Сложность (в каких тестах участвует)',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Быстрый (Quick)', value: 'quick' },
                    { title: 'Стандарт (Standard)', value: 'standard' },
                    { title: 'Полный (Full)', value: 'full' },
                ],
            },
            initialValue: ['full'],
        },
        {
            name: 'hint',
            title: 'Подсказка',
            type: 'text',
            rows: 2,
        },
        {
            name: 'options',
            title: 'Варианты ответов',
            type: 'array',
            validation: (Rule: any) => Rule.required().min(2),
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Текст ответа', type: 'string' },
                        { name: 'points', title: 'Баллы (+/-)', type: 'number' },
                        {
                            name: 'explanation',
                            title: 'Объяснение',
                            type: 'object',
                            fields: [
                                { name: 'title', title: 'Заголовок отзыва', type: 'string' },
                                { name: 'why', title: 'Почему так (Why)', type: 'text' },
                                {
                                    name: 'pros',
                                    title: 'Плюсы (Pros)',
                                    type: 'array',
                                    of: [{ type: 'string' }]
                                },
                                {
                                    name: 'risks',
                                    title: 'Риски (Risks)',
                                    type: 'array',
                                    of: [{ type: 'string' }]
                                },
                                { name: 'actionable', title: 'Что делать (Actionable)', type: 'text' },
                            ]
                        }
                    ],
                    preview: {
                        select: {
                            title: 'text',
                            subtitle: 'points'
                        },
                        prepare({ title, subtitle }: any) {
                            return {
                                title,
                                subtitle: `${subtitle > 0 ? '+' : ''}${subtitle} баллов`
                            }
                        }
                    }
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'text',
            category: 'category',
            priority: 'priority'
        },
        prepare({ title, category, priority }: any) {
            const emojis: Record<string, string> = {
                business: '💼',
                marketing: '📈',
                sales: '💰'
            }
            return {
                title: `${emojis[category] || ''} ${title}`,
                subtitle: `${category} • ${priority}`
            }
        }
    },
}
