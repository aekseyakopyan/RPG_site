import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';

import { TrendingDown, TrendingUp, DollarSign, type LucideIcon } from 'lucide-react';
import { getCases, urlFor } from '@/lib/sanity'; // Import Sanity helpers

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'TrendingUp': TrendingUp,
  'TrendingDown': TrendingDown,
  'DollarSign': DollarSign,
};

// Initial cases as fallback
const initialCases = [
  {
    id: '1',
    enemy: 'ДОРОГОЙ ЛИД',
    enemyIcon: '/enemy-expensive-lead.png',
    client: 'EdTech-стартап',
    niche: 'Онлайн-курсы по программированию',
    task: 'Стоимость лида $45, конверсия в покупку 2%, ROI отрицательный. Нужно снизить CPL и поднять конверсию без увеличения бюджета.',
    solution: [
      {
        title: 'Аудит и стратегия',
        steps: ['Пересобрали семантику', 'Разделили воронку на 3 этапа']
      },
      {
        title: 'Реализация',
        steps: ['Запустили ретаргетинг', 'Оптимизировали лендинг']
      }
    ],
    results: [
      { label: 'CPL', before: '$45', after: '$18', improvement: '-60%', icon: DollarSign },
      { label: 'Конверсия', before: '2%', after: '5.5%', improvement: 'x2.7', icon: TrendingUp },
      { label: 'ROI', before: '-20%', after: '+240%', improvement: '+260%', icon: TrendingUp }
    ],
    duration: '6 недель',
    testimonial: {
      text: 'Алексей помог нам выйти из пике. Результаты превзошли ожидания в первый же месяц.',
      author: 'Михаил',
      position: 'CEO EdTech'
    }
  }
];

export function CasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addXP, showXPPopup } = useGame();
  const [cases, setCases] = useState(initialCases);

  useEffect(() => {
    async function fetchCases() {
      try {
        const sanityCases = await getCases();
        if (sanityCases && sanityCases.length > 0) {
          const mappedCases = sanityCases.map((c: any) => ({
            id: c._id,
            enemy: c.enemy || 'НЕИЗВЕСТНЫЙ ВРАГ',
            enemyIcon: c.image ? urlFor(c.image).url() : '/enemy-expensive-lead.png',
            client: c.client,
            niche: c.niche,
            task: c.challenge,
            solution: c.solution || [], // Use solution instead of actions
            results: (c.results || []).map((r: any) => ({
              label: r.label,
              before: r.before,
              after: r.after,
              improvement: r.improvement, // Add improvement
              icon: iconMap[r.icon] || TrendingUp
            })),
            duration: c.duration,
            testimonial: c.testimonial
          }));
          setCases(mappedCases);
        }
      } catch (error) {
        console.error("Failed to fetch cases:", error);
      }
    }
    fetchCases();
  }, []);

  useEffect(() => {
    if (isInView) {
      addXP(150);
      showXPPopup(150, window.innerWidth / 2, window.innerHeight / 2);
    }
  }, [isInView, addXP, showXPPopup]);

  return (
    <section id="cases" className="py-20 md:py-32 bg-rpg-light" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
            КВЕСТЫ
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">
            ЗАВЕРШЁННЫЕ МИССИИ
          </h2>
          <div className="w-24 h-1 bg-rpg-gold mx-auto" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Победы над маркетинговыми боссами. Реальные результаты, реальные цифры.
          </p>
        </motion.div>

        {/* Cases List */}
        <div className="space-y-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-[120px_1fr] gap-6">
                {/* Enemy Icon */}
                <div className="flex justify-center md:justify-start">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                    className="w-24 h-24 md:w-28 md:h-28 bg-red-50 rounded-2xl flex items-center justify-center"
                  >
                    <img
                      src={caseItem.enemyIcon}
                      alt={caseItem.enemy}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                      БОСС: {caseItem.enemy}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-600">{caseItem.client}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-500">{caseItem.niche}</span>
                  </div>

                  {/* Task */}
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">ЗАДАЧА</h4>
                    <p className="text-gray-700">{caseItem.task}</p>
                  </div>

                  {/* Actions / Solution Stages */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">ПУТЬ К ПОБЕДЕ</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {caseItem.solution.map((stage: any, i: number) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                          <h5 className="text-xs font-black text-rpg-gold uppercase mb-2">{stage.title}</h5>
                          <ul className="space-y-1">
                            {stage.steps?.map((step: string, j: number) => (
                              <li key={j} className="text-[11px] text-gray-600 flex items-center gap-2">
                                <span className="w-1 h-1 bg-rpg-gold rounded-full" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-rpg-gold/10 rounded-xl p-4">
                    <h4 className="text-sm font-bold text-rpg-dark uppercase mb-3 text-center">ЛУТ (РЕЗУЛЬТАТ)</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {caseItem.results.map((result: any, i: number) => (
                        <div key={i} className="text-center relative group">
                          {result.improvement && (
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm z-10 animate-bounce">
                              {result.improvement}
                            </div>
                          )}
                          <result.icon className="w-5 h-5 text-rpg-gold mx-auto mb-2" />
                          <p className="text-[10px] text-gray-500 uppercase font-bold">{result.label}</p>
                          <div className="flex flex-col items-center mt-1">
                            <span className="text-[10px] text-gray-400 line-through leading-none mb-1">{result.before}</span>
                            <span className="text-base md:text-lg font-black text-rpg-dark leading-none">{result.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {caseItem.testimonial && (
                      <div className="mt-6 pt-4 border-t border-rpg-gold/20 italic text-sm text-gray-600 relative">
                        <span className="absolute -top-3 left-4 bg-rpg-light px-2 text-rpg-gold text-xl font-serif">"</span>
                        <p className="mb-2">
                          {caseItem.testimonial.text}
                        </p>
                        <div className="text-right not-italic">
                          <span className="font-bold text-rpg-dark block text-xs">{caseItem.testimonial.author}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-tight">{caseItem.testimonial.position}</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-rpg-gold/10 flex justify-between items-center">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                        СРОК РЕАЛИЗАЦИИ: {caseItem.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
