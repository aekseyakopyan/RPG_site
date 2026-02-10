# 🚀 ИНСТРУКЦИЯ ПО НАСТРОЙКЕ SANITY CMS

## 📋 ШАГ 1: Регистрация в Sanity

1. Откройте терминал в директории проекта
2. Выполните команду:
   ```bash
   cd /Users/set/Desktop/Личные\ дела/сайт/Kimi_Agent_RPG-стиль/sanity-studio
   npm run dev
   ```

3. Откроется браузер с предложением войти:
   - **Рекомендую:** Войти через GitHub (самый быстрый способ)
   - Или через Google
   - Или через Email

4. После входа вас попросят:
   - **Создать организацию** (можно назвать "Alexey Marketing")
   - **Создать проект** (можно назвать "alexey-marketing-site")
   - **Выбрать dataset** (оставьте "production")

5. Сохраните:
   - **Project ID** — понадобится для подключения к сайту
   - **Dataset name** — обычно "production"

---

## 📋 ШАГ 2: Запуск Sanity Studio

После регистрации:

```bash
cd sanity-studio
npm run dev
```

Админка откроется на: **http://localhost:3333**

---

## 📋 ШАГ 3: Подключение к сайту

### 3.1. Установка зависимостей

```bash
cd ../app
npm install @sanity/client @sanity/image-url
```

### 3.2. Создание файла конфигурации

Создайте файл `app/src/lib/sanity.ts`:

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'ВАШ_PROJECT_ID', // Замените на ваш Project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### 3.3. Получение данных

Пример использования в компонентах:

```typescript
// pages/ServicesPage.tsx
import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

export function ServicesPage() {
  const [services, setServices] = useState([])
  
  useEffect(() => {
    client
      .fetch(`*[_type == "service"] | order(order asc)`)
      .then(setServices)
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

## 📋 ШАГ 4: Первое редактирование

1. Откройте Sanity Studio: http://localhost:3333
2. Войдите в систему
3. Вы увидите типы документов:
   - **Hero** — главная секция
   - **Services** — услуги
   - **Cases** — кейсы
   - **Reviews** — отзывы
   - **Settings** — настройки сайта

4. Создайте первый документ (например, Service)
5. Заполните поля
6. Нажмите **Publish**
7. Данные сразу появятся на сайте!

---

## 🎨 СТРУКТУРА ДАННЫХ

### Hero Section
```typescript
{
  _type: 'hero',
  title: string,
  subtitle: string,
  ctaPrimary: { text: string, link: string },
  ctaSecondary: { text: string, link: string },
  heroImage: image,
  badges: [
    { text: string, icon: string }
  ]
}
```

### Service
```typescript
{
  _type: 'service',
  name: string,
  type: string,
  description: text,
  includes: array<string>,
  result: string,
  timeline: string,
  price: string,
  icon: string,
  color: string,
  order: number
}
```

### Case
```typescript
{
  _type: 'case',
  client: string,
  niche: string,
  challenge: text,
  solution: array<string>,
  results: array<{
    label: string,
    before: string,
    after: string
  }>,
  numbers: string,
  tools: string,
  duration: string,
  image: image,
  order: number
}
```

### Review
```typescript
{
  _type: 'review',
  name: string,
  position: string,
  company: string,
  text: text,
  rating: number,
  avatar: image,
  order: number
}
```

### Settings
```typescript
{
  _type: 'settings',
  siteName: string,
  siteDescription: text,
  logo: image,
  primaryColor: color,
  secondaryColor: color,
  contactEmail: string,
  contactPhone: string,
  telegram: string,
  socialLinks: array<{
    platform: string,
    url: url
  }>,
  seo: {
    title: string,
    description: text,
    keywords: array<string>,
    ogImage: image
  }
}
```

---

## 🔧 ПОЛЕЗНЫЕ КОМАНДЫ

### Sanity Studio
```bash
cd sanity-studio

# Запуск в dev режиме
npm run dev

# Сборка для production
npm run build

# Деплой на sanity.studio
npm run deploy
```

### Основной сайт
```bash
cd app

# Запуск dev сервера
npm run dev

# Сборка
npm run build
```

---

## 🌐 ДЕПЛОЙ SANITY STUDIO

Когда будете готовы к продакшену:

```bash
cd sanity-studio
npm run deploy
```

Ваша админка будет доступна на:
**https://your-project-name.sanity.studio**

---

## 📱 МОБИЛЬНОЕ ПРИЛОЖЕНИЕ

Sanity имеет мобильное приложение для iOS и Android!

1. Скачайте "Sanity Studio" из App Store / Google Play
2. Войдите с теми же учётными данными
3. Редактируйте контент прямо с телефона!

---

## 🆘 ПОМОЩЬ

### Проблемы с подключением?

1. Проверьте Project ID в `lib/sanity.ts`
2. Убедитесь, что dataset = "production"
3. Проверьте, что документы опубликованы (Publish)

### Изображения не загружаются?

```typescript
// Используйте urlFor для изображений
import { urlFor } from '@/lib/sanity'

<img src={urlFor(service.image).width(800).url()} alt={service.name} />
```

### Данные не обновляются?

- Sanity использует CDN, может быть задержка до 1 минуты
- Для мгновенных обновлений используйте `useCdn: false` в dev режиме

---

## 📚 ДОКУМЕНТАЦИЯ

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image URLs](https://www.sanity.io/docs/image-url)

---

## ✅ ЧЕКЛИСТ НАСТРОЙКИ

- [ ] Зарегистрироваться в Sanity
- [ ] Получить Project ID
- [ ] Настроить `lib/sanity.ts`
- [ ] Создать первый документ
- [ ] Проверить отображение на сайте
- [ ] Настроить все типы контента
- [ ] Мигрировать существующие данные
- [ ] Задеплоить Sanity Studio

---

**Время настройки:** 30-60 минут  
**Сложность:** ⭐⭐ (Легко)

Удачи! 🚀
