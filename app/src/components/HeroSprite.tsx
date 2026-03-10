import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';

interface HeroSpriteProps {
  animation?: 'idle' | 'attack' | 'victory' | 'happy';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32'
};

const spriteImages = {
  idle: '/logo.gif',
  attack: '/logo.gif',
  victory: '/logo.gif',
  happy: '/logo.gif'
};

export function HeroSprite({
  animation = 'idle',
  size = 'md',
  className = ''
}: HeroSpriteProps) {
  const { level, xpPopup } = useGame();

  return (
    <div className={`relative ${className}`}>
      {/* Level badge */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className="absolute -top-6 -right-6 z-30 bg-rpg-gold text-rpg-dark text-[10px] font-black px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(247,198,0,0.5)] border border-white/30 whitespace-nowrap"
      >
        LV.{level}
      </motion.div>

      {/* Sprite */}
      <motion.img
        src={spriteImages[animation]}
        alt="Hero Alexey"
        className={`${sizes[size]} object-contain`}
        animate={animation === 'idle' ? {
          rotate: 360,
          y: [0, -4, 0],
        } : animation === 'happy' ? {
          rotate: 360,
          y: [0, -10, 0, -10, 0],
          scale: [1, 1.1, 1, 1.1, 1],
        } : {}}
        transition={animation === 'idle' ? {
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        } : animation === 'happy' ? {
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          y: { duration: 1, repeat: Infinity, ease: "easeOut" }
        } : {}}
      />

      {/* XP Popup */}
      {xpPopup.show && (
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -40, scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-rpg-gold font-bold text-lg pixel-text pointer-events-none"
          style={{ textShadow: '2px 2px 0 #000' }}
        >
          +{xpPopup.amount} XP
        </motion.div>
      )}
    </div>
  );
}
