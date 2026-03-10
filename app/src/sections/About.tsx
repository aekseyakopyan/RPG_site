import { motion } from 'framer-motion';
import { PixelCard } from '@/components/PixelCard';
import { Check, TrendingUp, Eye, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Ориентир на цифры',
    desc: 'Не красивые отчеты, а реальные результаты и рост показателей'
  },
  {
    icon: Eye,
    title: 'Полная прозрачность',
    desc: 'Все данные, расходы и решения — на виду, без скрытых комиссий'
  },
  {
    icon: MessageCircle,
    title: 'Простой язык',
    desc: 'Объясняю сложные вещи понятно, без маркетингового жаргона'
  }
];

const skills = [
  { name: 'Контекстная реклама', level: 95 },
  { name: 'Performance', level: 90 },
  { name: 'SEO', level: 85 },
  { name: 'Аналитика', level: 88 },
  { name: 'Стратегия', level: 92 }
];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-pixel-gold font-pixel text-sm mb-4 block">ОБО МНЕ</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Кто я
          </h2>
          <div className="w-24 h-1 bg-pixel-gold mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-pixel-text leading-relaxed mb-6">
                Привет! Я Алексей — независимый маркетолог, который работает 
                <span className="text-pixel-gold font-semibold"> руками</span>, а не продает 
                «волшебные пилюли» от агентства.
              </p>
              <p className="text-pixel-muted leading-relaxed mb-6">
                За 5+ лет в маркетинге я прошел путь от настройки первых кампаний в Директе 
                до стратегического планирования рекламных бюджетов в миллионы рублей. 
                Работал со стартапами, которым нужен был быстрый старт, и с бизнесом, 
                который искал стабильный рост.
              </p>
              <p className="text-pixel-muted leading-relaxed mb-8">
                Мой подход прост: честность, прозрачность и фокус на результат. 
                Не обещаю золотые горы, но гарантирую, что каждый рубль бюджета 
                будет работать на ваш бизнес.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PixelCard glow="gold" className="h-full">
                    <feature.icon className="w-8 h-8 text-pixel-gold mb-3" />
                    <h3 className="font-pixel text-sm text-white mb-2">{feature.title}</h3>
                    <p className="text-xs text-pixel-muted">{feature.desc}</p>
                  </PixelCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - RPG Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PixelCard glow="cyan" className="relative overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-pixel-muted/30">
                <div className="w-20 h-20 bg-pixel-dark border-2 border-pixel-gold relative">
                  <img 
                    src="/avatar.png" 
                    alt="Алексей"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-pixel text-lg text-white mb-1">Алексей</h3>
                  <p className="text-pixel-cyan text-sm font-mono-pixel">Маркетолог LVL 5</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-pixel-muted">Класс:</span>
                    <span className="text-xs text-pixel-gold font-mono-pixel">Performance Master</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <h4 className="font-pixel text-sm text-pixel-muted mb-4">ХАРАКТЕРИСТИКИ</h4>
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-pixel-text">{skill.name}</span>
                      <span className="text-pixel-gold font-mono-pixel">{skill.level}/100</span>
                    </div>
                    <div className="h-3 bg-pixel-dark border border-pixel-muted/30 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-pixel-gold to-pixel-cyan"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="mt-6 pt-6 border-t border-pixel-muted/30">
                <h4 className="font-pixel text-sm text-pixel-muted mb-4">ДОСТИЖЕНИЯ</h4>
                <div className="flex flex-wrap gap-2">
                  {['50+ проектов', 'x3 средний ROI', '0 сливов'].map((achievement) => (
                    <span 
                      key={achievement}
                      className="px-3 py-1 bg-pixel-dark border border-pixel-success text-pixel-success text-xs font-mono-pixel"
                    >
                      <Check className="w-3 h-3 inline mr-1" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </PixelCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
