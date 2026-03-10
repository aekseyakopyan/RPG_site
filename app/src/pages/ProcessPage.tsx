import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import {
  ArrowLeft, MessageSquare, Zap, ShieldAlert
} from 'lucide-react';
import { PixelIcon } from '@/components/PixelIcon';
import type { PixelIconName } from '@/components/PixelIcon';
import { useSanityData } from '@/hooks/useSanityData';
import { getProcessSteps } from '@/lib/sanity';
import type { SanityProcessStep } from '@/types/sanity';
import { useMemo } from 'react';

export function ProcessPage() {
  const { data: sanitySteps } = useSanityData<SanityProcessStep[]>(getProcessSteps);

  const steps = useMemo(() => {
    if (!sanitySteps || sanitySteps.length === 0) return [
      {
        id: 1,
        title: 'БРИФИНГ И РАЗВЕДКА',
        subtitle: 'Level 1 — Сбор данных',
        metaphor: 'Картографирование подземелий вашего бизнеса. Ищем скрытые ловушки и точки входа.',
        icon: 'map',
        color: 'from-blue-500 to-indigo-500',
        details: [
          'Созвон на 30-40 минут для погружения',
          'Задаю "неудобные" вопросы о продукте',
          'Поиск реальных болей ваших клиентов'
        ],
        result: 'Карта местности: полное понимание задач и целей.',
        xp: 50
      },
      {
        id: 2,
        title: 'АНАЛИТИЧЕСКИЙ АУДИТ',
        subtitle: 'Level 2 — Подготовка',
        metaphor: 'Изучение сил противника и поиск слабых мест в его защите.',
        icon: 'scroll',
        color: 'from-purple-500 to-pink-500',
        details: [
          'Анализ конкурентов и их креативов',
          'Аудит сквозной аналитики и CRM',
          'Unit-экономика: текущее здоровье бизнеса'
        ],
        result: 'Список багов в воронке и план их устранения.',
        xp: 100
      },
      {
        id: 3,
        title: 'СТРАТЕГИЯ И ПЛАН ЗАХВАТА',
        subtitle: 'Level 3 — Планирование',
        metaphor: 'Выбор лучшего снаряжения и заклинаний. Приоритизация целей.',
        icon: 'target',
        color: 'from-orange-500 to-red-500',
        details: [
          'Медиаплан с прогнозом ROI и выручки',
          'Разработка гипотез роста (HADI-циклы)',
          'Настройка дашборда управления'
        ],
        result: 'Манифест победы: детальный план без "может быть".',
        xp: 150
      },
      {
        id: 4,
        title: 'ЗАПУСК И ТЕСТЫ ГИПОТЕЗ',
        subtitle: 'Level 4 — Битва',
        metaphor: 'Ворвемся в рекламу. Еженедельные тесты креативов и аудиторий.',
        icon: 'sword',
        color: 'from-red-600 to-orange-600',
        details: [
          'Запуск РК в 2-3 ключевых каналах',
          'Еженедельные тесты новых креативов',
          'Быстрая оптимизация по первым данным'
        ],
        result: 'Боевая готовность: найдены первые рабочие связки.',
        xp: 250
      },
      {
        id: 5,
        title: 'МАСШТАБИРОВАНИЕ',
        subtitle: 'Level 5 — Рост',
        metaphor: 'Когда нашли рабочую связку — льем бюджет и захватываем рынок.',
        icon: 'lightning',
        color: 'from-yellow-400 to-orange-400',
        details: [
          'Увеличение бюджета в прибыльных каналах',
          'Докрутка конверсии на каждом этапе воронки',
          'Срезание CPA при росте объема'
        ],
        result: 'Рост выручки: победы становятся системными.',
        xp: 500
      },
      {
        id: 6,
        title: 'ФИНАЛЬНЫЙ БОСС И ПЕРЕДАЧА',
        subtitle: 'Level 6 — Победа',
        metaphor: 'Подведение итогов, обучение команды и передача артефактов прибыли.',
        icon: 'trophy',
        color: 'from-rpg-gold to-yellow-600',
        details: [
          'Подведение итогов по всем KPI',
          'Обучение вашей in-house команды',
          'Передача доступов и всех инструкций'
        ],
        result: 'Артефакт прибыли: работающая система в ваших руках.',
        xp: 1000
      }
    ];

    return sanitySteps.map(s => ({
      id: s.order,
      title: s.title,
      subtitle: s.subtitle,
      metaphor: s.metaphor,
      icon: s.icon as PixelIconName,
      color: s.color,
      details: s.details || [],
      result: s.result,
      xp: s.xp
    }));
  }, [sanitySteps]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-rpg-light border-b-4 border-rpg-dark/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-rpg-gold mb-8 font-bold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              ВЕРНУТЬСЯ В ХАБ
            </Link>
            <h1 className="text-4xl md:text-7xl font-black text-rpg-dark mb-6 tracking-tight">
              ПУТЬ <span className="text-rpg-gold">ГЕРОЯ</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Мой процесс — это не скучные отчеты, а пошаговое прохождение уровней маркетинга.
              От разведки до захвата рынка с максимальной добычей.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Process Timeline */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="lg:w-1/2 space-y-6">
                  <div className={`flex items-center gap-4 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-[24px] flex items-center justify-center text-white shadow-xl flex-shrink-0 relative group`}>
                      <PixelIcon name={step.icon as PixelIconName} size={40} />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-rpg-dark rounded-full border-4 border-white flex items-center justify-center text-xs font-black">
                        {step.id}
                      </div>
                    </div>
                    <div className={index % 2 !== 0 ? 'text-right' : ''}>
                      <span className="text-sm font-bold text-rpg-gold uppercase tracking-widest">{step.subtitle}</span>
                      <h3 className="text-3xl font-black text-rpg-dark tracking-tight leading-none mt-1">{step.title}</h3>
                    </div>
                  </div>

                  <p className="text-xl text-gray-500 font-medium leading-relaxed italic">
                    "{step.metaphor}"
                  </p>

                  <ul className="space-y-4">
                    {step.details.map((detail, i) => (
                      <li key={i} className={`flex items-start gap-3 ${index % 2 !== 0 ? 'lg:flex-row-reverse text-right' : ''}`}>
                        <div className="w-6 h-6 rounded-lg bg-rpg-gold/10 flex items-center justify-center mt-1 flex-shrink-0">
                          <Zap className="w-3 h-3 text-rpg-gold" />
                        </div>
                        <span className="text-gray-700 font-bold">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`p-4 bg-rpg-light rounded-2xl border-2 border-rpg-gold/20 inline-block ${index % 2 !== 0 ? 'lg:float-right' : ''}`}>
                    <div className="flex items-center gap-2">
                      <PixelIcon name="trophy" size={16} />
                      <span className="text-sm font-black text-rpg-dark uppercase tracking-tight">
                        РЕЗУЛЬТАТ: <span className="text-gray-600">{step.result}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Visual/Separator */}
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-64 h-64 bg-rpg-light rounded-full border-4 border-dashed border-gray-100 flex items-center justify-center relative">
                    <div className="text-8xl select-none opacity-20 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                      <PixelIcon name={step.icon as PixelIconName} size={96} />
                    </div>
                    <div className="absolute -bottom-4 bg-white px-6 py-2 rounded-full border-2 border-gray-100 font-black text-rpg-gold text-sm shadow-sm">
                      +{step.xp} XP
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24 bg-rpg-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rpg-gold/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ShieldAlert className="w-16 h-16 text-rpg-gold mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-black mb-8">ПРАВИЛА БЕЗОПАСНОСТИ</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="font-black text-rpg-gold mb-4 uppercase">Доступ к данным 24/7</h4>
              <p className="text-gray-400 text-sm">Вы всегда видите дашборд с расходом бюджета и ценой лида в реальном времени.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="font-black text-rpg-gold mb-4 uppercase">Без штрафов за выход</h4>
              <p className="text-gray-400 text-sm">Если на этапе тестов мы поймем, что не сходимся по юнит-экономике — расходимся друзьями.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="font-black text-rpg-gold mb-4 uppercase">Собственность ваша</h4>
              <p className="text-gray-400 text-sm">Все доступы, креативы и наработки остаются у вас навсегда. Я не "держу в заложниках" рекламные кабинеты.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <h2 className="text-4xl md:text-6xl font-black text-rpg-dark mb-8">ГОТОВЫ К ПЕРВОМУ УРОВНЮ?</h2>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Первый созвон-диагностика ни к чему не обязывает, но даст вам карту вашего маркетинга на ближайшие 3 месяца.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="/#/contact" className="rpg-button px-12 py-5 text-xl">
            ЗАПИСАТЬСЯ НА ДИАГНОСТИКУ
          </a>
          <a href="https://t.me/alexey_marketer" className="text-rpg-dark font-black hover:text-rpg-gold transition-colors flex items-center gap-2 underline underline-offset-8 decoration-rpg-gold decoration-4">
            <MessageSquare className="w-5 h-5" />
            ОБСУДИТЬ В TELEGRAM
          </a>
        </div>
      </section>
    </Layout>
  );
}
