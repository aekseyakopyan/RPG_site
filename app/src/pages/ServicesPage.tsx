import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import {
  Check, ArrowRight, HelpCircle, Info, TrendingUp,
  Zap, Shield, MessageSquare, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useGame } from '@/context/GameContext';
import { getServices } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import type { SanityService } from '@/types/sanity';
import type { PixelIconName } from '@/components/PixelIcon';
import { ServiceHeroAnimation } from '@/components/animations/ServiceHeroAnimation';

export function ServicesPage() {
  const { addXP } = useGame();
  const { data: sanityServices } = useSanityData<SanityService[]>(getServices);

  const services = useMemo(() => {
    const fallbackServices = [
      {
        id: 'contextual',
        pixelIcon: 'sword' as PixelIconName,
        title: 'Контекстная реклама',
        metaphor: 'Оружие прямого урона',
        description: 'Яндекс Директ и Google Ads для быстрого привлечения горячих клиентов. Лучший выбор для быстрого старта.',
        includes: ['Аудит и стратегия', 'Сбор семантики', 'Настройка кампаний', 'A/B-тесты', 'Оптимизация'],
        result: 'Первые лиды через 1-3 дня',
        timeline: '3-5 дней',
        price: 'от 30 000 ₽',
        color: 'from-orange-500 to-red-600',
        anchor: 'contextual',
        comparisonValues: {
          duration: '1-3 дня',
          price: '50к+',
          target: '⭐⭐⭐⭐⭐',
          format: 'Средняя',
          result: '⭐⭐'
        },
        faqs: []
      },
      {
        id: 'targeted',
        pixelIcon: 'bow' as PixelIconName,
        title: 'Таргетированная реклама',
        metaphor: 'Снайперская точность',
        description: 'VK, Telegram Ads — точечное попадание в вашу аудиторию. Идеально для B2C и узких ниш.',
        includes: ['Анализ ЦА', 'Креативы и тексты', 'Настройка таргета', 'Ретаргетинг', 'Аналитика'],
        result: 'Результаты за 3-7 дней',
        timeline: '7 дней',
        price: 'от 25 000 ₽',
        color: 'from-blue-400 to-indigo-600',
        anchor: 'targeted',
        comparisonValues: {
          duration: '3-7 дней',
          price: '40к+',
          target: '⭐⭐⭐⭐⭐',
          format: 'Низкая',
          result: '⭐⭐'
        },
        faqs: []
      },
      {
        id: 'seo',
        pixelIcon: 'shield' as PixelIconName,
        title: 'SEO-продвижение',
        metaphor: 'Долгосрочная стратегия',
        description: 'Органический трафик, который работает годами. Инвестируйте в фундамент вашего бизнеса.',
        includes: ['Технический аудит', 'Семантика', 'Оптимизация контента', 'Ссылочное', 'Аналитика'],
        result: 'Результат через 3-6 месяцев',
        timeline: '3-6 месяцев',
        price: 'от 40 000 ₽',
        color: 'from-emerald-500 to-teal-700',
        anchor: 'seo',
        comparisonValues: {
          duration: '3-6 мес',
          price: '60к+',
          target: '⭐⭐⭐',
          format: 'Высокая',
          result: '⭐⭐⭐⭐⭐'
        },
        faqs: []
      },
      {
        id: 'analytics',
        pixelIcon: 'scroll' as PixelIconName,
        title: 'Аналитика и аудит',
        metaphor: 'Карта сокровищ',
        description: 'Глубокий анализ текущей ситуации и поиск точек роста. Найдем, где вы теряете деньги.',
        includes: ['Анализ воронки', 'Настройка GA4/Метрики', 'Дашборды', 'Аудит рекламы', 'Точки роста'],
        result: 'Мгновенная диагностика',
        timeline: '1-2 дня',
        price: 'от 15 000 ₽',
        color: 'from-amber-400 to-yellow-600',
        anchor: 'analytics',
        comparisonValues: {
          duration: '1-2 дня',
          price: '15к',
          target: '—',
          format: 'Средняя',
          result: '⭐⭐⭐⭐'
        },
        faqs: []
      },
      {
        id: 'crm',
        pixelIcon: 'potion' as PixelIconName,
        title: 'Email/CRM-маркетинг',
        metaphor: 'Зелья силы',
        description: 'Автоворонки, прогревы, реактивация клиентов. Увеличим LTV и вернем ушедших клиентов.',
        includes: ['Сегментация базы', 'Автоворонки', 'Email-рассылки', 'Мессенджеры', 'CRM-настройка'],
        result: 'Повторные продажи',
        timeline: '2-4 недели',
        price: 'от 20 000 ₽',
        color: 'from-purple-500 to-fuchsia-700',
        anchor: 'crm',
        comparisonValues: {
          duration: '2-4 недели',
          price: '30к+',
          target: '⭐⭐⭐⭐',
          format: 'Средняя',
          result: '⭐⭐⭐⭐'
        },
        faqs: []
      },
      {
        id: 'complex',
        pixelIcon: 'crown' as PixelIconName,
        title: 'Комплексный маркетинг',
        metaphor: 'Гильдия героев',
        description: 'Полное управление всеми каналами продвижения. Команда в лице одного эксперта.',
        includes: ['Стратегия 360', 'Все рекламные каналы', 'Дизайн и тексты', 'Сквозная аналитика', 'Масштабирование'],
        result: 'Максимальный профит',
        timeline: 'от 2 недель',
        price: 'от 80 000 ₽',
        color: 'from-rpg-gold to-orange-500',
        anchor: 'complex',
        comparisonValues: {
          duration: '2 недели',
          price: '120к+',
          target: '⭐⭐⭐⭐⭐',
          format: 'Высокая',
          result: '⭐⭐⭐⭐⭐'
        },
        faqs: []
      }
    ];

    if (!sanityServices || sanityServices.length === 0) return fallbackServices;

    return sanityServices.map(s => ({
      id: s._id,
      pixelIcon: (s.icon as PixelIconName) || ('sword' as PixelIconName),
      title: s.name,
      metaphor: s.metaphor || '',
      description: s.description,
      includes: s.includes || [],
      result: s.result || s.results?.[0] || '',
      timeline: s.timeline,
      price: s.price,
      color: s.color || 'from-rpg-gold to-orange-400',
      anchor: s.slug?.current || s._id,
      comparisonValues: s.comparisonValues,
      faqs: s.faqs || []
    }));
  }, [sanityServices]);

  const comparisonData = useMemo(() => {
    if (!services.length) return [];
    const params = [
      { key: 'duration', label: '⚡ Скорость', hint: 'Время до получения первых измеримых результатов (лидов или трафика).' },
      { key: 'price', label: '💰 Мин. бюджет', hint: 'Рекомендуемый минимальный бюджет на рекламный бюджет + работу специалиста.' },
      { key: 'target', label: '🎯 Аудитория', hint: 'Степень точности попадания в целевую аудиторию и готовность клиентов к покупке.' },
      { key: 'format', label: '🛡️ Класс', hint: 'Сложность настройки и уровень необходимого вовлечения в бизнес-процессы.' },
      { key: 'result', label: '📈 Результат', hint: 'Потенциал долгосрочного влияния на рост прибыли и стабильность бизнеса.' }
    ];
    return params.map(p => {
      const row: any = { param: p.label, hint: p.hint };
      services.forEach(s => {
        row[s.id] = (s.comparisonValues as any)?.[p.key] || '—';
      });
      return row;
    });
  }, [services]);

  const faqs = useMemo(() => {
    const allFaqs: Array<{ q: string, a: string }> = [];
    services.forEach(s => {
      if (s.faqs) {
        s.faqs.forEach((f) => {
          if (!allFaqs.find(item => item.q === f.question)) {
            allFaqs.push({ q: f.question, a: f.answer });
          }
        });
      }
    });
    return allFaqs;
  }, [services]);

  const scrollToSection = (id: string | undefined) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    addXP(50);
    // Enable snap scrolling on the whole document for this page
    document.documentElement.classList.add('snap-y', 'snap-mandatory', 'scroll-smooth');

    // Handle initial scroll if hash is present
    const handleInitialScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the #/services part to get the actual anchor
        // HashRouter format is usually #/services#anchor
        const anchor = hash.split('#').pop();
        if (anchor && anchor !== 'services' && anchor !== '/') {
          // Small delay to ensure DOM is fully ready and Sanity data is rendered
          setTimeout(() => scrollToSection(anchor), 500);
        }
      }
    };

    if (sanityServices) {
      handleInitialScroll();
    }

    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory', 'scroll-smooth');
    };
  }, [addXP, sanityServices]);

  return (
    <Layout>
      <div className="services-snap-container">
        {/* Hero Section */}
        <section className="min-h-[80vh] lg:h-screen snap-start flex items-center bg-rpg-light relative overflow-hidden flex-shrink-0 pt-20 lg:pt-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rpg-gold/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl text-center lg:text-left"
            >
              <span className="text-rpg-gold font-bold text-sm uppercase tracking-widest mb-4 block">АРСЕНАЛ ГЕРОЯ</span>
              <h1 className="text-3xl md:text-6xl font-black text-rpg-dark mb-6 leading-tight">
                УСЛУГИ, КОТОРЫЕ<br />
                ПРИНОСЯТ <span className="text-rpg-gold underline decoration-4 underline-offset-8">ЗОЛОТО</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Выбери свой класс маркетинга. Каждый инструмент заточен под конкретные задачи бизнеса: от быстрой разведки до полномасштабного наступления.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollToSection(services[0]?.anchor)}
                  className="rpg-button w-full sm:w-auto px-8 py-4 bg-rpg-dark text-white border-none hover:bg-rpg-gold transition-all"
                >
                  Выбрать оружие
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-400 font-bold px-4">
                  <Shield className="w-5 h-5 text-rpg-gold/50" />
                  Прозрачность 100%
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Detail Sections */}
        {services.map((service, index) => (
          <section
            id={service.anchor}
            key={service.id}
            className={`min-h-screen lg:h-screen flex items-center py-16 lg:py-0 ${index % 2 === 0 ? 'bg-white' : 'bg-rpg-light'} ${window.innerWidth > 1024 ? 'snap-start' : ''}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className={`flex flex-col lg:flex-row ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} gap-12 lg:gap-16 items-center`}>

                {/* Visual side - Always on top on mobile, then text */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2 flex justify-center items-center h-[300px] sm:h-[400px] lg:h-[500px] order-1 lg:order-none"
                >
                  <div className="relative w-full h-full max-w-[400px] flex items-center justify-center">
                    {/* Navigation Arrows */}
                    {index > 0 && (
                      <button
                        onClick={() => scrollToSection(services[index - 1].anchor)}
                        className="absolute -left-2 lg:-left-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-rpg-dark hover:text-rpg-gold hover:border-rpg-gold rounded-full shadow-lg transition-all active:scale-90"
                      >
                        <ChevronLeft size={20} strokeWidth={3} />
                      </button>
                    )}

                    <div className="relative w-full h-full bg-white/40 backdrop-blur-sm rounded-[48px] border border-white/50 shadow-xl flex items-center justify-center group">
                      <ServiceHeroAnimation type={service.id} />

                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-rpg-dark/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                        {service.metaphor}
                      </div>
                    </div>

                    {index < services.length - 1 && (
                      <button
                        onClick={() => scrollToSection(services[index + 1].anchor)}
                        className="absolute -right-2 lg:-right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-rpg-dark hover:text-rpg-gold hover:border-rpg-gold rounded-full shadow-lg transition-all active:scale-90"
                      >
                        <ChevronRight size={20} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Content side */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-none"
                >
                  <div className="mb-8 text-center lg:text-left">
                    <h2 className="text-4xl md:text-6xl font-black text-rpg-dark mb-4 leading-none uppercase tracking-tighter drop-shadow-sm">{service.title}</h2>
                    <div className="inline-block px-4 py-1.5 bg-cyan-50 rounded-lg mb-6 border border-cyan-100">
                      <p className="text-cyan-600 font-black text-xl italic tracking-wide">"{service.metaphor}"</p>
                    </div>
                    <p className="text-gray-700 text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">{service.description}</p>
                  </div>

                  <div className="bg-white p-7 md:p-8 rounded-[40px] border-2 border-rpg-light shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-10 relative overflow-hidden group/list">
                    <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 lg:opacity-0 lg:group-hover/list:opacity-100 transition-opacity" />
                    <h3 className="font-black text-rpg-dark mb-6 uppercase text-xs tracking-[0.3em] flex items-center gap-3">
                      <span className="w-8 h-px bg-cyan-500" />
                      Что включено в квест
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 group/item">
                          <div className="bg-cyan-50 rounded-lg p-1 group-hover/item:bg-cyan-100 transition-colors">
                            <Check className="w-4 h-4 text-cyan-600 shrink-0" />
                          </div>
                          <span className="text-rpg-dark font-black text-sm tracking-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 items-stretch">
                    <div className="relative p-6 sm:p-8 bg-rpg-dark text-white rounded-[32px] shadow-2xl overflow-hidden group/card shadow-cyan-500/10 flex flex-col justify-between border-2 border-rpg-dark">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-20 transition-opacity text-cyan-400">
                        <TrendingUp className="w-12 h-12" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-black mb-3 tracking-[0.2em] opacity-60">Финальная Награда</p>
                        <p className="font-black text-lg md:text-xl text-cyan-400 leading-tight drop-shadow-[0_2_10px_rgba(34,211,238,0.3)]">{service.result}</p>
                      </div>
                    </div>

                    <div className="relative p-6 sm:p-8 bg-white rounded-[32px] border-2 border-rpg-dark/10 shadow-xl group/card shadow-rpg-gold/5 flex flex-col justify-between transition-all hover:border-rpg-dark/20">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:opacity-10 transition-opacity text-rpg-dark">
                        <Zap className="w-12 h-12" />
                      </div>
                      <div>
                        <p className="text-[10px] text-rpg-dark/40 uppercase font-black mb-3 tracking-[0.2em]">Стоимость Квеста</p>
                        <p className="font-black text-lg md:text-xl text-rpg-dark leading-tight">{service.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link to={`/services/${service.anchor}`} className="rpg-button w-full lg:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-sm uppercase">
                      Взять квест
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">
                      <Zap className="w-4 h-4 text-rpg-gold leading-none" />
                      Поход: {service.timeline}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        ))}

        {/* Comparison Table Section */}
        <section className="h-screen snap-start flex items-center bg-white flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4 uppercase tracking-tighter">СРАВНЕНИЕ УСЛУГ</h2>
              <div className="w-24 h-1.5 bg-rpg-gold mx-auto rounded-full" />
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-2xl bg-white">
              <TooltipProvider>
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="bg-rpg-light/50">
                      <th className="p-6 text-left border-b border-gray-200 font-black text-rpg-dark uppercase text-xs tracking-widest">Параметр</th>
                      {services.map(s => (
                        <th key={s.id} className="p-6 text-center border-b border-gray-200">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 flex items-center justify-center">
                              <img src={`/assets/images/weapon-${s.id}.png`} alt={s.title} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-rpg-dark">{s.title}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => (
                      <tr key={row.param} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-bold text-rpg-dark border-b border-gray-100 flex items-center gap-2 text-sm">
                          {row.param}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-gray-300 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-rpg-dark text-white border-rpg-gold/30">
                              <p className="text-xs">{row.hint}</p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        {services.map(s => (
                          <td key={s.id} className="p-5 text-center text-gray-600 border-b border-gray-100 font-bold text-sm">
                            {row[s.id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TooltipProvider>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="h-screen snap-start flex items-center bg-rpg-light flex-shrink-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4 uppercase tracking-tighter">FAQ</h2>
              <p className="text-gray-600 font-bold uppercase text-xs tracking-[0.2em] opacity-50">Ответы на частые вопросы искателей</p>
            </div>

            <div className="space-y-4">
              {faqs.slice(0, 5).map((faq, i) => (
                <motion.details
                  key={i}
                  className="group bg-white rounded-3xl p-6 shadow-sm border-2 border-transparent hover:border-rpg-gold transition-all duration-300 cursor-pointer"
                >
                  <summary className="flex items-center justify-between list-none font-bold text-lg text-rpg-dark">
                    <span className="flex items-center gap-3 pr-4">
                      <HelpCircle className="w-5 h-5 text-rpg-gold shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-300 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <div className="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 font-medium italic">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="h-screen snap-start flex items-center bg-rpg-dark text-white relative overflow-hidden flex-shrink-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rpg-gold/10 blur-[150px] rounded-full" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">ГОТОВЫ<br />К ПОХОДУ?</h2>
                <div className="space-y-6 mb-12">
                  {[
                    'Прозрачный аудит и стратегия',
                    'Точный расчет окупаемости',
                    'Команда экспертов на вашей стороне'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-rpg-gold rounded-lg p-1">
                        <Check className="w-5 h-5 text-rpg-dark" />
                      </div>
                      <span className="text-xl font-bold">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a href="/#/contact" className="rpg-button px-12 py-5 bg-rpg-gold text-rpg-dark hover:bg-white transition-all text-center text-xl">
                    Начать квест
                  </a>
                  <a href="https://t.me/alexey_marketer" className="inline-flex items-center justify-center gap-3 px-12 py-5 border-4 border-white/10 hover:border-rpg-gold transition-all font-black uppercase tracking-widest group">
                    <MessageSquare className="w-6 h-6 text-rpg-gold group-hover:scale-110 transition-transform" />
                    Telegram
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex lg:w-1/2 justify-center">
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-rpg-gold/20 blur-[80px] rounded-full" />
                  <img src="/assets/images/cta-chest.png" alt="Treasure" className="relative w-[500px] drop-shadow-[0_35px_50px_rgba(0,0,0,0.5)]" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
