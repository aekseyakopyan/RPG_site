# Техническое задание: Сайт маркетолога Алексея

## 1. Стек технологий

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React + пиксельные SVG

## 2. Компоненты

### shadcn/ui (установлены)
- Button
- Card
- Dialog
- Input
- Textarea
- Accordion (для FAQ)
- Badge

### Кастомные компоненты
| Компонент | Описание |
|-----------|----------|
| PixelButton | Пиксельная кнопка с рамкой |
| PixelCard | Карточка с пиксельной границей |
| GlitchText | Текст с глич-эффектом |
| PixelAvatar | Пиксельный аватар |
| ParticleBackground | Пиксельные частицы на фоне |
| ProgressSteps | Пиксельный прогресс-бар |

## 3. Анимации

| Анимация | Библиотека | Реализация |
|----------|------------|------------|
| Глич-эффект | CSS | @keyframes rgb-split |
| Появление секций | Framer Motion | whileInView |
| Hover эффекты | Tailwind + CSS | group-hover |
| Параллакс | Framer Motion | useScroll, useTransform |
| Count up цифр | Framer Motion | animate |
| Stagger карточек | Framer Motion | staggerChildren |

## 4. Структура проекта

```
src/
├── components/
│   ├── ui/              # shadcn компоненты
│   ├── PixelButton.tsx
│   ├── PixelCard.tsx
│   ├── GlitchText.tsx
│   ├── PixelAvatar.tsx
│   └── ParticleBackground.tsx
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Cases.tsx
│   ├── Testimonials.tsx
│   ├── Blog.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   └── Contact.tsx
├── hooks/
│   └── useScrollAnimation.ts
├── styles/
│   └── pixel.css
├── App.tsx
└── main.tsx
```

## 5. Зависимости

```bash
# Анимации
npm install framer-motion

# Шрифты (Google Fonts через CDN)
# - Press Start 2P
# - Inter
# - JetBrains Mono
```

## 6. Цветовые переменные Tailwind

```javascript
// tailwind.config.js
colors: {
  'pixel-dark': '#0a0e27',
  'pixel-card': '#1a1f3a',
  'pixel-gold': '#ffd700',
  'pixel-red': '#ff3860',
  'pixel-cyan': '#00d9ff',
  'pixel-text': '#e0e0e0',
  'pixel-muted': '#8b92b9',
  'pixel-success': '#00e676',
}
```

## 7. Адаптивные breakpoint'ы

```javascript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
}
```

## 8. Оптимизация

- Изображения: WebP формат
- Анимации: will-change для GPU
- Шрифты: font-display: swap
- CSS: purge unused styles
