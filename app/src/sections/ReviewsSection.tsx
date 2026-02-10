import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { getReviews, urlFor } from '@/lib/sanity';

// Initial reviews as fallback
const initialReviews = [
  {
    id: '1',
    name: 'Иван Петров',
    role: 'Основатель',
    company: 'Стартап «CodeLearn»',
    niche: 'EdTech',
    text: 'Алексей помог снизить CPL в 2 раза за месяц. Работает быстро, всё прозрачно, всегда на связи. Рекомендую!',
    rating: 5,
    avatar: 'ИП'
  },
  {
    id: '2',
    name: 'Анна Смирнова',
    role: 'Маркетинг-директор',
    company: 'Fashion Store',
    niche: 'E-commerce',
    text: 'Наконец-то нашли маркетолога, который не обещает «золотые горы», а делает работу. Качественные лиды, прозрачная отчетность.',
    rating: 5,
    avatar: 'АС'
  },
  {
    id: '3',
    name: 'Сергей Козлов',
    role: 'CEO',
    company: 'IT-аутсорсинг «DevTeam»',
    niche: 'B2B',
    text: 'Работаем уже полгода. Результат — стабильный поток заявок из нужной аудитории. Важно, что Алексей объясняет всё простым языком.',
    rating: 5,
    avatar: 'СК'
  },
  {
    id: '4',
    name: 'Марина Волкова',
    role: 'Основатель',
    company: 'Кофейня «Bean»',
    niche: 'HoReCa',
    text: 'Geo-реклама сработала идеально! Заполняемость выросла на 40%. Алексей разбирается в локальном маркетинге как никто другой.',
    rating: 5,
    avatar: 'МВ'
  }
];

export function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const sanityReviews = await getReviews();
        if (sanityReviews && sanityReviews.length > 0) {
          const mappedReviews = sanityReviews.map((r: any) => ({
            id: r._id,
            name: r.name,
            role: r.position,
            company: r.company,
            niche: r.niche || 'Business',
            text: r.text,
            rating: r.rating || 5,
            avatar: r.avatar ? urlFor(r.avatar).url() : r.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
          }));
          setReviews(mappedReviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 md:py-32 bg-rpg-light" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
            ТАВЕРНА
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">
            ИСТОРИИ ГЕРОЕВ
          </h2>
          <div className="w-24 h-1 bg-rpg-gold mx-auto" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Что говорят другие герои, прошедшие квесты со мной
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-rpg-gold/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-rpg-gold text-rpg-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-rpg-gold rounded-full flex items-center justify-center overflow-hidden">
                  {review.avatar.startsWith('http') ? (
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-rpg-dark">{review.avatar}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-rpg-dark">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}, {review.company}</p>
                  <span className="text-xs text-rpg-gold">{review.niche}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
