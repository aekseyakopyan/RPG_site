import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
    { threshold: 0, text: "⚔️ Собираем артефакты маркетинга..." },
    { threshold: 25, text: "🗺️ Рисуем карту квестов..." },
    { threshold: 50, text: "📊 Калибруем аналитические заклинания..." },
    { threshold: 75, text: "🎮 Загружаем уровень 42..." },
    { threshold: 100, text: "✨ Квест начинается!" },
];

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(messages[0].text);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const duration = 3500; // 3.5 seconds
        const intervalTime = 40;
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const message = [...messages]
            .reverse()
            .find((m) => progress >= m.threshold);
        if (message) {
            setCurrentMessage(message.text);
        }

        if (progress === 100) {
            const exitTimeout = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onLoadingComplete, 800);
            }, 500);
            return () => clearTimeout(exitTimeout);
        }
    }, [progress, onLoadingComplete]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-[#1a1a2e] flex flex-col items-center justify-center p-6 select-none"
                >
                    {/* Rotating Cat Logo */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-32 h-32 mb-8 relative"
                    >
                        <div className="absolute inset-0 bg-[#ffd700]/20 blur-2xl rounded-full" />
                        <img
                            src="/logo.gif"
                            alt="Loading..."
                            className="w-full h-full object-contain relative z-10"
                        />
                    </motion.div>

                    {/* Progress Section */}
                    <div className="w-full max-w-xs text-center">
                        <div className="mb-4">
                            <span className="text-4xl font-black text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        {/* RPG Progress Bar */}
                        <div className="h-4 w-full bg-[#2a2a3e] rounded-full border-2 border-[#3a3a4e] overflow-hidden mb-6">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-[#ffd700] to-[#ff6b6b] shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                            />
                        </div>

                        {/* Dynamic Message */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentMessage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-[#c0c0c0] font-bold text-sm sm:text-base tracking-wide min-h-[1.5em]"
                            >
                                {currentMessage}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-8 left-0 right-0 text-center opacity-30">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#ffd700]">
                            Initializing Alexey.M OS v4.2
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
