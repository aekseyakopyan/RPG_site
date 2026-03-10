import { motion } from 'framer-motion';
import { Target, Zap, BarChart3, Globe, Code, MessageCircle, ShieldCheck } from 'lucide-react';

interface SkillNode {
    id: string;
    name: string;
    icon: any;
    level: number;
    maxLevel: number;
    description: string;
    dependencies?: string[];
}

const skills: SkillNode[] = [
    { id: 'foundation', name: 'Основы маркетинга', icon: ShieldCheck, level: 10, maxLevel: 10, description: 'Базовые знания воронок и психологии потребителя' },
    { id: 'analytics', name: 'Аналитика', icon: BarChart3, level: 8, maxLevel: 10, description: 'GA4, Яндекс.Метрика, сквозная аналитика', dependencies: ['foundation'] },
    { id: 'traffic', name: 'Трафик', icon: Zap, level: 9, maxLevel: 10, description: 'Контекст и таргет', dependencies: ['foundation'] },
    { id: 'conversion', name: 'Конверсия', icon: Target, level: 7, maxLevel: 10, description: 'LPO, UX/UI основы', dependencies: ['foundation'] },
    { id: 'tech', name: 'Tech Stack', icon: Code, level: 6, maxLevel: 10, description: 'Tilda, No-code, API', dependencies: ['conversion'] },
    { id: 'growth', name: 'Growth Hacking', icon: Globe, level: 5, maxLevel: 10, description: 'Виральность, масштабирование', dependencies: ['analytics', 'traffic'] },
    { id: 'comm', name: 'Коммуникации', icon: MessageCircle, level: 8, maxLevel: 10, description: 'SMM, Email, Копирайтинг', dependencies: ['traffic'] },
];

export function SkillTree() {

    return (
        <div className="p-8 bg-rpg-light rounded-3xl border-2 border-rpg-dark/10">
            <div className="text-center mb-10">
                <h3 className="text-2xl font-black text-rpg-dark pixel-text uppercase">Дерево Навыков</h3>
                <p className="text-sm text-gray-500 mt-2 italic">Прокачка компетенций через реальные проекты</p>
            </div>

            <div className="relative max-w-4xl mx-auto min-h-[500px]">
                {/* Foundation - Level 1 */}
                <div className="flex justify-center mb-16">
                    <SkillNodeComponent skill={skills[0]} />
                </div>

                {/* Level 2 */}
                <div className="grid grid-cols-3 gap-8 mb-16">
                    <SkillNodeComponent skill={skills[1]} />
                    <SkillNodeComponent skill={skills[2]} />
                    <SkillNodeComponent skill={skills[3]} />
                </div>

                {/* Level 3 */}
                <div className="flex justify-around">
                    <SkillNodeComponent skill={skills[5]} />
                    <SkillNodeComponent skill={skills[6]} />
                    <SkillNodeComponent skill={skills[4]} />
                </div>

                {/* SVG Connections (simplified) */}
                <svg className="absolute inset-0 w-full h-full -z-10 opacity-20 pointer-events-none" style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))' }}>
                    <line x1="50%" y1="60" x2="16%" y2="200" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="60" x2="50%" y2="200" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="60" x2="84%" y2="200" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
            </div>
        </div>
    );
}

function SkillNodeComponent({ skill }: { skill: SkillNode }) {
    const isActive = skill.level > 0;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${isActive
                ? 'bg-white border-rpg-gold shadow-lg ring-4 ring-rpg-gold/10'
                : 'bg-gray-100 border-gray-300 grayscale'
                }`}
        >
            <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${isActive ? 'bg-rpg-gold text-rpg-dark' : 'bg-gray-200 text-gray-400'
                }`}>
                <skill.icon className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-black text-rpg-dark uppercase tracking-tighter mb-1">{skill.name}</h4>
            <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 w-full rounded-full ${i < (skill.level / 2) ? 'bg-rpg-gold' : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>
            <p className="text-[10px] text-gray-500 leading-tight line-clamp-2">{skill.description}</p>

            {/* Level badge */}
            <div className="absolute -top-2 -right-2 bg-rpg-dark text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                Lvl.{skill.level}
            </div>
        </motion.div>
    );
}
