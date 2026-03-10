import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useGame } from '@/context/GameContext';
import {
  ArrowLeft, CheckCircle2,
  Sparkles,
  Trophy,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getQuests } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import { PixelIcon } from '@/components/PixelIcon';
import type { PixelIconName } from '@/components/PixelIcon';
import type { SanityQuestStep } from '@/types/sanity';

interface QuestStep {
  id: number;
  type: 'choice' | 'form';
  title: string;
  subtitle: string;
  question: string;
  icon: PixelIconName;
  options?: {
    text: string;
    subtext: string;
    value: string;
    xp: number;
    icon: PixelIconName;
  }[];
}

const FALLBACK_STEPS: QuestStep[] = [
  {
    id: 1,
    type: 'choice',
    title: 'КЛАСС ГЕРОЯ',
    subtitle: 'Выберите вашу специализацию',
    question: 'В какой сфере ваш основной проект?',
    icon: 'hat',
    options: [
      { text: 'E-commerce', subtext: 'Товары, магазины, маркетплейсы', value: 'ecommerce', xp: 50, icon: 'chest' },
      { text: 'EdTech', subtext: 'Курсы, школы, обучение', value: 'edtech', xp: 50, icon: 'scroll' },
      { text: 'B2B SaaS', subtext: 'Сервисы для бизнеса', value: 'saas', xp: 70, icon: 'potion' },
      { text: 'Локальный бизнес', subtext: 'Услуги, студии, клиники', value: 'local', xp: 40, icon: 'map' },
      { text: 'Инфобизнес', subtext: 'Эксперты, вебинары, воронки', value: 'infobiz', xp: 60, icon: 'lightning' },
    ],
  }
];

export function QuestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: '', contact: '', msg: '' });
  const { addXP, showXPPopup } = useGame();
  const navigate = useNavigate();
  const { data: sanitySteps } = useSanityData<SanityQuestStep[]>(getQuests);

  const steps = (sanitySteps?.length
    ? sanitySteps.map(s => ({ ...s, id: s.stepId }))
    : FALLBACK_STEPS) as QuestStep[];

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  if (!currentStep) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-rpg-dark text-white">
        <Loader2 className="w-10 h-10 animate-spin text-rpg-gold" />
      </div>
    </Layout>
  );

  const handleChoice = (value: string, xp: number) => {
    setAnswers(prev => ({ ...prev, [currentStep.id]: value }));
    addXP(xp);
    showXPPopup(xp, window.innerWidth / 2, window.innerHeight / 2);

    // Auto next after delay
    setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    }, 400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addXP(500); // Massive XP for finishing
    showXPPopup(500, window.innerWidth / 2, window.innerHeight / 2);
    // In real app, send to API here
    setTimeout(() => {
      navigate('/thank-you');
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 bg-rpg-dark text-white relative overflow-hidden flex flex-col items-center">
        {/* Animated Background effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rpg-gold/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-4xl w-full px-4 relative z-10 flex-grow flex flex-col">

          {/* Header Stats */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <PixelIcon name={currentStep.icon} className="w-6 h-6 text-rpg-gold" />
              </div>
              <div>
                <span className="text-[10px] font-black text-rpg-gold uppercase tracking-[0.2em]">{currentStep.subtitle}</span>
                <h1 className="text-xl md:text-2xl font-black italic">{currentStep.title}</h1>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">ПРОГРЕСС ИСПЫТАНИЯ</span>
              <div className="w-32 md:w-48 h-3 bg-white/10 rounded-full border border-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-rpg-gold to-yellow-600 shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Quest Content */}
          <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -20, rotateY: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-xl rounded-[40px] border-2 border-white/10 p-8 md:p-12 shadow-2xl relative"
              >
                {/* Decorative corners */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-rpg-gold rounded-tl-2xl" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-rpg-gold rounded-br-2xl" />

                <h2 className="text-2xl md:text-4xl font-black mb-10 text-center leading-tight">
                  {currentStep.question}
                </h2>

                {currentStep.type === 'choice' ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentStep.options?.map((opt) => (
                      <motion.button
                        key={opt.value}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,215,0,0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice(opt.value, opt.xp)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all flex items-center gap-6 text-left ${answers[currentStep.id] === opt.value
                          ? 'border-rpg-gold bg-rpg-gold/20'
                          : 'border-white/10 bg-white/5 hover:border-rpg-gold/50'
                          }`}
                      >
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                          <PixelIcon name={opt.icon} className="w-8 h-8 text-rpg-gold" />
                        </span>
                        <div>
                          <h4 className="font-black text-lg md:text-xl uppercase tracking-tight">{opt.text}</h4>
                          <p className="text-gray-400 text-sm font-medium">{opt.subtext}</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <CheckCircle2 className="w-6 h-6 text-rpg-gold" />
                        </div>
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-rpg-gold text-rpg-dark rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all">
                          +{opt.xp} XP
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-rpg-gold uppercase tracking-[0.2em] mb-2">ВАШЕ ИМЯ (НИКНЕЙМ)</label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 focus:border-rpg-gold outline-none transition-all placeholder:text-gray-600"
                        placeholder="Александр Великий"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-rpg-gold uppercase tracking-[0.2em] mb-2">TELEGRAM ИЛИ WHATSAPP</label>
                      <input
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 focus:border-rpg-gold outline-none transition-all placeholder:text-gray-600"
                        placeholder="@alexey_boss"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-rpg-gold uppercase tracking-[0.2em] mb-2">КОММЕНТАРИЙ К ЗАКАЗУ</label>
                      <textarea
                        value={formData.msg}
                        onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                        className="w-full bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-4 focus:border-rpg-gold outline-none transition-all placeholder:text-gray-600 min-h-[120px]"
                        placeholder="Расскажите немного о вашем проекте..."
                      />
                    </div>
                    <button type="submit" className="rpg-button w-full py-6 text-xl group relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        ПОЛУЧИТЬ СТРАТЕГИЮ ПОБЕДЫ
                        <Sparkles className="w-6 h-6" />
                      </span>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                      ПО ЗАВЕРШЕНИЮ ВЫ ПОЛУЧИТЕ +500 XP В ГИЛЬДИИ
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons (for manual back) */}
          <div className="mt-12 flex justify-between items-center text-gray-500 font-bold uppercase tracking-widest text-sm">
            <button
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 hover:text-white transition-colors disabled:opacity-0"
            >
              <ArrowLeft className="w-4 h-4" />
              НАЗАД
            </button>
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-rpg-gold scale-125' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <div className="w-20" /> {/* Spacer */}
          </div>

        </div>

        {/* Global HUD elements */}
        <div className="fixed bottom-8 left-8 flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-lg bg-rpg-gold/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-rpg-gold" />
          </div>
          <div>
            <span className="text-[8px] font-black text-gray-400 uppercase block">АКТИВНЫЙ КВЕСТ</span>
            <span className="font-black text-xs uppercase tracking-tight">ИСПЫТАНИЕ МАРКЕТИНГОМ</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
