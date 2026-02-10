import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    Target,
    Award,
    Search,
    MessageCircle,
    Mail,
    TrendingUp,
    Compass,
    Users,
    CircleUser
} from 'lucide-react';

interface Props {
    type: string;
    className?: string;
}

// Helper for floating metrics/icons
const FloatingElement = ({ children, delay = 0, duration = 4, x = [0, 10, 0], y = [0, -10, 0], scale = [1, 1.1, 1] }: any) => (
    <motion.div
        animate={{
            x,
            y,
            scale,
            opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
        className="absolute pointer-events-none z-30"
    >
        {children}
    </motion.div>
);

export function ServiceHeroAnimation({ type, className = "" }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    const CharacterBase = () => (
        <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0"
        >
            <img
                src="/assets/images/hero-marketer.png"
                alt="Hero Background"
                className="w-full h-full object-contain filter grayscale contrast-75"
            />
        </motion.div>
    );

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                {type === 'contextual' && (
                    <motion.div
                        key="contextual"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <CharacterBase />
                        {/* Sword Base */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: isHovered ? [0, 15, -15, 0] : 0
                            }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 0.5, ease: "easeInOut" }
                            }}
                            className="relative z-10"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-500/30 blur-[40px] rounded-full animate-pulse" />
                                <img
                                    src="/assets/images/weapon-contextual.png"
                                    alt="Contextual Sword"
                                    className="w-full max-w-[300px] md:max-w-[400px] h-auto relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                    onError={(e) => { (e.target as any).src = '/assets/images/hero-marketer.png' }}
                                />
                            </div>
                        </motion.div>

                        {/* Orbiting Icons */}
                        <FloatingElement delay={0} x={[80, 100, 80]} y={[-60, -80, -60]}>
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-blue-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center font-black text-white text-[10px]">G</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">GOOGLE</span>
                                    <span className="text-[8px] font-bold text-blue-500">CONVERSION</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={0.5} x={[-100, -80, -100]} y={[-30, -50, -30]}>
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-red-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center font-black text-white text-[10px]">YA</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">YANDEX</span>
                                    <span className="text-[8px] font-bold text-red-500">DIRECT</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={1.2} x={[70, 90, 70]} y={[50, 70, 50]}>
                            <div className="bg-rpg-dark/90 backdrop-blur-sm p-3 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-rpg-gold/30 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-rpg-gold" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white leading-none">CTR 5.4%</span>
                                    <span className="text-[8px] font-bold text-rpg-gold">CRITICAL HIT</span>
                                </div>
                            </div>
                        </FloatingElement>

                        {/* Particles */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: [0, 100],
                                    x: Math.sin(i) * 30
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                    ease: "linear"
                                }}
                                className="absolute top-1/2 w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
                            />
                        ))}
                    </motion.div>
                )}

                {type === 'targeted' && (
                    <motion.div
                        key="targeted"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <CharacterBase />
                        {/* Bow Animation */}
                        <motion.div
                            animate={{
                                x: isHovered ? [0, -15, 0] : [0, -5, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative z-10"
                        >
                            <img
                                src="/assets/images/weapon-targeted.png"
                                alt="Targeted Bow"
                                className="w-64 md:w-80 h-auto relative z-10 drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] rotate-45"
                                onError={(e) => { (e.target as any).src = '/assets/images/hero-marketer.png' }}
                            />

                            {/* Arrow Flight */}
                            <motion.div
                                animate={{
                                    x: [0, 400],
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                                className="absolute top-1/2 left-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full blur-[1px] rotate-[-5deg]"
                            />
                        </motion.div>

                        {/* Improved Targets & Icons */}
                        <FloatingElement delay={0} x={[120, 140, 120]} y={[-80, -100, -80]}>
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#0088cc] rounded-xl flex items-center justify-center text-white">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">TELEGRAM</span>
                                    <span className="text-[8px] font-bold text-blue-500">ADS HUB</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={0.8} x={[-130, -110, -130]} y={[-50, -70, -50]}>
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-indigo-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#0077ff] rounded-xl flex items-center justify-center text-white font-black text-xs">VK</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">VK ADS</span>
                                    <span className="text-[8px] font-bold text-indigo-500">TARGETING</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={1.5} x={[90, 110, 90]} y={[60, 80, 60]}>
                            <div className="bg-rpg-dark/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-purple-500/30 flex items-center gap-2">
                                <Target className="w-5 h-5 text-purple-400" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white leading-none">PRECISION</span>
                                    <span className="text-[8px] font-bold text-purple-400">100% HIT RATE</span>
                                </div>
                            </div>
                        </FloatingElement>
                    </motion.div>
                )}

                {type === 'seo' && (
                    <motion.div
                        key="seo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <CharacterBase />
                        {/* Shield with Growth */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative z-10"
                        >
                            <img
                                src="/assets/images/weapon-seo.png"
                                alt="SEO Shield"
                                className="w-64 md:w-80 h-auto relative z-10 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                                onError={(e) => { (e.target as any).src = '/assets/images/hero-marketer.png' }}
                            />

                            {/* Tree/Growth Effect */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: ['20%', '100%'] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px bg-green-500/40"
                            />
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [0, 1, 0],
                                        rotate: [0, 360],
                                        x: Math.cos(i) * 60,
                                        y: Math.sin(i) * 60
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full blur-[1px]"
                                />
                            ))}
                        </motion.div>

                        {/* SEO Growth Indicators */}
                        <FloatingElement delay={0} x={[-130, -110, -130]} y={[-70, -90, -70]}>
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">RANKING</span>
                                    <span className="text-[8px] font-bold text-emerald-500">POISON DAMAGE</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={1.2} x={[110, 130, 110]} y={[-20, -40, -20]}>
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white font-black text-xs">G</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">ORGANIC</span>
                                    <span className="text-[8px] font-bold text-blue-500">GOOGLE TOP</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={2.4} x={[0, 20, 0]} y={[90, 110, 90]}>
                            <div className="bg-emerald-900/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2">
                                <Award className="w-5 h-5 text-emerald-400" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white leading-none">TOP #1</span>
                                    <span className="text-[8px] font-bold text-emerald-400">DOMAIN AUTHORITY</span>
                                </div>
                            </div>
                        </FloatingElement>
                    </motion.div>
                )}

                {type === 'analytics' && (
                    <motion.div
                        key="analytics"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <CharacterBase />
                        {/* Map Animation */}
                        <motion.div
                            animate={{
                                rotateX: [0, 10, 0],
                                rotateY: [0, 5, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="relative z-10 perspective-[1000px]"
                        >
                            <img
                                src="/assets/images/weapon-analytics.png"
                                alt="Analytics Map"
                                className="w-64 md:w-80 h-auto relative z-10 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                                onError={(e) => { (e.target as any).src = '/assets/images/hero-marketer.png' }}
                            />

                            {/* Scanner Line */}
                            <motion.div
                                animate={{ top: ['20%', '80%', '20%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-0 right-0 h-0.5 bg-rpg-gold/50 blur-[2px] z-20"
                            />
                        </motion.div>

                        {/* Magnifier */}
                        <motion.div
                            animate={{
                                x: [0, 50, -30, 0],
                                y: [0, -40, 30, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute z-30"
                        >
                            <div className="w-12 h-12 rounded-full border-4 border-rpg-gold/50 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                <Search className="w-6 h-6 text-rpg-gold" />
                            </div>
                        </motion.div>

                        {/* Analytics Data */}
                        <FloatingElement delay={0} x={[130, 150, 130]} y={[-60, -80, -60]}>
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-amber-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                                    <Compass className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">DIAGNOSTIC</span>
                                    <span className="text-[8px] font-bold text-amber-500">QUEST MAP</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={1} x={[-140, -120, -140]} y={[-20, -40, -20]}>
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-orange-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#f97316] rounded-xl flex items-center justify-center text-white font-black text-xs">A</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">GA4 ANALYTICS</span>
                                    <span className="text-[8px] font-bold text-orange-500">TRACKING</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={2} x={[0, 0, 0]} y={[100, 120, 100]}>
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-amber-200 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-amber-600" />
                                <span className="text-[10px] font-black text-rpg-dark">SEARCHING FOR WEAKNESS</span>
                            </div>
                        </FloatingElement>
                    </motion.div>
                )}

                {type === 'crm' && (
                    <motion.div
                        key="crm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <CharacterBase />
                        {/* Potion Animation */}
                        <motion.div
                            animate={{
                                rotate: [-2, 2, -2],
                                y: [0, -10, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative z-10"
                        >
                            <img
                                src="/assets/images/weapon-crm.png"
                                alt="CRM Potion"
                                className="w-64 md:w-80 h-auto relative z-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                                onError={(e) => { (e.target as any).src = '/assets/images/hero-marketer.png' }}
                            />

                            {/* Bubbles */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: [0, -100],
                                        x: Math.sin(i) * 20
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "easeOut"
                                    }}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full blur-[1px]"
                                />
                            ))}
                        </motion.div>

                        {/* CRM Retention */}
                        <FloatingElement delay={0} x={[120, 150, 120]} y={[-80, -100, -80]}>
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">RETENTION</span>
                                    <span className="text-[8px] font-bold text-purple-500">MANA REGEN</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={1.5} x={[-130, -110, -130]} y={[-30, -50, -30]}>
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rpg-dark leading-none">CHATBOT</span>
                                    <span className="text-[8px] font-bold text-blue-500">AUTO-CAST</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={3} x={[0, 0, 0]} y={[100, 120, 100]}>
                            <div className="bg-purple-900/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-purple-500/30 flex items-center gap-2">
                                <div className="w-6 h-6 bg-purple-400/20 rounded-lg flex items-center justify-center">
                                    <Users className="w-4 h-4 text-purple-300" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white leading-none">Loyalty +45%</span>
                                    <span className="text-[8px] font-bold text-purple-300">POTION OF GROWTH</span>
                                </div>
                            </div>
                        </FloatingElement>
                    </motion.div>
                )}

                {type === 'complex' && (
                    <motion.div
                        key="complex"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <CharacterBase />
                        {/* Crown Animation */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            }}
                            className="relative z-20"
                        >
                            <img
                                src="/assets/images/weapon-complex.png"
                                alt="Complex Crown"
                                className="w-64 md:w-80 h-auto relative z-10 drop-shadow-[0_0_40px_rgba(234,179,8,0.6)]"
                                onError={(e) => { (e.target as any).src = '/assets/images/hero-marketer.png' }}
                            />

                            {/* Glowing Gems Effect */}
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full blur-[8px]"
                                    style={{
                                        backgroundColor: ['#facc15', '#3b82f6', '#10b981', '#ef4444', '#a855f7'][i],
                                        transform: `rotate(${i * 72}deg) translateX(60px)`
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Orbiting Weapons */}
                        {[
                            'contextual', 'targeted', 'seo', 'analytics', 'crm'
                        ].map((weapon, i) => (
                            <motion.div
                                key={weapon}
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * -4
                                }}
                                className="absolute w-full h-full flex items-center justify-center p-20"
                            >
                                <div style={{ transform: `rotate(${-i * 72}deg)` }}>
                                    <img
                                        src={`/assets/images/weapon-${weapon}.png`}
                                        className="w-12 h-12 object-contain opacity-40 hover:opacity-100 transition-opacity"
                                        style={{ transform: `translateX(200px)` }}
                                        onError={(e) => (e.target as any).style.display = 'none'}
                                    />
                                </div>
                            </motion.div>
                        ))}

                        {/* Complex/Commander Badges */}
                        <FloatingElement delay={0} x={[-150, -130, -150]} y={[-100, -120, -100]}>
                            <div className="bg-rpg-gold text-rpg-dark p-4 rounded-3xl shadow-[0_10px_30px_rgba(234,179,8,0.4)] border-2 border-white flex items-center gap-3">
                                <CircleUser className="w-8 h-8" />
                                <div className="flex flex-col">
                                    <span className="text-xs font-black leading-none">COMMANDER</span>
                                    <span className="text-[9px] font-bold opacity-80 uppercase tracking-tighter">ALL-SIDE BUFF</span>
                                </div>
                            </div>
                        </FloatingElement>

                        <FloatingElement delay={2} x={[130, 150, 130]} y={[70, 90, 70]}>
                            <div className="bg-rpg-dark/95 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-rpg-gold/50 flex items-center gap-3">
                                <TrendingUp className="w-8 h-8 text-rpg-gold" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-white leading-none">ROI x3</span>
                                    <span className="text-[9px] font-bold text-rpg-gold uppercase tracking-tighter">ULTIMATE RESULT</span>
                                </div>
                            </div>
                        </FloatingElement>

                        {/* Synergy Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <motion.circle
                                cx="50%" cy="50%" r="200"
                                fill="none"
                                stroke="url(#goldGradient)"
                                strokeWidth="1"
                                strokeDasharray="10,10"
                                animate={{ strokeDashoffset: [0, 100] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#facc15" />
                                    <stop offset="100%" stopColor="#eab308" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
