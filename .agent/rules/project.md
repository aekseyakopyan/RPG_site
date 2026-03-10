# RPG Site Project Agent Instructions

## 🎯 Project Context
- **Type**: Marketing portfolio website with RPG/pixel art aesthetic
- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **CMS**: Sanity
- **Current Phase**: Main page development (40% complete)

## 🎨 Design System

### Colors (Tailwind)
Always use these pixel-art colors:
- `pixel-dark`: #0a0e27 (main background)
- `pixel-card`: #1a1f3a (card backgrounds)
- `pixel-gold`: #ffd700 (accents)
- `pixel-red`: #ff3860
- `pixel-cyan`: #00d9ff
- `pixel-text`: #e0e0e0
- `pixel-muted`: #8b92b9
- `pixel-success`: #00e676

### Typography
- **Headings**: Press Start 2P
- **Body**: Inter
- **Code/Technical**: JetBrains Mono

### Component Standards
- Use shadcn/ui components: Button, Card, Dialog, Input, Textarea, Accordion, Badge
- Pixel borders: Use `border-2` with pixel colors
- Icons: 64×64px or 32×32px SVG
- Avatar size: 80×80px

## 🔧 Code Style

### TypeScript
```typescript
// Always use strict typing
interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  stats: number;
}

// Use named exports
export const ServicePreviewCard: React.FC<ServiceCardProps> = ({ ... }) => {
  // Component logic
}
```

### Animations (Framer Motion)
```typescript
// Standard reveal animation
const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Use whileInView for sections
<motion.div whileInView="visible" initial="hidden" viewport={{ once: true }}>
```

### File Naming
- Components: PascalCase (`ServiceCard.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollAnimation.ts`)
- Utilities: camelCase (`formatMetric.ts`)
- Sections: PascalCase (`Hero.tsx`, `Services.tsx`)

## 📦 Component Architecture

### New Component Template
```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface ComponentNameProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  // Destructured props
}) => {
  return (
    <motion.div 
      className="pixel-card border-2 border-pixel-gold"
      whileHover={{ scale: 1.02 }}
    >
      {/* Component JSX */}
    </motion.div>
  );
};
```

## 🚫 Restrictions

### DO NOT
- Use inline styles (only Tailwind classes)
- Create default exports (use named exports)
- Hardcode colors (use Tailwind pixel- classes)
- Mix animation libraries (only Framer Motion)
- Skip TypeScript types
- Use `any` type
- Create files outside defined structure

### ALWAYS
- Add proper TypeScript interfaces
- Use semantic HTML
- Include responsive breakpoints (sm, md, lg, xl)
- Test animations performance (use `will-change`)
- Optimize images (WebP format)
- Follow pixel-art aesthetic
- Include hover states
- Add accessibility attributes

## 📝 Current Tasks Priority

1. Complete main page missing blocks:
   - УТП cards (5 cards, 2-2-1 grid)
   - Target audience qualification (4 segments)
   - Services preview (4 cards)
   - Cases carousel
   - Testimonials preview (2 cards)
   - Footer enhancement

2. Maintain 40%+ completion tracking

## 🔄 Development Workflow

When implementing features:
1. Create component file in `src/components/`
2. Define TypeScript interfaces first
3. Implement responsive design (mobile-first)
4. Add Framer Motion animations
5. Test across breakpoints
6. Update progress tracking
7. Sync changes with GitHub using `./scripts/git-sync.sh`

## 🚀 GitHub Sync
Always sync your changes after completing a task or a significant sub-task:
`./scripts/git-sync.sh "feat: implemented X component"`

- Experience: **5+ лет** 🔥
- Projects: **50+** ⭐
- Client profit: **₽127M+** 💰
- Average ROI: **×3** 🛡️
- Project duration: **8 мес** ⚔️
- Retention: **89%** ❤️

## 🎮 RPG Stats Format

```typescript
interface RPGStat {
  name: 'STR' | 'DEX' | 'INT' | 'LUCK';
  value: number; // 0-100
  description: string;
}

// Current values
STR: 85, DEX: 92, INT: 95, LUCK: 78
```

---

**All responses must be ready-to-implement code with proper formatting.**
**Never suggest code that conflicts with the established stack.**
**Prioritize performance and pixel-art aesthetic in all implementations.**
