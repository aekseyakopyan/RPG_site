// Review Schema
export default {
    name: 'review',
    title: 'Отзывы',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Имя',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'position',
            title: 'Должность',
            type: 'string',
        },
        {
            name: 'company',
            title: 'Компания',
            type: 'string',
        },
        {
            name: 'niche',
            title: 'Ниша',
            type: 'string',
            description: 'Например: EdTech, E-commerce',
        },
        {
            name: 'text',
            title: 'Текст отзыва',
            type: 'text',
            rows: 4,
        },
        {
            name: 'rating',
            title: 'Рейтинг',
            type: 'number',
            validation: (Rule: any) => Rule.min(1).max(5),
            description: 'От 1 до 5',
        },
        {
            name: 'avatar',
            title: 'Фото',
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
            subtitle: 'company',
            media: 'avatar',
        },
    },
}
