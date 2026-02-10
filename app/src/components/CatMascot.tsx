import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function CatMascot() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <img 
          src="/cat-mascot.png" 
          alt="Pixel Cat" 
          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
        />
        
        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute -top-12 -left-24 bg-pixel-card border-2 border-pixel-gold px-3 py-2 rounded whitespace-nowrap"
        >
          <span className="text-xs font-pixel text-pixel-gold">Привет! Нужна помощь?</span>
          <span className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-pixel-gold" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
