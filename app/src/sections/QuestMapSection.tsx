
export function QuestMapSection() {
    const levels = [
        { level: 1, title: 'АРСЕНАЛ', subtitle: 'Услуги', icon: '⚔️', link: '/#/services' },
        { level: 2, title: 'ЛЕТОПИСЬ', subtitle: 'Кейсы', icon: '📖', link: '/#/cases' },
        { level: 3, title: 'ИСПЫТАНИЕ', subtitle: 'Квиз', icon: '🎯', link: '/#/quest' },
        { level: 4, title: 'ГАЙД', subtitle: 'Процесс', icon: '📚', link: '/#/process' },
        { level: 5, title: 'БОССФАЙТ', subtitle: 'Контакты', icon: '👹', link: '/#/contact' }
    ];

    return (
        <section className="quest-map-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">НАВИГАЦИЯ</span>
                    <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">КАРТА ПРИКЛЮЧЕНИЙ</h2>
                    <div className="w-24 h-1 bg-rpg-gold mx-auto" />
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Ваш текущий ранг позволяет исследовать все территории
                    </p>
                </div>

                <div className="quest-map-wrapper">
                    <div className="quest-map-scroll">
                        {levels.map((item, index) => (
                            <a key={item.level} href={item.link} className="quest-level-card group">
                                <div className="level-number">LVL {item.level}</div>
                                <div className="level-icon group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <div className="level-info">
                                    <h3 className="level-title">{item.title}</h3>
                                    <p className="level-subtitle">{item.subtitle}</p>
                                </div>
                                <div className={`level-status ${index === 2 ? 'bg-orange-100 text-orange-600' : index < 2 ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                                    {index === 2 ? '🔄 ВЫ ЗДЕСЬ' : index < 2 ? '✅ ПРОЙДЕНО' : '⏳ ВПЕРЕДИ'}
                                </div>
                                {index < levels.length - 1 && <div className="level-arrow">→</div>}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="map-cta">
                    <p>Начните с первого уровня или выберите интересующую вас территорию</p>
                    <a href="/#/services" className="map-button">Войти в АРСЕНАЛ</a>
                </div>
            </div>
        </section>
    );
}
