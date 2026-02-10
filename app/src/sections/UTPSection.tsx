import { motion } from 'framer-motion';

export function UTPSection() {
    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
                        ПРЕИМУЩЕСТВА
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4 uppercase">
                        ПОЧЕМУ РАБОТАТЬ СО МНОЙ
                    </h2>
                    <div className="w-24 h-1 bg-rpg-gold mx-auto" />
                </motion.div>

                {/* 6 Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200 hover:border-rpg-gold transition-all duration-300 relative text-center group shadow-sm hover:shadow-xl"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-rpg-gold to-orange-400 rounded-b-lg" />

                        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                            🎯
                        </div>

                        <h3 className="text-xl font-bold text-rpg-dark mb-2 uppercase">НЕ АГЕНТСТВО</h3>
                        <p className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-4">ПРЯМАЯ РАБОТА БЕЗ МЕНЕДЖЕРОВ</p>
                        <p className="text-gray-600 leading-relaxed">
                            Вы общаетесь напрямую со мной. Я лично веду ваш проект от аудита до результата.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200 hover:border-rpg-gold transition-all duration-300 relative text-center group shadow-sm hover:shadow-xl"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-rpg-gold to-orange-400 rounded-b-lg" />

                        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                            📊
                        </div>

                        <h3 className="text-xl font-bold text-rpg-dark mb-2 uppercase">ЦИФРЫ, НЕ СЛОВА</h3>
                        <p className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-4">ДАШБОРДЫ 24/7</p>
                        <p className="text-gray-600 leading-relaxed">
                            Вы всегда видите, куда уходят деньги и какие результаты они приносят.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200 hover:border-rpg-gold transition-all duration-300 relative text-center group shadow-sm hover:shadow-xl"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-rpg-gold to-orange-400 rounded-b-lg" />

                        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                            ⚡
                        </div>

                        <h3 className="text-xl font-bold text-rpg-dark mb-2 uppercase">ЧЕСТНАЯ АНАЛИТИКА</h3>
                        <p className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-4">ОСТАНОВКА ПРИ СЛИВЕ</p>
                        <p className="text-gray-600 leading-relaxed">
                            Если бюджет сливается — я честно скажу и остановлю кампанию. Не тяну деньги ради процента.
                        </p>
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200 hover:border-rpg-gold transition-all duration-300 relative text-center group shadow-sm hover:shadow-xl"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-rpg-gold to-orange-400 rounded-b-lg" />

                        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                            🚀
                        </div>

                        <h3 className="text-xl font-bold text-rpg-dark mb-2 uppercase">БЫСТРЫЙ СТАРТ</h3>
                        <p className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-4">ЗАПУСК ЗА 2 НЕДЕЛИ</p>
                        <p className="text-gray-600 leading-relaxed">
                            2 недели на настройку → 4 недели до стабильного потока лидов. Без "ещё тестируем".
                        </p>
                    </motion.div>

                    {/* Card 5 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200 hover:border-rpg-gold transition-all duration-300 relative text-center group shadow-sm hover:shadow-xl"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-rpg-gold to-orange-400 rounded-b-lg" />

                        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                            📚
                        </div>

                        <h3 className="text-xl font-bold text-rpg-dark mb-2 uppercase">ПЕРЕДАЧА ЗНАНИЙ</h3>
                        <p className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-4">ОБУЧЕНИЕ ВАШЕЙ КОМАНДЫ</p>
                        <p className="text-gray-600 leading-relaxed">
                            Моя цель — сделать вас независимыми. Обучу команду, передам процессы и шаблоны.
                        </p>
                    </motion.div>

                    {/* Card 6 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200 hover:border-rpg-gold transition-all duration-300 relative text-center group shadow-sm hover:shadow-xl"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-rpg-gold to-orange-400 rounded-b-lg" />

                        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                            ✨
                        </div>

                        <h3 className="text-xl font-bold text-rpg-dark mb-2 uppercase">БЕЗ ПРОЦЕНТОВ</h3>
                        <p className="text-xs font-bold text-rpg-gold uppercase tracking-wider mb-4">ФИКСИРОВАННАЯ СТОИМОСТЬ</p>
                        <p className="text-gray-600 leading-relaxed">
                            Я не зарабатываю на процентах от ваших трат. Только честная стоимость за результаты.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
