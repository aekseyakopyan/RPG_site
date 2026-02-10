# 🎛️ ПЛАН АДМИНКИ ДЛЯ САЙТА МАРКЕТОЛОГА

## 📋 ОБЗОР

Создание полноценной админ-панели для управления всем контентом сайта без необходимости редактирования кода.

---

## 🎯 ЦЕЛИ

1. ✅ Редактирование всех текстов на сайте
2. ✅ Управление кейсами, услугами, отзывами
3. ✅ Загрузка и замена изображений
4. ✅ Настройка цветов и стилей
5. ✅ Управление SEO-метаданными
6. ✅ Просмотр статистики (просмотры, XP, конверсии)

---

## 🏗️ АРХИТЕКТУРА

### **Вариант 1: Headless CMS (Рекомендуется)**

#### **Sanity CMS** ⭐ (Лучший выбор)

**Преимущества:**
- 🎨 Визуальный редактор
- 🔄 Real-time обновления
- 🖼️ Встроенное управление медиа
- 🌐 CDN для изображений
- 🆓 Бесплатный план (до 3 пользователей)
- 📱 Мобильное приложение
- 🔌 Простая интеграция с React

**Структура данных:**

```typescript
// schemas/hero.ts
{
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'text' },
    { name: 'ctaText', type: 'string' },
    { name: 'ctaLink', type: 'url' },
    { name: 'image', type: 'image' }
  ]
}

// schemas/service.ts
{
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'includes', type: 'array', of: [{ type: 'string' }] },
    { name: 'price', type: 'string' },
    { name: 'timeline', type: 'string' },
    { name: 'icon', type: 'string' },
    { name: 'color', type: 'string' }
  ]
}

// schemas/case.ts
{
  name: 'case',
  title: 'Cases',
  type: 'document',
  fields: [
    { name: 'client', type: 'string' },
    { name: 'niche', type: 'string' },
    { name: 'challenge', type: 'text' },
    { name: 'solution', type: 'array', of: [{ type: 'string' }] },
    { name: 'results', type: 'array', of: [
      {
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'before', type: 'string' },
          { name: 'after', type: 'string' }
        ]
      }
    ]},
    { name: 'numbers', type: 'string' },
    { name: 'tools', type: 'string' },
    { name: 'duration', type: 'string' },
    { name: 'image', type: 'image' }
  ]
}

// schemas/settings.ts
{
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteName', type: 'string' },
    { name: 'siteDescription', type: 'text' },
    { name: 'logo', type: 'image' },
    { name: 'primaryColor', type: 'color' },
    { name: 'secondaryColor', type: 'color' },
    { name: 'contactEmail', type: 'string' },
    { name: 'contactPhone', type: 'string' },
    { name: 'telegram', type: 'string' },
    { name: 'socialLinks', type: 'array', of: [
      {
        type: 'object',
        fields: [
          { name: 'platform', type: 'string' },
          { name: 'url', type: 'url' }
        ]
      }
    ]}
  ]
}
```

**Интеграция:**

```bash
# Установка
npm install @sanity/client @sanity/image-url

# Создание Sanity проекта
npm create sanity@latest -- --template clean --project-id YOUR_ID --dataset production
```

```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Получение данных
export async function getServices() {
  return await client.fetch(`*[_type == "service"]`)
}

export async function getCases() {
  return await client.fetch(`*[_type == "case"]`)
}

export async function getSettings() {
  return await client.fetch(`*[_type == "settings"][0]`)
}
```

**Использование в компонентах:**

```typescript
// pages/ServicesPage.tsx
import { useEffect, useState } from 'react'
import { getServices } from '@/lib/sanity'

export function ServicesPage() {
  const [services, setServices] = useState([])
  
  useEffect(() => {
    getServices().then(setServices)
  }, [])
  
  return (
    <Layout>
      {services.map(service => (
        <ServiceCard key={service._id} {...service} />
      ))}
    </Layout>
  )
}
```

---

### **Вариант 2: Собственная админка**

