// Hero Section Schema
export default {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'badge',
            title: 'Бейдж',
            type: 'string',
            description: 'Текст над заголовком (например: PERFORMANCE-МАРКЕТОЛОГ)',
        },
        {
            name: 'title',
            title: 'Заголовок',
            type: 'string',
            description: 'Используйте <br /> для переноса строки или специальные теги, если нужно.',
        },
        {
            name: 'subtitle',
            title: 'Подзаголовок',
            type: 'text',
            rows: 3,
        },
        {
            name: 'ctaPrimary',
            title: 'Основная кнопка',
            type: 'object',
            fields: [
                { name: 'text', title: 'Текст', type: 'string' },
                { name: 'link', title: 'Ссылка', type: 'string' },
            ],
        },
        {
            name: 'ctaSecondary',
            title: 'Вторая кнопка',
            type: 'object',
            fields: [
                { name: 'text', title: 'Текст', type: 'string' },
                { name: 'link', title: 'Ссылка', type: 'string' },
            ],
        },
        {
            name: 'heroImage',
            title: 'Изображение героя',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'badges',
            title: 'Плавающие бейджи',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Текст', type: 'string' },
                        {
                            name: 'position', title: 'Позиция', type: 'string', options: {
                                list: ['left', 'right', 'bottom']
                            }
                        },
                    ],
                },
            ],
        },
        {
            name: 'stats',
            title: 'Характеристики',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Название (STR, DEX, etc)', type: 'string' },
                        { name: 'label', title: 'Метка (Сила, Ловкость)', type: 'string' },
                        { name: 'value', title: 'Значение (0-100)', type: 'number' },
                        { name: 'color', title: 'Цвет (Tailwind класс, например: bg-red-400)', type: 'string' },
                        { name: 'desc', title: 'Описание', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'socialProof',
            title: 'Социальное доказательство',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', title: 'Значение (например: 127M+)', type: 'string' },
                        { name: 'label', title: 'Описание', type: 'string' },
                        { name: 'icon', title: 'Иконка (название из Lucide)', type: 'string' },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'badge',
        },
    },
}
