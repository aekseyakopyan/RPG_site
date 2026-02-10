import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getFaqs } from '@/lib/sanity';

const initialFaqs = [
  {
    question: 'За сколько времени будут первые результаты?',
    answer: 'Зависит от выбранного "оружия": контекстная реклама даёт первые лиды через 1-3 дня, таргет — через неделю, SEO — через 3-6 месяцев. На старте всегда провожу аудит и даю реалистичный прогноз.'
  },
  {
    question: 'Какой минимальный бюджет нужен для старта?',
    answer: 'Минимальный порог входа — 15 000 ₽ за аудит (разовая услуга). Для запуска рекламных кампаний: от 50 000 ₽ общий бюджет (25к на работу + 25к на рекламу). Для комплексного продвижения — от 120 000 ₽/месяц.'
  },
  {
    question: 'Почему именно ты, а не агентство?',
    answer: 'Работаешь напрямую со мной — без менеджеров-посредников. Полная прозрачность: доступ ко всем рекламным кабинетам и аналитике. Гибкость: быстрые правки без бюрократии. Фокус на результате, а не на красивых отчётах.'
  },
  {
    question: 'Что значит "гарантия прозрачности 100%"?',
    answer: 'Ты получаешь полный доступ к рекламным кабинетам, Google Analytics/Яндекс Метрике, CRM-системе. Еженедельные отчёты в понятном формате с объяснением каждой цифры. Никаких "чёрных ящиков" — все действия и расходы видны.'
  },
  {
    question: 'Работаешь ли ты с моей нишей?',
    answer: 'Основной опыт: e-commerce, онлайн-образование, B2B-услуги, локальный бизнес. Не работаю с: финансовыми пирамидами, азартными играми, сомнительными схемами. Если твоя ниша специфична — проведу бесплатный 15-минутный анализ.'
  },
  {
    question: 'Какие метрики ты отслеживаешь?',
    answer: 'Только те, что влияют на деньги: CPL (стоимость лида), CAC (стоимость привлечения клиента), ROI/ROMI, конверсию на каждом этапе воронки, LTV клиента. Никаких "показов" и "охватов" ради красивых цифр.'
  },
  {
    question: 'Можно ли начать с малого бюджета и масштабироваться?',
    answer: 'Да! Рекомендую начать с аудита (15к) + тестовая кампания на 1-2 месяца (от 50к). После получения данных — масштабируем лучшие каналы. Это снижает риски и позволяет учиться на малых бюджетах.'
  },
  {
    question: 'Как быстро можно запуститься?',
    answer: 'Экспресс-запуск: 3-5 дней для контекстной рекламы (если все материалы готовы). Стандартный запуск: 14 дней — аудит, стратегия, настройка, первые кампании. Комплексный проект: 3-4 недели с учётом разработки креативов.'
  }
];

export function FAQ() {
  const [faqs, setFaqs] = useState(initialFaqs);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const sanityFaqs = await getFaqs();
        if (sanityFaqs && sanityFaqs.length > 0) {
          setFaqs(sanityFaqs);
        }
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
      }
    }
    fetchFaqs();
  }, []);
  return (
    <section id="faq" className="relative py-20 md:py-32 bg-pixel-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-pixel-gold font-pixel text-sm mb-4 block">FAQ</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Частые вопросы
          </h2>
          <div className="w-24 h-1 bg-pixel-gold mx-auto mb-6" />
          <p className="text-pixel-muted max-w-2xl mx-auto">
            Отвечаю на то, что обычно спрашивают до старта
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-pixel-card border-2 border-pixel-muted/30 px-6 data-[state=open]:border-pixel-gold/50"
              >
                <AccordionTrigger className="text-left font-pixel text-sm text-white hover:text-pixel-gold py-4 [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-pixel-text pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
