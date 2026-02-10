import { motion } from 'framer-motion';
import { PixelCard } from '@/components/PixelCard';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { useSanityData } from '@/hooks/useSanityData';
import { getPosts } from '@/lib/sanity';
import { useMemo } from 'react';

const FALLBACK_POSTS = [
  {
    title: 'Как не слить бюджет на контексте: 5 правил',
    excerpt: 'Практические советы по настройке рекламных кампаний, которые помогут избежать распространенных ошибок.',
    date: '15 января 2026',
    readTime: '5 мин',
    tag: 'Контекст'
  },
  {
    title: 'Performance-маркетинг для стартапов',
    excerpt: 'Как выстроить маркетинг с ограниченным бюджетом и получить первые продажи.',
    date: '10 января 2026',
    readTime: '7 мин',
    tag: 'Стратегия'
  },
  {
    title: 'SEO в 2026: что реально работает',
    excerpt: 'Разбор актуальных методов продвижения в поисковых системах без серых схем.',
    date: '5 января 2026',
    readTime: '6 мин',
    tag: 'SEO'
  }
];

export function Blog() {
  const { data: sanityPosts, loading } = useSanityData<any[]>(getPosts);

  const displayPosts = useMemo(() => {
    if (!sanityPosts || sanityPosts.length === 0) return FALLBACK_POSTS;

    return sanityPosts.map(post => ({
      title: post.title,
      excerpt: post.excerpt,
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'Недавно',
      readTime: post.readTime || '5 мин',
      tag: post.tag || 'Маркетинг',
      slug: post.slug?.current
    }));
  }, [sanityPosts]);

  if (loading && !sanityPosts) {
    return (
      <section id="blog" className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-12 h-12 border-4 border-rpg-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rpg-gold font-bold text-sm mb-4 block uppercase tracking-widest">БЛОГ</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            ПОЛЕЗНЫЕ МАТЕРИАЛЫ
          </h2>
          <div className="w-24 h-1 bg-rpg-gold mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Кейсы, разборы и мысли про маркетинг без воды
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post: any, index: number) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <a href={post.slug ? `/#/blog/${post.slug}` : '#'}>
                <PixelCard glow="cyan" className="h-full flex flex-col bg-rpg-dark/50 border-white/5 hover:border-rpg-gold/50 transition-colors">
                  {/* Tag */}
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-rpg-gold/10 border border-rpg-gold/30 text-rpg-gold text-xs font-bold uppercase tracking-wider">
                      {post.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rpg-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-rpg-gold transform group-hover:translate-x-1 transition-all" />
                  </div>
                </PixelCard>
              </a>
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/#/blog"
            className="inline-flex items-center gap-2 text-rpg-gold hover:text-white transition-all font-bold text-lg group"
          >
            СМОТРЕТЬ ВСЕ СТАТЬИ
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
