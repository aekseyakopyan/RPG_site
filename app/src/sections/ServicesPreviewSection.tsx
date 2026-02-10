import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Check } from 'lucide-react';
import { useMemo } from 'react';
import { getServices } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import type { SanityService } from '@/types/sanity';

export function ServicesPreviewSection() {
    const { data: sanityServices } = useSanityData<SanityService[]>(getServices);

    const services = useMemo(() => {
        const fallbackServices = [
            {
                id: 'contextual',
                name: 'Контекстная реклама',
                metaphor: 'Оружие прямого урона',
                description: 'Яндекс Директ и Google Ads для быстрого привлечения горячих клиентов.',
                includes: ['Аудит и стратегия', 'Сбор семантики', 'Настройка кампаний'],
                timeline: '3-5 дней',
                price: 'от 30 000 ₽',
                anchor: 'contextual'
            },
            {
                id: 'targeted',
                name: 'Таргетированная реклама',
                metaphor: 'Снайперская точность',
                description: 'VK, Telegram Ads — точечное попадание в вашу аудиторию. Идеально для B2C.',
                includes: ['Анализ ЦА', 'Креативы и тексты', 'Настройка таргета'],
                timeline: '7 дней',
                price: 'от 25 000 ₽',
                anchor: 'targeted'
            },
            {
                id: 'seo',
                name: 'SEO-продвижение',
                metaphor: 'Долгосрочная стратегия',
                description: 'Органический трафик, который работает годами. Инвестируйте в фундамент.',
                includes: ['Технический аудит', 'Семантика', 'Оптимизация контента'],
                timeline: '3-6 месяцев',
                price: 'от 40 000 ₽',
                anchor: 'seo'
            }
        ];

        if (!sanityServices || sanityServices.length === 0) return fallbackServices;

        return sanityServices.map(s => ({
            id: s.slug?.current || s._id,
            name: s.name,
            metaphor: s.metaphor || 'Гвардейское оружие',
            description: s.description?.substring(0, 100) + '...',
            includes: (s.includes || []).slice(0, 3),
            result: s.result || s.results?.[0] || 'Победа в битве',
            timeline: s.timeline,
            price: s.price,
            anchor: s.slug?.current || s._id
        }));
    }, [sanityServices]);

    const totalCount = sanityServices?.length || 12;

    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-rpg-gold font-bold text-sm uppercase tracking-[0.3em] mb-4 block">
                        АРСЕНАЛ ГЕРОЯ
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-rpg-dark mb-4 uppercase tracking-tighter">
                        ВЫБЕРИ <span className="text-rpg-gold">ОРУЖИЕ</span> ПОБЕДЫ
                    </h2>
                    <div className="w-24 h-1.5 bg-rpg-gold mx-auto rounded-full mb-6" />
                    <p className="text-gray-500 font-bold max-w-2xl mx-auto uppercase text-sm tracking-widest opacity-70">
                        Каждый инструмент заточен под конкретные задачи вашего бизнеса
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {services.slice(0, 3).map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-[2rem] p-6 sm:p-8 border-2 border-gray-100 hover:border-rpg-gold transition-all duration-500 relative flex flex-col shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2"
                        >
                            {/* Card Decoration */}
                            <div className="absolute top-6 right-8 text-rpg-gold/10 font-black text-6xl select-none group-hover:text-rpg-gold/20 transition-colors">
                                0{index + 1}
                            </div>

                            <div className="w-16 h-16 bg-rpg-light rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                <img
                                    src={`/assets/images/weapon-${service.id}.png`}
                                    alt={service.name}
                                    className="w-10 h-10 object-contain mix-blend-multiply"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/assets/images/hero-marketer.png';
                                    }}
                                />
                            </div>

                            <h3 className="text-2xl font-black text-rpg-dark mb-2 uppercase tracking-tight leading-none h-14 flex items-center">
                                {service.name}
                            </h3>
                            <p className="text-[10px] font-black text-rpg-gold uppercase tracking-[0.2em] mb-6">
                                {service.metaphor}
                            </p>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {service.includes.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="p-0.5 bg-green-100 rounded-full">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-500">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-rpg-dark text-white p-4 rounded-xl mb-6 flex flex-col justify-center border-b-4 border-rpg-gold/20">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">НАГРАДА (РЕЗУЛЬТАТ)</span>
                                <span className="text-xs font-bold text-rpg-gold leading-tight">{(service as any).result}</span>
                            </div>

                            <div className="pt-6 border-t border-gray-50 mt-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">СТОИМОСТЬ</span>
                                        <span className="text-lg font-black text-rpg-dark">{service.price}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">СРОК</span>
                                        <span className="text-xs font-bold text-rpg-gold flex items-center gap-1">
                                            <Zap className="w-3 h-3" />
                                            {service.timeline}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    to={`/services/${service.anchor}`}
                                    className="mt-auto group/btn flex items-center justify-center gap-2 py-4 bg-rpg-light text-rpg-dark font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-rpg-dark hover:text-white transition-all duration-300"
                                >
                                    Подробнее
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Overall CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <a
                        href="/#/services"
                        className="inline-flex items-center justify-center px-10 py-5 bg-white border-2 border-rpg-dark text-rpg-dark rounded-xl font-black shadow-[8px_8px_0px_#1a1a2e] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group text-sm uppercase tracking-[0.2em]"
                    >
                        Посмотреть весь арсенал ({totalCount})
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
