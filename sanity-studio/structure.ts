import type { StructureBuilder } from 'sanity/structure'

// Helper to define singletons
const singletonListItem = (S: StructureBuilder, typeName: string, title?: string) =>
    S.listItem()
        .title(title || typeName)
        .id(typeName)
        .child(
            S.document()
                .schemaType(typeName)
                .documentId(typeName)
        )

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Контент')
        .items([
            // Singletons
            singletonListItem(S, 'settings', '⚙️ Настройки сайта'),
            S.divider(),
            singletonListItem(S, 'hero', '🏠 Главная: Hero & Профиль'),
            S.divider(),

            // Content Collections
            S.documentTypeListItem('service').title('🛠️ Услуги (Арсенал)'),
            S.documentTypeListItem('case').title('📜 Кейсы (Летопись)'),
            S.documentTypeListItem('review').title('⭐ Отзывы (Таверна)'),
            S.documentTypeListItem('quest').title('🎯 Квест (Шаги)'),
            S.documentTypeListItem('battleQuestion').title('⚔️ Battle Test (Вопросы)'),
            S.documentTypeListItem('processStep').title('🛤️ Путь Героя (Процесс)'),
        ])
