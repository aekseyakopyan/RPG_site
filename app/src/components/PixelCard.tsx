import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'gold' | 'cyan' | 'none';
  hover?: boolean;
}

export function PixelCard({ 
  children, 
  className,
  glow = 'none',
  hover = true
}: PixelCardProps) {
  const glowStyles = {
    gold: "hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]",
    cyan: "hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]",
    none: ""
  };

  return (
    <motion.div
      className={cn(
        "relative bg-pixel-card p-6",
        "border-2 border-pixel-muted/30",
        glowStyles[glow],
        className
      )}
      whileHover={hover ? { 
        y: -4,
        borderColor: 'rgba(255, 215, 0, 0.5)'
      } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Pixel corners */}
      <span className="absolute -top-1 -left-1 w-2 h-2 bg-pixel-gold" />
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-pixel-gold" />
      <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-pixel-gold" />
      <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-pixel-gold" />
      
      {children}
    </motion.div>
  );
}
