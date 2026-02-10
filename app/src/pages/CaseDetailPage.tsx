import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Briefcase,
  Target,
  Calendar,
  Zap,
  Star
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { getCases, urlFor } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import { getIcon } from '@/lib/iconMapping';
import type { SanityCase } from '@/types/sanity';
import { PixelIcon } from '@/components/PixelIcon';
import type { PixelIconName } from '@/components/PixelIcon';

export function CaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addXP } = useGame();
  const { data: sanityCases, loading } = useSanityData<SanityCase[]>(getCases);

  const caseStudy = useMemo(() => {
    if (!sanityCases || !slug) return null;
    const found = sanityCases.find(c => c.slug?.current === slug || c._id === slug);
    if (!found) return null;

    return {
      title: found.client,
      fullTitle: found.shortDescription || found.client,
      client: found.client,
      industry: found.niche,
      pixelIcon: (found.icon as PixelIconName) || 'sword',
      duration: found.duration,
      emoji: (found as any).emoji || '💼',
      challenge: found.challenge,
      solution: found.solution || [],
      results: (found.results || []).map(r => ({
        metric: r.label,
        before: r.before,
        after: r.after,
        improvement: r.improvement,
        icon: getIcon(r.icon)
      })),
      testimonial: found.testimonial,
      tags: [found.niche, found.tools].filter(Boolean) as string[],
      color: found.color || 'from-rpg-gold to-orange-400',
      imageUrl: found.image ? urlFor(found.image).width(1200).url() : null
    };
  }, [sanityCases, slug]);

  useEffect(() => {
    if (caseStudy) {
      addXP(50);
    }
  }, [caseStudy, addXP]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-40 pb-20 text-center bg-rpg-light">
          <div className="animate-spin w-12 h-12 border-4 border-rpg-gold border-t-transparent rounded-full mx-auto mb-4" />
          <h1 className="text-2xl font-black text-rpg-dark">Загрузка квеста...</h1>
        </div>
      </Layout>
    );
  }

  if (!caseStudy) {
    return (
      <Layout>
        <div className="min-h-screen pt-40 pb-20 text-center bg-rpg-light">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-black text-rpg-dark mb-4">Квест не найден</h1>
          <p className="text-gray-600 mb-8">Возможно, этот кейс еще не завершен или перенесен в архив</p>
          <Link to="/cases">
            <Button className="rpg-button px-8 py-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Вернуться к кейсам
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pb-20 bg-white">
        {/* Hero Section */}
        <section className={`pt-40 pb-20 bg-gradient-to-br ${caseStudy.color} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link to="/cases" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors font-bold">
              <ArrowLeft className="w-5 h-5" />
              Ко всем кейсам
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="scale-[2] origin-left">
                  <PixelIcon name={caseStudy.pixelIcon} size={48} />
                </div>
                <div className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold uppercase tracking-widest border border-white/10">
                  {caseStudy.industry}
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                {caseStudy.fullTitle}
              </h1>

              <div className="flex flex-wrap gap-8 text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-60">Клиент</p>
                    <p className="font-bold">{caseStudy.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-60">Срок проекта</p>
                    <p className="font-bold">{caseStudy.duration}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-16">

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-20">

                {/* Challenge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-black text-rpg-dark mb-8 flex items-center gap-4">
                    <span className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6" />
                    </span>
                    ЧЕЛЛЕНДЖ
                  </h2>
                  <div className="text-xl text-gray-600 leading-relaxed bg-rpg-light p-8 rounded-[32px] border-2 border-dashed border-gray-200">
                    {caseStudy.challenge}
                  </div>
                </motion.div>

                {/* Solution Phases */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-black text-rpg-dark mb-10 flex items-center gap-4">
                    <span className="w-12 h-12 bg-rpg-gold/20 text-rpg-gold rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6" />
                    </span>
                    ПУТЬ К ПОБЕДЕ
                  </h2>
                  <div className="space-y-8">
                    {caseStudy.solution.map((phase, idx) => (
                      <div key={idx} className="group relative pl-12 pb-12 last:pb-0">
                        {/* Timeline line */}
                        {idx !== caseStudy.solution.length - 1 && (
                          <div className="absolute left-[19px] top-10 bottom-0 w-1 bg-gradient-to-b from-rpg-gold/50 to-transparent" />
                        )}
                        <div className="absolute left-0 top-0 w-10 h-10 bg-white border-4 border-rpg-gold rounded-full flex items-center justify-center font-black text-rpg-gold z-10">
                          {idx + 1}
                        </div>
                        <div className="bg-white p-8 rounded-[32px] border-2 border-gray-100 hover:border-rpg-gold transition-colors shadow-sm">
                          <h3 className="text-2xl font-black text-rpg-dark mb-4">{phase.title}</h3>
                          <ul className="space-y-3">
                            {phase.steps.map((step, sidx) => (
                              <li key={sidx} className="flex items-start gap-3 text-gray-600">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                <span className="font-medium">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Testimonial */}
                {caseStudy.testimonial && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-rpg-dark text-white p-10 rounded-[40px] relative overflow-hidden"
                  >
                    <Star className="absolute top-8 right-8 w-16 h-16 text-rpg-gold/10 rotate-12" />
                    <div className="text-4xl text-rpg-gold mb-6 font-serif">"</div>
                    <blockquote className="text-2xl font-medium mb-10 italic leading-relaxed relative z-10">
                      {caseStudy.testimonial.text}
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-rpg-gold rounded-full flex items-center justify-center text-rpg-dark font-black text-xl overflow-hidden">
                        {caseStudy.testimonial.author[0]}
                      </div>
                      <div>
                        <p className="font-black text-lg">{caseStudy.testimonial.author}</p>
                        <p className="text-gray-400 text-sm">{caseStudy.testimonial.position}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar Metrics */}
              <div className="space-y-8">
                <div className="sticky top-24">
                  <h2 className="text-xl font-black text-rpg-dark mb-6 uppercase tracking-widest">ДОБЫТОЕ ЗОЛОТО</h2>
                  <div className="space-y-4">
                    {caseStudy.results.map((res, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-rpg-light p-6 rounded-[24px] border-2 border-transparent hover:border-rpg-gold transition-all"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-rpg-gold shadow-sm">
                            <res.icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{res.metric}</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Было: <span className="line-through">{res.before}</span></p>
                            <p className="text-3xl font-black text-rpg-dark">{res.after}</p>
                          </div>
                          <div className="text-right">
                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-black">
                              {res.improvement}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Card */}
                  <div className="mt-12 bg-rpg-gold p-8 rounded-[32px] text-rpg-dark">
                    <h3 className="text-2xl font-black mb-4">НУЖЕН ТАКОЙ ЖЕ РЕЗУЛЬТАТ?</h3>
                    <p className="font-bold mb-8 opacity-80">Запишитесь на бесплатный разбор вашей воронки</p>
                    <Link to="/contact" className="w-full bg-rpg-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
                      <Sparkles className="w-5 h-5" />
                      ОБСУДИТЬ ПРОЕКТ
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