#### **Stack:**
- **Frontend:** React + React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB / PostgreSQL
- **Auth:** JWT + bcrypt
- **Storage:** Cloudinary / AWS S3 (для изображений)

#### **Структура:**

```
admin/
├── src/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ServicesEditor.tsx
│   │   ├── CasesEditor.tsx
│   │   ├── HeroEditor.tsx
│   │   ├── SettingsEditor.tsx
│   │   └── MediaLibrary.tsx
│   ├── components/
│   │   ├── RichTextEditor.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── ColorPicker.tsx
│   │   └── FormBuilder.tsx
│   └── api/
│       ├── services.ts
│       ├── cases.ts
│       └── settings.ts
│
server/
├── routes/
│   ├── auth.js
│   ├── services.js
│   ├── cases.js
│   └── media.js
├── models/
│   ├── Service.js
│   ├── Case.js
│   └── Settings.js
└── middleware/
    ├── auth.js
    └── upload.js
```

---

### **Вариант 3: Tina CMS** (Git-based)

**Преимущества:**
- 📝 Редактирование прямо на сайте (inline editing)
- 🔄 Git-based (все изменения в репозитории)
- 🎨 Visual editing
- 🆓 Бесплатный план

```bash
npm install tinacms
```

```typescript
// tina/config.ts
import { defineConfig } from "tinacms"

export default defineConfig({
  branch: "main",
  clientId: "YOUR_CLIENT_ID",
  token: "YOUR_TOKEN",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [
      {
        name: "service",
        label: "Services",
        path: "content/services",
        fields: [
          { type: "string", name: "name", label: "Name" },
          { type: "string", name: "description", label: "Description" },
          { type: "string", name: "price", label: "Price" },
        ],
      },
    ],
  },
})
```

---

## 🎨 ИНТЕРФЕЙС АДМИНКИ

### **Структура страниц:**

```
/admin
├── /login                    # Авторизация
├── /dashboard                # Главная (статистика)
├── /content
│   ├── /hero                 # Hero секция
│   ├── /about                # О себе
│   ├── /services             # Услуги (CRUD)
│   ├── /cases                # Кейсы (CRUD)
│   ├── /reviews              # Отзывы (CRUD)
│   ├── /quest                # Настройка квеста
│   └── /footer               # Футер
├── /media                    # Библиотека медиа
├── /settings
│   ├── /general              # Общие настройки
│   ├── /seo                  # SEO метаданные
│   ├── /colors               # Цветовая схема
│   └── /integrations         # Интеграции (GA, Telegram)
└── /analytics                # Статистика
```

### **Компоненты редактирования:**

1. **Rich Text Editor** (TipTap / Slate)
   - Форматирование текста
   - Вставка ссылок
   - Списки

2. **Image Uploader**
   - Drag & drop
   - Crop & resize
   - WebP конвертация
   - CDN интеграция

3. **Color Picker**
   - Выбор цветов темы
   - Live preview

4. **Array Editor**
   - Добавление/удаление элементов списков
   - Drag & drop сортировка

5. **Form Builder**
   - Визуальное создание форм
   - Настройка полей квеста

---

## 📊 ДАННЫЕ ДЛЯ РЕДАКТИРОВАНИЯ

### **1. Hero Section**
- Заголовок
- Подзаголовок
- Текст кнопок
- Ссылки кнопок
- Изображение героя
- Бейджи (опыт, проекты, ROI)

### **2. Social Proof**
- 4 метрики (значение + описание)
- Иконки

### **3. About Section**
- Имя
- Должность
- Уровень
- Класс
- 4 характеристики (название, описание, значение)
- Достижения
- "Почему я" (5 пунктов)
- "Для кого" (4 категории)

### **4. Services** (CRUD)
- Название
- Тип
- Описание
- Что входит (массив)
- Результат
- Срок
- Цена
- Иконка
- Цвет градиента

### **5. Cases** (CRUD)
- Клиент
- Ниша
- Челлендж
- Решение (массив)
- Результаты (до/после)
- Цифры
- Инструменты
- Длительность
- Изображение

### **6. Quest**
- 5 шагов (вопрос, варианты, XP)
- Результаты (маппинг ответов)

