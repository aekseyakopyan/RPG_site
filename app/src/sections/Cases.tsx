import { motion } from 'framer-motion';
import { PixelCard } from '@/components/PixelCard';
import { PixelButton } from '@/components/PixelButton';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const cases = [
  {
    client: 'EdTech-стартап',
    niche: 'Онлайн-образование',
    task: 'Привлечь первых платящих пользователей с ограниченным бюджетом',
    done: 'Настроил таргет VK + контекст, протестировал 15 гипотез аудиторий',
    metrics: [
      { icon: Users, label: 'Лидов', value: '+340%', prefix: '+' },
      { icon: DollarSign, label: 'CPL', value: '-45%', prefix: '' },
      { icon: TrendingUp, label: 'ROI', value: '280%', prefix: '' }
    ],
    color: 'gold'
  },
  {
    client: 'Сеть кофеен',
    niche: 'HoReCa',
    task: 'Увеличить проходимость в новых точках',
    done: 'Geo-реклама + работа с картами + локальный таргет',
    metrics: [
      { icon: Users, label: 'Посетителей', value: '+180%', prefix: '+' },
      { icon: Target, label: 'Охват', value: '50K', prefix: '' },
      { icon: TrendingUp, label: 'Конверсия', value: '12%', prefix: '' }
    ],
    color: 'cyan'
  },
  {
    client: 'B2B-сервис',
    niche: 'IT-аутсорсинг',
    task: 'Генерация качественных B2B-лидов',
    done: 'LinkedIn + контекст + email-воронка + ретаргетинг',
    metrics: [
      { icon: Users, label: 'Лидов', value: '+220%', prefix: '+' },
      { icon: DollarSign, label: 'CPL', value: '-35%', prefix: '' },
      { icon: TrendingUp, label: 'Сделок', value: '+85%', prefix: '+' }
    ],
    color: 'gold'
  }
];

export function Cases() {
  return (
    <section id="cases" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-pixel-gold font-pixel text-sm mb-4 block">КЕЙСЫ</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Реальные результаты
          </h2>
          <div className="w-24 h-1 bg-pixel-gold mx-auto mb-6" />
          <p className="text-pixel-muted max-w-2xl mx-auto">
            Не обещания, а конкретные цифры из реальных проектов
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <PixelCard 
                glow={caseItem.color as 'gold' | 'cyan'} 
                className="h-full flex flex-col"
              >
                {/* Header */}
                <div className="mb-4 pb-4 border-b border-pixel-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono-pixel ${
                      caseItem.color === 'gold' ? 'text-pixel-gold' : 'text-pixel-cyan'
                    }`}>
                      {caseItem.niche}
                    </span>
                  </div>
                  <h3 className="font-pixel text-lg text-white">{caseItem.client}</h3>
                </div>

                {/* Task & Done */}
                <div className="space-y-4 mb-6 flex-1">
                  <div>
                    <span className="text-xs text-pixel-muted uppercase tracking-wider">Задача</span>
                    <p className="text-sm text-pixel-text mt-1">{caseItem.task}</p>
                  </div>
                  <div>
                    <span className="text-xs text-pixel-muted uppercase tracking-wider">Что сделано</span>
                    <p className="text-sm text-pixel-text mt-1">{caseItem.done}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-pixel-muted/30">
                  {caseItem.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="text-center"
                    >
                      <metric.icon className={`w-5 h-5 mx-auto mb-1 ${
                        caseItem.color === 'gold' ? 'text-pixel-gold' : 'text-pixel-cyan'
                      }`} />
                      <div className="font-pixel text-sm text-white">{metric.value}</div>
                      <div className="text-xs text-pixel-muted">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <PixelButton href="#contact" variant="outline">
            Хочу такой же результат
          </PixelButton>
        </motion.div>
      </div>
    </section>
  );
}
