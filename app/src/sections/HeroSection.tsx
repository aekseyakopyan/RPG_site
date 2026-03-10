import { motion } from 'framer-motion';
import { GlitchText } from '@/components/GlitchText';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getHero, urlFor } from '@/lib/sanity';

export function HeroSection() {
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const data = await getHero();
        if (data) {
          setHeroData(data);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    }
    fetchHero();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const badgeText = heroData?.badge || 'НЕЗАВИСИМЫЙ МАРКЕТОЛОГ';
  const title = heroData?.title || 'МАРКЕТИНГ КАК ЭПИЧЕСКАЯ<br />БИТВА ЗА КЛИЕНТОВ';
  const subtitle = heroData?.subtitle || 'Performance-маркетолог 45 уровня поможет вашему бизнесу победить конкурентов и захватить новые рынки. Прозрачная аналитика, измеримые результаты, запуск за 14 дней.';

  // Helper to parse simple HTML like <br />
  const renderTitle = (html: string) => {
    return (
      <GlitchText as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-black text-rpg-dark mb-6 leading-tight">
        {html.replace(/<br\s*\/?>/gi, '\n')}
      </GlitchText>
    );
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-rpg-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero-landscape.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
        </div>

        {/* Background 3D shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-64 h-64 opacity-20"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-rpg-gold to-orange-300 blur-3xl" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-40 left-10 w-48 h-48 opacity-15"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-300 to-cyan-300 blur-3xl" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-rpg-light text-rpg-dark text-sm font-semibold rounded-full">
                  {badgeText}
                </span>
              </motion.div>

              {renderTitle(title)}

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => scrollToSection(heroData?.ctaPrimary?.link || '#contact')}
                  className="rpg-button"
                >
                  {heroData?.ctaPrimary?.text || 'Начать приключение'}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection(heroData?.ctaSecondary?.link || '#cases')}
                  className="rpg-button-outline"
                >
                  {heroData?.ctaSecondary?.text || 'Сразу к кейсам'}
                </button>
              </motion.div>
            </motion.div>

            {/* Right column - Hero Sprite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-rpg-gold/20 blur-3xl rounded-full scale-125" />

                {/* Hero Sprite or Image */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.8
                  }}
                  className="relative z-10"
                >
                  {heroData?.heroImage ? (
                    <img
                      src={urlFor(heroData.heroImage).url()}
                      alt="Hero"
                      className="max-w-md w-full object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      <img
                        src="/assets/images/hero-portrait.png"
                        alt="Hero Portrait"
                        className="max-w-md w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Floating badges - Hidden on mobile, shown on lg */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                  {heroData?.badges ? (
                    heroData.badges.map((badge: any, index: number) => {
                      let positionClass = "right-0 top-0";
                      if (badge.position === 'left') positionClass = "left-0 top-0";
                      if (badge.position === 'bottom') positionClass = "left-1/2 bottom-0 -translate-x-1/2";

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -10, 0]
                          }}
                          transition={{
                            opacity: { delay: 1 + (index * 0.2), duration: 0.5 },
                            scale: { delay: 1 + (index * 0.2), duration: 0.5 },
                            y: { duration: 3 + index, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className={`absolute ${positionClass} z-20 ${badge.position === 'bottom'
                            ? 'bg-gradient-to-br from-rpg-gold to-orange-400 border-white/40'
                            : 'bg-white/90 backdrop-blur-md border-rpg-gold/30'
                            } shadow-[0_12px_40px_rgba(0,0,0,0.15)] rounded-2xl px-5 py-3.5 min-w-[140px] text-center border-2`}
                        >
                          <span className={`text-xs font-black tracking-tight ${badge.position === 'bottom' ? 'text-rpg-dark' : 'text-rpg-dark'}`}>
                            {badge.text}
                          </span>
                        </motion.div>
                      )
                    })
                  ) : (
                    <>
                      {/* Top Left: 5+ лет опыта */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: [0, -10, 0]
                        }}
                        transition={{
                          opacity: { delay: 1, duration: 0.5 },
                          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute -left-12 top-0 bg-white/95 backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.1)] rounded-2xl px-5 py-3 border-2 border-rpg-gold/20 z-20"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-rpg-gold uppercase tracking-[0.2em] mb-1 text-center">ОПЫТ</span>
                          <span className="text-xs font-black text-rpg-dark whitespace-nowrap">5+ ЛЕТ В ТЕМЕ</span>
                        </div>
                      </motion.div>

                      {/* Middle Right: 50+ проектов */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: [0, 10, 0]
                        }}
                        transition={{
                          opacity: { delay: 1.2, duration: 0.5 },
                          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.1)] rounded-2xl px-5 py-3 border-2 border-blue-400/20 z-10"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1 text-center">КВЕСТЫ</span>
                          <span className="text-xs font-black text-rpg-dark whitespace-nowrap">50+ КЕЙСОВ</span>
                        </div>
                      </motion.div>

                      {/* Bottom Center: x3 ROI средний */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          x: [0, 6, 0]
                        }}
                        transition={{
                          opacity: { delay: 1.4, duration: 0.5 },
                          x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute left-1/2 -bottom-10 -translate-x-1/2 bg-gradient-to-br from-rpg-gold to-orange-400 shadow-[0_20px_50px_rgba(247,198,0,0.4)] rounded-2xl px-6 py-4 border-2 border-white/40 z-30"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-black text-rpg-dark text-center leading-tight whitespace-nowrap uppercase tracking-tight">
                            x3 ROI СРЕДНИЙ<br />
                            <span className="text-[9px] font-black opacity-70 tracking-widest">PERFORMANCE</span>
                          </span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-sm mb-2">Листай вниз</span>
            <ChevronDown className="w-5 h-5 text-rpg-gold" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-12 bg-rpg-dark text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {(heroData?.socialProof || [
              { value: '💪 Сила', label: '45+ завершённых квестов', iconName: 'TrendingUp' },
              { value: '🎯 Точность', label: 'ROI от 180% до 450%', iconName: 'Users' },
              { value: '⚡ Скорость', label: 'Результаты за 2 недели', iconName: 'TrendingUp' },
              { value: '🛡️ Защита', label: '100% прозрачность процессов', iconName: 'Shield' },
            ]).map((item: any, index: number) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-rpg-gold mb-1">{item.value}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
