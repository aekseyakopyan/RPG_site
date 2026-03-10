import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelCard } from '@/components/PixelCard';
import { PixelButton } from '@/components/PixelButton';
import { questionBank, shuffleArray } from '@/data/battleQuestions';
import type { Question, Option, DifficultyMode } from '@/data/battleQuestions';
import { getBattleQuestions } from '@/lib/sanity';
import type { SanityBattleQuestion } from '@/types/sanity';
import { Clock, Trophy, AlertTriangle, CheckCircle, XCircle, ArrowRight, Zap, Target as TargetIcon, Loader, BarChart2 } from 'lucide-react';

type GameState = 'start' | 'playing' | 'explanation' | 'results';

interface GameStats {
    score: number;
    combo: number;
    maxCombo: number;
    correctAnswers: number;
    totalQuestions: number;
    history: {
        questionId: string;
        correct: boolean;
        points: number;
    }[];
}

export function BattleTestPage() {
    const [gameState, setGameState] = useState<GameState>('start');
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stats, setStats] = useState<GameStats>({
        score: 0,
        combo: 0,
        maxCombo: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        history: []
    });
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [timer, setTimer] = useState(0);
    const [hintUsed, setHintUsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch questions from Sanity
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const sanityQuestions = await getBattleQuestions();

                if (sanityQuestions && sanityQuestions.length > 0) {
                    // Map Sanity data to our internal structure
                    const mappedQuestions: Question[] = sanityQuestions.map((q: SanityBattleQuestion) => ({
                        id: q._id,
                        category: q.category,
                        priority: q.priority,
                        text: q.text,
                        hint: q.hint,
                        inQuickTest: q.difficulty?.includes('quick') || false,
                        inStandardTest: q.difficulty?.includes('standard') || false,
                        inFullTest: q.difficulty?.includes('full') || false,
                        options: q.options.map((opt: any, index: number) => ({
                            id: String.fromCharCode(65 + index), // A, B, C, D
                            text: opt.text,
                            points: opt.points,
                            explanation: opt.explanation
                        }))
                    }));
                    setAllQuestions(mappedQuestions);
                } else {
                    // Fallback to static data
                    console.log('Using static question bank (Sanity empty)');
                    setAllQuestions(questionBank);
                }
            } catch (error) {
                console.error('Failed to fetch from Sanity, using fallback:', error);
                setAllQuestions(questionBank);
            } finally {
                setIsLoading(false);
            }
        };

        loadQuestions();
    }, []);

    // Timer logic
    useEffect(() => {
        let interval: number;
        if (gameState === 'playing') {
            interval = window.setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => window.clearInterval(interval);
    }, [gameState]);

    const startGame = (mode: DifficultyMode) => {
        // Filter questions based on mode
        const relevant = allQuestions.filter(q => {
            if (mode === 'quick') return q.inQuickTest;
            if (mode === 'standard') return q.inStandardTest;
            return q.inFullTest;
        });

        // Loop if not enough questions (dev mode safety) or just shuffle
        const finalQuestions = relevant.length > 0 ? relevant : allQuestions;

        setQuestions(shuffleArray(finalQuestions));
        setGameState('playing');
        setCurrentIndex(0);
        setStats({
            score: 0,
            combo: 0,
            maxCombo: 0,
            correctAnswers: 0,
            totalQuestions: finalQuestions.length,
            history: []
        });
        setTimer(0);
    };

    const handleAnswer = (option: Option) => {
        setSelectedOption(option);

        // Calculate points
        let points = option.points;
        if (hintUsed && points > 0) points -= 3; // Penalty for hint

        // Update stats
        setStats(prev => {
            const isCorrect = option.points > 0;
            const newCombo = isCorrect ? prev.combo + 1 : 0;
            return {
                ...prev,
                score: prev.score + points,
                combo: newCombo,
                maxCombo: Math.max(prev.maxCombo, newCombo),
                correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
                history: [...prev.history, {
                    questionId: questions[currentIndex].id,
                    correct: isCorrect,
                    points: points
                }]
            };
        });

        setGameState('explanation');
    };

    const nextQuestion = () => {
        setSelectedOption(null);
        setHintUsed(false);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setGameState('playing');
        } else {
            setGameState('results');
        }
    };

    const currentQuestion = questions[currentIndex];

    return (
        <div className="min-h-screen bg-[#0a0a12] text-[#e0e0e0] font-mono py-20 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header / HUD */}
                {gameState !== 'start' && (
                    <div className="mb-8 flex flex-wrap justify-between items-center gap-4 bg-[#1a1a2e] p-4 rounded border-2 border-[#3a3a4e]">
                        <div className="flex items-center gap-4">
                            <div>
                                <span className="text-sm text-gray-400">СЧЁТ</span>
                                <div className="text-2xl font-bold text-[#ffd700]">{stats.score}</div>
                            </div>
                            {stats.combo > 1 && (
                                <div className="ml-4 animate-bounce">
                                    <span className="text-xs text-[#ff6b6b] font-bold">COMBO</span>
                                    <div className="text-xl font-black text-[#ff6b6b]">x{stats.combo}</div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-sm text-gray-400">ВОПРОС</span>
                                <div className="font-bold">{currentIndex + 1} / {questions.length}</div>
                            </div>
                            <div className="w-px h-8 bg-[#3a3a4e]"></div>
                            <div className="flex items-center gap-2 text-[#4ade80]">
                                <Clock className="w-5 h-5" />
                                <span className="font-bold">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">

                    {/* START SCREEN */}
                    {gameState === 'start' && (
                        <motion.div
                            key="start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ffd700] to-[#ff6b6b]">
                                    ⚔️ BATTLE TEST v2.0
                                </h1>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                    Проверь свою боевую готовность перед выходом на рынок.
                                    Выбери уровень сложности и узнай свой реальный ранг.
                                </p>
                            </div>

                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Loader className="w-12 h-12 text-[#ffd700] animate-spin mb-4" />
                                    <p className="text-gray-400">Загрузка данных боя...</p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* QUICK */}
                                    <div onClick={() => startGame('quick')} className="cursor-pointer group">
                                        <PixelCard glow="cyan" className="h-full hover:border-[#4ade80] transition-colors">
                                            <div className="p-2">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Zap className="w-6 h-6 text-[#4ade80]" />
                                                    <h3 className="text-xl font-bold group-hover:text-[#4ade80]">БЫСТРАЯ</h3>
                                                </div>
                                                <ul className="text-sm text-gray-400 space-y-2 mb-6">
                                                    <li>• 10 вопросов</li>
                                                    <li>• ~3 минуты</li>
                                                    <li>• Max: 150 баллов</li>
                                                </ul>
                                                <PixelButton className="w-full bg-[#4ade80]/20 text-[#4ade80] hover:bg-[#4ade80] hover:text-black">
                                                    НАЧАТЬ
                                                </PixelButton>
                                            </div>
                                        </PixelCard>
                                    </div>

                                    {/* STANDARD */}
                                    <div onClick={() => startGame('standard')} className="cursor-pointer group relative">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ffd700] text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                                            РЕКОМЕНДУЮ
                                        </div>
                                        <PixelCard glow="gold" className="h-full hover:border-[#ffd700] transition-colors pt-6">
                                            <div className="p-2">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <TargetIcon className="w-6 h-6 text-[#ffd700]" />
                                                    <h3 className="text-xl font-bold group-hover:text-[#ffd700]">СТАНДАРТ</h3>
                                                </div>
                                                <ul className="text-sm text-gray-400 space-y-2 mb-6">
                                                    <li>• 20 вопросов</li>
                                                    <li>• ~6 минут</li>
                                                    <li>• Max: 300 баллов</li>
                                                </ul>
                                                <PixelButton variant="primary" className="w-full">
                                                    НАЧАТЬ
                                                </PixelButton>
                                            </div>
                                        </PixelCard>
                                    </div>

                                    {/* FULL */}
                                    <div onClick={() => startGame('full')} className="cursor-pointer group">
                                        <PixelCard glow="none" className="h-full hover:border-[#ff6b6b] transition-colors">
                                            <div className="p-2">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Trophy className="w-6 h-6 text-[#ff6b6b]" />
                                                    <h3 className="text-xl font-bold group-hover:text-[#ff6b6b]">ПОЛНАЯ</h3>
                                                </div>
                                                <ul className="text-sm text-gray-400 space-y-2 mb-6">
                                                    <li>• 30 вопросов</li>
                                                    <li>• ~10 минут</li>
                                                    <li>• Max: 450 баллов</li>
                                                </ul>
                                                <PixelButton className="w-full bg-[#ff6b6b]/20 text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white">
                                                    НАЧАТЬ
                                                </PixelButton>
                                            </div>
                                        </PixelCard>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* QUESTION SCREEN */}
                    {gameState === 'playing' && currentQuestion && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider
                    ${currentQuestion.priority === 'critical' ? 'bg-red-500/20 text-red-500' :
                                            currentQuestion.priority === 'important' ? 'bg-yellow-500/20 text-yellow-500' :
                                                'bg-blue-500/20 text-blue-500'}`}>
                                        {currentQuestion.category} • {currentQuestion.priority}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-8">
                                    {currentQuestion.text}
                                </h2>

                                <div className="space-y-4">
                                    {currentQuestion.options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleAnswer(option)}
                                            className="w-full p-6 text-left bg-[#1a1a2e] border-2 border-[#3a3a4e] hover:border-[#ffd700] hover:bg-[#2a2a3e] transition-all group rounded-lg flex items-center justify-between"
                                        >
                                            <span className="text-lg group-hover:text-[#ffd700] transition-colors">
                                                <span className="font-bold mr-4 text-gray-500 group-hover:text-[#ffd700]">{option.id})</span>
                                                {option.text}
                                            </span>
                                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#ffd700]" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {currentQuestion.hint && !hintUsed && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() => setHintUsed(true)}
                                        className="text-sm text-gray-500 hover:text-[#ffd700] flex items-center gap-2 transition-colors"
                                    >
                                        <AlertTriangle className="w-4 h-4" />
                                        Показать подсказку (-3 балла)
                                    </button>
                                </div>
                            )}

                            {hintUsed && (
                                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-200 text-sm flex gap-3">
                                    <AlertTriangle className="w-5 h-5 shrink-0" />
                                    {currentQuestion.hint}
                                </div>
                            )}

                        </motion.div>
                    )}

                    {/* EXPLANATION SCREEN */}
                    {gameState === 'explanation' && selectedOption && (
                        <motion.div
                            key="explanation"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto"
                        >
                            <PixelCard
                                glow={selectedOption.points > 0 ? 'cyan' : 'none'}
                                className="mb-8"
                            >
                                <div className="p-6 md:p-8">
                                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-700/50">
                                        <div className={`p-3 rounded-full ${selectedOption.points > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                            {selectedOption.points > 0 ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{selectedOption.explanation.title}</h2>
                                            <p className={`font-mono text-lg ${selectedOption.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {selectedOption.points > 0 ? '+' : ''}{selectedOption.points} баллов
                                                {hintUsed && selectedOption.points > 0 && <span className="text-sm ml-2 text-yellow-500">(штраф за подсказку учтен)</span>}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <section>
                                            <h3 className="text-[#ffd700] font-bold mb-2 flex items-center gap-2">
                                                <Zap className="w-4 h-4" /> ПОЧЕМУ ТАК:
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {selectedOption.explanation.why}
                                            </p>
                                        </section>

                                        {selectedOption.explanation.pros && (
                                            <section className="bg-green-500/5 p-4 rounded border border-green-500/20">
                                                <h3 className="text-green-400 font-bold mb-2">✅ Плюсы твоего подхода:</h3>
                                                <ul className="space-y-1">
                                                    {selectedOption.explanation.pros.map((p, i) => (
                                                        <li key={i} className="flex gap-2 text-sm text-gray-300">
                                                            <span>•</span> {p}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}

                                        {selectedOption.explanation.risks && (
                                            <section className="bg-red-500/5 p-4 rounded border border-red-500/20">
                                                <h3 className="text-red-400 font-bold mb-2">⚠️ Риски:</h3>
                                                <ul className="space-y-1">
                                                    {selectedOption.explanation.risks.map((r, i) => (
                                                        <li key={i} className="flex gap-2 text-sm text-gray-300">
                                                            <span>•</span> {r}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        )}

                                        {selectedOption.explanation.actionable && (
                                            <section className="bg-[#ffd700]/10 p-4 rounded border border-[#ffd700]/30">
                                                <h3 className="text-[#ffd700] font-bold mb-2">🚀 ЧТО ДЕЛАТЬ:</h3>
                                                <p className="text-sm text-gray-300">{selectedOption.explanation.actionable}</p>
                                            </section>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-700/50 flex justify-end">
                                        <PixelButton onClick={nextQuestion} variant="primary" className="px-8 py-3 text-lg">
                                            {currentIndex + 1 < questions.length ? 'СЛЕДУЮЩИЙ ВОПРОС →' : 'ЗАВЕРШИТЬ ТЕСТ →'}
                                        </PixelButton>
                                    </div>
                                </div>
                            </PixelCard>
                        </motion.div>
                    )}

                    {/* RESULTS SCREEN */}
                    {gameState === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <div className="mb-12">
                                <h2 className="text-5xl font-black mb-2 text-[#ffd700]">РЕЗУЛЬТАТ</h2>
                                <div className="text-gray-400 text-xl">
                                    {stats.score} баллов из {questions.reduce((acc, _) => acc + 15, 0)} возможных
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                <PixelCard className="text-left p-6">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <BarChart2 className="w-5 h-5 text-[#4ade80]" />
                                        Статистика
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Правильно:</span>
                                            <span className="font-bold">{stats.correctAnswers} / {stats.totalQuestions}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Лучшее комбо:</span>
                                            <span className="font-bold text-[#ffd700]">x{stats.maxCombo}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Время:</span>
                                            <span className="font-bold">{Math.floor(timer / 60)}м {timer % 60}с</span>
                                        </div>
                                    </div>
                                </PixelCard>

                                <PixelCard className="text-left p-6">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-[#ffd700]" />
                                        Вердикт
                                    </h3>
                                    <p className="text-gray-300 mb-4">
                                        {stats.score > (questions.length * 10) ?
                                            "Отличный результат! Ты хорошо разбираешься в бизнесе, но есть куда расти." :
                                            "Есть пробелы в базовых знаниях. Рекомендуем изучить материалы и пройти тест снова."}
                                    </p>
                                    <PixelButton variant="primary" className="w-full" onClick={() => window.open('https://t.me/alexey_m_bot', '_blank')}>
                                        ЗАПИСАТЬСЯ НА РАЗБОР
                                    </PixelButton>
                                </PixelCard>
                            </div>

                            <PixelButton onClick={() => setGameState('start')} variant="outline">
                                В МЕНЮ ТЕСТА
                            </PixelButton>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}


