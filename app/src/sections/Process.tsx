import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Search, 
  Lightbulb, 
  Rocket, 
  BarChart3, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Аудит и вводная',
    desc: 'Анализирую текущее состояние: что работает, что нет, где теряется бюджет',
    details: ['Аудит рекламных кампаний', 'Анализ конкурентов', 'Изучение воронки продаж', 'Определение KPI']
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Гипотезы и стратегия',
    desc: 'Разрабатываю план действий с четкими целями и сроками',
    details: ['Формирование гипотез', 'Прототипирование', 'Планирование бюджета', 'Распределение ресурсов']
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Запуск и тесты',
    desc: 'Быстрый старт с A/B тестированием для поиска рабочих связок',
    details: ['Создание креативов', 'Настройка кампаний', 'A/B тестирование', 'Сбор первых данных']
  },
  {
    icon: BarChart3,
    number: '04',
    title: 'Аналитика и оптимизация',
    desc: 'Ежедневная работа с данными для улучшения показателей',
    details: ['Анализ метрик', 'Оптимизация ставок', 'Отключение неэффективного', 'Масштабирование рабочего']
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'Масштабирование',
    desc: 'Увеличиваем бюджет на рабочих связках и ищем новые точки роста',
    details: ['Рост бюджета', 'Расширение аудиторий', 'Новые каналы', 'Долгосрочное планирование']
  }
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-20 md:py-32 bg-pixel-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-pixel-gold font-pixel text-sm mb-4 block">ПРОЦЕСС</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Как я работаю
          </h2>
          <div className="w-24 h-1 bg-pixel-gold mx-auto mb-6" />
          <p className="text-pixel-muted max-w-2xl mx-auto">
            Прозрачный процесс от первой встречи до стабильного результата
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="h-2 bg-pixel-dark border border-pixel-muted/30 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-pixel-gold to-pixel-cyan"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Step markers */}
            <div className="absolute inset-0 flex justify-between">
              {steps.map((step, index) => (
                <motion.button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`relative -top-3 w-8 h-8 flex items-center justify-center font-pixel text-xs transition-all ${
                    index <= activeStep 
                      ? 'bg-pixel-gold text-pixel-dark' 
                      : 'bg-pixel-dark border border-pixel-muted text-pixel-muted'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.number}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Steps content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Steps list */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`p-4 border-2 cursor-pointer transition-all ${
                  activeStep === index 
                    ? 'border-pixel-gold bg-pixel-gold/10' 
                    : 'border-pixel-muted/30 bg-pixel-card hover:border-pixel-muted'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center ${
                    activeStep === index 
                      ? 'bg-pixel-gold text-pixel-dark' 
                      : 'bg-pixel-dark border border-pixel-muted text-pixel-muted'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-pixel-muted font-mono-pixel">{step.number}</span>
                      <h3 className={`font-pixel text-sm ${
                        activeStep === index ? 'text-white' : 'text-pixel-text'
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-pixel-muted mt-1">{step.desc}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    activeStep === index ? 'text-pixel-gold rotate-90' : 'text-pixel-muted'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active step details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-pixel-card border-2 border-pixel-gold p-6 relative"
          >
            {/* Pixel corners */}
            <span className="absolute -top-1 -left-1 w-3 h-3 bg-pixel-gold" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pixel-gold" />
            <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-pixel-gold" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-pixel-gold" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-pixel-gold/20 border-2 border-pixel-gold flex items-center justify-center">
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="w-8 h-8 text-pixel-gold" />;
                })()}
              </div>
              <div>
                <span className="text-pixel-gold font-mono-pixel text-sm">
                  ШАГ {steps[activeStep].number}
                </span>
                <h3 className="font-pixel text-xl text-white mt-1">
                  {steps[activeStep].title}
                </h3>
              </div>
            </div>

            <p className="text-pixel-text mb-6">{steps[activeStep].desc}</p>

            <div>
              <h4 className="text-pixel-muted text-xs uppercase tracking-wider mb-3">
                Что входит в этап:
              </h4>
              <ul className="space-y-2">
                {steps[activeStep].details.map((detail, i) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-pixel-text"
                  >
                    <span className="w-2 h-2 bg-pixel-cyan" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
