import { useState } from 'react';

export function TestimonialsPreviewSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviews = [
        {
            id: 1,
            name: 'Анна Иванова',
            company: 'Lavanda',
            position: 'Основатель',
            avatar: 'А',
            quote: 'Алексей помог нам снизить CPA на 61% и увеличить ROI в 4 раза за 3 месяца. Главное — полная прозрачность: я всегда вижу, куда идят деньги и какие результаты.',
            roi: '×3',
            duration: '8 мес'
        },
        {
            id: 2,
            name: 'Дмитрий Петров',
            company: 'EduFlow',
            position: 'CEO',
            avatar: 'Д',
            quote: 'Работали с несколькими агентствами — результата не было. Алексей за месяц построил систему, которая даёт стабильный поток лидов. Рекомендую!',
            roi: '×4',
            duration: '6 мес'
        },
        {
            id: 3,
            name: 'Мария Смирнова',
            company: 'ShopFlow',
            position: 'Маркетолог',
            avatar: 'М',
            quote: 'Профессиональный подход. За 4 месяца работы ROI x2.5, всегда есть прозрачность по трафику.',
            roi: '×2.5',
            duration: '4 мес'
        },
        {
            id: 4,
            name: 'Иван Козлов',
            company: 'TechStart',
            position: 'Founder',
            avatar: 'И',
            quote: 'Быстро разобрался в нашем продукте и запустил эффективные кампании. За первый месяц ROI x3.5.',
            roi: '×3.5',
            duration: '10 мес'
        },
        {
            id: 5,
            name: 'Елена Волкова',
            company: 'Beauty Pro',
            position: 'Руководитель',
            avatar: 'Е',
            quote: 'За первый месяц увидела рост продаж на 150%. Теперь постоянный клиент Алексея.',
            roi: '×2',
            duration: '7 мес'
        }
    ];

    const goNext = () => setActiveIndex((activeIndex + 1) % reviews.length);
    const goPrev = () => setActiveIndex((activeIndex - 1 + reviews.length) % reviews.length);

    return (
        <section className="reviews-carousel-container">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">ОТЗЫВЫ</span>
                    <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">ТАВЕРНА ГЕРОЕВ</h2>
                    <div className="w-24 h-1 bg-rpg-gold mx-auto" />
                </div>

                <div className="carousel-main">
                    <button className="carousel-btn prev" onClick={goPrev}>←</button>

                    <div className="carousel-viewport">
                        {reviews.map((review, index) => (
                            <div
                                key={review.id}
                                className={`review-card ${index === activeIndex ? 'active' : ''}`}
                            >
                                <div className="review-header">
                                    <div className="reviewer-avatar">{review.avatar}</div>
                                    <div className="reviewer-info">
                                        <h4 className="reviewer-name">{review.name}</h4>
                                        <p className="reviewer-role">
                                            {review.position} • <span>{review.company}</span>
                                        </p>
                                    </div>
                                </div>

                                <p className="review-quote">"{review.quote}"</p>

                                <div className="review-metrics">
                                    <div className="metric">
                                        <span className="label">ROI</span>
                                        <span className="value">{review.roi}</span>
                                    </div>
                                    <div className="metric">
                                        <span className="label">Сотрудничество</span>
                                        <span className="value">{review.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-btn next" onClick={goNext}>→</button>
                </div>

                {/* ИНДИКАТОРЫ */}
                <div className="carousel-indicators">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
