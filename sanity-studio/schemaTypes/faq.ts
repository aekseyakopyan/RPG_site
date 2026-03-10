// FAQ Schema
export default {
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
        {
            name: 'question',
            title: 'Вопрос',
            type: 'string',
        },
        {
            name: 'answer',
            title: 'Ответ',
            type: 'text',
            rows: 4,
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
}
