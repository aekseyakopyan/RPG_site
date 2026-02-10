import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import {
  Star, ArrowLeft,
  PlayCircle, MessageSquare
} from 'lucide-react';

import { useMemo } from 'react';
import { getReviews } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import type { SanityReview } from '@/types/sanity';
import { PixelIcon } from '@/components/PixelIcon';
import type { PixelIconName } from '@/components/PixelIcon';

interface Stat {
  value: string;
  label: string;
  icon: PixelIconName;
}

const stats: Stat[] = [
  { value: '50+', label: 'ВЫПОЛНЕННЫХ КВЕСТОВ', icon: 'scroll' },
  { value: '4.9', label: 'РЕЙТИНГ ГЕРОЯ', icon: 'trophy' },
  { value: '89%', label: 'ВИНРЕЙТ (RETENTION)', icon: 'shield' },
  { value: 'x3.2', label: 'СРЕДНИЙ БАФФ (ROI)', icon: 'coins' },
];

export function ReviewsPage() {
  const { data: sanityReviews } = useSanityData<SanityReview[]>(getReviews);

  const reviews = useMemo(() => {
    if (!sanityReviews || sanityReviews.length === 0) {
      return [
        {
          id: '1',
          name: 'Анна Иванова',
          role: 'Основатель Lavanda',
          text: 'Алексей — единственный наставник, который не просто показал дорогу, но и прошел её вместе с нами. Снижение CPA в 2.5 раза — это реальная магия цифр.',
          rating: 5,
          initials: 'АИ',
          color: 'from-pink-500 to-rose-500'
        },
        {
          id: '2',
          name: 'Дмитрий Козлов',
          role: 'CEO EduFlow',
          text: 'Пришел с запросом на масштаб. По итогу получили не только лиды, но и полностью пересобранную воронку, которая качает деньги даже когда мы спим.',
          rating: 5,
          initials: 'ДК',
          color: 'from-blue-500 to-indigo-500'
        },
        {
          id: '3',
          name: 'Елена Маркова',
          role: 'Marketing Lead / B2B SaaS',
          text: 'Сложный продукт, длинный цикл. Алексей нашел подход через LinkedIn и контент, который начал приносить профит уже на второй месяц.',
          rating: 5,
          initials: 'ЕМ',
          color: 'from-emerald-500 to-teal-500'
        }
      ];
    }

    return sanityReviews.map((r, index) => ({
      id: r._id,
      name: r.name,
      role: r.position + (r.company ? ` / ${r.company}` : ''),
      text: r.text,
      rating: r.rating || 5,
      initials: r.name ? r.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : '??',
      color: index % 3 === 0 ? 'from-pink-500 to-rose-500' : index % 3 === 1 ? 'from-blue-500 to-indigo-500' : 'from-emerald-500 to-teal-500'
    }));
  }, [sanityReviews]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-rpg-light border-b-4 border-rpg-dark/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-rpg-gold mb-8 font-bold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              ВЕРНУТЬСЯ В ХАБ
            </Link>
            <h1 className="text-4xl md:text-7xl font-black text-rpg-dark mb-6 tracking-tight">
              ТАВЕРНА <span className="text-rpg-gold">ИСТОРИЙ</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Здесь собраны свитки с отзывами тех, кто уже прошел маркетинговое крещение огнем.
              Репутация в RPG — это всё, и я дорожу каждым словом.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="py-12 bg-rpg-dark text-white border-y-4 border-rpg-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-rpg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-rpg-gold/20">
                  <PixelIcon name={stat.icon} size={24} />
                </div>
                <div className="text-3xl md:text-5xl font-black text-rpg-gold mb-1">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <PixelIcon name="scroll" size={40} />
              <h2 className="text-3xl font-black text-rpg-dark uppercase tracking-tight">
                СВИТКИ МУДРОСТИ
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((rev, i) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-rpg-light rounded-[32px] p-8 border-2 border-transparent hover:border-rpg-gold transition-all hover:-translate-y-2 group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform origin-top-left">
                  <PixelIcon name="bubble" size={40} />
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-rpg-gold text-rpg-gold" />
                  ))}
                </div>

                <p className="text-gray-700 text-lg font-medium leading-relaxed italic mb-8">
                  "{rev.text}"
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
                  <div className={`w-14 h-14 bg-gradient-to-br ${rev.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-black text-rpg-dark">{rev.name}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{rev.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Stories Section (Placeholder) */}
      <section className="py-24 bg-rpg-light border-y-4 border-rpg-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-rpg-dark">
          <div className="flex justify-center mb-6">
            <PixelIcon name="potion" size={48} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-8 italic">ВИДЕО-КВЕСТЫ</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Скоро здесь появятся живые записи наших битв за рост и прямая речь героев.
          </p>
          <div className="bg-white rounded-[40px] p-12 md:p-24 border-4 border-dashed border-gray-100 flex flex-col items-center opacity-50">
            <PlayCircle className="w-20 h-20 text-gray-200 mb-6" />
            <span className="font-black text-gray-300 uppercase tracking-widest">LOADING NEW CONTENT...</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-rpg-dark text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-12 italic uppercase">ХОТИТЕ ТАКОЙ ЖЕ ОТЗЫВ В СВОЙ АРХИВ?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/#/contact" className="rpg-button px-12 py-5 text-xl">
              НАЧАТЬ СВОЮ ИСТОРИЮ
            </a>
            <a href="https://t.me/alexey_marketer" className="inline-flex items-center gap-2 text-white font-black border-b-2 border-rpg-gold py-2 hover:text-rpg-gold transition-all">
              <MessageSquare className="w-5 h-5 text-rpg-gold" />
              TELEGRAM
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
