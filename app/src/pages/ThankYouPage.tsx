import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, FileText } from 'lucide-react';

export function ThankYouPage() {
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; x: number; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#FFD359', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D', '#95E1D3'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: '-10vh', x: `${c.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ 
            y: '110vh', 
            x: `${c.x + (Math.random() * 20 - 10)}vw`, 
            rotate: Math.random() * 720,
            opacity: 0 
          }}
          transition={{ 
            duration: 4 + Math.random() * 2, 
            delay: c.delay,
            ease: "linear",
            repeat: Infinity
          }}
          className="absolute w-3 h-3 rounded-sm z-10"
          style={{ backgroundColor: c.color }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center max-w-2xl mx-auto px-4"
      >
        {/* Victory Image */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <img 
            src="/victory-scene.png" 
            alt="Victory!"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-black text-rpg-dark mb-4"
        >
          🎉 КВЕСТ НАЧАЛСЯ! 🎉
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-gray-600 mb-8"
        >
          Спасибо за заявку! Я свяжусь с тобой в течение 24 часов, 
          чтобы обсудить детали и пройти следующий уровень вместе.
        </motion.p>

        {/* Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <a 
            href="/#cases"
            className="flex items-center gap-2 px-6 py-3 bg-rpg-light rounded-xl text-rpg-dark font-semibold hover:bg-rpg-gold/20 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Посмотреть кейсы
          </a>
          <a 
            href="https://t.me/alexey_marketer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-rpg-light rounded-xl text-rpg-dark font-semibold hover:bg-rpg-gold/20 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Telegram
          </a>
        </motion.div>

        {/* Back to home */}
        <motion.a
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          href="/#/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-rpg-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </motion.a>
      </motion.div>

      {/* Level 99 Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 1 
        }}
        className="absolute top-8 right-8 z-30"
      >
        <div className="bg-rpg-gold text-rpg-dark px-6 py-3 rounded-2xl shadow-xl">
          <span className="text-2xl font-black">LV. 99</span>
          <p className="text-xs font-bold">HERO MODE</p>
        </div>
      </motion.div>
    </div>
  );
}
