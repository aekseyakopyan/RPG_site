import { Layout } from '@/components/Layout';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { QuestMapSection } from '@/sections/QuestMapSection';
import { UTPSection } from '@/sections/UTPSection';
import { TargetAudienceSection } from '@/sections/TargetAudienceSection';
import { ServicesPreviewSection } from '@/sections/ServicesPreviewSection';
import { CasesPreviewSection } from '@/sections/CasesPreviewSection';
import { TestimonialsPreviewSection } from '@/sections/TestimonialsPreviewSection';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
import { HeroSprite } from '@/components/HeroSprite';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />

      <AboutSection />

      <UTPSection />

      <TargetAudienceSection />

      <ServicesPreviewSection />

      <CasesPreviewSection />

      <TestimonialsPreviewSection />

      <QuestMapSection />

      {/* Final CTA / Ready for Next Level */}
      <section className="py-20 md:py-32 bg-rpg-dark text-white overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rpg-gold to-transparent opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left lg:max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                ГОТОВЫ К<br />
                <span className="text-rpg-gold">СЛЕДУЮЩЕМУ УРОВНЮ?</span>
              </h2>
              <p className="text-gray-400 mb-10 text-xl leading-relaxed">
                Начнём с бесплатного разбора вашего проекта — 15 минут, никакой воды, только конкретные точки роста.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a href="/#/contact" className="rpg-button inline-flex items-center gap-2 px-8 py-4 bg-rpg-gold text-rpg-dark border-rpg-dark hover:bg-white transition-all transform hover:scale-105">
                  ПОЛУЧИТЬ АУДИТ
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://t.me/alexey_marketer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 hover:border-rpg-gold text-white font-bold transition-all"
                >
                  НАПИСАТЬ В TELEGRAM
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 bg-rpg-gold/10 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 scale-110 md:scale-150 transform hover:scale-125 md:hover:scale-175 transition-transform duration-500">
                <HeroSprite />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
