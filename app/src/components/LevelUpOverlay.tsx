import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useEffect, useState } from 'react';

export function LevelUpOverlay() {
  const { showLevelUp, setShowLevelUp } = useGame();
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (showLevelUp) {
      const colors = ['#FFD359', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D'];
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5
      }));
      setConfetti(newConfetti);
      
      const timer = setTimeout(() => {
        setShowLevelUp(false);
        setConfetti([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showLevelUp, setShowLevelUp]);

  return (
    <AnimatePresence>
      {showLevelUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />
          
          {/* Confetti */}
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: '-100vh', x: `${Math.random() * 100 - 50}vw`, rotate: 0, opacity: 1 }}
              animate={{ 
                y: '100vh', 
                x: `${Math.random() * 200 - 100}vw`, 
                rotate: 720,
                opacity: 0 
              }}
              transition={{ 
                duration: 2.5, 
                delay: c.delay,
                ease: "linear"
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: c.color }}
            />
          ))}
          
          {/* Level Up Text */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10 text-center"
          >
            <motion.h2
              className="text-6xl md:text-8xl font-black text-rpg-gold pixel-text"
              style={{ 
                textShadow: '4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
                WebkitTextStroke: '3px #000'
              }}
            >
              LEVEL UP!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mt-4"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              Ты стал сильнее!
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
