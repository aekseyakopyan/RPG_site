// Settings Schema
export default {
    name: 'settings',
    title: 'Настройки сайта',
    type: 'document',
    fields: [
        {
            name: 'siteName',
            title: 'Название сайта',
            type: 'string',
        },
        {
            name: 'siteDescription',
            title: 'Описание сайта',
            type: 'text',
            rows: 3,
        },
        {
            name: 'logo',
            title: 'Логотип',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'primaryColor',
            title: 'Основной цвет',
            type: 'color',
        },
        {
            name: 'secondaryColor',
            title: 'Дополнительный цвет',
            type: 'color',
        },
        {
            name: 'contactEmail',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'contactPhone',
            title: 'Телефон',
            type: 'string',
        },
        {
            name: 'telegram',
            title: 'Telegram',
            type: 'string',
            description: 'Username без @',
        },
        {
            name: 'socialLinks',
            title: 'Социальные сети',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Платформа',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Telegram', value: 'telegram' },
                                    { title: 'VK', value: 'vk' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'Instagram', value: 'instagram' },
                                ],
                            },
                        },
                        { name: 'url', title: 'Ссылка', type: 'url' },
                    ],
                },
            ],
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                { name: 'title', title: 'Meta Title', type: 'string' },
                { name: 'description', title: 'Meta Description', type: 'text', rows: 2 },
                { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
                { name: 'ogImage', title: 'Open Graph изображение', type: 'image' },
            ],
        },
    ],
    preview: {
        select: {
            title: 'siteName',
        },
    },
}
