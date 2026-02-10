import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useSanityData } from '@/hooks/useSanityData';
import { getCases, urlFor } from '@/lib/sanity';

export function CasesPreviewSection() {
    const { data: sanityCases, loading } = useSanityData<any[]>(getCases);
    const [currentIndex, setCurrentIndex] = useState(0);

    const cases = useMemo(() => {
        if (!sanityCases) return [];
        return sanityCases.map(c => ({
            id: c._id,
            client: c.client,
            category: c.niche,
            duration: c.duration,
            challenge: c.challenge,
            image: c.image ? urlFor(c.image).width(800).url() : null,
            metrics: c.results?.map((r: any) => ({
                label: r.label,
                before: r.before,
                after: r.after,
                isPositive: r.icon === 'TrendingUp'
            })) || []
        }));
    }, [sanityCases]);

    const nextCase = () => {
        if (cases.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % cases.length);
    };

    const prevCase = () => {
        if (cases.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
    };

    const currentCase = cases[currentIndex];

    if (loading) {
        return (
            <section className="py-20 md:py-32 bg-rpg-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
                        <div className="h-8 w-64 bg-gray-300 rounded mb-16" />
                        <div className="h-96 w-full max-w-4xl bg-white rounded-2xl" />
                    </div>
                </div>
            </section>
        );
    }

    if (cases.length === 0) return null;

    return (
        <section className="py-20 md:py-32 bg-rpg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
                        ДОКАЗАТЕЛЬСТВА
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">
                        ПРОЙДЕННЫЕ КВЕСТЫ
                    </h2>
                    <div className="w-24 h-1 bg-rpg-gold mx-auto" />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Реальные результаты реальных проектов
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-xl border border-rpg-dark/5"
                        >
                            {/* Case Header/Image Placeholder */}
                            <div className="relative h-64 bg-rpg-dark flex items-center justify-center overflow-hidden">
                                {currentCase.image ? (
                                    <img
                                        src={currentCase.image}
                                        alt={currentCase.client}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-rpg-dark to-rpg-dark/80" />
                                )}
                                <div className="relative z-10 text-center px-6">
                                    <h3 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-md">{currentCase.client}</h3>
                                    <p className="text-rpg-gold font-bold text-lg">{currentCase.category} • {currentCase.duration}</p>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10 relative mt-[-2rem]">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                                    <span className="text-xs font-black text-rpg-gold uppercase tracking-widest block mb-2">ЧЕЛЛЕНДЖ (БОСС)</span>
                                    <p className="text-gray-700 text-lg leading-relaxed">{currentCase.challenge}</p>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                                    {currentCase.metrics.map((metric: any) => (
                                        <div key={metric.label} className="text-center p-4 rounded-xl bg-rpg-light/50 border border-gray-100">
                                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{metric.label}</p>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-400 line-through font-medium">{metric.before}</p>
                                                <div className="flex items-center justify-center gap-2">
                                                    <p className="text-3xl font-black text-rpg-dark tracking-tighter">{metric.after}</p>
                                                    {metric.isPositive ? (
                                                        <TrendingUp className="w-5 h-5 text-green-500" />
                                                    ) : (
                                                        <TrendingDown className="w-5 h-5 text-red-500" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href={`/#/cases/${currentCase.id}`}
                                    className="w-full py-4 bg-rpg-dark text-white rounded-xl font-black uppercase tracking-widest hover:bg-rpg-gold hover:text-rpg-dark transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
                                >
                                    Резюме Квеста
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <button
                        onClick={prevCase}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-rpg-gold hover:scale-110 transition-all duration-200 z-20 border border-gray-100"
                        aria-label="Previous case"
                    >
                        <ChevronLeft className="w-6 h-6 text-rpg-dark" />
                    </button>
                    <button
                        onClick={nextCase}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-rpg-gold hover:scale-110 transition-all duration-200 z-20 border border-gray-100"
                        aria-label="Next case"
                    >
                        <ChevronRight className="w-6 h-6 text-rpg-dark" />
                    </button>

                    {/* Indicators */}
                    <div className="flex justify-center gap-3 mt-10">
                        {cases.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-10 bg-rpg-gold' : 'w-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to case ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Overall CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <a href="/#/cases" className="rpg-button inline-flex group px-8 py-4">
                        Посмотреть все летописи
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
