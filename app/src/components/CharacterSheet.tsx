import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { RPGProgressBar } from './RPGProgressBar';
import { Shield, Sword, Zap, Star, Briefcase, Award, Skull, Clock, Lock, Unlock } from 'lucide-react';
import { useState } from 'react';

export function CharacterSheet() {
    const {
        level,
        xp,
        stats,
        derivedStats,
        charClass,
        hp,
        maxHp,
        mp,
        maxMp,
        inventory,
        achievements
    } = useGame();

    const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

    const currentLevelXp = xp % 100;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="rpg-button py-2 px-4 text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Личное дело
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-white border-4 border-rpg-dark p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="bg-rpg-dark p-6 text-white sticky top-0 z-10">
                    <DialogHeader>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center border-2 border-rpg-gold relative overflow-hidden">
                                <img src="/hero-sprite-idle.png" alt="Hero" className="w-20 h-20 object-contain" />
                                <div className="absolute bottom-0 right-0 bg-rpg-gold text-rpg-dark text-xs font-bold px-2 py-0.5">
                                    Lv. {level}
                                </div>
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black tracking-tight pixel-text text-rpg-gold">
                                    АЛЕКСЕЙ
                                </DialogTitle>
                                <p className="text-rpg-gold/80 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    {charClass}
                                </p>
                                <div className="mt-4 w-64">
                                    <RPGProgressBar
                                        label="ОПЫТ"
                                        current={currentLevelXp}
                                        max={100}
                                        color="bg-rpg-gold"
                                        showValues={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-8">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 border-b-2 border-gray-100 pb-4">
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`text-lg font-black uppercase tracking-wider transition-colors ${activeTab === 'stats' ? 'text-rpg-dark border-b-4 border-rpg-gold' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Характеристики
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`text-lg font-black uppercase tracking-wider transition-colors ${activeTab === 'achievements' ? 'text-rpg-dark border-b-4 border-rpg-gold' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Достижения
                        </button>
                    </div>

                    {activeTab === 'stats' ? (
                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Left Column: Stats & Vitals */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="font-black text-rpg-dark text-lg border-b-2 border-rpg-dark pb-2 flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        ЖИВУЧЕСТЬ
                                    </h3>
                                    <RPGProgressBar label="HP (Здоровье проектов)" current={hp} max={maxHp} color="bg-red-500" />
                                    <RPGProgressBar label="MP (Энергия креатива)" current={mp} max={maxMp} color="bg-blue-500" />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-black text-rpg-dark text-lg border-b-2 border-rpg-dark pb-2 flex items-center gap-2">
                                        <Zap className="w-5 h-5" />
                                        ОСНОВНЫЕ
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { name: 'STR', label: 'Сила', value: stats.STR, color: 'bg-red-400', desc: 'Масштаб бюджетов' },
                                            { name: 'INT', label: 'Интеллект', value: stats.INT, color: 'bg-blue-400', desc: 'Глубина аналитики' },
                                            { name: 'DEX', label: 'Ловкость', value: stats.DEX, color: 'bg-teal-400', desc: 'Скорость внедрения' },
                                            { name: 'LUCK', label: 'Удача', value: stats.LUCK, color: 'bg-yellow-400', desc: 'Виральный охват' },
                                        ].map((s) => (
                                            <div key={s.name}>
                                                <div className="flex justify-between text-xs font-bold mb-1">
                                                    <span>{s.name} ({s.label})</span>
                                                    <span>{s.value}/100</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 border border-gray-300 rounded-sm overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${s.value}%` }}
                                                        className={`h-full ${s.color}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Inventory & Derived Stats */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="font-black text-rpg-dark text-lg border-b-2 border-rpg-dark pb-2 flex items-center gap-2">
                                        <Star className="w-5 h-5" />
                                        ВТОРИЧНЫЕ
                                    </h3>
                                    <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 font-bold uppercase">Critical</span>
                                            <div className="text-xl font-black text-rpg-dark flex items-center gap-1">
                                                <Skull className="w-4 h-4 text-red-500" />
                                                {derivedStats.criticalChance}%
                                            </div>
                                            <p className="text-[10px] text-gray-400">Шанс сверхуспеха</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 font-bold uppercase">Mana Regen</span>
                                            <div className="text-xl font-black text-rpg-dark flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                {derivedStats.manaRegen}
                                            </div>
                                            <p className="text-[10px] text-gray-400">Генерация идей/час</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 font-bold uppercase">Armor</span>
                                            <div className="text-xl font-black text-rpg-dark flex items-center gap-1">
                                                <Shield className="w-4 h-4 text-gray-500" />
                                                {derivedStats.armor}
                                            </div>
                                            <p className="text-[10px] text-gray-400">Устойчивость к багам</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500 font-bold uppercase">Wisdom</span>
                                            <div className="text-xl font-black text-rpg-dark flex items-center gap-1">
                                                <Star className="w-4 h-4 text-purple-500" />
                                                {derivedStats.wisdom}
                                            </div>
                                            <p className="text-[10px] text-gray-400">Знание трендов</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-black text-rpg-dark text-lg border-b-2 border-rpg-dark pb-2 flex items-center gap-2">
                                        <Sword className="w-5 h-5" />
                                        АРСЕНАЛ
                                    </h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div key={i} className="aspect-square bg-rpg-light border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 relative group cursor-help">
                                                {inventory[i] ? (
                                                    <>
                                                        <img src={inventory[i].icon} alt={inventory[i].name} className="w-8 h-8 opacity-100" />
                                                        {/* Tooltip */}
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-gray-900 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                                                            <p className="font-bold text-rpg-gold mb-1">{inventory[i].name}</p>
                                                            <p>{inventory[i].description}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Star className="w-4 h-4 opacity-20" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className={`p-4 rounded-xl border-2 flex items-start gap-4 transition-all ${ach.unlocked
                                            ? 'bg-white border-rpg-gold shadow-sm'
                                            : 'bg-gray-50 border-gray-200 grayscale opacity-70'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${ach.unlocked ? 'bg-rpg-gold/20 border-rpg-gold' : 'bg-gray-200 border-gray-300'
                                            }`}>
                                            {ach.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-rpg-dark">{ach.name}</h4>
                                                {ach.unlocked ? (
                                                    <Unlock className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Lock className="w-4 h-4 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">{ach.description}</p>

                                            {/* Progress Bar */}
                                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${ach.unlocked ? 'bg-green-500' : 'bg-gray-400'}`}
                                                    style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-[10px] font-bold text-gray-400">
                                                    {ach.progress} / {ach.maxProgress}
                                                </span>
                                                <span className="text-[10px] font-bold text-rpg-gold">
                                                    +{ach.xpReward} XP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
