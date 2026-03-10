import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TargetAudienceSection() {
    const [activeTab, setActiveTab] = useState(0);

    const segments = [
        {
            id: 0,
            name: 'Стартапы',
            icon: '🚀',
            title: 'Стартапы с PMF',
            characteristics: 'Есть продукт, но нет потока заявок? Найду работающие связки.',
            threshold: 'Наличие Product-Market Fit',
            result: 'Помогу построить первые каналы привлечения'
        },
        {
            id: 1,
            name: 'E-commerce',
            icon: '🛍️',
            title: 'E-commerce',
            characteristics: 'Уже продаёте, но хотите расти быстрее? Найду точки роста.',
            threshold: 'Оборот от 3M₽/мес',
            result: 'Масштабирую работающие связки'
        },
        {
            id: 2,
            name: 'B2B-сервисы',
            icon: '🤝',
            title: 'B2B-сервисы',
            characteristics: 'Длинный цикл сделки, высокий LTV? Нужен CPA-подход.',
            threshold: 'LTV от 50 000₽',
            result: 'Построю прогнозируемый поток лидов'
        },
        {
            id: 3,
            name: 'Агентства',
            icon: '👥',
            title: 'Агентства',
            characteristics: 'Нужен надёжный White Label подрядчик по performance?',
            threshold: 'Регулярные проекты',
            result: 'Стану вашей "руками" без брендирования'
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">ЦЕЛЕВАЯ АУДИТОРИЯ</span>
                    <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">С КЕМ Я РАБОТАЮ</h2>
                    <div className="w-24 h-1 bg-rpg-gold mx-auto" />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Если вы узнали себя в одном из сегментов — мы точно найдём общий язык
                    </p>
                </div>

                {/* ТАБЫ */}
                <div className="mt-12">
                    <div className="flex gap-4 mb-10 overflow-x-auto pb-4 justify-start md:justify-center">
                        {segments.map((segment) => (
                            <button
                                key={segment.id}
                                className={`flex items-center gap-2 px-5 py-3 rounded-lg border-2 font-bold text-sm transition-all duration-300 whitespace-nowrap ${activeTab === segment.id
                                        ? 'bg-gradient-to-br from-rpg-gold to-orange-400 border-rpg-gold text-rpg-dark shadow-lg scale-105'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-rpg-gold hover:text-rpg-gold'
                                    }`}
                                onClick={() => setActiveTab(segment.id)}
                            >
                                <span className="text-xl">{segment.icon}</span>
                                <span className="hidden sm:inline">{segment.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* КОНТЕНТ АКТИВНОГО ТАБА */}
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rpg-gold to-orange-400" />

                                <h3 className="text-2xl md:text-3xl font-black text-rpg-dark mb-8">{segments[activeTab].title}</h3>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white p-6 rounded-xl border-l-4 border-rpg-gold shadow-sm">
                                        <div className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-2">ХАРАКТЕРИСТИКИ</div>
                                        <p className="text-gray-700 leading-relaxed font-medium">{segments[activeTab].characteristics}</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border-l-4 border-rpg-gold shadow-sm">
                                        <div className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-2">МИНИМАЛЬНЫЙ ПОРОГ</div>
                                        <p className="text-gray-700 leading-relaxed font-bold">{segments[activeTab].threshold}</p>
                                    </div>

                                    <div className="md:col-span-2 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-orange-400 shadow-sm">
                                        <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">ЧТО Я СДЕЛАЮ</div>
                                        <p className="text-rpg-dark text-lg font-bold italic">"{segments[activeTab].result}"</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
                                    <a href="/#/contact" className="w-full md:w-auto px-8 py-4 bg-gradient-to-br from-rpg-gold to-orange-400 text-rpg-dark rounded-lg font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                                        Обсудить подробнее
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-6 font-medium">Не уверены, подходите ли вы? Давайте обсудим за 15 минут</p>
                    <a href="/#/contact" className="inline-flex px-10 py-4 bg-rpg-dark text-white rounded-lg font-bold shadow-lg hover:bg-gray-800 transition-colors">ОБСУДИТЬ КВЕСТ</a>
                </div>
            </div>
        </section>
    );
}
