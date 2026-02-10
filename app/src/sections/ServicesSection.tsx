import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check } from 'lucide-react';
import { getServices, urlFor } from '@/lib/sanity'; // Import Sanity helpers

// Keep initial services as fallback or initial state
const initialServices = [
  {
    id: 'contextual',
    name: 'КОНТЕКСТНАЯ РЕКЛАМА',
    type: 'Класс: Воин (Warrior)',
    icon: '/assets/images/weapon-contextual.png',
    stats: { damage: 95, speed: 100, control: 90 },
    color: 'from-orange-500 to-red-600',
    description: 'Оружие прямого урона. Яндекс Директ и Google Ads для быстрого привлечения горячих клиентов.',
    features: [
      'Быстрый старт и Мгновенный урон',
      'Сбор семантики и анализ конкурентов',
      'Настройка кампаний в Директ/Ads',
      'A/B-тесты объявлений',
      'Оптимизация стоимости лида'
    ],
    results: [
      'Первые лиды через 1-3 дня',
      'Тестирование гипотез',
      'Высокая точность таргетинга'
    ],
    price: 'от 30 000 ₽/мес'
  },
  {
    id: 'targeted',
    name: 'ТАРГЕТИРОВАННАЯ РЕКЛАМА',
    type: 'Класс: Лучник (Archer)',
    icon: '/assets/images/weapon-targeted.png',
    stats: { damage: 80, speed: 90, control: 95 },
    color: 'from-blue-400 to-indigo-600',
    description: 'Снайперская точность. VK, Telegram Ads — точечное попадание в вашу аудиторию.',
    features: [
      'Точечное попадание в ЦА',
      'Создание креативов и текстов',
      'Работа с нишевыми аудиториями',
      'Ретаргетинг и воронки',
      'Анализ поведения пользователей'
    ],
    results: [
      'Результаты за 3-7 дней',
      'Рост узнаваемости',
      'B2C и узкие ниши'
    ],
    price: 'от 25 000 ₽/мес'
  },
  {
    id: 'seo',
    name: 'SEO-ПРОДВИЖЕНИЕ',
    type: 'Класс: Паладин (Paladin)',
    icon: '/assets/images/weapon-seo.png',
    stats: { damage: 70, speed: 40, control: 85 },
    color: 'from-emerald-500 to-teal-700',
    description: 'Долгосрочная стратегия. Органический трафик, который работает годами.',
    features: [
      'Накопительный урон (эффект)',
      'Технический аудит сайта',
      'Контентная стратегия',
      'Внутренняя и внешняя оптимизация',
      'Работа с репутацией в поиске'
    ],
    results: [
      'Результат через 3-6 месяцев',
      'Стабильный поток трафика',
      'Снижение стоимости клиента'
    ],
    price: 'от 40 000 ₽/мес'
  },
  {
    id: 'analytics',
    name: 'АНАЛИТИКА И АУДИТ',
    type: 'Класс: Разведчик (Scout)',
    icon: '/assets/images/weapon-analytics.png',
    stats: { damage: 0, speed: 100, control: 100 },
    color: 'from-amber-400 to-yellow-600',
    description: 'Карта сокровищ. Глубокий анализ текущей ситуации и поиск точек роста.',
    features: [
      'Разведка и поиск точек роста',
      'Диагностика проблем воронки',
      'Настройка сквозной аналитики',
      'Аудит рекламных кабинетов',
      'Построение дашбордов'
    ],
    results: [
      'Мгновенная диагностика',
      'Снижение пустых расходов',
      'План масштабирования'
    ],
    price: 'от 15 000 ₽ (разово)'
  },
  {
    id: 'crm',
    name: 'EMAIL/CRM-МАРКЕТИНГ',
    type: 'Класс: Алхимик (Alchemist)',
    icon: '/assets/images/weapon-crm.png',
    stats: { damage: 75, speed: 60, control: 90 },
    color: 'from-purple-500 to-fuchsia-700',
    description: 'Зелья силы. Автоворонки, прогревы, реактивация клиентов.',
    features: [
      'Удержание и реактивация',
      'Настройка автоворонок',
      'Сегментация базы клиентов',
      'Email и мессенджер-маркетинг',
      'LTV-оптимизация'
    ],
    results: [
      'Результат за 2-4 недели',
      'Повторные продажи',
      'Автоматизация маркетинга'
    ],
    price: 'от 20 000 ₽/мес'
  },
  {
    id: 'complex',
    name: 'КОМПЛЕКСНЫЙ МАРКЕТИНГ',
    type: 'Класс: Командир (Commander)',
    icon: '/assets/images/weapon-complex.png',
    stats: { damage: 100, speed: 85, control: 100 },
    color: 'from-rpg-gold to-orange-500',
    description: 'Гильдия героев. Полное управление всеми каналами продвижения.',
    features: [
      'Максимальный урон конкурентам',
      'Единая стратегия продвижения',
      'Управление всеми кабинетами',
      'Глубокая сквозная аналитика',
      'Масштабирование бизнеса'
    ],
    results: [
      'Комплексный результат',
      'Синергия всех каналов',
      'Освобождение времени владельца'
    ],
    price: 'от 80 000 ₽/мес'
  }
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addXP, showXPPopup, addItem, inventory, visitSection } = useGame();

  const [services, setServices] = useState(initialServices);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const sanityServices = await getServices();
        if (sanityServices && sanityServices.length > 0) {
          const mappedServices = sanityServices.map((s: any) => ({
            id: s.slug?.current || s._id,
            name: s.name,
            type: s.type,
            icon: s.icon ? urlFor(s.icon).url() : '/weapon-contextual.png',
            stats: s.stats || { damage: 0, speed: 0, control: 0 },
            color: s.color || 'from-gray-400 to-slate-400',
            description: s.description,
            features: s.includes || [],
            results: s.results || []
          }));
          setServices(mappedServices);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    }
    fetchServices();
  }, []);

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);

    // Add to inventory if not already there
    const isInInventory = inventory.some(item => item.id === service.id);
    if (!isInInventory) {
      addItem({
        id: service.id,
        name: service.name,
        type: 'tool',
        rarity: 'epic',
        stats: {
          STR: Math.floor(service.stats.damage / 10),
          DEX: Math.floor(service.stats.speed / 10),
          INT: Math.floor(service.stats.control / 10),
        },
        icon: service.icon,
        description: service.description
      });
    }

    addXP(30);
    showXPPopup(30, window.innerWidth / 2, window.innerHeight / 2);
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          onViewportEnter={() => visitSection('services')}
        >
          <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
            АРСЕНАЛ ГЕРОЯ
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">
            ВЫБЕРИ СВОЙ КЛАСС МАРКЕТИНГА
          </h2>
          <div className="w-24 h-1 bg-rpg-gold mx-auto" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Каждый инструмент заточен под конкретные задачи бизнеса: от быстрой разведки до полномасштабного наступления.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleServiceClick(service)}
              className="cursor-pointer group h-full"
            >
              <div className="bg-rpg-light rounded-2xl p-6 border-2 border-transparent hover:border-rpg-gold transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-14 h-14 object-contain mix-blend-multiply"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center flex-1 flex flex-col">
                  <p className="text-xs text-gray-500 mb-2">{service.type}</p>
                  <h3 className="text-lg font-black text-rpg-dark mb-4 group-hover:text-rpg-gold transition-colors min-h-[3.5rem] flex items-center justify-center">
                    {service.name}
                  </h3>

                  {/* Stats */}
                  <div className="space-y-2 mb-6">
                    {service.stats.damage > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-16">⚔️ Damage</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${service.color}`}
                            style={{ width: `${service.stats.damage}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold w-8">{service.stats.damage}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">⚡ Speed</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${service.color}`}
                          style={{ width: `${service.stats.speed}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold w-8">{service.stats.speed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">🎯 Control</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${service.color}`}
                          style={{ width: `${service.stats.control}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold w-8">{service.stats.control}</span>
                    </div>
                  </div>

                  {/* CTA - Pushed to bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <span className="text-sm font-semibold text-rpg-gold group-hover:underline">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedService.color} flex items-center justify-center`}>
                    <img
                      src={selectedService.icon}
                      alt={selectedService.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-black text-rpg-dark">
                      {selectedService.name}
                    </DialogTitle>
                    <p className="text-sm text-gray-500">{selectedService.type}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Description */}
                <p className="text-gray-700">{selectedService.description}</p>

                {/* Stats */}
                <div className="bg-rpg-light rounded-xl p-4">
                  <h4 className="font-bold text-rpg-dark mb-3">ХАРАКТЕРИСТИКИ</h4>
                  <div className="space-y-2">
                    {selectedService.stats.damage > 0 && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-24">⚔️ Damage</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${selectedService.color}`}
                            style={{ width: `${selectedService.stats.damage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{selectedService.stats.damage}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-24">⚡ Speed</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${selectedService.color}`}
                          style={{ width: `${selectedService.stats.speed}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{selectedService.stats.speed}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-24">🎯 Control</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${selectedService.color}`}
                          style={{ width: `${selectedService.stats.control}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{selectedService.stats.control}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-bold text-rpg-dark mb-3">ЧТО ВХОДИТ</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-rpg-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div className="bg-rpg-gold/10 rounded-xl p-4">
                  <h4 className="font-bold text-rpg-dark mb-3">РЕЗУЛЬТАТ</h4>
                  <ul className="space-y-2">
                    {selectedService.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rpg-gold">★</span>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    setSelectedService(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full rpg-button"
                >
                  Обсудить эту услугу
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
