import { motion } from 'framer-motion';
import { PixelButton } from '@/components/PixelButton';
import { GlitchText } from '@/components/GlitchText';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToCases = () => {
    document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pixel-dark/70 via-pixel-dark/50 to-pixel-dark" />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-pixel-card border border-pixel-gold/50 text-pixel-gold text-xs font-pixel">
                НЕЗАВИСИМЫЙ МАРКЕТОЛОГ
              </span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              <GlitchText intensity="low" className="text-pixel-gold">
                Маркетолог Алексей
              </GlitchText>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-pixel-text mb-4 max-w-xl mx-auto lg:mx-0"
            >
              Помогаю стартапам и бизнесу{' '}
              <span className="text-pixel-success font-semibold">зарабатывать на рекламе</span>,
              {' '}а не сливать бюджеты
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
            >
              {['Контекстная реклама', 'Performance', 'SEO', 'Geo-реклама', 'Сайты'].map((tag, i) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-pixel-card/80 border border-pixel-cyan/30 text-pixel-cyan text-xs font-mono-pixel"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <PixelButton onClick={scrollToContact} size="lg">
                Обсудить проект
                <ArrowRight className="w-4 h-4" />
              </PixelButton>
              <PixelButton variant="outline" onClick={scrollToCases} size="lg">
                Посмотреть кейсы
              </PixelButton>
            </motion.div>
          </motion.div>

          {/* Right column - Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-pixel-gold/20 blur-3xl rounded-full scale-75" />
              
              {/* Avatar container */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <img 
                  src="/avatar.png" 
                  alt="Алексей - Маркетолог"
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain relative z-10"
                />
                
                {/* Pixel frame */}
                <div className="absolute -inset-4 border-2 border-pixel-gold/50 z-0">
                  <span className="absolute -top-1 -left-1 w-3 h-3 bg-pixel-gold" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-pixel-gold" />
                  <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-pixel-gold" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-pixel-gold" />
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-4 top-1/4 bg-pixel-card border border-pixel-success px-3 py-2"
              >
                <span className="text-pixel-success font-pixel text-xs">5+ лет опыта</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 top-1/2 bg-pixel-card border border-pixel-cyan px-3 py-2"
              >
                <span className="text-pixel-cyan font-pixel text-xs">50+ проектов</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute left-1/4 -bottom-4 bg-pixel-card border border-pixel-gold px-3 py-2"
              >
                <span className="text-pixel-gold font-pixel text-xs">x3 ROI средний</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-pixel-muted"
        >
          <span className="text-xs font-pixel mb-2">Листай вниз</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
