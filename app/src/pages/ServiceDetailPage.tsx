import { motion } from 'framer-motion';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
    Check,
    ArrowRight,
    Clock,
    Zap,
    Shield,
    Target,
    TrendingUp,
    ChevronRight,
    HelpCircle,
    MessageSquare,
    Award,
    Sword,
    Search
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { detailedServices } from '@/data/detailedServices';
import { useEffect } from 'react';
import { ServiceHeroAnimation } from '@/components/animations/ServiceHeroAnimation';
import { QuestModal } from '@/components/QuestModal';
import { useState } from 'react';

const iconMap: any = {
    'Warrior (Воин)': <Sword className="w-5 h-5" />,
    'Archer (Лучник)': <Target className="w-5 h-5" />,
    'Paladin (Паладин)': <Shield className="w-5 h-5" />,
    'Scout (Разведчик)': <Search className="w-5 h-5" />,
    'Alchemist (Алхимик)': <Zap className="w-5 h-5" />,
    'Commander (Командир)': <Award className="w-5 h-5" />,
};

export function ServiceDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const service = slug ? detailedServices[slug] : null;
    const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<string>('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    return (
        <Layout>
            <div className="bg-white">
                {/* Breadcrumbs */}
                <div className="bg-rpg-light/30 border-b border-gray-100 py-4 pt-24 lg:pt-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                            <Link to="/" className="hover:text-rpg-gold transition-colors">Главная</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link to="/services" className="hover:text-rpg-gold transition-colors">Арсенал</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-rpg-dark">{service.title.split(' — ')[0]}</span>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden bg-rpg-dark text-white">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rpg-gold/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:w-3/5"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rpg-gold/20 border border-rpg-gold/30 rounded-full text-rpg-gold text-xs font-black uppercase tracking-[0.2em] mb-8">
                                    <Zap className="w-4 h-4" />
                                    Доступно для квеста
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
                                    {service.title.split(' — ')[0]} — <br />
                                    <span className="text-rpg-gold">{service.title.split(' — ')[1]}</span>
                                </h1>
                                <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                                    {service.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                        <div className="w-10 h-10 bg-rpg-gold/20 rounded-xl flex items-center justify-center text-rpg-gold group-hover:scale-110 transition-transform">
                                            {iconMap[service.heroStats.class] || <Sword className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">КЛАСС ГЕРОЯ</p>
                                            <p className="font-bold text-sm tracking-tight">{service.heroStats.class}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                        <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">УРОН (ПРОФИТ)</p>
                                            <p className="font-bold text-sm tracking-tight">{service.heroStats.damage}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">СКОРОСТЬ АТАКИ</p>
                                            <p className="font-bold text-sm tracking-tight">{service.heroStats.speed}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">ТОЧНОСТЬ ПОПАДАНИЯ</p>
                                            <p className="font-bold text-sm tracking-tight">{service.heroStats.accuracy}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="/#/contact" className="rpg-button px-10 py-5 text-xl">
                                        Начать кампанию
                                    </a>
                                    <div className="flex items-center gap-3 px-6 py-2 border-l-2 border-rpg-gold/30 ml-0 sm:ml-4">
                                        <p className="text-xl font-black text-rpg-gold">{service.heroStats.cost.split(' + ')[0]}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="lg:w-2/5 flex justify-center items-center h-[400px] md:h-[500px]"
                            >
                                <div className="relative w-full h-full max-w-[450px]">
                                    <ServiceHeroAnimation type={service.slug} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stages Section */}
                <section className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <span className="text-rpg-gold font-bold text-sm uppercase tracking-[0.3em] mb-4 block">{service.stagesTitle}</span>
                            <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-6 uppercase tracking-tight leading-none h-14 flex items-center justify-center">ЭТАПЫ КВЕСТА</h2>
                            <div className="w-24 h-1.5 bg-rpg-gold mx-auto rounded-full mb-6" />
                            <p className="text-gray-500 font-bold max-w-2xl mx-auto uppercase text-sm tracking-widest">{service.stagesDescription}</p>
                        </div>

                        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                            {service.stages.map((stage, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    {/* Dot */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-100 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-500 group-hover:border-rpg-gold group-hover:scale-110">
                                        <div className="w-4 h-4 rounded-full bg-gray-200 group-hover:bg-rpg-gold transition-colors duration-500" />
                                    </div>
                                    {/* Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-rpg-gold transition-all duration-500 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-0">
                                            <h3 className="text-xl md:text-2xl font-black text-rpg-dark uppercase tracking-tight">{stage.title}</h3>
                                            <span className="inline-flex items-center px-3 py-1 bg-rpg-light text-rpg-dark font-black text-[10px] uppercase rounded-lg border border-gray-200">
                                                <Clock className="w-3 h-3 mr-1.5 text-rpg-gold" />
                                                {stage.duration}
                                            </span>
                                        </div>
                                        <ul className="space-y-4 mb-8">
                                            {stage.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Check className="w-2.5 h-2.5 text-green-600" />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-600 leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="bg-rpg-dark text-white p-4 rounded-xl flex flex-col justify-center border-b-4 border-rpg-gold/20">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ОЖИДАЕМЫЙ РЕЗУЛЬТАТ</span>
                                            <span className="text-xs font-bold text-rpg-gold leading-tight italic">"{stage.result}"</span>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="py-24 bg-rpg-light/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-rpg-gold font-bold text-sm uppercase tracking-[0.3em] mb-4 block">ПРИМЕНЕНИЕ ОРУЖИЯ</span>
                                <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-8 uppercase tracking-tighter leading-none">{service.useCasesTitle}</h2>
                                <div className="space-y-4">
                                    {service.useCases.map((useCase, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-rpg-gold hover:shadow-md transition-all group">
                                            <div className="w-8 h-8 bg-rpg-gold/10 rounded-lg flex items-center justify-center text-rpg-gold font-black group-hover:bg-rpg-gold group-hover:text-rpg-dark transition-all">
                                                {idx + 1}
                                            </div>
                                            <p className="font-bold text-gray-700 text-sm md:text-base">{useCase}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-[40px] border-2 border-gray-100 shadow-2xl overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <TrendingUp className="w-64 h-64 text-rpg-dark" />
                                </div>
                                <h3 className="text-xl font-black text-rpg-dark uppercase mb-8 relative z-10">Средние показатели урона (ROI)</h3>
                                <div className="overflow-x-auto relative z-10">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b-2 border-gray-100">
                                                <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Тип бизнеса</th>
                                                <th className="py-4 font-black uppercase text-[10px] tracking-widest text-rpg-gold text-center">ROI</th>
                                                <th className="py-4 font-black uppercase text-[10px] tracking-widest text-gray-400 text-right">CPL</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {service.targetAudienceTable.map((row, idx) => (
                                                <tr key={idx} className="group hover:bg-rpg-light/50 transition-colors">
                                                    <td className="py-4">
                                                        <p className="font-bold text-rpg-dark text-sm">{row.type}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{row.reason}</p>
                                                    </td>
                                                    <td className="py-4 text-center font-black text-green-600 text-sm">{row.roi}</td>
                                                    <td className="py-4 text-right font-bold text-rpg-dark text-sm">{row.cpl}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Advantages Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-rpg-gold font-bold text-sm uppercase tracking-[0.3em] mb-4 block">ПРЕДИМУЩЕСТВА</span>
                            <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4 uppercase tracking-tighter">{service.advantagesTitle}</h2>
                            <div className="w-24 h-1.5 bg-rpg-gold mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.advantages.map((adv, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 bg-rpg-light/30 rounded-[32px] border border-gray-100 hover:border-rpg-gold hover:bg-white transition-all duration-300 shadow-sm"
                                >
                                    <h3 className="text-xl font-black text-rpg-dark mb-4 uppercase tracking-tight">{adv.title}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed">{adv.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing/Packages Section */}
                <section className="py-24 bg-rpg-dark relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-rpg-gold font-bold text-sm uppercase tracking-[0.3em] mb-4 block">СТОИМОСТЬ ПОХОДА</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">{service.packagesTitle}</h2>
                            <div className="w-24 h-1.5 bg-rpg-gold mx-auto rounded-full" />
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                            {service.packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex flex-col p-8 rounded-[40px] border-2 transition-all duration-500 ${pkg.isPopular
                                        ? 'bg-white border-rpg-gold shadow-[0_30px_60px_-15px_rgba(212,175,55,0.3)] scale-105 z-10'
                                        : 'bg-white/5 border-white/10 hover:border-white/30 text-white'
                                        }`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-rpg-gold text-rpg-dark font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                                            Популярный выбор
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className={`text-2xl font-black uppercase mb-4 ${pkg.isPopular ? 'text-rpg-dark' : 'text-white'}`}>{pkg.name}</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-4xl font-black ${pkg.isPopular ? 'text-rpg-gold' : 'text-white'}`}>{pkg.price.split('/')[0]}</span>
                                            <span className={`text-xs font-bold uppercase opacity-60 ${pkg.isPopular ? 'text-rpg-dark' : 'text-white'}`}>{pkg.price.includes('/') ? `/${pkg.price.split('/')[1]}` : ''}</span>
                                        </div>
                                        {pkg.budget && (
                                            <p className={`text-sm font-bold mt-2 ${pkg.isPopular ? 'text-gray-400' : 'text-gray-400'}`}>+ бюджет {pkg.budget}</p>
                                        )}
                                        {pkg.period && (
                                            <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${pkg.isPopular ? 'text-rpg-gold' : 'text-rpg-gold'}`}>{pkg.period}</p>
                                        )}
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className={`w-4 h-4 mt-1 shrink-0 ${pkg.isPopular ? 'text-rpg-gold' : 'text-rpg-gold'}`} />
                                                <span className={`text-sm font-bold leading-snug ${pkg.isPopular ? 'text-gray-600' : 'text-gray-300'}`}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto pt-8 border-t border-current border-opacity-10 space-y-6">
                                        <div className="text-center space-y-1">
                                            <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${pkg.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>Подходит для:</p>
                                            <p className={`text-sm font-bold italic ${pkg.isPopular ? 'text-rpg-dark font-black' : 'text-white'}`}>{pkg.forWho}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedPackage(pkg.name);
                                                setIsQuestModalOpen(true);
                                            }}
                                            className={`block w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center transition-all ${pkg.isPopular
                                                ? 'bg-rpg-dark text-white hover:bg-rpg-gold hover:text-rpg-dark'
                                                : 'bg-white text-rpg-dark hover:bg-rpg-gold transition-colors shadow-lg shadow-black/20'
                                                }`}
                                        >
                                            Выбрать пакет
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {service.additionalCosts && (
                            <div className="mt-16 bg-white/5 border border-white/10 p-8 rounded-[32px] max-w-4xl mx-auto">
                                <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6 text-center">Дополнительные услуги</h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {service.additionalCosts.map((cost, idx) => (
                                        <div key={idx} className="flex flex-col gap-2 text-center">
                                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-tight">{cost.label}</p>
                                            <p className="text-rpg-gold font-black text-sm leading-tight">{cost.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-rpg-gold font-bold text-sm uppercase tracking-[0.3em] mb-4 block">БАЗА ЗНАНИЙ</span>
                            <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4 uppercase tracking-tighter">FAQ</h2>
                            <div className="w-24 h-1.5 bg-rpg-gold mx-auto rounded-full" />
                        </div>

                        <div className="space-y-4">
                            {service.faq.map((item, idx) => (
                                <motion.details
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group bg-rpg-light/30 rounded-3xl p-6 border-2 border-transparent hover:border-rpg-gold transition-all duration-300 cursor-pointer"
                                >
                                    <summary className="flex items-center justify-between list-none font-bold text-lg text-rpg-dark">
                                        <span className="flex items-center gap-4 pr-8">
                                            <HelpCircle className="w-5 h-5 text-rpg-gold shrink-0" />
                                            {item.question}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-open:rotate-90 transition-transform shrink-0" />
                                    </summary>
                                    <div className="mt-6 text-gray-600 leading-relaxed font-medium italic border-t border-gray-100 pt-6">
                                        {item.answer}
                                    </div>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-rpg-dark text-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rpg-gold/10 blur-[150px] rounded-full" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16 px-8 py-16 bg-white/5 backdrop-blur-md rounded-[60px] border border-white/10 shadow-2xl">
                            <div className="lg:w-3/5 text-center lg:text-left">
                                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">
                                    {service.finalCta.title}
                                </h2>
                                <p className="text-lg text-gray-400 font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    {service.finalCta.text}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                                    <a href="/#/contact" className="rpg-button px-10 py-5 text-lg">
                                        {service.finalCta.buttonText}
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </a>
                                    <a href="https://t.me/alexey_marketer" className="flex items-center gap-3 text-white hover:text-rpg-gold transition-colors group">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-rpg-gold group-hover:text-rpg-dark transition-all">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">ИЛИ НАПИСАТЬ В</p>
                                            <p className="font-bold">Telegram: @alexey_marketer</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="lg:w-2/5 flex justify-center">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-rpg-gold/30 blur-[60px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                                    <img
                                        src="/assets/images/cta-chest.png"
                                        alt="Treasure Chest"
                                        className="w-80 h-auto relative z-10 drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] transform group-hover:-translate-y-4 group-hover:rotate-3 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <QuestModal
                    isOpen={isQuestModalOpen}
                    onClose={() => setIsQuestModalOpen(false)}
                    packageName={selectedPackage}
                    serviceName={service.title.split(' — ')[0]}
                />
            </div>
        </Layout>
    );
}
