import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export function RPGHUD() {
    const { level, xp, hp, maxHp, mp, maxMp } = useGame();

    const currentXp = xp % 100;
    const xpPercentage = (currentXp / 100) * 100;

    return (
        <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col gap-2 pointer-events-auto"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rpg-gold border-2 border-rpg-dark flex items-center justify-center text-sm font-black text-rpg-dark shadow-lg">
                        {level}
                    </div>
                    <div className="flex flex-col gap-1 w-40">
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden border border-rpg-dark/10 shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(hp / maxHp) * 100}%` }}
                                className="h-full bg-red-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                            />
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden border border-rpg-dark/10 shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(mp / maxMp) * 100}%` }}
                                className="h-full bg-blue-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                            />
                        </div>
                    </div>
                </div>
                {/* XP Mini Bar */}
                <div className="h-1 bg-gray-300/50 rounded-full overflow-hidden w-52">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${xpPercentage}%` }}
                        className="h-full bg-rpg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                    />
                </div>
            </motion.div>
        </div>
    );
}
