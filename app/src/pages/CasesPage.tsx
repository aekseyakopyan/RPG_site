import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import {
  ArrowRight, Filter, MessageSquare
} from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { getCases } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import type { SanityCase } from '@/types/sanity';
import { PixelIcon } from '@/components/PixelIcon';
import type { PixelIconName } from '@/components/PixelIcon';



export function CasesPage() {
  const { addXP } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const { data: sanityCases, loading } = useSanityData<SanityCase[]>(getCases);

  const cases = useMemo(() => {
    if (loading) {
      return [];
    }
    if (!sanityCases || sanityCases.length === 0) return [];
    return sanityCases.map(c => ({
      id: c._id,
      slug: c.slug?.current || c._id,
      client: c.client,
      niche: c.niche,
      pixelIcon: (c.icon as PixelIconName) || 'sword',
      shortDescription: c.shortDescription || '',
      challenge: c.challenge,
      mainMetrics: c.mainMetrics || [],
      color: c.color || 'from-pink-500 to-rose-500',
      emoji: (c as any).emoji || '💼'
    }));
  }, [sanityCases, loading]);

  const categories = useMemo(() => {
    const cats = new Set(['Все']);
    cases.forEach(c => {
      if (c.niche) cats.add(c.niche);
    });
    return Array.from(cats);
  }, [cases]);

  const filteredCases = useMemo(() => {
    if (selectedCategory === 'Все') return cases;
    return cases.filter(c => c.niche === selectedCategory);
  }, [selectedCategory, cases]);

  useEffect(() => {
    addXP(100);
    // showXPPopup(100, window.innerWidth / 2, window.innerHeight / 2);
  }, [addXP]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-rpg-light border-b border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rpg-gold/10 border border-rpg-gold/20 rounded-full mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-rpg-gold/20 animate-pulse pointer-events-none" />
              <PixelIcon name="trophy" size={16} />
              <span className="text-xs font-bold text-rpg-dark uppercase tracking-widest relative z-10">Завершенные квесты</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-rpg-dark mb-6 tracking-tight">
              БИТВЫ <span className="text-rpg-gold">ЗА ПРИБЫЛЬ</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Здесь собраны истории о том, как мы побеждали маркетинговых боссов,
              срезали косты и добывали золото для клиентов. Без воды — только твердые цифры.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Cases Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center gap-3 mr-4 text-gray-400">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Фильтр:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedCategory === cat
                  ? 'bg-rpg-dark text-white border-rpg-dark shadow-lg shadow-rpg-dark/20'
                  : 'bg-white text-gray-500 border-gray-100 hover:border-rpg-gold'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            <AnimatePresence mode="wait">
              {filteredCases.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`/#/cases/${item.slug}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col bg-rpg-light rounded-[32px] overflow-hidden border-2 border-transparent hover:border-rpg-gold transition-all hover:-translate-y-2 h-full"
                >
                  {/* Card Header (Icon & Niche) */}
                  <div className={`h-48 bg-gradient-to-br ${item.color} relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />
                    <motion.div
                      className="group-hover:scale-110 transition-transform duration-500"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    >
                      <PixelIcon name={item.pixelIcon} size={80} />
                    </motion.div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                        {item.niche}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-black text-rpg-dark mb-3 group-hover:text-rpg-gold transition-colors">
                      {item.client}
                    </h3>
                    <p className="text-gray-600 font-medium mb-6 line-clamp-2">
                      {item.shortDescription}
                    </p>

                    {/* Mini Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-8">
                      {item.mainMetrics.map((met) => (
                        <div key={met.label} className="bg-white rounded-xl p-3 border border-gray-100 flex flex-col items-center">
                          <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">{met.label}</span>
                          <span className="text-sm font-black text-rpg-dark">{met.value}</span>
                          <span className={`text-[10px] font-bold ${met.growth.startsWith('-') ? 'text-green-500' : 'text-blue-500'}`}>
                            {met.growth}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="text-sm font-bold text-rpg-gold group-hover:underline">Смотреть подробности</span>
                      <div className="w-8 h-8 bg-rpg-dark rounded-full flex items-center justify-center text-white group-hover:bg-rpg-gold transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-rpg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rpg-gold/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 italic">ХОТИТЕ ТАКОЙ ЖЕ КЕЙС?</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
              Не обещаю золотых гор, но обещаю честный разбор вашей воронки и конкретный план по захвату рынка.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/#/contact" className="rpg-button px-10 py-5 bg-rpg-gold text-rpg-dark border-rpg-dark hover:bg-white transition-all transform hover:scale-105">
                ОБСУДИТЬ МОЙ ПРОЕКТ
              </a>
              <a href="https://t.me/alexey_marketer" target="_blank" className="inline-flex items-center gap-2 px-10 py-5 border-2 border-white/20 hover:border-rpg-gold text-white font-bold transition-all">
                <MessageSquare className="w-5 h-5" />
                НАПИСАТЬ В TELEGRAM
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
