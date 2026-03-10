import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Info } from 'lucide-react';
import { CharacterSheet } from '@/components/CharacterSheet';
import { getHero, urlFor } from '@/lib/sanity';
import type { SanityHero } from '@/types/sanity';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addXP, showXPPopup, stats: gameStats, level: gameLevel, charClass: gameClass, visitSection } = useGame();
  const [heroData, setHeroData] = useState<SanityHero | null>(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const data = await getHero();
        if (data) setHeroData(data);
      } catch (err) {
        console.error("Failed to fetch hero data for About section:", err);
      }
    }
    fetchHero();
  }, []);

  const statsList = heroData?.stats?.map(s => ({
    name: s.name,
    label: s.label,
    value: s.value,
    color: s.color || 'bg-blue-400',
    desc: s.desc
  })) || [
      { name: 'STR', label: 'Сила', value: gameStats.STR, color: 'bg-red-400', desc: 'Работа с крупными бюджетами' },
      { name: 'DEX', label: 'Ловкость', value: gameStats.DEX, color: 'bg-teal-400', desc: 'Скорость запуска проектов' },
      { name: 'INT', label: 'Интеллект', value: gameStats.INT, color: 'bg-blue-400', desc: 'Аналитика и стратегия' },
      { name: 'LUCK', label: 'Удача', value: gameStats.LUCK, color: 'bg-yellow-400', desc: 'Креативность и вирусность' },
    ];

  const handleXP = () => {
    addXP(100);
    showXPPopup(100, window.innerWidth / 2, window.innerHeight / 2);
    visitSection('about');
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          onViewportEnter={handleXP}
        >
          <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
            ПОЗНАКОМИМСЯ?
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">
            КТО ЭТОТ ГЕРОЙ?
          </h2>
          <div className="w-24 h-1 bg-rpg-gold mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Character Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rpg-card bg-white"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-rpg-light rounded-xl flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-rpg-gold transition-colors shrink-0">
                <img
                  src={heroData?.about?.image ? urlFor(heroData.about.image).url() : "/assets/images/hero-portrait.png"}
                  alt={heroData?.about?.name || "Алексей"}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h3 className="text-2xl font-black text-rpg-dark">{heroData?.about?.name || "АЛЕКСЕЙ"}</h3>
                  <CharacterSheet />
                </div>
                <p className="text-rpg-gold font-bold">{heroData?.about?.role || gameClass}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className="px-3 py-1 bg-rpg-dark text-white text-sm font-bold rounded-full">
                    Lv. {heroData?.about?.level || gameLevel}
                  </span>
                  <span className="text-gray-500 text-sm">Класс: {heroData?.about?.role || gameClass}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h4 className="font-bold text-rpg-dark text-sm uppercase tracking-wider mb-4 flex justify-between items-center">
                ХАРАКТЕРИСТИКИ
                <span className="text-[10px] text-gray-400 flex items-center gap-1 italic">
                  <Info className="w-3 h-3" />
                  динамические показатели
                </span>
              </h4>
              {statsList.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-rpg-dark w-12">{stat.name}</span>
                      <span className="text-xs text-gray-500">{stat.label}</span>
                    </div>
                    <span className="font-bold text-rpg-dark">{stat.value}/100</span>
                  </div>
                  <div className="stat-bar border border-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${stat.value}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`stat-bar-fill ${stat.color}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 italic">{stat.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-rpg-dark text-sm uppercase tracking-wider mb-4">
                ЭПИЧЕСКИЕ ДОСТИЖЕНИЯ
              </h4>
              <div className="flex flex-wrap gap-2">
                {(heroData?.about?.achievements || ['🎯 47 квестов', '⚔️ 12 боссов', '💰 ∞ золота']).map((achievement) => (
                  <span
                    key={achievement}
                    className="px-3 py-1.5 bg-rpg-light text-rpg-dark text-xs font-bold rounded-lg border border-rpg-gold/20"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-rpg-dark mb-6">
              Обо мне
            </h3>

            <div className="prose prose-lg text-gray-600 mb-8">
              <p>
                Привет! Я Алексей, и я превращаю хаос в маркетинге в понятную и управляемую систему.
              </p>
              <p>
                Мой подход — это сочетание точной аналитики (INT) и креативных стратегий (LUCK). Я не просто настраиваю рекламу, я строю полноценную воронку продаж, которая приносит деньги, а не просто клики.
              </p>
              <p>
                За 5+ лет в digital-маркетинге я понял одно: главное — это прозрачность и результат. Поэтому вы всегда будете знать, на что уходит каждый рубль вашего бюджета.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
