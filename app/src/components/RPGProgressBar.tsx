import { motion } from 'framer-motion';

interface RPGProgressBarProps {
    label: string;
    current: number;
    max: number;
    color: string;
    className?: string;
    showValues?: boolean;
}

export function RPGProgressBar({
    label,
    current,
    max,
    color,
    className = "",
    showValues = true
}: RPGProgressBarProps) {
    const percentage = Math.min(100, (current / max) * 100);

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-rpg-dark pixel-text">{label}</span>
                {showValues && (
                    <span className="text-xs font-bold text-rpg-dark">
                        {current} / {max}
                    </span>
                )}
            </div>
            <div className="h-4 bg-gray-200 rounded-sm overflow-hidden border-2 border-rpg-dark relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full ${color} shadow-[inset_0_2px_0_rgba(255,255,255,0.3)]`}
                />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
