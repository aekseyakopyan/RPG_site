import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function PixelButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  onClick,
  href,
  type = 'button'
}: PixelButtonProps) {
  const baseStyles = "relative font-pixel uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-pixel-gold text-pixel-dark hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]",
    secondary: "bg-pixel-cyan text-pixel-dark hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]",
    outline: "bg-transparent border-2 border-pixel-gold text-pixel-gold hover:bg-pixel-gold hover:text-pixel-dark"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const Component = href ? motion.a : motion.button;
  
  const buttonProps = href ? { href } : { type };

  return (
    <Component
      onClick={onClick}
      {...buttonProps}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        "before:content-[''] before:absolute before:inset-0 before:border-2 before:border-white/20 before:-translate-x-1 before:-translate-y-1",
        "after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black/20 after:translate-x-1 after:translate-y-1",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
