import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Search, Lightbulb, Rocket, TrendingUp, Crown, type LucideIcon } from 'lucide-react';
import { SkillTree } from '@/components/SkillTree';
import { getProcessSteps } from '@/lib/sanity';
import type { SanityProcessStep } from '@/types/sanity';

const iconMap: Record<string, LucideIcon> = {
  Search,
  Lightbulb,
  Rocket,
  TrendingUp,
  Crown
};

const initialSteps = [
  {
    id: 1,
    name: 'АНАЛИТИКА И АУДИТ',
    icon: Search,
    color: 'bg-blue-400',
    description: 'Анализ текущей ситуации, аудит конкурентов и рынка, выявление узких мест',
    result: 'Понимание, где теряются деньги',
    duration: '3-5 дней',
    xp: 70
  },
  {
    id: 2,
    name: 'ГИПОТЕЗЫ И СТРАТЕГИЯ',
    icon: Lightbulb,
    color: 'bg-yellow-400',
    description: 'Формирование гипотез, выбор каналов, планирование бюджета',
    result: 'Чёткий план действий',
    duration: '5-7 дней',
    xp: 70
  },
  {
    id: 3,
    name: 'ЗАПУСК КАМПАНИЙ',
    icon: Rocket,
    color: 'bg-red-400',
    description: 'Настройка рекламы, запуск тестов, первые результаты',
    result: 'Первые лиды и данные',
    duration: '7-14 дней',
    xp: 70
  },
  {
    id: 4,
    name: 'ОПТИМИЗАЦИЯ',
    icon: TrendingUp,
    color: 'bg-green-400',
    description: 'Анализ данных, отключение неэффективного, усиление работающего',
    result: 'Рост конверсии, снижение CPL',
    duration: '3-8 недель',
    xp: 70
  },
  {
    id: 5,
    name: 'МАСШТАБИРОВАНИЕ',
    icon: Crown,
    color: 'bg-purple-400',
    description: 'Постоянный мониторинг, адаптация к рынку, масштабирование',
    result: 'Стабильный поток лидов',
    duration: 'от 3 месяцев',
    xp: 70
  }
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addXP, showXPPopup, visitSection } = useGame();
  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    async function fetchSteps() {
      try {
        const sanitySteps = await getProcessSteps();
        if (sanitySteps && sanitySteps.length > 0) {
          const mappedSteps = sanitySteps.map((s: SanityProcessStep) => ({
            id: s.order,
            name: s.title,
            icon: iconMap[s.icon as string] || iconMap[s.metaphor] || Search,
            color: s.color || 'bg-blue-400',
            description: s.subtitle || s.details?.join(', ') || '',
            result: s.result,
            duration: s.metaphor, // Using metaphor as fallback for duration if not exists
            xp: s.xp || 70
          }));
          setSteps(mappedSteps);
        }
      } catch (error) {
        console.error("Failed to fetch process steps:", error);
      }
    }
    fetchSteps();
  }, []);

  const handleStepView = () => {
    addXP(70);
    showXPPopup(70, window.innerWidth / 2, window.innerHeight / 2);
    visitSection('process');
  };

  return (
    <section id="process" className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
            ТУТОРИАЛ
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">
            КАК МЫ ПРОХОДИМ ИГРУ
          </h2>
          <div className="w-24 h-1 bg-rpg-gold mx-auto" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            5 уровней от старта до масштабирования
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto mb-32">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onViewportEnter={handleStepView}
                className={`relative flex items-start gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Number circle */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 -translate-x-1/2 z-10">
                  <div className={`w-full h-full ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-rpg-dark rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{step.id}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-24 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                  <div className="bg-rpg-light rounded-xl p-5 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-black text-rpg-dark mb-2">
                      {step.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {step.description}
                    </p>
                    <div className={`flex items-center gap-4 text-xs ${index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                      <span className="px-2 py-1 bg-white rounded text-gray-600">
                        {step.duration}
                      </span>
                      <span className="text-rpg-gold font-bold">
                        +{step.xp} XP
                      </span>
                    </div>
                    <div className={`mt-3 pt-3 border-t border-gray-200 ${index % 2 === 0 ? 'md:text-right' : ''
                      }`}>
                      <span className="text-sm font-semibold text-rpg-dark">
                        → {step.result}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Tree - Technical Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SkillTree />
        </motion.div>
      </div>
    </section>
  );
}
