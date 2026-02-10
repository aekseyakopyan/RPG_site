import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchText({
  children,
  className,
  as: Component = 'span',
  intensity = 'medium'
}: GlitchTextProps) {
  const intensityMap = {
    low: { x: 1, duration: 4 },
    medium: { x: 2, duration: 2.5 },
    high: { x: 3, duration: 1.5 }
  };

  const { x, duration } = intensityMap[intensity];

  return (
    <motion.span
      className={cn("relative inline-block", className)}
      animate={{
        x: [-x, x, -x, 0],
        skewX: [-1, 1, -1, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <Component className="relative z-10">{children}</Component>
      <motion.span
        className="absolute inset-0 text-rpg-gold opacity-30"
        aria-hidden
        animate={{ x: [-x, x], opacity: [0, 0.3, 0] }}
        transition={{ duration: duration / 2, repeat: Infinity }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-gray-400 opacity-30"
        aria-hidden
        animate={{ x: [x, -x], opacity: [0, 0.3, 0] }}
        transition={{ duration: duration / 2, repeat: Infinity, delay: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