### **7. Reviews** (CRUD)
- Имя
- Должность
- Компания
- Текст отзыва
- Рейтинг
- Фото

### **8. Settings**
- Название сайта
- Описание
- Логотип
- Контакты (email, phone, telegram)
- Социальные сети
- Цвета темы
- SEO (title, description, keywords)
- Open Graph изображение

---

## 🔐 БЕЗОПАСНОСТЬ

### **Авторизация:**
```typescript
// JWT-based auth
interface User {
  id: string
  email: string
  role: 'admin' | 'editor'
}

// Middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
```

### **Роли:**
- **Admin** — полный доступ
- **Editor** — редактирование контента (без настроек)

---

## 📈 АНАЛИТИКА В АДМИНКЕ

### **Метрики:**
1. **Посещаемость**
   - Просмотры страниц
   - Уникальные посетители
   - Источники трафика

2. **Геймификация**
   - Средний уровень пользователей
   - Распределение XP
   - Популярные действия

3. **Конверсии**
   - Заполнение форм
   - Прохождение квеста
   - Клики по CTA

4. **Производительность**
   - Скорость загрузки
   - Core Web Vitals

---

## 🚀 ПЛАН РЕАЛИЗАЦИИ

### **Этап 1: Подготовка (1-2 дня)**
- [ ] Выбор CMS (Sanity / Tina / Собственная)
- [ ] Настройка проекта
- [ ] Создание схем данных

### **Этап 2: Backend (3-5 дней)**
- [ ] API endpoints
- [ ] Авторизация
- [ ] Загрузка изображений
- [ ] Валидация данных

### **Этап 3: Админ-интерфейс (5-7 дней)**
- [ ] Страница логина
- [ ] Dashboard
- [ ] Редакторы контента
- [ ] Библиотека медиа
- [ ] Настройки

### **Этап 4: Интеграция (2-3 дня)**
- [ ] Подключение к фронтенду
- [ ] Миграция данных
- [ ] Тестирование

### **Этап 5: Деплой (1 день)**
- [ ] Настройка production
- [ ] Бекапы
- [ ] Мониторинг

**Общий срок:** 12-18 дней

---

## 💰 СТОИМОСТЬ

### **Вариант 1: Sanity CMS**
- **Разработка:** 80-120 часов
- **Стоимость:** 0₽ (бесплатный план)
- **Хостинг:** Включен в Sanity

### **Вариант 2: Собственная админка**
- **Разработка:** 120-160 часов
- **Стоимость:** 0₽ (open source)
- **Хостинг:** ~500₽/мес (VPS)

### **Вариант 3: Tina CMS**
- **Разработка:** 60-80 часов
- **Стоимость:** 0₽ (бесплатный план)
- **Хостинг:** Git-based (бесплатно)

---

## 🎯 РЕКОМЕНДАЦИЯ

**Выбор:** **Sanity CMS** ⭐

**Почему:**
1. ✅ Быстрая разработка (60-80 часов)
2. ✅ Профессиональный интерфейс
3. ✅ Бесплатный план
4. ✅ CDN для изображений
5. ✅ Real-time обновления
6. ✅ Мобильное приложение
7. ✅ Масштабируемость

**Альтернатива:** Tina CMS (если нужен Git-based workflow)

---

## 📝 СЛЕДУЮЩИЕ ШАГИ

1. **Обсудить требования**
   - Какие данные нужно редактировать?
   - Сколько администраторов?
   - Нужна ли аналитика?

2. **Выбрать CMS**
   - Sanity (рекомендуется)
   - Tina
   - Собственная

3. **Начать разработку**
   - Настройка проекта
   - Создание схем
   - Интеграция

---

## 🔗 ПОЛЕЗНЫЕ ССЫЛКИ

- [Sanity.io](https://www.sanity.io/)
- [Tina CMS](https://tina.io/)
- [Strapi](https://strapi.io/)
- [Payload CMS](https://payloadcms.com/)

---

**Дата создания:** 8 февраля 2026  
**Статус:** 📋 План готов к обсуждению
