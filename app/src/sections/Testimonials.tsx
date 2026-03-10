import { motion } from 'framer-motion';
import { PixelCard } from '@/components/PixelCard';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Дмитрий',
    role: 'Основатель EdTech-стартапа',
    text: 'Алексей помог нам выйти на первые продажи без слива бюджета. Честный подход, всегда на связи, показывает реальные цифры. Рекомендую!',
    rating: 5
  },
  {
    name: 'Анна',
    role: 'Владелица сети кофеен',
    text: 'Работаем уже полгода. Результат — заполненные столики в новых точках. Важно, что Алексей объясняет всё простым языком, без воды.',
    rating: 5
  },
  {
    name: 'Сергей',
    role: 'CEO B2B-агентства',
    text: 'Наконец-то нашел маркетолога, который не обещает «золотые горы», а делает работу. Качественные лиды, прозрачная отчетность.',
    rating: 5
  },
  {
    name: 'Марина',
    role: 'Маркетинг-директор SaaS',
    text: 'Алексей взялся за сложный проект с непонятной аудиторией. За 2 месяца вывели стабильный поток заявок по приемлемой цене.',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-32 bg-pixel-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-pixel-gold font-pixel text-sm mb-4 block">ОТЗЫВЫ</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Что говорят клиенты
          </h2>
          <div className="w-24 h-1 bg-pixel-gold mx-auto mb-6" />
          <p className="text-pixel-muted max-w-2xl mx-auto">
            Настоящие отзывы от реальных клиентов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PixelCard glow="gold" className="h-full">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-pixel-gold/30 mb-4" />
                
                {/* Text */}
                <p className="text-pixel-text leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-pixel-gold text-pixel-gold" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-pixel-muted/30">
                  <div className="w-12 h-12 bg-pixel-dark border-2 border-pixel-gold flex items-center justify-center">
                    <span className="font-pixel text-lg text-pixel-gold">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-pixel text-sm text-white">{testimonial.name}</h4>
                    <p className="text-xs text-pixel-muted">{testimonial.role}</p>
                  </div>
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
