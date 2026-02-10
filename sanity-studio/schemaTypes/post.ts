export default {
    name: 'post',
    title: 'Статьи (Блог)',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Заголовок',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'slug',
            title: 'URL (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'excerpt',
            title: 'Краткое описание',
            type: 'text',
            rows: 3,
            validation: (Rule: any) => Rule.required().max(200)
        },
        {
            name: 'mainImage',
            title: 'Главное изображение',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'body',
            title: 'Текст статьи',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image',
                    options: { hotspot: true }
                }
            ]
        },
        {
            name: 'tag',
            title: 'Тег (категория)',
            type: 'string',
        },
        {
            name: 'readTime',
            title: 'Время чтения',
            type: 'string',
        },
        {
            name: 'publishedAt',
            title: 'Дата публикации',
            type: 'datetime',
        },
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: any) {
            const { author } = selection
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`,
            })
        },
    },
}
